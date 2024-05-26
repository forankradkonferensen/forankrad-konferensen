import { Suspense } from 'react';
import dynamic from 'next/dynamic'
import Navbar from './components/Navbar'
import Banner from './components/Banner';

import { getGeneralInformation} from './google-sheets-api/getContent'
import Speakers from './components/Speakers';
import Faqs from './components/Faqs';
import Schedule from './components/Schedule';


const twelveHours = 3600 * 12;
export const revalidate = twelveHours;

export default async function Home() {
  const { datum, årtal, klockslag, bibelord, bibelRef, pris, plats, adress } = await getGeneralInformation()
  return (
    <div>
      <Navbar />
      <Banner title={datum + ' ' + årtal} text={plats} buttonHref='/boka' buttonText="Anmäl dig" image='/logo.svg' />
      <div className='bg-black px-6 py-12 md:px-12 lg:px-24 xl:px-48 lg:py-24 w-full flex flex-col lg:flex-row'> {/* Information om vad konferensen står för */}
        <div className='lg:w-2/3'>
          <h1 className='text-3xl lg:text-4xl pb-3 lg:pb-5 font-medium'>En konferens för dig som är ung vuxen</h1>
          <h4 className='text-lg lg:text-2xl pb-5 lg:pb-10'>Förankrad är en dag som arrangeras av Pingstkyrkan Västra Frölunda och Ung Vuxen Pingst. En dag för dig att bli Utrustad, Uppmuntrad & Utmanad.</h4>
          <h4 className='text-lg lg:text-2xl pb-5 lg:pb-10'>Vi ser fram emot go gemenskap med varandra, undervisning, samtal, workshops och tid med Gud!</h4>
          <h4 className='text-lg lg:text-2xl'>Varmt välkommen!</h4>
        </div>
        <div className='w-full lg:w-1/3'></div>
      </div>

      <Banner text={bibelord} bibleRef={bibelRef} />
      <div className='bg-black px-6 py-12 md:px-12 lg:px-24 xl:px-48 lg:py-24 w-full'> {/* Information om konferensen */}
        <h1 className='text-3xl lg:text-4xl pb-3 font-medium'>När?</h1>
        <h4 className='text-lg lg:text-2xl pb-3'>{datum} kl {klockslag}</h4>
        <h1 className='text-3xl lg:text-4xl pb-3 font-medium'>Var?</h1>
        <h4 className='text-lg lg:text-2xl pb-2'>{plats}</h4>
        <h4 className='text-lg lg:text-2xl pb-3'>{adress}</h4>
        <h1 className='text-3xl lg:text-4xl pb-3 font-medium'>Vem?</h1>
        <h4 className='text-lg lg:text-2xl'>Konferensen riktar sig till dig som är mellan 19-35 år.</h4>
      </div>
      <div className='bg-brown px-6 py-12 md:px-12 lg:px-24 xl:px-48 lg:py-24 w-full'> {/* Kostnad för konferensen */}
        <h1 className='text-2xl lg:text-3xl text-center pb-4 lg:pb-8 font-medium'>Pris</h1>
        <h4 className='text-lg lg:text-xl text-center pb-4 lg:pb-8 font-medium'>{pris} kr för hela dagen</h4>
        <p className='text-center text-xs lg:text-sm'>I priset ingår brunch, lättlunch & middag</p>
        <p className='text-center text-xs lg:text-sm'>Anmälan är bindande</p>
      </div>
      <Banner buttonHref='https://www.instagram.com/forankradkonferensen/' buttonText='Följ Förankrad på Instagram' />
      <div className="bg-black px-6 py-8 md:py-12 md:px-12 lg:px-24 xl:px-48 lg:py-16 xl:py-24 w-full"> {/* Schema */}
        <h1 className='text-xl md:text-2xl lg:text-3xl text-center pb-2 md:pb-4 lg:pb-8 font-medium'>Program för dagen</h1>
        <div className='text-base md:text-lg lg:text-xl text-center font-medium'>
          <Suspense fallback='hämtar schema...'> 
            <Schedule/>
          </Suspense>
        </div>
      </div>

      <div className='bg-black px-6 md:px-12 lg:px-24 xl:px-48 w-full'> {/* Talare för eventet */}
        <h1 className='text-2xl lg:text-3xl text-center pb-4 lg:pb-8 font-medium'>Talare</h1>
        <div className='flex flex-col md:flex-row'>
          <Suspense fallback='hämtar talare...'>
            <Speakers/>
          </Suspense>
        </div>
      </div>

      <div className='bg-black px-6 md:px-12 lg:px-24 xl:px-48 py-12 md:py-24 w-full'> {/* Vanliga frågor/FAQ */}
        <h1 className='text-2xl lg:text-3xl text-center pb-4 lg:pb-8 font-medium'>Vanliga frågor</h1>
        <div className='container mx-auto'>
          <Suspense fallback='hämtar frågot och svar...'>
            <Faqs/>
          </Suspense>
        </div>
      </div>

      <div className='bg-black px-6 md:px-12 lg:px-24 xl:px-48 py-12 md:py-24 w-full flex flex-col'> {/* Kontakta oss Mail */}
        <h1 className='text-2xl lg:text-3xl text-center pb-4 lg:pb-8 font-medium'>Kontakta oss</h1>
        <a className='text-xl flex justify-center underline decoration-1 underline-offset-4' href="forankradkonferensen@gmail.com">forankradkonferensen@gmail.com</a>
      </div>
      <div>
        <p className='bg-black pl-3 pb-3 text-xs md:text-sm font-extralight'>Hemsida skapad av: Emanuel Gustafzon och Simon Michael</p>
      </div>
    </div>
  )
}
