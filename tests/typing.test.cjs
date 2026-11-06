const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const html=require('node:fs').readFileSync('index.html','utf8');
const script=html.slice(html.indexOf('// A shared revision'),html.indexOf('\nfunction pushHistory'));
function setup(){
  const field=()=>({value:'',addEventListener(){}});
  const c={enText:field(),jaText:field(),knText:field(),quickInput:field(),autoTranslate:{checked:true,addEventListener(){}},statusEl:{},enBadge:{},jaBadge:{},knBadge:{},updateCounts(){},save(){},pushHistory(){},setBilingual(){throw Error('Source must not be rewritten');},setTimeout,clearTimeout};
  c.editors={en:c.enText,ja:c.jaText,kn:c.knText}; c.badges={en:c.enBadge,ja:c.jaBadge,kn:c.knBadge};
  vm.createContext(c); vm.runInContext(script,c); return c;
}
test('typing translation changes target only, preserving exact source',async()=>{
  const c=setup(); c.enText.value='  Hello  ';
  c.fetch=async()=>({ok:true,json:async()=>({responseData:{translatedText:'こんにちは'}})});
  await c.doTranslate('Hello','en','ja','auto');
  assert.equal(c.enText.value,'  Hello  '); assert.equal(c.jaText.value,'こんにちは');
});
test('response arriving after an edit is ignored',async()=>{
  const c=setup(); const resolves=[];
  c.fetch=()=>new Promise(r=>resolves.push(r));
  const pending=c.doTranslate('old','en','ja','auto');
  c.invalidateTranslation(); c.enText.value='new';
  resolves.forEach(resolve=>resolve({ok:true,json:async()=>({responseData:{translatedText:'old result'}})}));
  await pending;
  assert.equal(c.enText.value,'new'); assert.equal(c.jaText.value,'');
});
test('rapid typing is debounced into one translation',async()=>{
  const c=setup(); let calls=0;
  c.fetch=async()=>{calls++;return {ok:true,json:async()=>({responseData:{translatedText:'結果'}})}};
  for(const value of ['a','ab','abc']){c.enText.value=value;c.queueTypedTranslation(c.enText,'en');}
  await new Promise(r=>setTimeout(r,750)); assert.equal(calls,2);
});

for(const src of ['en','ja','kn']){
  test(`${src} translates to both other languages without changing source`,async()=>{
    const c=setup(); c.editors[src].value='  original  ';
    const pairs=[];
    c.fetch=async url=>{ const pair=new URL(url).searchParams.get('langpair'); pairs.push(pair); return {ok:true,json:async()=>({responseData:{translatedText:pair}})}; };
    await c.doTranslate('original',src,null,'auto');
    assert.equal(c.editors[src].value,'  original  ');
    for(const target of Object.keys(c.editors).filter(code=>code!==src)){
      assert.ok(pairs.includes(src+'|'+target)); assert.equal(c.editors[target].value,src+'|'+target);
    }
  });
}
