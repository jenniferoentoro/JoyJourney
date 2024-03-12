import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import gsap from 'gsap';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion, AnimatePresence } from 'framer-motion';

import styles_css from '../../styles/works_detail.module.css';


export default function worksDetail () {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [selectedImagePath, setSelectedImagePath] = useState('');

  
  const slider2Ref = useRef(null);
  const slider3Ref = useRef(null);

  const tl_underline = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl_underline.current = gsap.timeline({
        paused: true,
      })
      .fromTo("#works_detail [underline]", {
          width: "0%",
          left: "0%",
      }, {
          width: "100%",
          duration: 1, 
      })
    });
    return () => ctx.revert();
  }, []);

  const onMouseEnterUnderline = () => {
    tl_underline.current.play();
  }

  const onMouseLeaveUnderline = () => {
    tl_underline.current.reverse();
  }
  
  const handleModalToggle = () => {
    setShowModal(!showModal);
    
  };
  
  const handleModalToggle2 = () => {
    setShowModal1(false);
    document.body.classList.remove('overflow-hidden');
  };

  const handleImageClick = (path) => {
    setSelectedImagePath(path);
    setShowModal1(true);
    document.body.classList.add('overflow-hidden');
  };
  
  useEffect(() => {
    const sliderElement = slider3Ref.current;
    const sliderElement2 = slider2Ref.current;

    const handleMouseScroll = (event) => {
      event.preventDefault();
      if (event.deltaY > 0) {
        sliderElement2.slickNext();
      } else {
        sliderElement2.slickPrev();
      }
    };

    sliderElement.addEventListener('wheel', handleMouseScroll);

    return () => {
      sliderElement.removeEventListener('wheel', handleMouseScroll);
    };
  }, []);
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target === event.currentTarget) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.body.classList.add('overflow-hidden');
      window.addEventListener('click', handleOutsideClick);
    }
    else{
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [showModal]);

  return (
    <div id="works_detail" className="bg-[#F3F2ED]">
      <div className="flex justify-between flex-col lg:flex-row">
        <div className="w-full lg:w-[35%]" >
          <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)}   infinite={true} arrows={false} style={{ cursor: 'pointer' }}>
            <div className="h-[50vh] lg:h-[100vh] w-auto" onClick={() => handleImageClick('/images/client4.jpg')}>
              <img src="/images/client4.jpg" alt="Image 4" className="h-full w-full object-cover" />
            </div>

            <div className="h-[50vh] lg:h-[100vh] w-auto" onClick={() => handleImageClick('/images/client1.jpg')}> 
              <img src="/images/client1.jpg" alt="Image 4" className="h-full w-full object-cover" />
            </div>

            <div className="h-[50vh] lg:h-[100vh] w-auto" onClick={() => handleImageClick('/images/client2.jpg')}>
              <img src="/images/client2.jpg" alt="Image 4" className="h-full w-full object-cover" />
            </div>

            <div className="h-[50vh] lg:h-[100vh] w-auto" onClick={() => handleImageClick('/images/client3.jpg')}>
              <img src="/images/client3.jpg" alt="Image 4" className="h-full w-full object-cover" />
            </div>
          </Slider>
        </div>

        <div className="w-full lg:w-[60%] pt-0 lg:pt-20 pb-10 flex flex-col justify-between">
          <div className='order-2 lg:order-[unset] py-4 lg:py-0 px-4 lg:px-0 lg:pr-20 flex flex-col lg:flex-row justify-between'>
            <div className='w-full lg:w-fit self-end text-left mb-8 lg:mb-0'>
              <h1 className='text-[2rem] lg:text-[2.5rem] font-the-seasons-bold text-[#3D210F] tracking-[2px] leading-[1] mb-4'>
                Their Sincere<br/> 
                Laughter That Time
              </h1>

              <h2 className="font-hero-new-regular text-[#3D210F] text-[16px]">
                WIKA + MELIANA
              </h2>
            </div>

            <div className='w-full lg:w-[45%] text-[#3D210F] tracking-[1px]'>
                <div className="flex">
                  <div className='w-[40%] self-end font-hero-new-regular text-[16px] translate-y-[-35%]'>
                    PHOTOGRAPHER
                  </div>
                  <div className='self-end font-the-seasons-bold tracking-[0.1em] text-[1.5rem]'>Max Grady</div>
                </div>

                <div className="flex">
                  <div className='w-[40%] self-end font-hero-new-regular text-[16px] translate-y-[-35%]'>
                    MAKE-UP ARTIST
                  </div>
                  <div className='self-end font-the-seasons-bold tracking-[0.1em] text-[1.5rem]'>
                    Wayan Arisandi
                  </div>
                </div>

                <div className="flex">
                  <div className='w-[40%] self-end font-hero-new-regular text-[16px] translate-y-[-35%]'>
                    ASSISTANT
                  </div>
                  <div className='self-end font-the-seasons-bold tracking-[0.1em] text-[1.5rem]'>
                    Rudy Poler
                  </div>
                </div>

                <div className="flex">
                  <div className='w-[40%] self-end font-hero-new-regular text-[16px] translate-y-[-35%]'>
                    DRIVER
                  </div>
                  <div className='self-end font-the-seasons-bold tracking-[0.1em] text-[1.5rem]'>
                    Nang Laras
                  </div>
                </div>
            </div>

            <div className='mt-8 font-hero-new-regular text-[#3D210F] cursor-pointer flex lg:hidden items-center'
              ref={tl_underline}
              onClick={handleModalToggle}
              onMouseEnter={onMouseEnterUnderline}
              onMouseLeave={onMouseLeaveUnderline}
            >
              <div className='w-[1.5rem] h-[1.5rem] bg-[#D9D9D9] rounded-full mr-4'></div>

              <div className="w-fit text-[16px] tracking-[1px] flex relative">
                <span js_an_word="" className="js_an_word font-hero-new-regular text-[0.5rem] lg:text-[16px] tracking-[0.24px]">
                  FIND THEIR SESSION LOG IN HERE
                </span>

                <span underline="" className={`${styles_css.underline}`}></span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-[unset] mt-[-6px] lg:mt-0 lg:mr-[-20px]">
            <div ref={slider3Ref}>
              <Slider
                asNavFor={nav1} ref={slider2Ref} 
                slidesToShow={2}
                swipeToSlide={true}
                mousewheel={true}
                infinite={true}
                adaptiveHeight={false}
                autoplay={true}
                arrows={false}
                style={{ cursor: 'grab' }}
              >
                <div className="h-[200px] lg:h-[480px]"> 
                  <img src="/images/client1.jpg" alt="Image 4" className="h-full w-full object-cover pr-0 lg:pr-[20px]"/>
                </div>

                <div className="h-[200px] lg:h-[480px]">
                  <img src="/images/client2.jpg" alt="Image 4" className="h-full w-full object-cover pr-0 lg:pr-[20px]"/>
                </div>

                <div className="h-[200px] lg:h-[480px]">
                  <img src="/images/client3.jpg" alt="Image 4" className="h-full w-full object-cover pr-0 lg:pr-[20px]"/>
                </div>

                <div className="h-[200px] lg:h-[480px]">
                  <img src="/images/client4.jpg" alt="Image 4" className="h-full w-full object-cover pr-0 lg:pr-[20px]"/>
                </div>
              </Slider>
            </div>
          </div>
        
          <div className='font-hero-new-regular text-[#3D210F] cursor-pointer hidden lg:flex items-center'
            ref={tl_underline}
            onClick={handleModalToggle}
            onMouseEnter={onMouseEnterUnderline}
            onMouseLeave={onMouseLeaveUnderline}
          >
            <div className='w-[1.5rem] h-[1.5rem] bg-[#D9D9D9] rounded-full mr-4'></div>

            <div className="text-[16px] tracking-[1px] flex relative">
              <span js_an_word="" className="js_an_word font-hero-new-regular text-[0.5rem] lg:text-[16px] tracking-[0.24px]">
                FIND THEIR SESSION LOG IN HERE
              </span>

              <span underline="" className={`${styles_css.underline}`}></span>
            </div>
          </div>
        </div>
      
      
        {showModal && (
          <motion.div
            className="min-h-screen overflow-y-scroll py-24 z-[50] fixed inset-0 bg-[#F3F2ED] bg-opacity-95 flex justify-between items-center flex-col modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: {
              ease: "easeIn",
              duration: 0.5,
            }, }}
            onClick={handleModalToggle}
          >
            <motion.div
              className="w-0.5 h-20 bg-gray-500 border-l-1 border-r-1"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0, transition: {
                ease: "easeIn",
                duration: 0.5,
              }, }}
            ></motion.div>

            <motion.p
              className="mx-10 lg:mx-60 text-[#3D210F] mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: {
                ease: "easeIn",
                duration: 0.5,
              }, }}
              transition={{ duration: 0.5 }}
            >
              The cloudy sky filled up the entire air for the whole pre-wedding session this time. We were worried at first
              since it might rain but thanks God it didn’t happen that way! All the images turned out more dramatic too since
              the whole place darkened because of the cloudy sky. This couple both from Indonesia, but they lived in the USA.
              When we asked them why they chose to have pre-wedding in Bali, apparently Wika was born in Bali so they agreed
              to do it in his hometown and want to remember this moment for the rest of their life. Hearing this reason make
              us fired up and want to do our very best to make their journey memorable with us.
              <br />
              <br />
              As soon as Wika changed into his suit and Meliana changed into her gown after done with her makeup, we start
              leaving and go to a beach first. The wind is quite strong at the moment and this makes the wave in our favor
              since it can create some immense splashes against the big rock there. While on the rock, we also do a small
              flower shower to create more artsy images. Not far from the beach, there is a temple and we go there for the
              next place. Done with the temple, we told both Wika and Meliana to change into their casual outfit since the
              next destination is all about greens. Lastly, we go to another beach and since there is no sunset at all, we
              play with a light at night. We had so much fun thanks to the couple, all the best ahead for both Wika and
              Meliana!
            </motion.p>
          
            <motion.p
              className="mt-4 mx-10 lg:mx-60 text-[#3D210F]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: {
                ease: "easeIn",
                duration: 0.5,
              }, }}
              transition={{ duration: 0.5 }}
            >
              CLICK ANYWHERE TO CLOSE THIS LOG
            </motion.p>
          </motion.div>
        )}
        
        {showModal1 && (
          <AnimatePresence>
            <motion.div
              className="z-[50] fixed inset-0 bg-[#F3F2ED] bg-opacity-95 flex items-center justify-center modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="max-w-lg w-full mx-4 lg:mx-auto bg-white rounded-lg shadow-lg"
                initial={{
                  opacity: 0,
                  
                }}
                animate={{
                  opacity: 1,
                  
                  transition: {
                    ease: "easeOut",
                    duration: 0.5,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    ease: "easeIn",
                    duration: 0.5,
                  },
                  
                }}
              >
                <button
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                  onClick={handleModalToggle2}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{
                      opacity: 0,
                      
                    }}
                    animate={{
                      opacity: 1,
                      
                      transition: {
                        ease: "easeOut",
                        duration: 0.15,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        ease: "easeOut",
                        duration: 0.15,
                      },
                      
                    }}
                  >
                  <path d="M6 18L18 6M6 6l12 12" />
                  </motion.svg>
                </button>

                <div className="relative">
                  <motion.img
                    src={selectedImagePath}
                    alt="Selected Image"
                    className="h-full w-full"
                    initial={{
                      opacity: 0,
                      
                    }}
                    animate={{
                      opacity: 1,
                      
                      transition: {
                        ease: "easeOut",
                        duration: 0.5,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        ease: "easeIn",
                        duration: 0.5,
                      },
                      
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
