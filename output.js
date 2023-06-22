const area = document.getElementById('output');

function KontaktArea(){
    area.innerHTML = '';

    const ContactWelcomeText = document.createElement('span');
    ContactWelcomeText.style.display = 'block';
    ContactWelcomeText.style.display = 'flex';
    ContactWelcomeText.style.alignItems = 'center';
    ContactWelcomeText.style.justifyContent = 'center';
    ContactWelcomeText.style.height = '50%';
    ContactWelcomeText.style.fontSize = '60px';
    area.appendChild(ContactWelcomeText);
    setTimeout(function() {PrinterTextFunction(ContactWelcomeText, "Contact");}, 250);
    setTimeout(function() {
        for (let i = 50; i > 20; i--) {
            setTimeout(function() {
                ContactWelcomeText.style.height = i+'%';
            }, (50-i)*25);
        }
    }, "Contact".length*100 + 250);
}

function PrinterTextFunction(location, text){
    for (let i = 0; i < text.length; i++) {
        setTimeout(function() {
          location.innerHTML += text[i];
        }, i *100)
    }
}