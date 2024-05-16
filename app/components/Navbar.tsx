import React from 'react'
import Image from 'next/image';

const Navbar = () => {
    return (
        <div className="navbar bg-black px-8 fixed top-0 w-full z-50 opacity-90">
            <div className="navbar-start">
                <div>
                    <a target='_blank' href="https://www.instagram.com/forankradkonferensen/">
                        <Image width={32} height={32} className="filter invert" src="/instagram.svg" alt="Instagram" />
                    </a>
                </div>
            </div>
            <div className="navbar-center">
                <a className='btn btn-ghost' href="/"> <Image width={150} height={150} src="/logo.svg" alt="Förankrad" /></a>

            </div>
            <div className="navbar-end">
                <p className='px-3'><a href='boka'>Anmälan</a></p>
            </div>
        </div>
    )
}
export default Navbar