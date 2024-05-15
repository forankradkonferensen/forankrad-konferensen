'use client'
import { useState } from "react"

type FaqTypes = {
  question: string;
  answer: string;
}

const Faq: React.FC<FaqTypes> = ({ question, answer }) => {
  const [showContent, setShowContent] = useState(false)
  return (
    <div>
      <div className="flex flex-row items-center">
        <button className="btn btn-circle bg-white" onClick={() => setShowContent(prev => !prev)}>
          {showContent ? '-' : '+'}
        </button>
        <p className="basis-3/4 text-center p-4 font-medium">{question}</p>
      </div>
      {showContent && (
        <div>
          <p className="basis-3/4 text-sm font-thin text-whiteShade">{answer}</p>
        </div>
      )}
    </div>


  )
}

export default Faq