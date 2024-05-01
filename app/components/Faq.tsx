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
        <button className="btn btn-circle bg-white" onClick={() => setShowContent(prev => !prev)}>{showContent ? '-' : '+'}</button>
        <div>
          <p className="basis-3/4 p-2">{question}</p>
          <p className="basis-3/4">{showContent && answer}</p>
        </div>
      </div>
    </div>
  )
}

export default Faq