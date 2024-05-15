import Image from 'next/image'

interface Speaker {
  namn: string;
  efternamn: string;
  tillfälle: string;
  bildId: string;
}

const SpeakerCard: React.FC<Speaker> = ({ namn, efternamn, tillfälle, bildId: bildId }) => {
  return (
    <div className="card-body">
      {bildId && <Image src={bildId} width={100} height={100} alt='bild på talare' />}
      <h2 className="card-title">{namn} {efternamn}</h2>
      <p>{tillfälle}</p>
    </div>
  )
}

export default SpeakerCard