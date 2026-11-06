const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync('index.html', 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
// Compile the full app as well as exercising the capture handler in isolation.
new vm.Script(script);
const capture = script.slice(script.indexOf('function getSystemCaptureUnavailableReason'), script.indexOf('\nfunction stopSystem'));

function setup(window, navigator, document = {}) {
  let click;
  const context = {
    window, navigator, document,
    sysBtn: { addEventListener: (_, handler) => { click = handler; } },
    statusEl: { textContent: '', className: '' },
    showToast: () => {},
  };
  vm.createContext(context);
  vm.runInContext(capture, context);
  return { context, click };
}

test('missing mediaDevices gives guidance without throwing', async () => {
  const { context, click } = setup({ isSecureContext: true }, {});
  await click();
  assert.match(context.statusEl.textContent, /desktop Chrome or Edge/);
});

test('missing or non-callable getDisplayMedia is handled', async () => {
  for (const getDisplayMedia of [undefined, null, true]) {
    const { context, click } = setup({ isSecureContext: true }, { mediaDevices: { getDisplayMedia } });
    await click();
    assert.match(context.statusEl.textContent, /unavailable in this browser/);
  }
});

test('insecure page explains HTTPS requirement', async () => {
  const { context, click } = setup({ isSecureContext: false }, {});
  await click();
  assert.match(context.statusEl.textContent, /requires HTTPS/);
});

test('blocked embed explains permissions policy', async () => {
  for (const key of ['permissionsPolicy', 'featurePolicy']) {
    const { context, click } = setup({ isSecureContext: true }, {}, {
      [key]: { allowsFeature: feature => { assert.equal(feature, 'display-capture'); return false; } },
    });
    await click();
    assert.match(context.statusEl.textContent, /blocked in this embed/);
  }
});

test('supported browser calls capture with the mediaDevices receiver', async () => {
  let called = false;
  const mediaDevices = { async getDisplayMedia(options) {
    assert.equal(this, mediaDevices);
    assert.equal(options.video, true);
    assert.equal(options.audio.echoCancellation, false);
    called = true;
    throw Object.assign(new Error('Denied'), { name: 'NotAllowedError' });
  } };
  const { context, click } = setup({ isSecureContext: true }, { mediaDevices });
  await click();
  assert.equal(called, true);
  assert.match(context.statusEl.textContent, /cancelled or blocked/);
});
