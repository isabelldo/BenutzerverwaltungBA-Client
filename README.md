# BenutzerverwaltungBA-Client
Beispiel einer Benutzeroberfläche für eine Benutzerverwaltung.
***

## Technologien
- Javascript
- Node.js

## Installation
```bash
git clone BenutzerverwaltungBA-Client
cd ../path/to/the/file
npm install
npm run start
```

## Überblick über das Projekt
Der BenutzerberwaltungsBA-Client ist eine Webanwendung, die als Beispiel für die Nutzung des [BenutzerverwaltungsBA-Server](https://github.com/isabelldo/BenutzerverwaltungBA-Server) implementiert worden ist. Sie stellt eine Benutzeroberfläche zur Verfügung, die es BenutzerInnen ermöglicht, sich bei dem Server der Benutzerverwaltung zu registrieren, anzumelden und daraufhin, je nach Autorisierung, auf die Benutzerverwaltung zuzugreifen.
Der Client nutzt die Endpunkte der REST-API des BenutzerverwaltungsBA-Servers, um den Registrierungs- und Anmeldevorgang umzusetzen.

### Registrierung
![Bildschirmfoto 2024-02-20 um 11 55 08](https://github.com/isabelldo/BenutzerverwaltungBA-Client/assets/82314893/2af4707f-15c2-4c93-bc58-553dd7ff0aea)
)

### Anmeldung 
![Bildschirmfoto 2024-02-20 um 11 55 47](https://github.com/isabelldo/BenutzerverwaltungBA-Client/assets/82314893/520ee54c-a183-4f53-8d42-c0b443b4205f)

### Startseite
Startseite wird je nach hinterlegten Rollen des Benutzers/ der Benutzerin (Rolle: Admin oder User), mit anderem Seiteninhalt dargestellt. Der Admin kann Daten aus der Benutzerverwaltung einsehen und hat somit Zugriff auf alle Endpunkte API, wohingehen der User keinen Zugriff auf die Benutzerdaten hat. 

## Ausblick
1. Weitere geschützte Endpunkte für die Rolle "User" hinzufügen, sodass es dem/der BenutzerIn möglich ist seine/ihre eigenen Daten einsehen, ändern und löschen zu können.
2. Responsive-Web-Design
