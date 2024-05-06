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
    formAction: (name: string, lastname: string, email: string) => void
}
const BookingForm: React.FC<action> = ({formAction}) => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: ''
      });

      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
  return (
    <div>
      <form action={ ()=> formAction(formData.name, formData.lastName, formData.email)}>
        <label htmlFor="name">First Name:</label><br />
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /><br />
        
        <label htmlFor="lastName">Last Name:</label><br />
        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required /><br />
        
        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br /><br />
        
        <SubmitButton />
      </form>
    </div>
  )
}

export default BookingForm