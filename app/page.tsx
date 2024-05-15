import Image from 'next/image'
import Navbar from './components/Navbar'
import Banner from "./components/Banner"
import { getGeneralInformation, getSpeakersAndTestimonials, getSchedule, getFaQ, getWorkshopsAndSeminars } from './google-sheets-api/getContent'
import SpeakerCard from './components/SpeakerCard';
import Faq from './components/Faq';

export const revalidate = 0

export default async function Home() {
  const general = await getGeneralInformation()
  const { datum, årtal, klockslag, bibelord, bibelRef, pris, plats, adress } = general
  const testimonials = (await getSpeakersAndTestimonials()).testimonials;
  const speakers = (await getSpeakersAndTestimonials()).speakers;
  const faq = await getFaQ()
  const schedule = await getSchedule()
  const workshopsAndSeminars = await getWorkshopsAndSeminars();

  return (
    <div>
      <Navbar />
      <Banner title={datum + ' ' + årtal} text={plats} buttonHref='/boka' buttonText="Anmäl dig" image='/logo.svg' />
      <div className='bg-black px-48 py-24 w-full flex flex-row'> {/* Information om vad konferensen står för */}
        <div>
          <h1 className='text-4xl pb-5 font-medium'>En konferens för dig som är ung vuxen</h1>
          <h4 className='text-2xl pb-10'>Förankrad är en dag som arrangeras av Pingstkyrkan Västra Frölunda och Ung Vuxen Pingst. En dag för dig att bli Utrustad, Uppmuntrad & Utmanad.</h4>
          <h4 className='text-2xl pb-10'>Vi ser fram emot go gemenskap med varandra, undervisning, samtal, workshops och tid med Gud! Varmt välkommen!</h4>
          <h4 className='text-2xl'>Varmt välkommen!</h4>
        </div>
        <div className='w-11/12'></div>
      </div>
      <Banner text={bibelord} bibleRef={bibelRef} />
      <div className='bg-black px-48 py-24 w-full'> {/* Information om konferensen */}
        <h1 className='text-4xl pb-5 font-medium'>När?</h1>
        <h4 className='text-2xl pb-5'>{datum} kl {klockslag}</h4>
        <h1 className='text-4xl pb-5 font-medium'>Var?</h1>
        <h4 className='text-2xl pb-2'>{plats}</h4>
        <h4 className='text-2xl pb-5'>{adress}</h4>
        <h1 className='text-4xl pb-5 font-medium'>Vem?</h1>
        <h4 className='text-2xl'>Konferensen riktar sig till dig som är mellan 19-35 år.</h4>
      </div>
      <div className='bg-brown px-48 py-24 w-full'> {/* Kostnad för konferensen */}
        <h1 className='text-3xl text-center pb-8 font-medium'>Pris</h1>
        <h4 className='text-xl text-center pb-8 font-medium'>{pris} kr för hela dagen</h4>
        <p className='text-center text-xs'>I priset ingår brunch, lättlunch & middag</p>
        <p className='text-center text-xs'>Anmälan är bindande</p>
      </div>
      <Banner buttonHref='https://www.instagram.com/forankradkonferensen/' buttonText='Följ Förankrad på Instagram' />
      <div className="bg-black px-48 py-24 w-full"> {/* Schema */}
        <h1 className='text-3xl text-center pb-8 font-medium'>Program för dagen</h1>
        <div className='text-lg text-center font-medium'>
          {schedule?.map((value, index) => (
            <div key={index}>
              {/* event and time in array */}
              <span>{value[0]} {value[1]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className='bg-black px-48 w-full'>
        <h1 className='text-3xl text-center pb-8 font-medium'>Talare</h1>
        <div className='flex'>
          {speakers?.map((speaker, index) => (
            <div key={index}>
              <SpeakerCard namn={speaker[0]} efternamn={speaker[1]} tillfälle={speaker[2]} bildId={speaker[3]}/>
            </div>
          ))
          }
        </div>
      </div>
      <div className='bg-black px-48 py-24 w-full'> {/* Vanliga frågor/FAQ */}
        <h1 className='text-3xl text-center pb-8 font-medium'>Vanliga frågor</h1>
        <div className='container'>
          {faq?.map((value, index) => (
            <div className='mx-auto w-full max-w-md' key={index}>
              {/* question and answer in array */}
              <Faq question={value[0]} answer={value[1]} />
            </div>
          ))}
        </div>
      </div>
      <div className='bg-black px-48 py-24 w-full flex flex-col'> {/* Kontakta oss Mail */}
        <h1 className='text-3xl text-center p-1 font-medium'>Kontakta oss</h1>
        <a className='text-xl flex justify-center underline decoration-1 underline-offset-4' href="forankradkonferensen@gmail.com">forankradkonferensen@gmail.com</a>
      </div>
      <div>
        <p className='bg-black px-48 py-2 text-sm font-extralight'>Hemsida skapad av: Emanuel Gustafzon och Simon Michael</p>
      </div>
    </div>
  )
}
