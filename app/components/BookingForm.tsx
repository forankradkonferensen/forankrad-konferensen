'use client'
import { ChangeEvent, useState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus()
   
    return (
      <button type="submit" disabled={pending}>
        Add
      </button>
    )
  }

interface action {
    formAction: (formData: FormData) => Promise<any>
}
const BookingForm: React.FC<action> = ({formAction}) => {
    
  return (
    <div>
      <form action={formAction}>
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