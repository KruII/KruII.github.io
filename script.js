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

HeaderW("Moja Stronka");

function HeaderW(HeaderWord){
  HeaderT.innerHTML = '';
  for (let i = 0; i < HeaderWord.length; i++) {
    setTimeout(function() {
      HeaderT.innerHTML += HeaderWord[i];
    }, i *100)
  }
}
