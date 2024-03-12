import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import gsap from 'gsap';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion, AnimatePresence } from 'framer-motion';

import styles_css from '../../styles/works_detail.module.css';


export default function worksArchive () {

  const [activeIndex, setActiveIndex] = useState(0)
  const [titleArchive, setTitleArchive] = useState(["COUPLE SESSION", "WEDDING SESSION", "MISC. SESSION"])
  const [imageArchive, setImageArchive] = useState(["glass_couple.png", "glass_wedding.png", "glass_misc.png"])

  const [listening, setListening] = useState(false)
  const [direction, setDirection] = useState("down")
  const [startingComplete, setStartingComplete] = useState("down")


  const tl_starter = useRef();
  const tl_direction = useRef();

  const tl_0 = useRef();
  const tl_1_enter_up = useRef();
  const tl_1_enter_down = useRef();
  const tl_2_enter = useRef();

  const tl_0_leave = useRef();
  const tl_1_leave_up = useRef();
  const tl_1_leave_down = useRef();
  const tl_2_leave = useRef();


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      document.body.classList.remove("overflow-hidden");
      
        // gsap.set("#images_0",{autoAlpha: 0, yPercent: 100})
        gsap.set("#images_1",{autoAlpha: 0})
        gsap.set("#images_2",{autoAlpha: 0})
        gsap.set(".fadeIn",{autoAlpha: 0})
        gsap.set("#titileArchive span",{autoAlpha: 0, x: 80})

        // // STARTER
        tl_starter.current = gsap.timeline({
          onComplete: () => {
            setListening(true) 
            setStartingComplete(true)
          }
        })
        .fromTo("#index_0",{
          autoAlpha: 0,
        },{
          autoAlpha: 1,
        })
        .fromTo("#index_1",{
          autoAlpha: 0,
        },{
          delay: .2,
          autoAlpha: .5,
        },"<")
        .fromTo("#index_2",{
          autoAlpha: 0,
        },{
          delay: .4,
          autoAlpha: .5,
        },"<")
        .fromTo("#titileArchive span",{
          autoAlpha: 0,
          x: 80
        },{
          autoAlpha: 1,
          x: 0,
          stagger: 0.05
        })
        .fromTo("#images_0",{
          autoAlpha: 0,
          yPercent: 100
        },{
          autoAlpha: 1,
          yPercent: 0,
          duration: 1
        })
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      if (listening) {
        let _direction = e.deltaY < 0 ? "up" : "down";
        
        if (_direction === "down") {
          if(activeIndex == 0){
            setListening(false)
            setDirection(_direction);
            setActiveIndex(1)
          }
          else if(activeIndex == 1){
            setListening(false)
            setDirection(_direction);
            setActiveIndex(2)
          }
        }
        else if (_direction === "up") {
          if(activeIndex == 2){
            setListening(false)
            setDirection(_direction);
            setActiveIndex(1)
          }
          else if(activeIndex == 1){
            setListening(false)
            setDirection(_direction);
            setActiveIndex(0)
          }
        }
      }
    };
    
    
    const handleTouchMove = (e) => {
      // const currentTouchY = e.touches[0].clientY;
      
      // if (currentTouchY > lastTouchY || currentTouchY < lastTouchY) {
      
      //   // console.log('Scrolling down');
      // }
      
      // // Update last touch position
      // lastTouchY = currentTouchY;
      
      handleScroll(e)
    }
    
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [activeIndex,listening]);

  useEffect(() => {
    if(startingComplete){
      if(direction == 'down'){
        if(activeIndex == 1){
          console.log("MASUK DOWN 1")
          gsap.fromTo("#images_0",{
            autoAlpha: 1,
            yPercent: 0,
          },{
            autoAlpha: 0,
            yPercent: -100,
            duration: 1,
          })

          gsap.fromTo("#index_0",{
            autoAlpha: 1,
          },{
            autoAlpha: 0.5,
            duration: .5,
          })
          gsap.fromTo("#index_1",{
            autoAlpha: 0.5,
          },{
            autoAlpha: 1,
            duration: .5,
          })

          gsap.fromTo("#titileArchive span",{
            autoAlpha: 0,
            x: 80
          },{
            autoAlpha: 1,
            x: 0,
            stagger: 0.05
          })

          gsap.fromTo("#images_1",{
            autoAlpha: 0,
            yPercent: 100,
          },{
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            onComplete: () => {
              setListening(true);
            }
          })
        }
        else if(activeIndex == 2){
          console.log("MASUK DOWN 2")
          gsap.fromTo("#images_1",{
            autoAlpha: 1,
            yPercent: 0,
          },{
            autoAlpha: 0,
            yPercent: -100,
            duration: 1,
          })

          gsap.fromTo("#index_1",{
            autoAlpha: 1,
          },{
            autoAlpha: 0.5,
            duration: .5,
          })
          gsap.fromTo("#index_2",{
            autoAlpha: 0.5,
          },{
            autoAlpha: 1,
            duration: .5,
          })

          gsap.fromTo("#titileArchive span",{
            autoAlpha: 0,
            x: 80
          },{
            autoAlpha: 1,
            x: 0,
            stagger: 0.05
          })

          gsap.fromTo("#images_2",{
            autoAlpha: 0,
            yPercent: 100
          },{
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            onComplete: () => {
              setListening(true);
            }
          })
        }
      }
      else if(direction == 'up'){
        if(activeIndex == 1){
          console.log("MASUK UP 1")
          gsap.fromTo("#images_2",{
            autoAlpha: 1,
            yPercent: 0,
          },{
            autoAlpha: 0,
            yPercent: 100,
            duration: 1,
          })

          gsap.fromTo("#index_2",{
            autoAlpha: 1,
          },{
            autoAlpha: 0.5,
            duration: .5,
          })
          gsap.fromTo("#index_1",{
            autoAlpha: 0.5,
          },{
            autoAlpha: 1,
            duration: .5,
          })

          gsap.fromTo("#titileArchive span",{
            autoAlpha: 0,
            x: 80
          },{
            autoAlpha: 1,
            x: 0,
            stagger: 0.05
          })

          gsap.fromTo("#images_1",{
            autoAlpha: 0,
            yPercent: -100,
          },{
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            onComplete: () => {
              setListening(true);
            }
          })
        }
        else if(activeIndex == 0){
          console.log("MASUK UP 0")
          gsap.fromTo("#images_1",{
            autoAlpha: 1,
            yPercent: 0,
          },{
            autoAlpha: 0,
            yPercent: 100,
            duration: 1,
          })

          gsap.fromTo("#index_1",{
            autoAlpha: 1,
          },{
            autoAlpha: 0.5,
            duration: .5,
          })
          gsap.fromTo("#index_0",{
            autoAlpha: 0.5,
          },{
            autoAlpha: 1,
            duration: .5,
          })

          gsap.fromTo("#titileArchive span",{
            autoAlpha: 0,
            x: 80
          },{
            autoAlpha: 1,
            x: 0,
            stagger: 0.05
          })

          gsap.fromTo("#images_0",{
            autoAlpha: 0,
            yPercent: -100,
          },{
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            onComplete: () => {
              setListening(true);
            }
          })
        }
      }
    }
  },[activeIndex,direction,startingComplete])

  const goTo = (linkURL) => {
    window.location.href = linkURL
  }

  return (
    <div id="works_archive" className="bg-[#E3DACD] max-h-[100vh] h-[100vh] overflow-hidden flex flex-col lg:flex-row">
      <div className="h-fit lg:h-full lg:w-[20%] w-full border-b-[1px] lg:border-b-[0] lg:border-r-[1px] border-[#972E00]
            flex flex-col items-center justify-center mt-[30%] lg:mt-0
          "
      >
        <div
          className="absolute w-fit revealFirst
            flex justify-between 
            top-4 right-4 z-[12]
            lg:top-8 lg:right-[5%]
          "
        >
          <a href="./">
            <div
              className="relative cursor-pointer hover:opacity-50 transition-all duration-300 ease-in-out"
            >
              <div
                className={`h-[1.5px] my-1 bg-[#000000] w-[2rem] transform transition-all duration-300 ease-in-out translate-y-[300%]  rotate-[45deg]
                }`}
              />
              <div
                className={`h-[1.5px] my-1 bg-[#000000] w-[2rem] transform transition-all duration-300 ease-in-out opacity-0
                }`}
              />
              <div
                className={`h-[1.5px] my-1 bg-[#000000] w-[2rem] transform transition-all duration-300 ease-in-out translate-y-[-450%]  rotate-[-45deg]
                }`}
              />
            </div>
          </a>
        </div>

        <div className="flex flex-row lg:flex-col font-hero-new-regular text-[#972E00] text-[16px] translate-y-[10%]">
          <div id="index_0" className="fadeIn select-none mb-4 lg:mb-6">THE INTIMATE</div>
          <div id="index_1" className="fadeIn select-none mx-4 lg:mx-0 mb-4 lg:mb-6 opacity-50">THE SACRED</div>
          <div id="index_2" className="fadeIn select-none mb-4 lg:mb-6 opacity-50">THE EVERYTHING</div>
        </div>
      </div>

      <div className="h-full w-full lg:w-[80%] flex flex-col lg:flex-row items-center justify-between ">
        <hr className="w-[40px] lg:w-[10%] border-[#972E00] rotate-[90deg] lg:rotate-[0] mt-[5%] lg:mt-0"/>

        <div className="relative h-full w-full flex flex-col lg:flex-row items-center justify-between px-4 lg:px-[6rem] py-12 lg:py-0">
          <div id="titileArchive" className="select-none h-fit lg:h-full flex items-center font-the-seasons-bold text-[2rem] lg:text-[48px] text-[#972E00]">
            {titleArchive[activeIndex].split('').map((char, index) => (
              <span className="opacity-0" key={index}>{char}</span>
            ))}
          </div>

          <div className="w-full h-[60vh] lg:h-full flex items-center justify-center lg:justify-end relative">
            <img id="images_0" onClick={() => goTo("/couple")} src={`/images/${imageArchive[0]}`}
              className="absolute cursor-pointer w-[80%] lg:w-[500px]" 
            />

            <img id="images_1" onClick={() => goTo("/wedding")} src={`/images/${imageArchive[1]}`}
              className="absolute cursor-pointer right-[unset] lg:right-0 top-[13%] w-[90%] lg:w-[570px] translate-x-[-7%] lg:translate-x-0" 
            />

            <img id="images_2" onClick={() => goTo("/misc")}  src={`/images/${imageArchive[2]}`}
              className="absolute cursor-pointer right-[unset] lg:right-0 top-[13%] w-[80%] lg:w-[464px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
