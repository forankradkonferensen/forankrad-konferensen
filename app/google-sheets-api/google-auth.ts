import { google } from 'googleapis';

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

export { sheets };