'use client'
import { useFormStatus, useFormState  } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus()
   
    return (
      <button type="submit" disabled={pending}>
        {pending ? "Ett ögonblick..." : "Boka"}
      </button>
    )
  }

interface action {
    bookEvent: (prevState: any, formData: FormData) => Promise<{ message: string; } | undefined>
}
const BookingForm: React.FC<action> = ({bookEvent}) => {
    const [state, formAction] = useFormState(bookEvent, {message: ""})
    
  return (
    <div>
      <form action={formAction}>
         
        <label htmlFor="name">First Name:</label><br />
        <input type="text" id="name" name="name" required /><br />
        
        <label htmlFor="lastName">Last Name:</label><br />
        <input type="text" id="lastName" name="lastName" required /><br />
        
        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" required /><br /><br />

        <label htmlFor="emailConfirmation">Bekräfta Email:</label><br />
        <input type="email" id="emailConfirmation" name="emailConfirmation" required /><br /><br />

        <label htmlFor="personalNumber">Personnummer:</label><br />
        <input type="number" placeholder="199507120000" id="personalNumber" name="personalNumber" required /><br /><br />

        <label htmlFor="phoneNumber">Telefonnummer:</label><br />
        <input type="phone"  id="phoneNumber" name="phoneNumber" required /><br /><br />

        <label htmlFor="denomination">Församling:</label><br />
        <input type="text" id="denomination" name="denomination" /><br /><br />

        <label htmlFor="message">Meddelande / något speciellt vi behöver veta (ex. allergier):</label><br />
        <input type="text-area" id="message" name="message" /><br /><br />

        <label htmlFor="approve">Jag godkänner att Pingstkyrkan Västra Frölunda behandlar mina personuppgifter. Det kommer också fotas under helgen i dokumentations- och marknadsföringssyfte. Vill du inte vara med på bild, mejla forankradkonferensen@gmail.com</label><br />
        <input type="checkbox" id="approve" name="approve" required /><br /><br />

          <p>
            {state?.message}
          </p>
        
        <SubmitButton />

      </form>
    </div>
  )
}

export default BookingForm