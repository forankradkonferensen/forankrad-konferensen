import { Booking } from "../models/Booking";
import { ServiceResult } from "../models/ServiceResult";

export interface IBookEvent {
    BookEvent: (
        booking: Booking
    ) => Promise<ServiceResult>
}