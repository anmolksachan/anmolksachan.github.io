// Load the README.md file and insert it into the page
fetch('README.md')
  .then(response => response.text())
  .then(text => {
    const readmeContent = document.getElementById('readme-content');
    readmeContent.innerHTML = text;
  });
