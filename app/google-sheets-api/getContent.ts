import { GoogleApis, google } from 'googleapis'

const privateKey_one = process.env.private_key_part_one!.replace(/@/g, '\n');
const privateKey_two = process.env.private_key_part_two!.replace(/@/g, '\n');
const privateKey = privateKey_one + privateKey_two

// credentials for the google service account
const serviceAccount = {
    "type": "service_account",
    "project_id": "fresh-generator-420014",
    "private_key_id": process.env.private_key_id,
    "private_key": privateKey,
    "client_email": process.env.client_email,
    "client_id": process.env.client_id,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/forankrad-service-account%40fresh-generator-420014.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })
  const sheets = google.sheets({ version: 'v4', auth });

// get general information for the website
type GeneralInformation = {
    datum: string;
    om: string;
    tema: string;
    omTema: string;
    bibelord: string;
    bibelRef: string;
    pris: string;
};

export async function getGeneralInformation(): Promise<GeneralInformation> {
    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GENERAL_INFO_ID,
            range: 'Sheet1'
        });
        const data: string[][] | undefined | null = res.data.values
        if(data) {
            const [datum, om, tema, omTema, bibelord, bibelRef, pris] = data[1]
            return {
                datum,
                om,
                tema,
                omTema,
                bibelord,
                bibelRef,
                pris,
            }
        } else {
            throw new Error('No data found in the spreadsheet.');
        }
    } catch (error) {
        console.error('Cannot fetch from Google Sheets:', error);
        throw error; // Re-throw the error to handle it in the calling code
    }
  }
// getSpeakers return a 2d array with the structure of [namn, efternamn, titel, bildId]
export async function getSpeakers(): Promise<string[][] | undefined> {
    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.CONTRIBUTORS_ID,
            range: 'talare'
        });
        const data: string[][] | undefined | null = res.data.values
        const dataWithoutFirstRow = data?.splice(1)
        return dataWithoutFirstRow;
    } catch (error) {
        console.error('Cannot fetch from google sheets:', error);
    }
  }
// getTestimonials return a 2d array with the structure [namn, tesimonial, bildId]
export async function getTestimonials(): Promise<string[][] | undefined> {
    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.CONTRIBUTORS_ID,
            range: 'testimonials'
        });
        const data: string[][] | undefined | null = res.data.values
        const dataWithoutFirstRow: string[][] | undefined | null  = data?.splice(1)
        return dataWithoutFirstRow;
    } catch (error) {
        console.error('Cannot fetch from google sheets:', error);
    }
  }
// getSchedule returns a 2d array with time and event [[9:00, gudstjänst], [12:00, lunch]]
export async function getSchedule(): Promise<string[][] | undefined> {
    try {
            const res = await sheets.spreadsheets.values.get({
                spreadsheetId: '1GuBDsm4rXyjMDv5iVf7PnPJZEkAdd4yDi7wzyjFIdiA',
                range: 'dag-1'
            });
            if (res.data.values) {
                const dataWithoutFirstRow =  res.data.values.splice(1);
                return dataWithoutFirstRow;
            }
    } catch (error) {
        console.error('Cannot fetch from google sheets:', error);
    }
  }
// getFaQ returns a 2d array with question and answer [[question, answer], [question, answer]]
export async function getFaQ(): Promise<string[][] | undefined> {
    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.FAQ_ID,
            range: 'Sheet1'
        });
        const data: string[][] | undefined | null = res.data.values
        const dataWithoutFirstRow: string[][] | undefined | null = data?.splice(1)
        return dataWithoutFirstRow;
    } catch (error) {
        console.error('Cannot fetch from google sheets:', error);
    }
  }