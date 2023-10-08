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

let allProjects = [];

async function showProjects() {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<p>Ładowanie projektów...</p>';

    try {
        // Fetch the list of repositories
        const response = await fetch('https://api.github.com/users/KruII/repos');
        const repos = await response.json();

        // For each repository, fetch the language details
        const languagePromises = repos.map(async repo => {
            const langResponse = await fetch(repo.languages_url);
            return await langResponse.json();
        });
        const languagesList = await Promise.all(languagePromises);

        // Combine the repo details with their respective language details
        repos.forEach((repo, index) => {
            repo.languages_details = languagesList[index];
        });

        allProjects = repos;
        updateProjectsDisplay();
    } catch (error) {
        outputDiv.innerHTML = '<p>Wystąpił błąd podczas ładowania projektów. Spróbuj ponownie później.</p>';
    }
}

function updateProjectsDisplay() {
    const outputDiv = document.getElementById('output');
    const sortType = document.getElementById('sortSelect') ? document.getElementById('sortSelect').value : 'date';
    const selectedLanguage = document.getElementById('languageSelect') ? document.getElementById('languageSelect').value : 'all';

    // Filter by language
    let filteredProjects = allProjects;

    if (selectedLanguage !== 'all') {
        filteredProjects = allProjects.filter(project => {
            let totalBytes = 0;
            for (const lang in project.languages_details) {
                totalBytes += project.languages_details[lang];
            }

            if (project.language === selectedLanguage) {
                return true;
            }

            for (const lang in project.languages_details) {
                const percentage = (project.languages_details[lang] / totalBytes) * 100;
                if (lang === selectedLanguage && percentage > 10) {
                    return true;
                }
            }
            return false;
        });
    }

    // Sort projects
    filteredProjects.sort((a, b) => {
        if (sortType === 'stars') {
            return b.stargazers_count - a.stargazers_count;
        }else if (sortType === 'updated') {
            return new Date(b.updated_at) - new Date(a.updated_at);
        }
        return new Date(b.created_at) - new Date(a.created_at);
    });

    // Get a unique list of all languages across all repositories that exceed 10% usage
    const allLanguages = [...new Set(allProjects.flatMap(repo => {
        let totalBytes = 0;
        for (const lang in repo.languages_details) {
            totalBytes += repo.languages_details[lang];
        }
        return Object.keys(repo.languages_details).filter(lang => (repo.languages_details[lang] / totalBytes) * 100 > 10);
    }))];

    let htmlContent = `
        <div class="project-controls">
            <label>Sortuj według:
                <select id="sortSelect" onchange="updateProjectsDisplay()">
                    <option value="date" ${sortType === 'date' ? 'selected' : ''}>Data utworzenia</option>
                    <option value="stars" ${sortType === 'stars' ? 'selected' : ''}>Gwiazdek</option>
                    <option value="updated" ${sortType === 'updated' ? 'selected' : ''}>Data modyfikacji</option>
                </select>
            </label>
            <label>Filtruj język:
                <select id="languageSelect" onchange="updateProjectsDisplay()">
                    <option value="all" ${selectedLanguage === 'all' ? 'selected' : ''}>Wszystkie</option>
                    ${allLanguages.map(lang => `<option value="${lang}" ${selectedLanguage === lang ? 'selected' : ''}>${lang}</option>`).join('')}
                </select>
            </label>
        </div>
        <div class="project-list">
    `;


    filteredProjects.forEach(repo => {
        const downloadLink = repo.default_branch ? `${repo.html_url}/archive/refs/heads/${repo.default_branch}.zip` : repo.html_url;

        // Create a visualization of language usage
        let totalBytes = 0;
        for (const lang in repo.languages_details) {
            totalBytes += repo.languages_details[lang];
        }

        let languagesHTML = '<div class="languages-bar">';
        let additionalLanguages = [];
        for (const lang in repo.languages_details) {
            const percentage = (repo.languages_details[lang] / totalBytes) * 100;
            languagesHTML += `<div class="language" style="width: ${percentage}%; background-color: ${getLanguageColor(lang)};" title="${lang}: ${percentage.toFixed(2)}%"></div>`;
            if (percentage > 10) {
                if (lang !== repo.language) {
                    additionalLanguages.push(lang);
                }
            }
        }
        languagesHTML += '</div>';

        const additionalLanguagesText = additionalLanguages.length > 0 ? `Dodatkowe języki: ${additionalLanguages.join(', ')}` : '';

        const oneWeekAgo = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000));
        let label = '';
        if (new Date(repo.created_at) >= oneWeekAgo) {
            label = '<span style="color:red; font-weight:bold;">NEW</span>';
        } else if (new Date(repo.updated_at) >= oneWeekAgo) {
            label = '<span style="color:orange; font-weight:bold;">UPDATED</span>';
        }

        console.log(repo.updated_at);

        htmlContent += `
            <div class="project-item">
                <h3>${repo.name.replace(/_/g, ' ')}</h3>
                ${languagesHTML}
                <p>Główny język: ${repo.language || 'Nieznany'}</p>
                <p>${additionalLanguagesText}</p>
                <p>Data utworzenia: ${new Date(repo.created_at).toLocaleDateString()}</p>
                <p>Data modyfikacji: ${new Date(repo.updated_at).toLocaleDateString()}</p>
                <p>Gwiazdki: ${repo.stargazers_count}</p>
                <a href="${repo.html_url}" target="_blank">Podgląd na GitHub</a>
                <a href="${downloadLink}" target="_blank">Pobierz</a>
            </div>
        `;
    });
    
    htmlContent += '</div>';
    outputDiv.innerHTML = htmlContent;
}


function getLanguageColor(language) {
    // This function returns a color based on the language. It's a simplified version.
    // For a complete mapping, consider using an external library or API.
    switch (language) {
        case 'JavaScript': return '#f1e05a';
        case 'Python': return '#3572A5';
        case 'Java': return '#b07219';
        case 'C': return '#555555';
        case 'C++': return '#f34b7d';
        case 'C#': return '#178600';
        case 'PHP': return '#4F5D95';
        case 'Ruby': return '#701516';
        case 'Swift': return '#ffac45';
        case 'Go': return '#00ADD8';
        case 'R': return '#198CE7';
        case 'Perl': return '#0298c3';
        case 'Kotlin': return '#F18E33';
        case 'Rust': return '#dea584';
        case 'TypeScript': return '#2b7489';
        case 'Shell': return '#89e051';
        case 'HTML': return '#e34c26';
        case 'CSS': return '#563d7c';
        case 'Scala': return '#c22d40';
        case 'Lua': return '#000080';
        case 'Objective-C': return '#438eff';
        case 'Dart': return '#00B4AB';
        case 'Haskell': return '#5e5086';
        case 'MATLAB': return '#bb92ac';
        default: return '#ccc';  // Default color for unknown languages
    }
}

// Call the showProjects function on page load or button click to display the projects
//showProjects();
