import React from 'react';
import Image from 'next/image';
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
       <div className="relative h-screen overflow-hidden">
    <video width="100%" height="auto" autoPlay muted loop playsInline className="opacity-80 object-cover absolute inset-0 h-full w-full">
        <source src="backgroundVideo.mp4" type="video/mp4" />
    </video>

    <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-wider">{title}</h1>
        <h4 className="text-lg md:text-2xl p-2 font-medium">{text}</h4>
        <p className="text-sm md:text-base">{bibleRef}</p>
        {buttonHref && buttonText && (
            <a className="btn bg-white hover:bg-whiteShade outline-none w-32 md:w-48 text-black" href={buttonHref}>{buttonText}</a>
        )}
    </div>
    <div className="absolute bottom-0 left-0">
        <Image width={1500} height={1500}  src={image} alt="" />
    </div>
</div>

    );
}

export default Banner;
