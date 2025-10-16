import { Guid } from "../services/Guid";

export class Booking {
    readonly id = Guid.newGuid()
    firstName: string;
    lastName: string;
    personalNumber: string;
    address: string;
    postCode: string;
    city: string;
    email: string;
    phoneNumber: string;
    church: string;
    message: string;
    hasPaid: boolean;

    constructor(
        firstName: string,
        lastName: string,
        personalNumber: string,
        address: string,
        postCode: string,
        city: string,
        email: string,
        phoneNumber: string,
        church: string,
        message: string,
        hasPaid: boolean
        ) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.personalNumber = personalNumber;
            this.address = address;
            this.postCode = postCode;
            this.city = city;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.church = church;
            this.message = message;
            this.hasPaid = hasPaid;
    }    
}