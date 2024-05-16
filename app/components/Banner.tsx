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
<div className='relative w-full h-screen overflow-hidden'>
  <video className='absolute top-0 left-0 object-cover w-full h-auto' autoPlay muted loop playsInline>
    <source src='backgroundVideo.mp4' type="video/mp4" />
  </video>

            <div className='absolute inset-0 flex flex-col justify-center items-center z-10'>
            <h1 className='text-5xl text-center font-semibold tracking-wider'>{title}</h1>
            <h4 className='text-xl text-center p-2 font-medium'>{text}</h4>
            <p className='text-base text-center'>{bibleRef}</p>
            {buttonHref && buttonText && (
            <a className='btn bg-white hover:bg-whiteShade outline-none w-32 text-black' href={buttonHref}>{buttonText}</a>
            )}
  </div>

            <img className='absolute bottom-0 left-0 w-3/4 pl-1' src={image} alt="" />
        </div>
    );
}

export default Banner;
