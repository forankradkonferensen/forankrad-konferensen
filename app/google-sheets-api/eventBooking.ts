import { GoogleApis, google } from 'googleapis';
const nodemailer = require('nodemailer');

// The private key is stored with placeholder @ and then replaced with the escape character \n because of deployment issues
const privateKey = process.env.private_key!.replace(/@/g, '\n');

// credentials for the google service account
const serviceAccount = {
    type: 'service_account',
    project_id: 'fresh-generator-420014',
    private_key_id: process.env.private_key_id,
    private_key: privateKey,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/forankrad-service-account%40fresh-generator-420014.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com',
};
const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });

export async function bookEvent(bookingData: string[]) {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.BOOKINGS,
            range: 'Sheet1',
        });
        const rows = response.data.values || [];
        
        const nonEmptyRows = rows.filter(row => row.length > 0);
        if (nonEmptyRows.length >= 301) {
            console.log("Ledsen, det finns inga platser kvar");
            return new Error('Ledsen det är fullbokat');
          }

          const newData = [...nonEmptyRows, bookingData];

          await sheets.spreadsheets.values.update({
            spreadsheetId: process.env.BOOKINGS,
            range: 'Sheet1',
            valueInputOption: 'RAW',
            requestBody: { values: newData },
          });
    } catch (error) {
        console.error('Cannot fetch or update google sheets:', error);
    }
}
