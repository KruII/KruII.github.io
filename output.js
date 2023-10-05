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
    ContactWelcomeText.style.fontFamily = 'Equalizer';
    ContactWelcomeText.style.color = 'rgb(74, 202, 52)';
    area.appendChild(ContactWelcomeText);
    setTimeout(function() {PrinterTextFunction(ContactWelcomeText, "Contact");}, 250);
    setTimeout(function() {
        for (let i = 50; i > 20; i--) {
            setTimeout(function() {
                ContactWelcomeText.style.height = i+'%';
            }, (50-i)*25);
        }
    }, "Contact".length*100 + 250);

    const ContactGmail = document.createElement('span');
    ContactGmail.innerHTML = `
        <form id="myForm" action="https://formspree.io/f/xvojpoyz" method="POST">
        <input type="email" name="email" placeholder="Twój adres e-mail" required>
        <textarea name="message" placeholder="Treść wiadomości" required></textarea>
        <button type="submit">Wyślij</button>
        </form>`;
    area.appendChild(ContactGmail);
}

function PrinterTextFunction(location, text){
    for (let i = 0; i < text.length; i++) {
        setTimeout(function() {
          location.innerHTML += text[i];
        }, i *100)
    }
}

// Funkcja do wyświetlania umiejętności
function showSkills() {
    area.innerHTML = '';
    fetchGithubRepos("KruII").then(data => {
        let skills = analyzeSkills(data);
        displaySkills(skills);
    });
}

// Pobieranie repozytoriów z GitHub
async function fetchGithubRepos(username) {
    let response = await fetch(`https://api.github.com/users/${username}/repos`);
    let data = await response.json();
    return data;
}

// Analiza umiejętności na podstawie repozytoriów
function analyzeSkills(repos) {
    let languageStats = {};
    repos.forEach(repo => {
        let lang = repo.language;
        if (lang) {
            if (!languageStats[lang]) languageStats[lang] = 0;
            languageStats[lang]++;
        }
    });
    
    // Uporządkuj umiejętności według ilości repozytoriów
    let sortedSkills = Object.entries(languageStats).sort((a, b) => b[1] - a[1]);
    
    return sortedSkills;
}

// Wyświetlanie umiejętności
function displaySkills(skills) {
    skills.forEach(skill => {
        let skillName = skill[0];
        let skillValue = skill[1];  // Dla uproszczenia jest to ilość repozytoriów

        let skillDiv = document.createElement('span');
        skillDiv.innerHTML = `
            <h2>${skillName}</h2>
            <div class="progress">
                <div class="progress-bar" style="width:${skillValue*10}%">${skillValue*10}%</div>
            </div>
        `;
        area.appendChild(skillDiv);
    });
}


