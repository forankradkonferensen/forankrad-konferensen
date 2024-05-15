'use server';
import { bookEvent } from './google-sheets-api/eventBooking';
import { EmailTemplate } from './components/EmailTemplate';
import { Resend } from 'resend';

export const handleBooking = async (prevState: any, formData: FormData) => {
    const name = formData.get('name')?.toString() ?? '';
    const lastName = formData.get('lastName')?.toString() ?? '';
    const personalNumber = formData.get('personalNumber')?.toString().trim() ?? '';
    const address = formData.get('address')?.toString() ?? '';
    const zipCode = formData.get('zipCode')?.toString() ?? '';
    const postCode = formData.get('postCode')?.toString() ?? '';
    const email = formData.get('email')?.toString() ?? '';
    const confirmEmail = formData.get('emailConfirmation')?.toString() ?? '';
    const phoneNumber = formData.get('phoneNumber')?.toString().trim() ?? '';
    const denomination = formData.get('denomination')?.toString() ?? '';
    const message = formData.get('message')?.toString() ?? '';
    const approve = formData.get('approve');
    const hasPaid = 'nej';

    if (email !== confirmEmail) {
        return { message: 'Email fälten matchar inte' };
    }
    if (approve !== 'on') {
        return { message: 'Du måste godkänna att vi behandlar dina personuppgifter' };
    }
    if (personalNumber.length !== 12) {
        return { message: 'Personnumret borde vara i detta format: 199507120000' };
    }
    if (phoneNumber.length !== 12 || phoneNumber[0] !== '+') {
        return { message: 'telefonnumret måste vara i detta formatet +46xxxxxxxxx' };
    }
    try {
        const book = await bookEvent([
            name,
            lastName,
            personalNumber,
            address,
            zipCode,
            postCode,
            email,
            phoneNumber,
            denomination,
            message,
            hasPaid,
        ]);
        if (book instanceof Error) {
            if (book.message === 'fullbokat') {
                return { message: 'Ledsen det finns inga platser lediga just nu' };
            }
            if (book.message === 'server') {
                return { message: 'Det gick inte att boka just nu, testa igen om en liten stund' };
            }
        }
        const sendEmail = await sendEmailBookingConfirmation(email, name);
        if (sendEmail instanceof Error) {
            return {
                message:
                    'Vi kunde inte skicka ett email till dig, Försök igen eller kontakta oss på forankradkonferensen@gmail.com',
            };
        }
        if (book instanceof Error) {
            if (book.message === 'dubbelbokning') {
                return {
                    message:
                        'Du har redan påbörjat en bokning! Vi skickar ett nytt mail till dig så du kan slutföra bokningen..',
                };
            }
        }
        return { message: 'Tack, kolla din email för att slutföra bokningen!' };
    } catch (error) {
        console.error('Failed to book event:', error);
        return { message: 'Det gick inte att boka eventet, testa igen om en liten stund' };
    }
};

export const sendEmailBookingConfirmation = async (email: string, name: string) => {
    const resend = new Resend(process.env.RESENDKEY);
    try {
        const data = await resend.emails.send({
            from: 'Förankrad Konferensen <noreply@forankradkonferensen.se>',
            to: [email],
            subject: 'Slutför bokning',
            react: EmailTemplate({ firstName: name }) as React.ReactElement,
        });
        if (data.error) {
            return new Error();
        }
    } catch (err) {
        console.log(err);
        return new Error();
    }
};
