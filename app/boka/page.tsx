import BookingForm from "../components/BookingForm";
import { EmailTemplate } from "../components/EmailTemplate";
import { bookEvent } from "../google-sheets-api/eventBooking";
import { Resend } from 'resend';

const handleBooking = async (prevState: any, formData: FormData) => {
    'use server'
    const name = formData.get("name")?.toString()?? "";
    const lastname = formData.get("lastName")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const confirmEmail = formData.get("emailConfirmation")?.toString() ?? "";

    if (email !== confirmEmail) {
        return { message: 'Email fälten matchar inte' };
    }
    try {
        const book = await bookEvent([name, lastname, email, 'nej']);
        const sendEmail = await sendEmailBookingConfirmation(email, name); 
        if(book instanceof Error) {
            if(book.message === 'fullbokat') {
                return { message: 'Ledsen det finns inga platser kvar' };
            }
        }
        if(sendEmail instanceof Error) return { message: 'Vi kunde inte skicka ett email till dig men kontakta oss så löser vi det' };

        return {message: 'Tack, kolla din email för att slutföra bokningen'}
    } catch (error) {
        console.error('Failed to book event:', error);
            return { message: 'Det gick inte att boka eventet, testa igen om en liten stund' };
    }
}

const sendEmailBookingConfirmation = async (email: string, name: string) => {
    'use server'
    const resend = new Resend(process.env.RESENDKEY);
    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: 'Slutför bokning',
            react: EmailTemplate({ firstName: name, price: '250'}) as React.ReactElement,
        })
        if(!data) return {message: 'det gick inte skicka ett mail till dig'}
    } catch (err) {
        console.log(err)
        return {message: 'Det gick inte att skicka mailet till din epost, testa igen'};
    }
}

const Boka = () => {
    return (
        <div>
            <h1>Anmäl</h1>
            <BookingForm bookEvent={handleBooking}/>
        </div>
    );
}

export default Boka;