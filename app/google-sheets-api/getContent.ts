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

export async function getGeneralInformation(): Promise<GeneralInformation> {
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
    const sheets = google.sheets({ version: 'v4', auth });
    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GENERAL_INFO_ID,
            range: 'Sheet1'
        });
        const data = res.data.values
        if(!data) console.log('no data in google spread sheets')
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
    } catch (error) {
        console.error('Cannot fetch from google sheets:', error);
    }
  }

// getSpeakers
export async function getSpeakers() {
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
    const sheets = google.sheets({ version: 'v4', auth });
    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.CONTRIBUTORS_ID,
            range: 'talare'
        });
        const data = res.data.values
        const dataWithoutFirstRow = data?.splice(1)
        return dataWithoutFirstRow;
    } catch (error) {
        console.error('Cannot fetch from google sheets:', error);
    }
  }

// getTestimonials
export async function getTestimonials() {
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
    const sheets = google.sheets({ version: 'v4', auth });
    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.CONTRIBUTORS_ID,
            range: 'testimonials'
        });
        const data = res.data.values
        const dataWithoutFirstRow = data?.splice(1)
        return dataWithoutFirstRow;
    } catch (error) {
        console.error('Cannot fetch from google sheets:', error);
    }
  }

// getSchedule
type Schedule = {
    [key: string]: Array<Array<string>>;
  };

export async function getSchedule() {
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
    const sheets = google.sheets({ version: 'v4', auth });
    try {
        const res = await sheets.spreadsheets.get({
            spreadsheetId: process.env.SCHEDULE_ID,
        });
        const allSheets: any = res.data.sheets
        if(!allSheets) return new Error('plaese add a schedule in google sheets')

        const scheduleObj: Schedule = {}
        for(let i = 0; i < allSheets.length; i++) {
            const sheetTitle = allSheets[i].properties?.title
            if(!sheetTitle) return new Error('Please name all sheets in google sheets')  
            const res = await sheets.spreadsheets.values.get({
                spreadsheetId: '1GuBDsm4rXyjMDv5iVf7PnPJZEkAdd4yDi7wzyjFIdiA',
                range: sheetTitle
            });
            scheduleObj[sheetTitle] = res.data.values?.splice(1)
        }
        return scheduleObj;
    } catch (error) {
        console.error('Cannot fetch from google sheets:', error);
    }
  }

// getFaQ
export async function getFaQ() {
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
    const sheets = google.sheets({ version: 'v4', auth });
    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.FAQ_ID,
            range: 'Sheet1'
        });
        const data = res.data.values
        const dataWithoutFirstRow = data?.splice(1)
        return dataWithoutFirstRow;
    } catch (error) {
        console.error('Cannot fetch from google sheets:', error);
    }
  }