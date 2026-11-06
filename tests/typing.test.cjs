const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const html=require('node:fs').readFileSync('index.html','utf8');
const script=html.slice(html.indexOf('// A shared revision'),html.indexOf('\nfunction pushHistory'));
function setup(){
  const field=()=>({value:'',addEventListener(){}});
  const c={enText:field(),jaText:field(),quickInput:field(),autoTranslate:{checked:true,addEventListener(){}},statusEl:{},enBadge:{},jaBadge:{},updateCounts(){},save(){},pushHistory(){},setBilingual(){throw Error('Source must not be rewritten');},setTimeout,clearTimeout};
  vm.createContext(c); vm.runInContext(script,c); return c;
}
test('typing translation changes target only, preserving exact source',async()=>{
  const c=setup(); c.enText.value='  Hello  ';
  c.fetch=async()=>({ok:true,json:async()=>({responseData:{translatedText:'こんにちは'}})});
  await c.doTranslate('Hello','en','ja','auto');
  assert.equal(c.enText.value,'  Hello  '); assert.equal(c.jaText.value,'こんにちは');
});
test('response arriving after an edit is ignored',async()=>{
  const c=setup(); let resolve;
  c.fetch=()=>new Promise(r=>resolve=r);
  const pending=c.doTranslate('old','en','ja','auto');
  c.invalidateTranslation(); c.enText.value='new';
  resolve({ok:true,json:async()=>({responseData:{translatedText:'old result'}})});
  await pending;
  assert.equal(c.enText.value,'new'); assert.equal(c.jaText.value,'');
});
test('rapid typing is debounced into one translation',async()=>{
  const c=setup(); let calls=0;
  c.fetch=async()=>{calls++;return {ok:true,json:async()=>({responseData:{translatedText:'結果'}})}};
  for(const value of ['a','ab','abc']){c.enText.value=value;c.queueTypedTranslation(c.enText,'en');}
  await new Promise(r=>setTimeout(r,750)); assert.equal(calls,1);
});
