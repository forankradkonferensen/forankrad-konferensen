import Image from 'next/image'

interface Speaker {
  namn: string;
  efternamn: string;
  tillfälle: string;
  bildId: string;
}

const SpeakerCard: React.FC<Speaker> = ({ namn, efternamn, tillfälle, bildId}) => {
  return (
    <div className="card-body">
      {bildId && <Image src={`https://drive.google.com/uc?id=${bildId}`} width={1000} height={1000} alt='bild på talare' />}
      <h2 className="text-xl font-medium">{namn} {efternamn}</h2>
      <p className='font-extralight'>{tillfälle}</p>
    </div>
  )
}

export default SpeakerCard