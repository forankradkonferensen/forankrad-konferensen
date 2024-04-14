import { google } from 'googleapis'

// getGeneralInformation
type GeneralInformation = {
    datum: string;
    om: string;
    tema: string;
    omTema: string;
    bibelord: string;
    bibelRef: string;
    pris: string;
};

export async function getGeneralInformation(): Promise<GeneralInformation | undefined> {
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
    const sheets = google.sheets({ version: 'v4', auth });
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
        }
    } catch (error) {
        console.error('Cannot fetch from google sheets:', error);
    }
  }

// getSpeakers return a 2d array with the structure of [namn, efternamn, titel, bildId]
export async function getSpeakers(): Promise<string[][] | undefined> {
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
    const sheets = google.sheets({ version: 'v4', auth });
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
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
    const sheets = google.sheets({ version: 'v4', auth });
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

// getSchedule returns a object with day and a 2d array with time and event
// {
//     'Fredag': [[tid, händelse], [tid, händelse]],
//     'Lördag': [[tid, händelse], [tid, händelse]]
// }
type Schedule = {
    [key: string]: Array<Array<string>>;
  };

export async function getSchedule(): Promise<Schedule | undefined> {
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
    const sheets = google.sheets({ version: 'v4', auth });
    try {
        const res = await sheets.spreadsheets.get({
            spreadsheetId: process.env.SCHEDULE_ID,
        });
        const allSheets: any = res.data.sheets
        const scheduleObj: Schedule = {}
        for(let i = 0; i < allSheets.length; i++) {
            const sheetTitle: string = allSheets[i].properties?.title
            const res = await sheets.spreadsheets.values.get({
                spreadsheetId: '1GuBDsm4rXyjMDv5iVf7PnPJZEkAdd4yDi7wzyjFIdiA',
                range: sheetTitle
            });
            if (res.data.values) {
                scheduleObj[sheetTitle] = res.data.values.splice(1);
                return scheduleObj;
            }
        }
    } catch (error) {
        console.error('Cannot fetch from google sheets:', error);
    }
  }

// getFaQ returns a 2d array with question and answer [[question, answer], [question, answer]]
export async function getFaQ(): Promise<string[][] | undefined> {
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
    const sheets = google.sheets({ version: 'v4', auth });
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