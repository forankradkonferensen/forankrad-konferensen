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
            spreadsheetId: '10QGIaldA2awCKz2yNl4KXbP1leP_WzTR1qDiIsWUnCg',
            range: 'Sheet1',
        });
        const rows = response.data.values || [];
        
        const nonEmptyRows = rows.filter(row => row.length > 0);
        if (nonEmptyRows.length >= 301) {
            console.log("Ledsen, det finns inga platser kvar");
            return;
          }

          const newData = [...nonEmptyRows, bookingData];


          await sheets.spreadsheets.values.update({
            spreadsheetId: '10QGIaldA2awCKz2yNl4KXbP1leP_WzTR1qDiIsWUnCg',
            range: 'Sheet1',
            valueInputOption: 'RAW',
            requestBody: { values: newData },
          });
    } catch (error) {
        console.error('Cannot fetch from google sheets:', error);
    }
}

export async function cancelBooking(email: string) {
    try {
        const sheetId = '10QGIaldA2awCKz2yNl4KXbP1leP_WzTR1qDiIsWUnCg';
        const range = 'Sheet1';

        // Fetch existing data from the sheet
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: range,
        });

        console.log('Response from Google Sheets API:', response);

        const rows = response.data.values || [];

        // Filter out the row with the specified email
        const rowIndex = rows.findIndex(row => row.includes(email));
        if(rowIndex === -1) {
            console.log('Email not found in the booking list.');
            return;
        }

        const requests = [
            {
                deleteDimension: {
                    range: {
                        sheetId: 'Sheet1',
                        dimension: 'ROWS',
                        startIndex: rowIndex,
                        endIndex: rowIndex + 1,
                    },
                },
            },
            {
                deleteDimension: {
                    range: {
                        sheetId: 'Sheet1',
                        dimension: 'COLUMNS',
                        startIndex: 0,
                        endIndex: 4, 
                    },
                },
            },
        ];

        await sheets.spreadsheets.batchUpdate({
            spreadsheetId: sheetId,
            requestBody: {
                requests: requests,
            },
        });
        
        console.log('Booking canceled successfully');
    } catch (error) {
        console.error('Failed to cancel booking:', error);
    }
}

