import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import gsap from 'gsap';
import axios from 'axios';

import Link from 'next/link';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/home7.module.css';


const home7 = () => {
  const [dataHome7, setDataHome7] = useState({
    "home_album_explain_title_first_line" : '',
    "home_album_explain_title_second_line" : '',
    "home_album_explain_description" : '',
    "home_album_explain_cta_text" : '',
    "home_album_explain_image" : '',
  });

  const [apiStatus, setApiStatus] = useState('idle');

  const tl_starting = useRef();
  const tl_underline = useRef();


  // API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setApiStatus('loading');
        const response = await axios.get(`https://control.vowrever.com/wp-json/qubick-api/v1/home_album`);
        const responseData = response.data;
        
        setDataHome7({
          "home_album_explain_title_first_line" : responseData.home_album_explain_title_first_line,
          "home_album_explain_title_second_line" : responseData.home_album_explain_title_second_line,
          "home_album_explain_description" : responseData.home_album_explain_description,
          "home_album_explain_cta_text" : responseData.home_album_explain_cta_text,
          "home_album_explain_image" : responseData.home_album_explain_image,
        });
        
        setApiStatus('success');
      } catch (error) {
        console.error(error);
        setApiStatus('error');
      }
    };
    
    fetchData();
  }, []);

  useLayoutEffect(() => {
    if(dataHome7 && apiStatus == 'success'){
      gsap.registerPlugin(ScrollTrigger);

      console.log("dataHome7",dataHome7)


      const ctx = gsap.context(() => {
        tl_underline.current = gsap.timeline({
          paused: true,
        })
        .fromTo(".underline", {
          width: "0%",
          left: "0%",
        }, {
          width: "100%",
          duration: 1, 
        })
        
        tl_starting.current = 
        gsap.timeline({
          scrollTrigger:{
            trigger: "#Home7",
            start: "top center", 
            // markers: true,
          },
        })
        .fromTo(".home7_fadeIn",
          {
            autoAlpha:0
          },
          {
            autoAlpha:1,
            stagger: .5,
          }
        )
        
      });

      return () => ctx.revert();
    }
      
  
  }, [dataHome7, apiStatus]);

  
  const onMouseEnterUnderline = () => {
    tl_underline.current.play();
  }

  const onMouseLeaveUnderline = () => {
    tl_underline.current.reverse();
  }


  return (
    <div id="Home7" className="bg-[#E3DACD] flex justify-center items-center flex-col py-12 lg:py-24 px-4 lg:px-16">
   
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full lg:w-[95%] xl:w-[85%]">
        <div className="md:col-span-1">
          <img src={dataHome7.home_album_explain_image} alt="Album" 
            className="mx-auto lg:float-right h-[50vh] md:h-full home7_fadeIn w-auto"
          />
        </div>

        <div className="md:col-span-2 align-middle lg:pl-8">
          <h1 className="home7_fadeIn 
              text-center md:text-left 
              tracking-[1.44px]
              text-[1.75em] md:text-[2.5rem] lg:text-[3rem] text-[#972E00] 
              leading-base lg:leading-[1.5] font-the-seasons-bold 
              mb-4 lg:mb-12
              mt-8
            "
          >
            {dataHome7.home_album_explain_title_first_line} <br />
            {dataHome7.home_album_explain_title_second_line}
          </h1>
          
          <div className="home7_fadeIn text-nowrap text-center md:text-left font-hero-new-regular text-[#972E00] text-[0.75em] lg:text-[1em] tracking-[0.36px] leading-[24px] justify-center mb-4" 
            dangerouslySetInnerHTML={{ __html: dataHome7.home_album_explain_description }}
          >
          </div>
         
          <h4 className="home7_fadeIn text-center md:text-left font-the-seasons-bold text-[#972E00] text-[1.5rem] lg:text-[2rem] tracking-[0.96px] justify-center mb-4 lg:mb-12">
            {dataHome7.home_album_explain_cta_text}
          </h4>
          
          <div className='home7_fadeIn text-center md:text-left mb-8 lg:mb-0'>
            <Link href="/album" 
              ref={tl_underline}
              onMouseEnter={()=>{onMouseEnterUnderline()}}
              onMouseLeave={()=>{onMouseLeaveUnderline()}}
            >
              <span js_work_link="" className={`${styles.js_work_link} text-center lg:text-left font-hero-new-regular text-[#972E00]  text-[0.75rem] tracking-[0.24px] justify-center`} href='/album'>
                <span js_an_word="" className="js_an_word">FIND THE ANSWER IN HERE</span>
                <span underline="" className={`${styles.underline} underline` }></span>
              </span>
            </Link>
            
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default home7;
