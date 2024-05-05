import BookingForm from "../components/BookingForm";
import { bookEvent } from "../google-sheets-api/eventBooking";

const handleBooking = async (name: string, lastname: string, email: string, ) => {
    'use server'
    try {
        await bookEvent([name, lastname, email, 'nej']);
    } catch (error) {
        console.error('Failed to book event:', error);
    }
}

const Boka = () => {
    return (
        <div>
            Anmäl
            <BookingForm formAction={handleBooking}/>
        </div>
    );
}

export default Boka;
