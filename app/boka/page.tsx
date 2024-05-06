import BookingForm from "../components/BookingForm";
import CancelBookingForm from "../components/CancelBookingForm";
import { cancelBooking, bookEvent } from "../google-sheets-api/eventBooking";
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const handleBooking = async (name: string, lastname: string, email: string, ) => {
    'use server'
    try {
        await bookEvent([name, lastname, email, 'nej']);
        await sendEmailBookingConfirmation(email);
        console.log('success')  
    } catch (error) {
        console.error('Failed to book event:', error);
    }
}

const sendEmailBookingConfirmation = async (email: string) => {
    const resend = new Resend(process.env.RESENDKEY);
    try {
        const data = await resend.emails.send({
            from: 'Acme <forankradkonferensen@gmail.com>',
            to: email,
            subject: 'Slutför bokning',
            text: 'för att slutföra bokningen så swisha till nummret nedan'
        })
        console.log('sent')
    } catch (err) {
        console.log(err)
    }
}

const Boka = () => {
    return (
        <div>
            <h1>Anmäl</h1>
            <BookingForm formAction={handleBooking}/>
        </div>
    );
}

export default Boka;
