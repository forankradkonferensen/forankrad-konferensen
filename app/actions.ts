'use server'
import { bookEvent } from "./google-sheets-api/eventBooking";
import { EmailTemplate } from "./components/EmailTemplate";
import { Resend } from 'resend';

export const handleBooking = async (prevState: any, formData: FormData) => {
    const name = formData.get("name")?.toString() ?? "";
    const lastname = formData.get("lastName")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const confirmEmail = formData.get("emailConfirmation")?.toString() ?? "";
    const personalNumber = formData.get("personalNumber")?.toString().trim().replace(\/D/g, "") ?? "";
    const phoneNumber = formData.get("phoneNumber")?.toString() ?? "";
    const denomination = formData.get("denomination")?.toString() ?? "";
    const message = formData.get("message")?.toString() ?? "";
    const approve = formData.get("approve")
    const hasPaied = 'nej'

    if (email !== confirmEmail) {
        return { message: 'Email fälten matchar inte' };
    }
    if(approve !== 'on') {
        return { message: 'Du måste godkänna att vi behandlar dina personuppgifter' };
        }
    if(personalNumber.length !== 12) {
        return { message: 'Personnummret borde vara i detta format: 199507120000' };
    }
    try {
        const book = await bookEvent([name, lastname, personalNumber, email, phoneNumber, denomination, message, hasPaied]);
        if(book instanceof Error) {
         if(book.message === 'fullbokat') {
                return { message: 'Ledsen det finns inga platser lediga just nu' };
            }
         if(book.message === 'server') {
                return {message: 'Det gick inte att boka just nu, testa igen om en liten stund'}
            }
        }
        const sendEmail = await sendEmailBookingConfirmation(email, name); 
        if(sendEmail instanceof Error) {
            return { message: 'Vi kunde inte skicka ett email till dig, Försök igen eller kontakta oss på forankradkonferensen@gmail.com' };        
        }
        if(book instanceof Error) {
            if(book.message === 'dubbelbokning') {
                return { message: 'Du har redan påbörjat en bokning! Vi skickar ett nytt mail till dig så du kan sluföra bokningen..' };
            }
        } 
        return {message: 'Tack, kolla din email för att slutföra bokningen!'}
    } catch (error) {
        console.error('Failed to book event:', error);
            return { message: 'Det gick inte att boka eventet, testa igen om en liten stund' };
    }
}

export const sendEmailBookingConfirmation = async (email: string, name: string) => {
    const resend = new Resend(process.env.RESENDKEY);
    try {
        const data = await resend.emails.send({
            from: 'Förankrad Konferensen <noreply@forankradkonferensen.se>',
            to: [email],
            subject: 'Slutför bokning',
            react: EmailTemplate({ firstName: name }) as React.ReactElement,
        })
        if(data.error) {
            return new Error()
        }
    } catch (err) {
        console.log(err)
        return new Error();
    }
}