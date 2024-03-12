
import React, { useEffect , useState} from 'react';

import NavBar from "../navbar.js";
import WorksDetail from './works_detail.js'
import Footer from '../footer.js'

export default function Home() {


  return (
    <div className='relative'>
      <NavBar/>
      <WorksDetail/>
      <Footer/>
    </div>
  )
}
