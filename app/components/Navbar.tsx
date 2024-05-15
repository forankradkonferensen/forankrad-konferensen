import React from 'react'


const Navbar = () => {
    return (
        <div className="navbar bg-black px-8 fixed top-0 w-full z-50 opacity-90">
            <div className="navbar-start">
                <div>
                    <a href="https://www.instagram.com/forankradkonferensen/">
                        <img className="w-8 h-8 filter invert" src="/instagram.svg" alt="Instagram" />
                    </a>
                </div>
            </div>
            <div className="navbar-center">
                <img className='w-52' src="/logo.svg" alt="Förankrad" />
            </div>
            <div className="navbar-end">
                <p className='px-3'><a href='/'>Hem</a></p>
                <p className='px-3'><a href='boka'>Anmälan</a></p>
            </div>
        </div>
    )
}
export default Navbar