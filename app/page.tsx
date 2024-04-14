import Image from 'next/image'
import Navbar from './components/Navbar'
import { google } from 'googleapis'
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
    <div className='container flex justify-center mt-5'>
      <ul>
        <li>datum: {datum}</li>
        <li>Om: {om}</li>
        <li>tema: {tema}</li>
        <li>om temat: {omTema}</li>
        <li>bibelord: {bibelord}</li>
      </ul>
    </div>
      <div className='container flex flex-wrap justify-center mt-5'>
      {speakers?.map((value, index) => (
          <div className='m-3' key={index}>
             <SpeakerCard namn={value[0]} efternamn={value[1]} titel={value[2]} bildId={value[3]}/>
          </div>
        ))}
      </div>
    </div>
  )
}
