import React, { useState, useEffect } from 'react'
import '../css/Nav.css'

function Nav() {
    const [show, showHandle] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                showHandle(true)
            } else showHandle(false)
        })
        return () => {
            window.removeEventListener('scroll')
        }
    }, [])

    return (
        <div className={`Nav ${show && 'nav_scroll'}`}>
            <img
                className='nav_logo'
                src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
                alt='Netflix logo'
            />
            <img
                className='nav_avatar'
                src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                alt='User avatar'
            />
        </div>
    )
}

export default Nav
