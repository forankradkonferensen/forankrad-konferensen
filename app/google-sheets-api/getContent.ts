import { sheets } from './google-auth'

// get general information for the website
type GeneralInformation = {
    datum: string;
    årtal: string;
    klockslag: string;
    bibelord: string;
    bibelRef: string;
    pris: string;
    plats: string;
    adress: string;
};

// We just use one row in the sheet document so we can destruct the information from the arra directly
export async function getGeneralInformation(): Promise<GeneralInformation> {
    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GENERAL_INFO_ID,
            range: 'Sheet1',
        });
        const data: string[][] | undefined | null = res.data.values;
        if (data) {
            const [datum, årtal, klockslag, bibelord, bibelRef, pris, plats, adress] = data[1];
            return {
                datum,
                årtal,
                klockslag,
                bibelord,
                bibelRef,
                pris,
                plats,
                adress
            };
        } else {
            throw new Error('No data found in the spreadsheet.');
        }
    } catch (error) {
        console.error('Cannot fetch from Google Sheets:', error);
        throw error;
    }
}
// testimonials returns a 2d array, each array containing, name, testimonial and image id 
// speakers returns a 2d array, each array containing, name, lastname, event and image id 
export async function getSpeakersAndTestimonials(): Promise<{ testimonials: string[][] | undefined, speakers: string[][] | undefined }> {
    try {
        const res = await sheets.spreadsheets.values.batchGet({
            spreadsheetId: process.env.CONTRIBUTORS_ID,
            ranges: ['testimonials', 'talare'],
        });
        const testimonialsData: string[][] | undefined = res.data.valueRanges?.[0].values?.splice(1);
        const speakersData: string[][] | undefined = res.data.valueRanges?.[1].values?.splice(1);

        return { testimonials: testimonialsData, speakers: speakersData };
    } catch (error) {
        console.error('Cannot fetch from Google Sheets:', error);
        return { testimonials: undefined, speakers: undefined };
    }
}
// getSchedule returns a 2d array with time and event [[9:00, gudstjänst], [12:00, lunch]]
export async function getSchedule(): Promise<string[][] | undefined> {
    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SCHEDULE_ID,
            range: 'Sheet1',
        });
            const dataWithoutFirstRow = res.data?.values?.splice(1);
            return dataWithoutFirstRow;
    } catch (error) {
        console.error('Cannot fetch from google sheets:', error);
    }
}
// getFaQ returns a 2d array with question and answer [[question, answer], [question, answer]]
export async function getFaQ(): Promise<string[][] | undefined> {
    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.FAQ_ID,
            range: 'Sheet1',
        });
        const data: string[][] | undefined | null = res.data.values;
        const dataWithoutFirstRow: string[][] | undefined | null = data?.splice(1);
        return dataWithoutFirstRow;
    } catch (error) {
        console.error('Cannot fetch from google sheets:', error);
    }
}
// getWorkshopsAndSeminars().workshops or .seminars return 2d array of  [seminar/workshop, leader/speaker]
export async function getWorkshopsAndSeminars(): Promise<{ workshops: string[][] | undefined, seminars: string[][] | undefined }> {
    try {
        const res = await sheets.spreadsheets.values.batchGet({
            spreadsheetId: process.env.ACTIVITIES,
            ranges: ['workshops', 'seminarier'],
        });
        const workshopsData: string[][] | undefined = res.data.valueRanges?.[0].values?.splice(1);
        const seminarsData: string[][] | undefined = res.data.valueRanges?.[1].values?.splice(1);

        return { workshops: workshopsData, seminars: seminarsData };
    } catch (error) {
        console.error('Cannot fetch from Google Sheets:', error);
        return { workshops: undefined, seminars: undefined };
    }
}
