import { Booking } from "../models/Booking";

export interface IHandleBookingIntegration {
    CreateBooking: (
        booking: Booking
    ) => Promise<boolean>;

    CountBookings: () => Promise<number>;

    BookingExist: (property: string, value: string) => Promise<boolean>;
}