import Image from 'next/image'
import Navbar from './components/Navbar'
import { getGeneralInformation, getSpeakers, getTestimonials, getSchedule, getFaQ } from './google-sheets-api/getContent'
import SpeakerCard from './components/SpeakerCard';

export default async function Home() {
  const general = await getGeneralInformation()
  const {datum, om, tema, omTema, bibelord, bibelRef, pris} = general
  const speakers = await getSpeakers();
  const testimonials = await getTestimonials();
  const faq = await getFaQ()
  const schedule = await getSchedule()
  return (
    <div>
      <Navbar/>
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
        <li>bibelref: {bibelRef}</li>
        <li>pris: {pris}</li>
      </ul>
    </div>
      <div className='container flex flex-wrap justify-center mt-5'>
      {speakers?.map((value, index) => (
          <div className='m-3' key={index}>
             <SpeakerCard namn={value[0]} efternamn={value[1]} titel={value[2]} bildId={value[3]}/>
          </div>
        ))}
      </div>
      <div className='container flex flex-wrap justify-center mt-5'>
      {testimonials?.map((value, index) => (
          <div className='m-3' key={index}>
             <div>
              <h1>{value[0]}</h1>
              <p>{value[1]}</p>
              <Image src={`https://drive.google.com/uc?id=${value[2]}`} alt={`bild på ${value[0]}`} width={100} height={100}/>
             </div>
          </div>
        ))}
      </div>
      <div className='container flex justify-center mt-5 text-lime-800'>
        <h1>Schema</h1>
      </div>
      <div className='flex justify-center'>
        {schedule?.map((value, index) => (
          <div key={index}>
              <span>{value[0]}</span>
              <span>{value[1]}</span>
          </div>
        ))}
      </div>
      <div className='container flex justify-center mt-5 text-lime-800'>
        <h1>Frågor och svar</h1>
      </div>
      <div className='flex justify-center'>
        {faq?.map((value, index) => (
          <div key={index}>
            <span> Question: {value[0]} </span>
            <span> Answer: {value[1]} </span>
          </div>
        ))}
      </div>
    </div>
  )
}
