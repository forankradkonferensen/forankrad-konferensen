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

          <p>
            {state?.message}
          </p>
        
        <SubmitButton />

      </form>
    </div>
  )
}

export default BookingForm