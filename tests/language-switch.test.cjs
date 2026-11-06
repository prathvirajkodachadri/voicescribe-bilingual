const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const html=require('node:fs').readFileSync('index.html','utf8');
const script=html.slice(html.indexOf('function selectLanguage('),html.indexOf("document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener"));
test('language switch synchronizes speech and pressed states without swapping text',()=>{
  const buttons=['en','ja','kn'].map(language=>({dataset:{language},setAttribute(k,v){this[k]=v;}}));
  const elements={quickSource:{},languageSummary:{}};
  let stopped=0,invalidated=0,saved=0;
  const c={languages:{en:{locale:'en-US',name:'English'},ja:{locale:'ja-JP',name:'Japanese'},kn:{locale:'kn-IN',name:'Kannada'}},listenMode:{},quickInput:{value:'existing draft'},statusEl:{},document:{getElementById:id=>elements[id],querySelectorAll:()=>buttons},invalidateTranslation(){invalidated++;},stopListeningForTyping(){stopped++;},save(){saved++;}};
  vm.createContext(c);vm.runInContext(script,c);
  for(const [code,locale] of [['en','en-US'],['ja','ja-JP'],['kn','kn-IN']]){
    c.selectLanguage(code);
    assert.equal(c.listenMode.value,locale);
    assert.equal(c.quickInput.value,'existing draft');
    assert.equal(buttons.filter(b=>b['aria-pressed']==='true').length,1);
    assert.equal(buttons.find(b=>b['aria-pressed']==='true').dataset.language,code);
  }
  assert.equal(stopped,3);assert.equal(invalidated,3);assert.equal(saved,3);
});
test('requested instruction blocks and old footer are removed',()=>{
  for(const text of ['How it works:','id="help"','Translation via MyMemory','href="#help"','Show Both Panels']) assert.ok(!html.includes(text));
});

test('removed workspace controls and text do not return',()=>{
  for(const text of ['YOUR LANGUAGE WORKSPACE','Three languages. One conversation.','id="languageSummary"','id="quickInput"','id="quickSource"','id="downloadBtn"','to toggle mic</span>']) assert.ok(!html.includes(text),text);
});
