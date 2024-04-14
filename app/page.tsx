import Image from 'next/image'
import Navbar from './components/Navbar'
import { google } from 'googleapis'
import { getGeneralInformation, getSpeakers, getOrganizers, getSchedule, getFaQ } from './google-sheets-api/getContent'
import SpeakerCard from './components/SpeakerCard';

interface GeneralInfo {
  datum: string;
  om: string;
  tema: string;
  omTema: string;
  bibelord: string;
  fbLänk: string;
}

export default async function Home() {
  const general: GeneralInfo = await getGeneralInformation()
  const speakers = await getSpeakers();
  const organizers = await getOrganizers();
  const faq = await getFaQ()
  const schedule = await getSchedule()
  console.log(schedule)
  return (
    <div>
      <Navbar/>
    <div className='container flex justify-center mt-5'>
    <h1 className='font-bold text-xl text-lime-700'>Info från Google Kalkylark</h1>
    </div>
    <div className='container flex justify-center mt-5'>
      hello
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
