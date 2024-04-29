import Image from 'next/image'
import Navbar from './components/Navbar'
import Banner from "./components/Banner"
import { getGeneralInformation, getSpeakers, getTestimonials, getSchedule, getFaQ } from './google-sheets-api/getContent'
import SpeakerCard from './components/SpeakerCard';
import Faq from './components/Faq';

export const revalidate = 0

export default async function Home() {
  const general = await getGeneralInformation()
  const { datum, om, tema, omTema, bibelord, bibelRef, pris, plats } = general
  const speakers = await getSpeakers();
  const testimonials = await getTestimonials();
  const faq = await getFaQ()
  const schedule = await getSchedule()
  return (
    <div>
      <Navbar />
      <Banner title={datum} text={plats} />
      <div className='bg-black p-40 w-full flex flex-row'> {/* Information om vad konferensen står för */}
        <div><h1 className='text-3xl py-5'>En konferens för dig som är ung vuxen</h1>
          <h4 className='text-xl'>Förankrad är en dag som arrangeras av Pingstkyrkan Västra Frölunda och Ung Vuxen Pingst. En dag för dig som är i åldern 18-35 att bli Utrustad, Uppmuntrad & Utmanad</h4>
        </div>
        <div className='w-2/3'></div>
      </div>
      <Banner text={bibelord} bibleRef={bibelRef} />
      <h1 className='text-3xl text-center'></h1>
      <div className="bg-black p-40 w-full">
        <h1 className='text-3xl text-center p-10'>Program för dagen</h1>
        <div className='text-lg text-center'>
          {schedule?.map((value, index) => (
            <div key={index}>
              <span>{value[0]} {value[1]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className='container flex justify-center mt-5'>
        <h1 className='font-bold text-xl text-lime-700'>Info från Google Kalkylark</h1>
      </div>
      <div className='container flex justify-center mt-5 text-lime-800'>
        <h1>General Info</h1>
      </div>
      <div className='container flex justify-center mt-5'>

        <ul>
          <li>datum: {datum}</li>
          <li>Om: {om}</li>
          <li>tema: {tema}</li>
          <li>om temat: {omTema}</li>
          <li>bibelord: {bibelord}</li>
          <li>bibelRef: {bibelRef}</li>
          <li>pris: {pris}</li>
        </ul>
      </div>
      <div className='container flex flex-wrap justify-center mt-5'>
        {speakers?.map((value, index) => (
          <div className='m-3' key={index}>
            <SpeakerCard namn={value[0]} efternamn={value[1]} titel={value[2]} bildId={value[3]} />
          </div>
        ))}
      </div>
      <div className='container flex flex-wrap justify-center mt-5'>
        {testimonials?.map((value, index) => (
          <div className='m-3' key={index}>
            <div>
              <h1>{value[0]}</h1>
              <p>{value[1]}</p>
              <Image src={`https://drive.google.com/uc?id=${value[2]}`} alt={`bild på ${value[0]}`} width={100} height={100} />
            </div>
          </div>
        ))}
      </div>
      <div className='container flex justify-center mt-5 text-lime-800'>
        <h1>Schema</h1>
      </div>

      <div className='container flex justify-center mt-5 text-lime-800'>
        <h1>Frågor och svar</h1>
      </div>
      <div className='container'>
        {faq?.map((value, index) => (
          <div className='mx-auto w-full max-w-md' key={index}>
            <Faq question={value[0]} answer={value[1]} />
          </div>
        ))}
      </div>
    </div>
  )
}
