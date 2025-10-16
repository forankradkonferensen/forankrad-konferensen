import { getFaQ } from '../integrations/google-sheets-integration/getContent'
import Faq from './Faq';

const Faqs = async () => {
    const faq = await getFaQ();
  return (
    <>
    {faq?.map((value, index) => (
        <div className='mx-auto w-full max-w-md' key={index}>
            {/* question and answer in array */}
            <Faq question={value[0]} answer={value[1]} />
        </div>
    ))}
    </>
  )
}

export default Faqs