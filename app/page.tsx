import Image from 'next/image'
import Navbar from './components/Navbar'
import { google } from 'googleapis'
import SpeakerCard from './components/SpeakerCard';

async function getSpreadSheet() {
  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  try {
      const res = await sheets.spreadsheets.values.get({
          spreadsheetId: process.env.SHEET_ID,
          range: 'Sheet1'
      });
      const data = res.data.values
      return data;
  } catch (error) {
      console.error('Cannot fetch from google sheets:', error);
  }
}

export default async function Home() {

const data = await getSpreadSheet();

  return (
    <div>
      <Navbar/>
    <div className='container flex justify-center mt-5'>
    <h1 className='font-bold text-xl text-lime-700'>Talare från Google Kalkylark</h1>
    </div>
      <div className='container flex flex-wrap justify-center mt-5'>
      {data?.map((value, index) => (
          <div className='m-3' key={index}>
             <SpeakerCard namn={value[0]} efternamn={value[1]} titel={value[2]} />
          </div>
        ))}
      </div>
    </div>
  )
}
