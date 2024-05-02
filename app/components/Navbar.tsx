import React from 'react'

const Navbar = () => {
    return (
        <div className="navbar bg-black">
            <div className="navbar-start">
                <div className="dropdown">
                    <div>
                        <p>Instagram</p>
                    </div>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl">Förankrad Konferensen</a>
            </div>
            <div className="navbar-end">
                <p className='mr-5'><a>Hem</a></p>
                <p className='mr-5'><a>Anmälan</a></p>
            </div>
        </div>
    )
}
export default Navbar