'use client'
import { ChangeEvent, useState } from "react";

interface action {
    formAction: (email: string) => void
}
const CancelBookingForm: React.FC<action> = ({formAction}) => {
    const [formData, setFormData] = useState({
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
      <form action={ ()=> formAction(formData.email)}>
        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CancelBookingForm