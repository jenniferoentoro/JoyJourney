
import React, { useEffect , useState} from 'react';

import WorksArchive from './works.js'
import Footer from '../footer.js'

export default function Home() {


  return (
    <div className='relative'>
      <WorksArchive/>
      {/* <Footer/> */}
    </div>
  )
}
