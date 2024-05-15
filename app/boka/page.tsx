import BookingForm from "../components/BookingForm";
import { EmailTemplate } from "../components/EmailTemplate";
import { bookEvent } from "../google-sheets-api/eventBooking";
import { Resend } from 'resend';
import Navbar from "../components/Navbar"
import { handleBooking } from "../actions";

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