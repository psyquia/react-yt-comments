import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiYoutubeLine } from 'react-icons/ri';
import { AiFillHome } from 'react-icons/ai';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

import './Navbar.css';
import { getRandVideo } from '../../Api';


const Navbar = ({
    setRandom
}) => {
    const [click, setClick] = useState(false);

    const handleBurgerClick = () => setClick(!click);
    const closeMobileMenu = () => {
        window.scrollTo(0, 0);
        setClick(false);
    }

    const handleRandom = async () => {
        let randomVideo = await getRandVideo();
        console.log(randomVideo);
        setRandom(randomVideo);
        closeMobileMenu();
    }

    const handleHome = async () => {
        setRandom('');
        closeMobileMenu();
    }

    return (
        <>
                <div className="navbar">
                    <div className="navbar-container">
                        <IconContext.Provider value={{ color: 'red' }}>
                        <Link to='/' className="navbar-title" onClick={handleHome}>
                        	<RiYoutubeLine className='navbar-icon' />
                        	COMMENT SHOWCASE
                   		</Link>
                        <div className="menu-icon" onClick={handleBurgerClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </div>
                        </IconContext.Provider>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className="nav-item">
                                <Link to='/' className="nav-links" onClick={handleHome}>
                                    <AiFillHome className='navbar-icon'/>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/random' className="nav-links" onClick={handleRandom}>
                                    <GiPerspectiveDiceSixFacesRandom className="navbar-icon"/>
                                    Random
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
        </>
    )
}

export default Navbar
