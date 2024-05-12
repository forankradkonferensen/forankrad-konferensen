import Image from 'next/image'
import Navbar from './components/Navbar'
import Banner from "./components/Banner"
import { getGeneralInformation, getSpeakersAndTestimonials, getSchedule, getFaQ, getWorkshopsAndSeminars } from './google-sheets-api/getContent'
import SpeakerCard from './components/SpeakerCard';
import Faq from './components/Faq';

export const revalidate = 0

export default async function Home() {
  const general = await getGeneralInformation()
  const { datum, om, tema, omTema, bibelord, bibelRef, pris, plats } = general
  const testimonials = (await getSpeakersAndTestimonials()).testimonials;
  const speakers = (await getSpeakersAndTestimonials()).speakers;
  const faq = await getFaQ()
  const schedule = await getSchedule()
  const workshopsAndSeminars = await getWorkshopsAndSeminars();

  return (
    <div>
      <Navbar />
      <Banner title={datum} text={plats} buttonText="Anmäl dig" />
      <div className='bg-black px-40 py-24 w-full flex flex-row'> {/* Information om vad konferensen står för */}
        <div>
          <h1 className='text-3xl py-5'>En konferens för dig som är ung vuxen</h1>
          <h4 className='text-xl'>Förankrad är en dag som arrangeras av Pingstkyrkan Västra Frölunda och Ung Vuxen Pingst. En dag för dig som är i åldern 18-35 att bli Utrustad, Uppmuntrad & Utmanad</h4>
        </div>
        <div className='w-10/12'></div>
      </div>
      <Banner text={bibelord} bibleRef={bibelRef} />
      <div className='bg-lightBlue'> {/* Kommentarer */}
        <div>
          <h4 className='text-black text-xl text-center'>&ldquo;Jag ser fram emot...&rdquo;</h4>
          <p className='text-black text-center'>- Emanuel</p>
        </div>
        <div>
          {/* Lägg till bild  */}
        </div>
      </div>
      <div className='bg-black px-40 py-16 w-full'> {/* Temat för konferensen */}
        <h1 className='text-2xl text-center'>Temat för dagen är <span className='underline decoration-1 underline-offset-2'>Förankrad</span>. Vad innebär det att...</h1>
      </div>
      <Banner buttonHref='https://www.instagram.com/forankradkonferensen/' buttonText='Följ Förankrad på Instagram' />
      <div className="bg-black px-40 py-24 w-full"> {/* Schema */}
        <h1 className='text-3xl text-center pb-10'>Program för dagen</h1>
        <div className='text-lg text-center'>
          {schedule?.map((value, index) => (
            <div key={index}>
              <span>{value[0]} {value[1]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className='bg-brown px-40 py-24 w-full'> {/* Kostnad för konferensen */}
        <h1 className='text-3xl text-center pb-10'>Pris</h1>
        <h4 className='text-xl text-center'>280 kr för hela dagen</h4>
        <p className='text-center p-1 text-xs'>(inkl. frukost, lättlunch & middag)</p>
      </div>
      <div className='bg-black px-40 py-24 w-full'> {/* Seminarier & Workshops */}
        <div className='pb-10'>
          <h1 className='text-3xl text-center pb-10'>Seminarier</h1>
          {workshopsAndSeminars.seminars?.map((seminar, index) => ( 
            <p key={index} className='font-extralight p-1'>{seminar[0]} - {seminar[1]}</p>
          ))}
        </div>
        <div>
          <h1 className='text-3xl text-center pb-10'>Workshops</h1>
          {workshopsAndSeminars.workshops?.map((seminar, index) => ( 
            <p key={index} className='font-extralight p-1'>{seminar[0]} - {seminar[1]}</p>
          ))}
        </div>
      </div>
      <div className='bg-black px-40 py-24 w-full'> {/* Vanliga frågor/FAQ */}
        <h1 className='text-3xl text-center pb-10'>Vanliga frågor</h1>
        <div className='container'>
          {faq?.map((value, index) => (
            <div className='mx-auto w-full max-w-md' key={index}>
              <Faq question={value[0]} answer={value[1]} />
            </div>
          ))}
        </div>
      </div>
      <div className='bg-black px-40 py-24 w-full flex flex-col'> {/* Kontakta oss Mail */}
        <h1 className='text-3xl text-center pb-5'>Kontakta oss</h1>
        <a className='text-xl flex justify-center underline decoration-1 underline-offset-4' href="forankradkonferensen@gmail.com">forankradkonferensen@gmail.com</a>
      </div>
    </div>
  )
}
