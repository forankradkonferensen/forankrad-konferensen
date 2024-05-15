import React from 'react';

type BannerTypes = {
    title?: string;
    text?: string;
    bibleRef?: string;
    buttonText?: string;
    buttonHref?: string;
    image?: string;
}

const Banner: React.FC<BannerTypes> = ({ title, text, bibleRef, buttonText, buttonHref, image }) => {
    return (
        <div className='relative h-full'>
            <video width="100%" height="auto" autoPlay muted loop playsInline className='opacity-40 w-full'>
                <source src='backgroundVideo.mp4' type="video/mp4" />
            </video>

            <div className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-10 flex flex-col justify-center items-center'>
                <h1 className='text-3xl text-center'>{title}</h1>
                <h4 className='text-xl text-center p-2'>{text}</h4>
                <p className='text-center p-2'>{bibleRef}</p>
                <a className='btn bg-white hover:bg-whiteShade outline-none w-32 text-black' href={buttonHref}>{buttonText}</a>
            </div>

            <img className='absolute bottom-0 left-0 w-3/5 pl-1' src={image} alt="" />
        </div>
    );
}

export default Banner;
