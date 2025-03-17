document.getElementById('searchButton').addEventListener('click', async () => {
  const cveId = document.getElementById('cveInput').value.trim().toUpperCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (!cveId.startsWith('CVE-') || cveId.length < 10) {
    resultsDiv.innerHTML = '<div class="result">Invalid CVE ID format. Example: CVE-2024-4577</div>';
    return;
  }

  const addResultSection = (title, content) => {
    const section = document.createElement('div');
    section.className = 'result';
    section.innerHTML = `<strong>${title}</strong><br>${content}`;
    resultsDiv.appendChild(section);
  };

  // Fetch Trickest POCs
  const year = cveId.split('-')[1];
  const trickestUrl = `https://raw.githubusercontent.com/trickest/cve/main/${year}/${cveId}.md`;
  try {
    const trickestResp = await fetch(trickestUrl);
    if (trickestResp.ok) {
      const text = await trickestResp.text();
      const matches = text.match(/- (https:\/\/github\.com\/[^\s]+)/g) || [];
      const links = matches.map(url => 
        `<a href="${url.slice(2)}" target="_blank">${url.slice(2)}</a>`
      ).join('<br>');
      addResultSection('POCs', links || 'No POCs found.');
    } else {
      addResultSection('POCs', 'No data found.');
    }
  } catch (e) {
    addResultSection('POCs', 'Error fetching data.');
  }
});