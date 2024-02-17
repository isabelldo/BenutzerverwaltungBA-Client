const baseUrl = 'http://localhost:3000/';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('logout-button').addEventListener('click', logout);
    const token = localStorage.getItem('accessToken');
    const protectedPages = ['/home.html'];
    console.log('Token:', token);

    if (protectedPages.includes(window.location.pathname) && isTokenExpired(token)) {
        logout();
    }
        else {
        // Falls der Benutzer authentifiziert ist, zeige den Seiteninhalt
        const content = document.querySelector('.hidden-content');
        if (content) {
            content.classList.remove('hidden-content');
            readToken(token);
        }
    }
});

function isTokenExpired(token) {
    if (!token) return true; // Token ist nicht vorhanden

    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const tokenExpiration = tokenPayload.exp * 1000; // Konvertiere Sekunden in Millisekunden
    const currentTimestamp = new Date().getTime();

    return tokenExpiration < currentTimestamp;
}

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const loginData = {
        username: username,
        password: password
    };
    // POST-Anfrage an die API senden für den Login
    fetch(baseUrl + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Fehler bei der Anmeldung');
        })
        .then((data) => {
            const token = data.accessToken;
            localStorage.setItem('accessToken', token);
            //showAdminContent();
            // Weiterleitung zur Startseite nach erfolgreicher Anmeldung
            window.location.href = '/home.html';
        })
        .catch(error => {
            // Fehler bei der Anmeldung
            console.error('Fehler:', error.message);
            alert('Benutzername oder Passwort falsch!');
        });
});

document.getElementById('register').addEventListener('click', showPopup);
document.getElementById('cancel').addEventListener('click', showPopup);
    function showPopup() {
        let popup = document.getElementById("popupWindow");
        if (popup.style.display === "flex") {
            popup.style.display = "none"
        } else {
            popup.style.display = "flex"
        }
    }

document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Daten aus dem Formular abrufen
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('firstName').value; // Vorname
    const lastName = document.getElementById('lastName').value; // Nachname

    let fullName = `${firstName} ${lastName}`;

    // Benutzerdaten in ein JSON-Objekt zusammenstellen
    const userData = {
        username: username,
        password: password,
        email: email,
        fullName: fullName
    };

    // POST-Anfrage an die API senden
    fetch(baseUrl + 'auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            throw new Error('Fehler bei der Registrierung');
        })
        .then(() => {
            // Erfolgreiche Registrierung
            console.log('Registrierung erfolgreich!');
            document.getElementById('login-username').value = username;
            showPopup();
        })
        .catch(error => {
            // Fehler bei der Registrierung
            console.error('Fehler:', error.message);
        });
});

function readToken(token) {
        // Token in Header, Payload und Signatur aufteilen
        const [header, payload, signature] = token.split('.');

        // Payload decodieren (Base64)
        const decodedPayload = JSON.parse(atob(payload));
        const adminArea = document.getElementById('admin-area');
        const userArea = document.getElementById('user-area');
        const userTableContainer = document.getElementById('user-table')
        let userRoles = decodedPayload.role;
        console.log(userRoles);

        if (userRoles.includes("ADMIN")) {
            adminArea.style.display = "block";
            userArea.style.display = "none";
            userTableContainer.style.display = "block";
            getAllUsers();
        } else if (userRoles.includes("USER")) {
            adminArea.style.display = "none";
            userArea.style.display = "block";
            userTableContainer.style.display = "none";
        }

        return userRoles; // Rückgabe des Rollen-Arrays
}

function createTableContent(data){
    const container = document.getElementById('user-table');

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

// Erstelle Tabellenkopf (header)
    const headerRow = document.createElement('tr');
    ['Username', 'Full Name', 'Email', 'Roles'].forEach(columnName => {
        const th = document.createElement('th');
        th.textContent = columnName;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

// Füge Benutzerdaten als Zeilen in die Tabelle ein
    data.forEach(user => {
        const roles = user.role.map(role => role.name).join(', ');

        const row = document.createElement('tr');

        const cell1 = document.createElement('td');
        cell1.textContent = user.username;
        row.appendChild(cell1);

        const cell2 = document.createElement('td');
        cell2.textContent = user.fullName;
        row.appendChild(cell2);

        const cell3 = document.createElement('td');
        cell3.textContent = user.email;
        row.appendChild(cell3);

        const cell4 = document.createElement('td');
        cell4.textContent = roles;
        row.appendChild(cell4);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}

function getAllUsers(){
    fetch(baseUrl + 'users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Fehler beim Abrufen der Benutzer');
        })
        .then((data) => {
            createTableContent(data);
            console.log('Alle Benutzer:', data);
        })
        .catch(error => {
            console.error('Fehler:', error.message);
        });
}

function logout() {
    console.log("logout");
    localStorage.removeItem('accessToken');
    window.location.href = '/login.html';
    alert('Du wurdest ausgeloggt!');
}