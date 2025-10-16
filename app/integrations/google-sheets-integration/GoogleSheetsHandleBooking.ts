import { IHandleBookingIntegration } from "@/app/interfaces/IHandleBookingIntegration";
import { Booking } from "@/app/models/Booking";
import { sheets } from './google-auth'

export class GoogleSheetHandleBooking implements IHandleBookingIntegration
 {
    CreateBooking = async (booking: Booking) => {
        try {
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.BOOKINGS,
                range: 'Sheet1',
            });
            const rows = response.data.values || [];
            const nonEmptyRows = rows.filter(row => row.length > 0);
            const newData = [...nonEmptyRows, [
                booking.firstName,
                booking.lastName,
                booking.personalNumber,
                booking.address,
                booking.postCode,
                booking.city,
                booking.email,
                booking.phoneNumber,
                booking.church,
                booking.message,
                booking.hasPaid
            ]];
            await sheets.spreadsheets.values.update({
                spreadsheetId: process.env.BOOKINGS,
                range: 'Sheet1',
                valueInputOption: 'RAW',
                requestBody: { values: newData },
            });
            return true;
        } catch (error) {
            console.error('Cannot fetch or update google sheets:', error);
            return false;
        }
    };

    CountBookings = async () => {
        try {
            const response = await sheets.spreadsheets.values.get({
                            spreadsheetId: process.env.BOOKINGS,
                            range: 'Sheet1',
                        });
            const rows = response.data.values || [];
            const nonEmptyRows = rows.filter(row => row.length > 0);
            return nonEmptyRows.length
            } catch(error) {
                return -1
            }
        }

    BookingExist = async (property: string, value: string) => {
        try {
            const response = await sheets.spreadsheets.values.get({
                            spreadsheetId: process.env.BOOKINGS,
                            range: 'Sheet1',
                        });
            const rows = response.data.values || [];
            const nonEmptyRows = rows.filter(row => row.length > 0);
            const field: string = value
            const alreadyExist = rows.findIndex(row => row.includes(value));
            return alreadyExist !== -1
            
            } catch(error) {
                return false
            }
        }
    };