'use server';
import { NotionHandleBooking } from "../integrations/notion-integration/NotionHandleBooking";
import { ResendEmailIntegration } from "../integrations/resend-integration/ResendEmailIntegration";
import { IBookEvent } from "../interfaces/IBookEvent";
import { IHandleBookingIntegration } from "../interfaces/IHandleBookingIntegration";
import { ISendEmail } from "../interfaces/ISendEmail";
import { ISendEmailIntegration } from "../interfaces/ISendEmailIntegration";
import { Booking } from "../models/Booking";
import { BookEvent } from "../services/BookEvent";
import { SendEmail } from "../services/SendEmail";

export const bookingAction = async (prevState: any, formData: FormData) => {
    const firstname = formData.get('firstName')?.toString() ?? '';
    const lastName = formData.get('lastName')?.toString() ?? '';
    const personalNumber = formData.get('personalNumber')?.toString().trim() ?? '';
    const address = formData.get('address')?.toString() ?? '';
    const postCode = formData.get('postCode')?.toString() ?? '';
    const city = formData.get('city')?.toString() ?? '';
    const email = formData.get('email')?.toString() ?? '';
    const confirmEmail = formData.get('emailConfirmation')?.toString() ?? '';
    const phoneNumber = formData.get('phoneNumber')?.toString().trim() ?? '';
    const church = formData.get('church')?.toString() ?? '';
    const message = formData.get('message')?.toString() ?? '';
    const approve = formData.get('approve');
    const hasPaid = false;

    if (email !== confirmEmail) 
        return { message: 'Email fälten matchar inte' };
    if (approve !== 'on') 
        return { message: 'Du måste godkänna att vi behandlar dina personuppgifter' };
    
    if (personalNumber.length !== 13 || personalNumber[8] !== '-') 
        return { message: 'Personnumret borde vara i detta format: xxxxxxxx-xxxx' };
    
    if (phoneNumber.length !== 12 || phoneNumber[0] !== '+') 
        return { message: 'telefonnumret måste vara i detta formatet +46xxxxxxxxx' };

    const booking = new Booking(firstname, lastName, personalNumber, address, postCode, city, email, phoneNumber, church, message, hasPaid)

    // If you want to exchange notion for another provider just create a new integration and change the instance
    const handlebookingIntegration: IHandleBookingIntegration = new NotionHandleBooking();
    const sendEmailIntegration: ISendEmailIntegration = new ResendEmailIntegration();
    const sendEmailService: ISendEmail = new SendEmail(sendEmailIntegration);
    const bookEvent: IBookEvent = new BookEvent(handlebookingIntegration, sendEmailService);
    const result = await bookEvent.BookEvent(booking);

    return {message: result.message}
    
}