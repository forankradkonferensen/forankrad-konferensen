'use server'
import { sheets } from './google-auth'

export async function bookEvent(bookingData: string[]) {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.BOOKINGS,
            range: 'Sheet1',
        });
        const rows = response.data.values || [];
        const nonEmptyRows = rows.filter(row => row.length > 0);

        const maxPossibleBookings = 286;
        if (nonEmptyRows.length >= maxPossibleBookings) {
            console.log("Ledsen, det finns inga platser kvar");
            return new Error('fullbokat');
          }
        const personalNumber: string = bookingData[2]
        const personalNumberAlreadyExist = rows.findIndex(row => row.includes(personalNumber));
        if(personalNumberAlreadyExist !== -1) {
           return new Error('dubbelbokning');
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
        return new Error('server');
    }
}
