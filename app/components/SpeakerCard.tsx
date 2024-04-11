interface Speaker {
    namn: string;
    efternamn: string;
    titel: string;
  }

const SpeakerCard: React.FC<Speaker> = ({namn, efternamn, titel}) => {
  return (
<div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">{titel}</h2>
    <p>Talare: {namn} {efternamn}</p>
  </div>
</div>
  )
}

export default SpeakerCard