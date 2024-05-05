import BookingForm from "../components/BookingForm";
import CancelBookingForm from "../components/CancelBookingForm";
import { cancelBooking, bookEvent } from "../google-sheets-api/eventBooking";

const handleBooking = async (name: string, lastname: string, email: string, ) => {
    'use server'
    try {
        await bookEvent([name, lastname, email, 'nej']);
    } catch (error) {
        console.error('Failed to book event:', error);
    }
}

const handleCancelBooking = async (email: string, ) => {
    'use server'
    try {
        await cancelBooking(email);
    } catch (error) {
        console.error('Failed to book event:', error);
    }
}
const Boka = () => {
    return (
        <div>
            <h1>Anmäl</h1>
            <BookingForm formAction={handleBooking}/>
        <hr />
            <h1>Avboka</h1>
            <CancelBookingForm formAction={handleCancelBooking}/>
        </div>
    );
}

export default Boka;
