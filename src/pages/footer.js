import React, { useState, useEffect } from "react";
import gsap from 'gsap';


import styles from '../styles/footer.module.css';


const footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

    useEffect(() => {
        gsap.set(".footer_fadeIn",{
          autoAlpha: 0,
          yPercent: 50,
        })
    
        gsap.fromTo(".footer_fadeIn",{
          autoAlpha: 0,
          yPercent: 50,
        },{
          autoAlpha: 1,
          yPercent: 0,
          stagger: .3,
          scrollTrigger:{
            trigger: ".footer_fadeIn",
            start: 'top bottom',
            // toggleActions: 'restart resume restart restart',
          }
        })
      }, []);

  return (
    <footer className="
                w-[100vw]
                flex flex-col lg:flex-row items-center lg:justify-between
                p-8 lg:py-12 lg:px-20 
                bg-[#f3f2ed] text-[#3D210F]
                font-hero-new-regular
                z-[6]  relative
            "
    >
      
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between w-fit">
        <div className="m-auto mb-8 lg:m-0 lg:mr-10 xl:mr-20 w-[90px]">
          <img className="footer_fadeIn w-full"
                src="/images/logo.png"
          />
        </div>
      
        <div className="w-full text-center lg:text-left lg:w-fit flex flex-col justify-center">
          <div className="footer_fadeIn mb-4 text-[1rem] xl:text-[1.25rem] tracking-[0.4px] leading-[25px] whitespace-nowrap">
            BALI-BASED <br/>
            WEDDING PHOTOGRAPHER
          </div>
          
          <div className="flex justify-center lg:justify-start mb-8 lg:m-0">
            <div className="footer_fadeIn w-[25px] h-[25px] mr-4 cursor-pointer">
              <a target="_blank" href="https://www.instagram.com/vowrever_/"><img src="/images/icon-ig.png" className="w-[17px] hover:opacity-50"/></a>
            </div>
            
            <div className="footer_fadeIn w-[25px] h-[25px] mr-4 cursor-pointer">
              <a target="_blank" href="https://www.facebook.com/vowrever"><img src="/images/icon-fb.png" className="w-[17px] hover:opacity-50"/></a>
            </div>
            
            <div className="footer_fadeIn w-[25px] h-[25px] cursor-pointer">
              <a target="_blank" href=""><img src="/images/icon-x.png" className="w-[17px] hover:opacity-50"/></a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col justify-center items-end w-fit">
        <div className="
              lg:flex lg:flex-wrap lg:justify-end 
              grid grid-cols-3 gap-y-6 gap-x-6
              text-[1rem] xl:text-[1.25rem] tracking-[0.4px] 
              w-full
              my-8 lg:mt-0 lg:mb-4
              text-center
              font-hero-new-regular
            "
        >
          <a href="/#about" className="footer_fadeIn hover:text-[#D1C1B3] ease-in-out duration-700">ABOUT</a>
          <a href="/#whyus" className="footer_fadeIn hover:text-[#D1C1B3] ease-in-out duration-700">WHY US</a>
          <a href="/#works" className="footer_fadeIn hover:text-[#D1C1B3] ease-in-out duration-700">WORKS</a>
          <a href="/#letters" className="footer_fadeIn hover:text-[#D1C1B3] ease-in-out duration-700">LETTERS</a>
          <a href="/#faq" className="footer_fadeIn hover:text-[#D1C1B3] ease-in-out duration-700">FAQ</a>
          <a href="/#contact" className="footer_fadeIn lg:pr-0 hover:text-[#D1C1B3] ease-in-out duration-700">CONTACT</a>
        </div>
          
        <h6 className="footer_fadeIn text-[0.75rem] tracking-[0.24px] font-hero-new-regular text-center lg:text-right mb-8 lg:mb-2">©2023 JOY JOURNEY - LOGO BY (?) / WEBSITE DESIGN BY MAX / DEVELOPED BY QUBICK.ID</h6>
          
        <div onClick={scrollToTop} className="footer_fadeIn flex self-center lg:self-end lg:justify-end align-center w-fit cursor-pointer hover:opacity-50 ease-in-out duration-700">
          <img src="/images/arrow_backtop.png" className="w-1.5 h-fit mr-3 translate translate-y-[20%]"/>
          <h6 className="ext-[0.75rem] tracking-[0.24px] font-hero-new-regular text-center lg:text-right">BACK TO TOP </h6>
        </div>
      </div>
    </footer>
  );
};

export default footer;
