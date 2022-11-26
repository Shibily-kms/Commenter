import React from 'react'
import Logo from '../../../assets/icons/newLogo.png'
import {Link} from 'react-router-dom'
import './logoframe.scss'

function LogoFrame() {
  return (
    <div>
        <div className="logoFrame">
            <div className="title">
                <img src={Logo} alt="logo" />
                <h4>Commenter</h4>
            </div>
            <div className="link">
                <Link to='/' >Home |</Link>
                <Link to='/' >About |</Link>
                <Link to='/' >Press |</Link>
                <Link to='/' >API Jobs |</Link>
                <Link to='/' >Privacy |</Link>
                <Link to='/' >Terms |</Link>
                <Link to='/' >Loactions |</Link>
            </div>
            <div className="copyright">
                <p>Ⓒ 2022 Commenter</p>
            </div>
        </div>
    </div>
  )
}

export default LogoFrame