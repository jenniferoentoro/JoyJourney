import { useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';


import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

import styles from '../styles/home2.module.css';

export default function Home2({ homeData }) {
  useLayoutEffect(() => {
    if(homeData){
      gsap.registerPlugin(ScrollTrigger);
      
      const ctx = gsap.context(() => {
        gsap.fromTo("#scrollText_leftRight", { 
          xPercent: 100,
        }, {
          xPercent: -50,
          scrollTrigger: {
            trigger: "#about",
            start: 'top bottom',
            scrub: 0.5
          }
        });

        gsap.fromTo("#scrollText_rightLeft", { 
          xPercent: -50,
        }, {
          xPercent: 50,
          scrollTrigger: {
            trigger: "#about",
            start: 'top bottom',
            scrub: 0.5
          }
        });

        gsap.fromTo("#paragraf2", {
          yPercent: 100,
          opacity: 0,
        }, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: "#about",
            start: (window.innerWidth >= 1200 ? 'bottom bottom' : 'center center'),
          },
        });
      });
      return () => ctx.revert();
    }
  }, [homeData]);

  if (!homeData) {
    // Handle the loading state or provide default values
    return <div>Loading...</div>;
  }

  return (
    <div className='relative text-[#3D210F] bg-[#f3f2ed] px-4 lg:px-0 w-[100vw]' id="about">
      <div className={`${styles.imageSection_Wrapper} w-full lg:min-h-[100vh]`}>
        <p id='scrollText_rightLeft' className={`${styles.scrollText} ${styles.scrollText_rightLeft} tracking-[2px] lg:tracking-[4px] text-[2rem] lg:text-[5rem] font-hero-new-super-italic top-[22%] lg:top-[27%]`}>{homeData.home_running_text_first_text}</p>
        <p id='scrollText_leftRight' className={`${styles.scrollText} ${styles.scrollText_leftRight} tracking-[0.8px] text-[2rem] lg:text-[5rem] font-hero-new-super-italic top-[29%] lg:top-[35%]`}>{homeData.home_running_text_second_text}</p>
        
        <Image id="imageSecton2" className={`${styles.imageSecton2} w-[95%] md:w-[60vw] lg:w-[56vw] mt-28`} src={homeData.home_running_text_image || '/images/image_placeholder.jpg'} width={600} height={400} alt='Photography Bali'/>
        
        <div id="paragraf2" className={`${styles.paragraf} tracking-[1.08px] leading-base lg:leading-[50px] w-full text-[1.5rem] lg:text-[2.25rem] text-center font-the-seasons-bold my-14 lg:my-28`} dangerouslySetInnerHTML={{ __html: homeData.home_running_text_long_description }} paragraf="">
        </div>
      </div>
    </div>
  );
}
