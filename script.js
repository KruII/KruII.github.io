function showInfo() {
  document.getElementById('output').innerHTML = 'To jest sekcja z informacjami o mnie.';
}

function showContact() {
  document.getElementById('output').innerHTML = 'Możesz się ze mną skontaktować pod adresem e-mail: example@example.com';
}

function showSkills() {
  document.getElementById('output').innerHTML = 'Moje umiejętności to: HTML, CSS, JavaScript, itd.';
}

function showInterests() {
  document.getElementById('output').innerHTML = 'Moje zainteresowania to: programowanie, podróże, sport, itd.';
}

const HeaderT = document.getElementById('HeaderText');

function HeaderW(HeaderWord){
  HeaderT.innerHTML = '';
  for (let i = 0; i < HeaderWord.length; i++) {
    setTimeout(function() {
      HeaderT.innerHTML += HeaderWord[i];
    }, i *100)
  }
};

const footer = document.getElementById('footer');
var mouse_boolean = false;
var intervalId; // Zmienna przechowująca ID interwału

footer.addEventListener('mouseover', function() {
  mouse_boolean = true;
  clearInterval(intervalId);
  intervalId = setInterval(function() {
    if (mouse_boolean && footer.offsetHeight < 100) {
      footer.style.height = footer.offsetHeight + 1 + 'px';
    } else {
      clearInterval(intervalId);
    }
  }, 5); // Opóźnienie 0,5 sekundy
});

footer.addEventListener('mouseout', function() {
  mouse_boolean = false;
  clearInterval(intervalId);
  intervalId = setInterval(function() {
    if (!mouse_boolean && footer.offsetHeight > 10) {
      footer.style.height = footer.offsetHeight - 1 + 'px';
    } else {
      clearInterval(intervalId);
    }
  }, 5); // Opóźnienie 0,5 sekundy
});
