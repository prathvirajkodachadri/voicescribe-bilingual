const {test}=require('node:test');
const assert=require('node:assert/strict');
const html=require('node:fs').readFileSync('index.html','utf8');
test('settings appear once in the header and retain their enabled defaults',()=>{
  const header=html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)[1];
  for(const id of ['autoTranslate','continuousMode','interimResults']){
    assert.equal((html.match(new RegExp(`id="${id}"`,'g'))||[]).length,1);
    assert.match(header,new RegExp(`<input[^>]*id="${id}"[^>]*checked`));
  }
  assert.match(header,/aria-label="Translation and listening settings"/);
});
