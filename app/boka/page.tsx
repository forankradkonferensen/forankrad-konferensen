import BookingForm from "../components/BookingForm";
import { EmailTemplate } from "../components/EmailTemplate";
import { bookEvent } from "../google-sheets-api/eventBooking";
import { Resend } from 'resend';
import Navbar from "../components/Navbar"

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
            react: EmailTemplate({ firstName: name }) as React.ReactElement,
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
            <Navbar />
            <div className='bg-black px-48 py-24 w-full'>
                <h1 className="text-3xl pb-1 font-light text-whiteShade">Anmälan</h1>
                <p className="text-sm pb-5 font-light text-whiteShade">Hej! vad kul att du kommer på konferensen Förankrad! Vi längtar efter att göra den här dagen tillsammans med dig och Gud! Vi tror och ber att den här dagen ska få dra oss närmare varandra och Honom som förtjänar all ära! Samla dina vänner så ses vi den 28e september!</p>
                <p className="text-sm font-light text-whiteShade">Dagen kostar 270 kr (inkl brunch, lunch och kvällsmat)</p>
                <p className="text-sm font-light text-whiteShade">Anmälan är bindande. Du kommer att få ett bekräftelsemejl med betalningsinformation.</p>
                <p className="text-sm font-light text-whiteShade italic pb-5">Dyker man inte upp, fakturerar vi i efterhand.</p>
                <BookingForm bookEvent={handleBooking} />
            </div>
        </div>
    );
}

export default Boka;