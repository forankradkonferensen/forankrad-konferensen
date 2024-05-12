import BookingForm from "../components/BookingForm";
import { handleBooking } from "../actions"

const Boka = () => {
    return (
        <div>
            <h1>Anmäl</h1>
            <BookingForm bookEvent={handleBooking}/>
        </div>
    );
}

export default Boka;