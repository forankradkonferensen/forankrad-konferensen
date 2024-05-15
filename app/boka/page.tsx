import BookingForm from "../components/BookingForm";
import { EmailTemplate } from "../components/EmailTemplate";
import { bookEvent } from "../google-sheets-api/eventBooking";
import { Resend } from 'resend';

const handleBooking = async (prevState: any, formData: FormData) => {
    'use server'
    const name = formData.get("name")?.toString() ?? "";
    const lastName = formData.get("lastName")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const confirmEmail = formData.get("emailConfirmation")?.toString() ?? "";

    if (email !== confirmEmail) {
        return { message: 'Email fälten matchar inte' };
    }
    try {
        const book = await bookEvent([name, lastName, email, 'nej']);
        if (book instanceof Error) {
            if (book.message === 'fullbokat') {
                return { message: 'Ledsen det finns inga platser lediga just nu' };
            }
            if (book.message === 'server') {
                return { message: 'Det gick inte att boka just nu, testa igen om en liten stund' }
            }
        }
        const sendEmail = await sendEmailBookingConfirmation(email, name);
        if (sendEmail instanceof Error) {
            return { message: 'Vi kunde inte skicka ett email till dig, kontakta oss så hjälper vi dig!' };
        }
        if (book instanceof Error) {
            if (book.message === 'dubbelbokning') {
                return { message: 'Du har redan påbörjat en bokning! Vi skickar ett nytt mail till dig så du kan sluföra bokningen..' };
            }
        }
        return { message: 'Tack, kolla din email för att slutföra bokningen!' }
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
            from: 'Förankrad Konferensen <noreply@forankradkonferensen.se>',
            to: [email],
            subject: 'Slutför bokning',
            react: EmailTemplate({ firstName: name, price: '270' }) as React.ReactElement,
        })
        if (data.error) {
            return new Error()
        }
    } catch (err) {
        console.log(err)
        return new Error();
    }
}

const Boka = () => {
    return (
        <div>
            <h1>Anmäl</h1>
            <BookingForm bookEvent={handleBooking} />
        </div>
    );
}

export default Boka;