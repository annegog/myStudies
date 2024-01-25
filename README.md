# MyStudies

### What we are using in the app
React, Vite, Tailwind, Express, MongoDB

### Notes:
- Για λόγους απλούσευσης της βάσης και των api requests θεωρούμε οτι υπάρχει μονο ένα τμήμα σε αυτη την σχολή και για αυτό και φέρνουμε απο την βάση όλα τα μαθήμτα που υπάρχουν και προσφέρονται στους φοιτητές.

- Φάκελοι με τις σελίδες που υλοποιήσαμε:
    - Common : Κοινές σελίδες που χρησιμοποιούνται τόσο από τους μαθήτες όσο και στους καθηγητές
        - Help : Σελίδες υποστήριξης σε διάφορες ερωτήσεις για την διευκόπλυνση των χρηστών
            - CommonQuestions.jsx : Συχνές ερωτήσεις των χρηστών (μια για τους φοιτητές και μια για τους καθηγητές) 
            - ContactAdmin.jsx : Επικοινωνία με τον διαχειριστή
            - ConnectHelp.jsx : Βοήθεια σε χρήστη που δεν ξέρει πως να συνδεθεί στην πλατφόρμα
            - MobileApp.jsx : Διαφήμιση της εφαρμογής για κινητά
            - Recovery.jsx : Ανάκτηση κωδικού

        - Login.jsx : Σελίδα για την είσοδο του χρήστη στη πλατφόρμα του myStudies (γίνεται χρήση του component/Login όπου αυτό αναλαμβάνει και τη σύνδεση του χρήστη)
        - Profile.jsx : Το προφίλ του χρήστη με τα στοιχεία του

    - Student : Οι σελίδες των φοιτητών
        - Certifications :
            - Certifications.jsx : Κεντρική σελίδα με τις 
            - CertificationsHistory.jsx
            - CertificationsRequest.jsx
            - CertificationsStatus.jsx

        - CoursesProgram : 
        - Declarations : 
        - Grades : 
        - HistoryDeclarations : 
        - Home : 

    - Professor : Οι σελίδες των καθηγητών

### How to run the app
Frontend :

```
cd myStudies 
npm install
npm run dev

```

Backend:

```
cd api
node index.js

```
