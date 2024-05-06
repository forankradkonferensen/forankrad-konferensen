import BookingForm from "../components/BookingForm";
import { EmailTemplate } from "../components/EmailTemplate";
import { bookEvent } from "../google-sheets-api/eventBooking";
import { Resend } from 'resend';

const handleBooking = async (name: string, lastname: string, email: string, ) => {
    'use server'
    try {
        await bookEvent([name, lastname, email, 'nej']);
        await sendEmailBookingConfirmation(email, name); 
    } catch (error) {
        console.error('Failed to book event:', error);
        return new Error('Det gick inte att boka eventet, testa igen om en liten stund');
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
    } catch (err) {
        console.log(err)
        return new Error('Det gick inte att skicka mailet till din epost, testa igen');
    }
}

const Boka = () => {
    return (
        <div>
            <h1>Anmäl</h1>
            <BookingForm formAction={handleBooking}/>
        </div>
    );
}

export default Boka;
