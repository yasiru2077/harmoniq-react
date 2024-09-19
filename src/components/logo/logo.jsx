import React from 'react'
import logoImage from "../../assets/images/logo.png"
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <div>
        <Link to="/">
        <img src={logoImage} alt="logo-image" />
        </Link>
    </div>
  )
}

export default Logo