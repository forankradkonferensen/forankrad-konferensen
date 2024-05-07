'use client'
import { ChangeEvent, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus()
   
    return (
      <button type="submit" disabled={pending}>
        Add
      </button>
    )
  }

interface action {
    bookEventHandeler: (formData: FormData) => Promise<any>
}
const initialState = {
    message: '',
  }
const BookingForm: React.FC<action> = ({bookEventHandeler}) => {
    const [state, formAction] = useFormState(bookEventHandeler, initialState)
  return (
    <div>
      <form action={formAction}>
        <p aria-live="polite" className="sr-only">
            {state?.message}
        </p>

        <label htmlFor="name">First Name:</label><br />
        <input type="text" id="name" name="name" required /><br />
        
        <label htmlFor="lastName">Last Name:</label><br />
        <input type="text" id="lastName" name="lastName" required /><br />
        
        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" required /><br /><br />
        
        <SubmitButton />
      </form>
    </div>
  )
}

export default BookingForm