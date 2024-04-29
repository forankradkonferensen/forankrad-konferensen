import React from 'react'

type BannerTypes = {
    title?: string;
    text?: string;
    bibleRef?: string;
    buttonText?: string;
    buttonHref?: string;
}

const Banner: React.FC<BannerTypes> = ({ title, text, bibleRef, buttonText, buttonHref }) => {
    return (
        <div className='relative h-full'>
            <video width="100%" height="auto" autoPlay muted loop playsInline className='opacity-40 w-full'>
                <source src='backgroundVideo.mp4' type="video/mp4" />
            </video>

            <div className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-10'>
                <h1 className='text-3xl text-center'>{title}</h1>
                <h4 className='text-xl text-center'>{text}</h4>
                <p className='text-center'>{bibleRef}</p>
                <a className='button' href={buttonHref}>{buttonText}</a>
            </div>

        </div>
    )
}

export default Banner

