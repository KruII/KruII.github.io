var userLanguage = navigator.language || navigator.userLanguage;
const infoBu = document.getElementById('infoBu');
const contBu = document.getElementById('contBu');
const skillBu = document.getElementById('skillBu');
const projBu = document.getElementById('projBu');

if (userLanguage == "pl"){
    infoBu.innerHTML = 'Informacje';
    contBu.innerHTML = 'Kontakt';
    skillBu.innerHTML = 'Umiejetnosci';
    projBu.innerHTML = 'Projekty';
    HeaderW("Moje Portfolio");
}else{
    infoBu.innerHTML = 'Info'
    contBu.innerHTML = 'Contact';
    skillBu.innerHTML = 'Skills';
    projBu.innerHTML = 'Projects';
    HeaderW("My Portfolio");
}