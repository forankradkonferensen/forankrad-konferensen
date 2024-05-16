'use client'
import { useFormStatus, useFormState } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button className="btn btn-outline bg-whiteShade text-black w-full max-w-xs my-5" type="submit" disabled={pending}>
      {pending ? "Ett ögonblick..." : "Skicka"}
    </button>
  )
}

interface action {
  bookEvent: (prevState: any, formData: FormData) => Promise<{ message: string; } | undefined>
}
const BookingForm: React.FC<action> = ({ bookEvent }) => {
  const [state, formAction] = useFormState(bookEvent, { message: "" })

  return (
    <div className="flex">
      <form action={formAction}>

        <label className="text-sm font-light text-whiteShade flex p-1" htmlFor="firstName">Förnamn</label>
        <input className="text-sm font-light bg-whiteShade text-black flex input input-bordered w-full max-w-xs" type="text" id="firstName" name="firstName" placeholder="Förnamn" required />

        <label className="text-sm font-light text-whiteShade flex p-1 pt-4" htmlFor="lastName">Efternamn</label>
        <input className="text-sm font-light bg-whiteShade text-black flex input input-bordered w-full max-w-xs" type="text" id="lastName" name="lastName" placeholder="Efternamn" required />

        <label className="text-sm font-light text-whiteShade flex p-1 pt-4" htmlFor="personalNumber">Personnummer (12 siffror)</label>
        <input className="text-sm font-light bg-whiteShade text-black flex input input-bordered w-full max-w-xs" type="text" id="personalNumber" name="personalNumber" placeholder="xxxxxxxx-xxxx" required />

        <label className="text-sm font-light text-whiteShade flex p-1 pt-4" htmlFor="address">Adress</label>
        <input className="text-sm font-light bg-whiteShade text-black flex input input-bordered w-full max-w-xs" type="text" id="address" name="address" placeholder="Diamantgatan 1" required />

        <label className="text-sm font-light text-whiteShade flex p-1 pt-4" htmlFor="zipCode">Postnummer</label>
        <input className="text-sm font-light bg-whiteShade text-black flex input input-bordered w-full max-w-xs" type="number" id="zipCode" name="zipCode" placeholder="12345" required />

        <label className="text-sm font-light text-whiteShade flex p-1 pt-4" htmlFor="postCode">Postort</label>
        <input className="text-sm font-light bg-whiteShade text-black flex input input-bordered w-full max-w-xs" type="text" id="postCode" name="postCode" placeholder="Göteborg" required />

        <label className="text-sm font-light text-whiteShade flex p-1 pt-4" htmlFor="email">Mejladress</label>
        <input className="text-sm font-light bg-whiteShade text-black flex input input-bordered w-full max-w-xs" type="email" id="email" name="email" placeholder="mejladress@domän.se" required />

        <label className="text-sm font-light text-whiteShade flex p-1 pt-4" htmlFor="emailConfirmation">Bekräfta Mejladress</label>
        <input className="text-sm font-light bg-whiteShade text-black flex input input-bordered w-full max-w-xs" type="email" id="emailConfirmation" name="emailConfirmation" placeholder="mejladress@domän.se" required />

        <label className="text-sm font-light text-whiteShade flex p-1 pt-4" htmlFor="phoneNumber">Telefonnummer</label>
        <input className="text-sm font-light bg-whiteShade text-black flex input input-bordered w-full max-w-xs" type="phone" id="phoneNumber" name="phoneNumber" placeholder="+46xxxxxxxxx" required />

        <label className="text-sm font-light text-whiteShade flex p-1 pt-4" htmlFor="denomination">Församling</label>
        <input className="text-sm font-light bg-whiteShade text-black flex input input-bordered w-full max-w-xs" type="text" id="denomination" name="denomination" placeholder="Pingstkyrkan Västra Frölunda" />

        <label className="text-sm font-light text-whiteShade flex p-1 pt-4" htmlFor="message">Meddelande / något speciellt vi behöver veta (ex. allergier):</label>
        <textarea className="text-sm font-light bg-whiteShade text-black flex textarea textarea-bordered w-full max-w-xs" id="message" name="message" placeholder="Jag tål inte nötter..." ></textarea>
        <label className="text-xs font-light text-whiteShade flex p-1 pt-4" htmlFor="approve">Jag godkänner att Pingstkyrkan Västra Frölunda behandlar mina personuppgifter. Det kommer också fotas under helgen i dokumentations- och marknadsföringssyfte. Vill du inte vara med på bild, mejla forankradkonferensen@gmail.com</label>
        <div className="flex items-center">
          <input className="checkbox bg-whiteShade border-2 flex p-1" type="checkbox" id="approve" name="approve" required />
          <label className="text-xs font-light text-whiteShade flex pl-2">Ja</label>
        </div>

        <p>
          {state?.message}
        </p>

        <SubmitButton />

      </form>
    </div>
  )
}

export default BookingForm