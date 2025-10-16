import { getSpeakersAndTestimonials } from '../integrations/google-sheets-integration/getContent'
import SpeakerCard from './SpeakerCard';

const Speakers = async () => {
    const speakers = (await getSpeakersAndTestimonials()).speakers;
  return (
    <>
    {speakers?.map((speaker, index) => (
        <div key={index} className="mb-4 md:mr-4">
          <SpeakerCard namn={speaker[0]} efternamn={speaker[1]} tillfälle={speaker[2]} bildId={speaker[3]} />
        </div>
      ))}
    </>
  )
}

export default Speakers