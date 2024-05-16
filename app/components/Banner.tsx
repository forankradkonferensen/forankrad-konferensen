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
            <video width="100%" height="auto" autoPlay muted loop playsInline className='custom-opacity w-full'>
                <source src='backgroundVideo.mp4' type="video/mp4" />
            </video>


            <div className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-10 flex flex-col justify-center items-center'>
                <h1 className='text-5xl text-center font-semibold tracking-wider'>{title}</h1>
                <h4 className='text-2xl text-center p-2 font-medium'>{text}</h4>
                <p className='text-center'>{bibleRef}</p>
                {buttonHref && buttonText && (
                    <a className='btn bg-white hover:bg-whiteShade outline-none w-32 text-black' href={buttonHref}>{buttonText}</a>
                )}
            </div>

            <img className='absolute bottom-0 left-0 w-3/4 pl-1' src={image} alt="" />
        </div>
    );
}

export default Banner;
