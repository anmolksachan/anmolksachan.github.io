Hackerman = (function(){
  var page = document.querySelector('.page');
  
  function yearsHacked(i) {
  
      var years = document.getElementById('years'),
          multiplier = i * .01;
    
      if (years.innerHTML < 1000) {
        setTimeout(function() {
          years.innerHTML = i;
          yearsHacked(Math.floor(i + 1 + multiplier));
        }, 1);
      } else {
        page.className += ' uh-oh';
        setTimeout(abort, 4000);
      }
  
  }
  
  function warp() {
    page.className += ' warp';
    setTimeout(function() {
      yearsHacked(1);
    }, 6000);
  } 
  
  function abort() {
    page.className += ' abort';
  }
  
  function hacktime (e) {
    e.preventDefault();
    
    var target = e.target,
        input = target.parentNode.previousElementSibling;
    
    input.checked = true;
    
    setTimeout(function() {
      if (input.value === 'yes') {
        warp();
      } else {
        abort();
      }
    }, 8000);
  }
  
  function init() {
    var warp = document.querySelector('.confirm');
    warp.addEventListener('click', hacktime);
  }
  
  document.addEventListener("DOMContentLoaded", init);
  
})()
