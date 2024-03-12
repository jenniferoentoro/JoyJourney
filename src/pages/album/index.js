
import React, { useEffect , useState} from 'react';

import NavBar from "../navbar.js";
import Album from './album.js'
import Footer from '../footer.js'

export default function Album_Page() {


  return (
    <div className='relative'>
      <NavBar/>
      <Album/>
      <Footer/>
    </div>
  )
}
