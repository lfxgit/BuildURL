const baseUrlInput   = document.getElementById('baseUrl');
const sourceInput    = document.getElementById('utmSource');
const mediumInput    = document.getElementById('utmMedium');
const campaignInput  = document.getElementById('utmCampaign');
const termInput      = document.getElementById('utmTerm');
const contentInput   = document.getElementById('utmContent');
const resultInput    = document.getElementById('resultUrl');
const copyStatus     = document.getElementById('copyStatus');

const clearBtn = document.getElementById('clearBtn');
const copyBtn  = document.getElementById('copyBtn');

function normalizeValue(value) {    // Properly format user inputs
  if (!value) return '';
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_');
}

function buildUrl() {
  copyStatus.textContent = '';

  const base = baseUrlInput.value.trim();
  if (!base) {
    resultInput.value = '';
    return;
  }

  const params = [];

  function addParam(key, value) {
    const normalized = normalizeValue(value);
    if (!normalized) return;
    params.push(key + '=' + encodeURIComponent(normalized));
  }

  addParam('utm_source',  sourceInput.value);
  addParam('utm_medium',  mediumInput.value);
  addParam('utm_campaign', campaignInput.value);
  addParam('utm_content', contentInput.value);
  addParam('utm_term',    termInput.value);

  if (params.length === 0) {
    resultInput.value = base;
    return;
  }

  const separator = base.includes('?') ? '&' : '?';
  const finalUrl  = base + separator + params.join('&');
  resultInput.value = finalUrl;
}

function clearAll() {
  baseUrlInput.value  = '';
  sourceInput.value   = '';
  mediumInput.value   = '';
  campaignInput.value = '';
  termInput.value     = '';
  contentInput.value  = '';
  resultInput.value   = '';
  copyStatus.textContent = '';
}

async function copyToClipboard() {
  const text = resultInput.value.trim();
  if (!text) {
    copyStatus.textContent = 'Nothing to copy';
    return;
  }

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    }
    copyStatus.textContent = 'Copied';
  } catch (err) {
    copyStatus.textContent = 'Error';
  }
}

clearBtn.addEventListener('click', clearAll);
copyBtn.addEventListener('click', copyToClipboard);

// Live updates
[
  baseUrlInput,
  sourceInput,
  mediumInput,
  campaignInput,
  termInput,
  contentInput
].forEach(input => {
  input.addEventListener('input', buildUrl);
});
