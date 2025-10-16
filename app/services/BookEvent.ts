import { EmailTemplate } from "../components/EmailTemplate";
import { IBookEvent } from "../interfaces/IBookEvent";
import { IHandleBookingIntegration } from "../interfaces/IHandleBookingIntegration";
import { ISendEmail } from "../interfaces/ISendEmail";
import { Booking } from "../models/Booking";
import { ServiceResult } from "../models/ServiceResult";

export class BookEvent implements IBookEvent {

    private maximumNumberOfPossibleEventAttendees = 300;
    private handleBookingIntegrtation: IHandleBookingIntegration;
    private emailService: ISendEmail;

    public constructor(integration: IHandleBookingIntegration, emailService: ISendEmail) {
        this.handleBookingIntegrtation = integration;
        this.emailService = emailService;
    }

    public async BookEvent(
        booking: Booking
    ) : Promise<ServiceResult> {
        if(!this.AvaileblePlacesExist())
            return new ServiceResult(false, "Tyvärr finns det inga platser lediga just nu.")

        if(await this.BookingAlreadyExist(booking.personalNumber)) {
            return new ServiceResult(false, "Du har redan påbörjat en bokning!")
        }

        const result = await this.handleBookingIntegrtation.CreateBooking(booking)
            
        if(!result)
            new ServiceResult(false, "Bokningen misslyckades, försök igen om en stund eller kontakta oss.")

        const reactEmailContent = EmailTemplate({ firstName: booking.firstName }) as React.ReactElement;

        const emailSentSuccessfully: boolean = await this.emailService.Send(
            'Förankrad Konferensen <noreply@forankradkonferensen.se>',
            [booking.email],
            'Slutför bokning',
            reactEmailContent 
            )

        return new ServiceResult(true, "Bokingen slutfördes, Vänligen titta din email.")
    }

    private async AvaileblePlacesExist() : Promise<boolean> {
        const bookingsCount: number = await this.handleBookingIntegrtation.CountBookings();
        return bookingsCount < this.maximumNumberOfPossibleEventAttendees;
    }

    private BookingAlreadyExist(personalNumber: string): Promise<boolean> {
        return this.handleBookingIntegrtation.BookingExist("PersonalNumber", personalNumber)
    }
}