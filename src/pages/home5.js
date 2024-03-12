import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import gsap from 'gsap';
import axios from 'axios';

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import styles from '../styles/home5.module.css';



export default function Home5() {

    const [dataOffer, setDataOffer] =  useState();
    const [apiStatus, setApiStatus] = useState('idle');

    const tl_starting = useRef();
    const tl_offer_1 = useRef();
    const tl_offer_2 = useRef();
    const tl_offer_3 = useRef();
    const tl_offer_1_underline = useRef();
    const tl_offer_2_underline = useRef();
    const tl_offer_3_underline = useRef();

    const [prevHover, setPrevHover] = useState();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [listeningHover, setListening] = useState(false);


    // API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setApiStatus('loading');
                const response = await axios.get(`https://control.vowrever.com/wp-json/qubick-api/v1/offer`);
                const responseData = response.data;
      
                setDataOffer([
                    {
                      title: responseData.home_what_we_can_offer_title_no_1,
                      desc: responseData.home_what_we_can_offer_description_no_1,
                      image: responseData.home_what_we_can_offer_image_no_1,
                    },
                    {
                      title: responseData.home_what_we_can_offer_title_no_2,
                      desc: responseData.home_what_we_can_offer_description_no_2,
                      image: responseData.home_what_we_can_offer_image_no_2,
                    },
                    {
                      title: responseData.home_what_we_can_offer_title_no_3,
                      desc: responseData.home_what_we_can_offer_description_no_3,
                      image: responseData.home_what_we_can_offer_image_no_3,
                    },
                ]);

              setApiStatus('success');
            } catch (error) {
              console.error(error);
              setApiStatus('error');
            }
          };
      
          fetchData();
    }, []);
    
    useLayoutEffect(() => {
        if(dataOffer && apiStatus == 'success'){
            gsap.registerPlugin(ScrollTrigger);
            const ctx = gsap.context(() => {
                tl_offer_1_underline.current = gsap.timeline({
                    paused: true,
                })
                .fromTo("#home5_1 [underline]", {
                    width: "0%",
                    left: "0%",
                }, {
                    width: "100%",
                    duration: 1, 
                })
    
                tl_offer_2_underline.current = gsap.timeline({
                    paused: true,
                })
                .fromTo("#home5_2 [underline]", {
                    width: "0%",
                    left: "0%",
                }, {
                    width: "100%",
                    duration: 1, 
                })
    
                tl_offer_3_underline.current = gsap.timeline({
                    paused: true,
                })
                .fromTo("#home5_3 [underline]", {
                    width: "0%",
                    left: "0%",
                }, {
                    width: "100%",
                    duration: 1, 
                })
    
                tl_offer_1.current = gsap.timeline({
                    paused: true,
                    onComplete: () => {
                        setPrevHover(1)
                        setListening(true)
                    }
                })
                .fromTo("#home5_1",{
                    width: (window.innerWidth >= 1200 ? "25%" : "100%")
                },{
                    width: (window.innerWidth >= 1200 ? "50%" : "100%")
                },"<")
                // .fromTo("#home5_1 .home5_left",{width: "100%"},{width: (window.innerWidth >= 1200 ? "50%" : "100%")},"<")
                // .fromTo("#home5_1 .home5_right",{width: 0},{width: (window.innerWidth >= 1200 ? "50%" : "100%")},"<")
                .fromTo("#home5_1 .home5_left_paragraf",{autoAlpha: 0},{autoAlpha: 1})
                .fromTo("#home5_1 .home5_left a",{autoAlpha: 0},{autoAlpha: 1}) 
                .fromTo("#home5_1 img",{autoAlpha: 0, xPercent: 130},{autoAlpha:1, xPercent: 0},"<");
    
                tl_offer_2.current = gsap.timeline({
                    paused: true,
                    onComplete: () => {
                        setPrevHover(2)
                        setListening(true)
                    }
                })
                .fromTo("#home5_2",{
                    width: (window.innerWidth >= 1200 ? "25%" : "100%")
                },{
                    width: (window.innerWidth >= 1200 ? "50%" : "100%")
                },"<")
                // .fromTo("#home5_2 .home5_left",{width: "100%"},{width: (window.innerWidth >= 1200 ? "50%" : "100%")},"<")
                // .fromTo("#home5_2 .home5_right",{width: 0},{width: (window.innerWidth >= 1200 ? "50%" : "100%")},"<")
                .fromTo("#home5_2 .home5_left_paragraf",{autoAlpha: 0},{autoAlpha: 1})
                .fromTo("#home5_2 .home5_left a",{autoAlpha: 0},{autoAlpha: 1}) 
                .fromTo("#home5_2 img",{autoAlpha: 0, xPercent: 130},{autoAlpha:1, xPercent: 0},"<");
    
                tl_offer_3.current = gsap.timeline({
                    paused: true,
                    onComplete: () => {
                        setPrevHover(3)
                        setListening(true)
                    }
                })
                .fromTo("#home5_3",{
                    width: (window.innerWidth >= 1200 ? "25%" : "100%")
                },{
                    width: (window.innerWidth >= 1200 ? "50%" : "100%")
                },"<")
                // .fromTo("#home5_3 .home5_left",{width: "100%"},{width: (window.innerWidth >= 1200 ? "50%" : "100%")},"<")
                // .fromTo("#home5_3 .home5_right",{width: 0},{width: (window.innerWidth >= 1200 ? "50%" : "100%")},"<")
                .fromTo("#home5_3 .home5_left_paragraf",{autoAlpha: 0},{autoAlpha: 1})
                .fromTo("#home5_3 .home5_left a",{autoAlpha: 0},{autoAlpha: 1}) 
                .fromTo("#home5_3 img",{autoAlpha: 0, xPercent: 130},{autoAlpha:1, xPercent: 0},"<");
    
                tl_starting.current = 
                gsap.timeline({
                    scrollTrigger:{
                        trigger: "#Home5",
                        start: "top bottom-=100px", 
                        // markers: true,
                    },
                    onComplete: () => {
                        setListening(false)
                        tl_offer_1.current.restart()
                    }
                })
                // .set(".home5_right",{width: 0},"<")
                .set(".home5_left_paragraf",{autoAlpha: 0},"<")
                .set(".home5_left a",{autoAlpha: 0},"<")
                // .set(".home5_right",{width: 0},"<")
                .set("img",{autoAlpha: 0},"<")
                
                .fromTo(".home5_head_animation_hr",{
                    width: 0,
                    autoAlpha: 0,
                },{
                    width: (window.innerWidth >= 1200 ? "75%" : "15%"),
                    autoAlpha: 1,
                    duration: .7
                })
    
                .fromTo(".home5_head_animation_text span",{
                    autoAlpha: 0,
                },{
                    autoAlpha: 1,
                    stagger: 0.01
                })
    
                .fromTo(".home5_left_number",{
                    autoAlpha: 0,
                    yPercent: -10,
                },{
                    autoAlpha: 1,
                    yPercent: 0,
                })
    
                .fromTo(".home5_border",{height: 0},{height: "100%"},"<")
                .fromTo(".home5_left_title",{autoAlpha: 0},{autoAlpha: 1})
    
                
            });
            return () => ctx.revert();
        }
    }, [dataOffer,apiStatus]);

    if (!dataOffer) {
        return <div></div>;
    }

    const onMouseEnter = (event) => {
        console.log("listeningHover",listeningHover)

        const elementId = event.currentTarget.id;
        const lastChar = elementId[elementId.length - 1];
        const lastCharAsNumber = parseInt(lastChar, 10);

        if (listeningHover && hoveredIndex !== lastCharAsNumber) {
            setHoveredIndex(lastCharAsNumber);
            
            if(lastCharAsNumber == 1 && prevHover != 1){
                onMouseLeave();
                tl_offer_1.current.play();
                setListening(false)
            }
            else if(lastCharAsNumber == 2 && prevHover != 2){
                onMouseLeave();
                tl_offer_2.current.play();
                setListening(false)
            }
            else if(lastCharAsNumber == 3 && prevHover != 3){
                onMouseLeave();
                tl_offer_3.current.play();
                setListening(false)
            }
        }
    }

    const onMouseLeave = () => {
        if(prevHover == 1){
            tl_offer_1.current.reverse(1);
        }
        else if(prevHover == 2){
            tl_offer_2.current.reverse(1);
        }
        else if(prevHover == 3){
            tl_offer_3.current.reverse(1);
        }
    }

    const onMouseEnterUnderline = (index) => {
        if(index == 1){
            tl_offer_1_underline.current.play();
        }
        else if(index == 2){
            tl_offer_2_underline.current.play();
        }
        else if(index == 3){
            tl_offer_3_underline.current.play();
        }
    }

    const onMouseLeaveUnderline = (index) => {
        if(index == 1){
            tl_offer_1_underline.current.reverse();
        }
        else if(index == 2){
            tl_offer_2_underline.current.reverse();
        }
        else if(index == 3){
            tl_offer_3_underline.current.reverse();
        }
    }


    return (
        <div id="Home5" className='home5_section relative text-[#3D210F] bg-[#f3f2ed] p-4 lg:px-12 2xl:px-24'>
            <div className='w-full flex justify-between mb-8'>
                <hr className='home5_head_animation_hr w-full border-[#3D210F] translate-y-[10px]'/>
                <h2 className='home5_head_animation_text text-right lg:text-center text-[0.75rem] lg:text-[0.75rem] tracking-[0.24px] font-hero-new-regular'>
                    {"WHAT WE CAN OFFER FOR YOUR LEGACY IN BALI".split('').map((char, index) => (
                        <span key={index}>{char}</span>
                    ))}
                </h2>
            </div>
            
            <div className='w-full flex flex-col md:flex-row'>
                <div className={`relative
                        lg:min-h-[58vh] 
                        grid grid-cols-1 md:flex
                        md:pr-4 lg:pr-4
                        my-4 md:my-0
                    `}
                    id="home5_1"
                    ref={tl_offer_1}
                    onMouseEnter={onMouseEnter}
                >
                    <div className="home5_border
                            border-b-[1px] border-[#3D210F] md:border-b-0 md:border-r-[1px]
                            absolute right-0
                        "
                    ></div> 
        
                    <div className='home5_left relative
                            w-full h-full
                            py-4 md:py-0 pl-0 md:pl-4 
                            order-2 md:order-1
                        '
                    >
                        <div className='home5_left_number font-frank-ruhl-libre-regular text-[4rem] tracking-[0.64px] -translate-y-[20%]'>01</div>
                        <div className='home5_left_title font-the-seasons-bold text-[2rem] lg:text-[1.625rem] tracking-[0.78px] mt-0 lg:mt-4 w-full'
                            dangerouslySetInnerHTML={{ __html: dataOffer[0].title }}
                        >
                        </div>
        
                        <p className='home5_left_paragraf w-full font-hero-new-regular text-[14px] lg:text-[1rem] tracking-[0.24px] leading-[24px] mt-4 lg:mt-8 mb-[2rem] md:mb-0' 
                            dangerouslySetInnerHTML={{ __html: dataOffer[0].desc }}
                        >
                        </p>
                        
                        <a js_work_link="" 
                            className={`${styles.js_work_link} w-fit font-hero-new-regular text-[12px] md:absolute md:bottom-0`} 
                            href='#contact'
                            ref={tl_offer_1_underline}
                            onMouseEnter={()=>{onMouseEnterUnderline(1)}}
                            onMouseLeave={()=>{onMouseLeaveUnderline(1)}}
                        >
                            <span js_an_word="" className="js_an_word font-hero-new-regular text-[12px] lg:text-[0.75rem] tracking-[0.24px]">ASK FOR A QUOTE</span>
                            <span underline="" className={`${styles.underline}`}></span>
                        </a>
                    </div>
                    
                    <img src={dataOffer[0].image ? dataOffer[0].image : '/images/image_placeholder.jpg'}
                        className="max-w-[unset] w-auto h-full absolute right-4"
                    />
                </div>

                <div className={`relative
                        lg:min-h-[58vh] 
                        grid grid-cols-1 md:flex
                        md:pr-4 lg:pr-4
                        my-4 md:my-0
                    `}
                    id="home5_2"
                    ref={tl_offer_2}
                    onMouseEnter={onMouseEnter}
                >
                    <div className="home5_border
                            border-b-[1px] border-[#3D210F] md:border-b-0 md:border-r-[1px]
                            absolute right-0
                        "
                    ></div> 
        
                    <div className='home5_left relative
                            w-full h-full
                            py-4 md:py-0 pl-0 md:pl-4 
                            order-2 md:order-1
                        '
                    >
                        <div className='home5_left_number font-frank-ruhl-libre-regular text-[4rem] tracking-[0.64px] -translate-y-[20%]'>02</div>
                        <div className='home5_left_title font-the-seasons-bold text-[2rem] lg:text-[1.625rem] tracking-[0.78px] mt-0 lg:mt-4 w-full'
                            dangerouslySetInnerHTML={{ __html: dataOffer[1].title }}
                        >
                        </div>
        
                        <p className='home5_left_paragraf w-full font-hero-new-regular text-[14px] lg:text-[1rem] tracking-[0.24px] leading-[24px] mt-4 lg:mt-8 mb-[2rem] md:mb-0' 
                            dangerouslySetInnerHTML={{ __html: dataOffer[1].desc }}
                        >
                        </p>
                        
                        <a js_work_link="" 
                            className={`${styles.js_work_link} w-fit font-hero-new-regular text-[12px] md:absolute md:bottom-0`} 
                            href='#contact'
                            ref={tl_offer_2_underline}
                            onMouseEnter={()=>{onMouseEnterUnderline(2)}}
                            onMouseLeave={()=>{onMouseLeaveUnderline(2)}}
                        >
                            <span js_an_word="" className="js_an_word font-hero-new-regular text-[12px] lg:text-[0.75rem] tracking-[0.24px]">ASK FOR A QUOTE</span>
                            <span underline="" className={`${styles.underline}`}></span>
                        </a>
                    </div>

                    <img src={dataOffer[1].image ? dataOffer[1].image : '/images/image_placeholder.jpg'}
                        className="max-w-[unset] w-auto h-full absolute right-4"
                    />
                </div>

                <div className={`relative
                        lg:min-h-[58vh] 
                        grid grid-cols-1 md:flex
                        md:pr-8
                        my-4 md:my-0
                    `}
                    id="home5_3"
                    ref={tl_offer_3}
                    onMouseEnter={onMouseEnter}
                >
                    <div className='home5_left relative
                            w-full h-full
                            py-4 md:py-0 pl-0 md:pl-4 
                            order-2 md:order-1
                        '
                    >
                        <div className='home5_left_number font-frank-ruhl-libre-regular text-[4rem] tracking-[0.64px] -translate-y-[20%]'>03</div>
                        <div className='home5_left_title font-the-seasons-bold text-[2rem] lg:text-[1.625rem] tracking-[0.78px] mt-0 lg:mt-4 w-full'
                            dangerouslySetInnerHTML={{ __html: dataOffer[2].title }}
                        >
                        </div>
        
                        <p className='home5_left_paragraf w-full font-hero-new-regular text-[14px] lg:text-[1rem] tracking-[0.24px] leading-[24px] mt-4 lg:mt-8 mb-[2rem] md:mb-0' 
                            dangerouslySetInnerHTML={{ __html: dataOffer[2].desc }}
                        >
                        </p>
                        
                        <a js_work_link="" 
                            className={`${styles.js_work_link} w-fit font-hero-new-regular text-[12px] md:absolute md:bottom-0`} 
                            href='#contact'
                            ref={tl_offer_3_underline}
                            onMouseEnter={()=>{onMouseEnterUnderline(3)}}
                            onMouseLeave={()=>{onMouseLeaveUnderline(3)}}
                        >
                            <span js_an_word="" className="js_an_word font-hero-new-regular text-[12px] lg:text-[0.75rem] tracking-[0.24px]">ASK FOR A QUOTE</span>
                            <span underline="" className={`${styles.underline}`}></span>
                        </a>
                    </div>
                    
                    <img src={dataOffer[2].image ? dataOffer[2].image : '/images/image_placeholder.jpg'}
                        className="max-w-[unset] w-auto h-full absolute right-4"
                    />
                </div>
                {/* <OfferItem timeline={tl} key={index} data={offer} index={index} isLastItem={index === dataOffer.length - 1}/> */}
            </div>
        </div>
    );
}
