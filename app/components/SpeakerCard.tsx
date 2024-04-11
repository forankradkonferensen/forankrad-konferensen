import Image from 'next/image'

interface Speaker {
    namn: string;
    efternamn: string;
    titel: string;
    bildId: string;
  }

const SpeakerCard: React.FC<Speaker> = ({namn, efternamn, titel, bildId: bildId}) => {
  return (
<div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    {bildId && <Image src={`https://drive.google.com/uc?id=${bildId}`} width={100} height={100} alt='bild på talare talare'/>}
    <h2 className="card-title">{titel}</h2>
    <p>Talare: {namn} {efternamn}</p>
  </div>
</div>
  )
}

export default SpeakerCard