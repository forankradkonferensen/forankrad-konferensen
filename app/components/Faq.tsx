'use client'
import { useState } from "react"

type FaqTypes = {
    question: string;
    answer: string;
}

const Faq: React.FC<FaqTypes> = ({question, answer}) => {
    const [showContent, setShowContent] = useState(false)
  return (
    <div>
        <div className="flex flex-row">
            <button className="btn basis-1/4" onClick={() => setShowContent(prev => !prev) }>{showContent ? '-' : '+' }</button>
            <div>
            <p className="basis-3/4">{question}</p>
            <p className="basis-3/4">{showContent && answer}</p>
            </div>
        </div>
    </div>
  )
}

export default Faq