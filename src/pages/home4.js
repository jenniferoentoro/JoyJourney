import React, { useLayoutEffect, useEffect , useState, useRef} from 'react';
import gsap from 'gsap';
import axios from 'axios';

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';


export default function home4() {
    const [dataWaysApproach, setDataWaysApproach] = useState([]);
    const [apiStatus, setApiStatus] = useState('idle');

    const timelineRef = useRef(null);

    // API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setApiStatus('loading');
                const response = await axios.get(`https://control.vowrever.com/wp-json/qubick-api/v1/approach`);
                const responseData = response.data;
      
                setDataWaysApproach([
                    ...responseData
                ]);

              setApiStatus('success');
            } catch (error) {
              console.error(error);
              setApiStatus('error');
            }
          };
      
          fetchData();
    }, []);

    useEffect(() => {
        console.log("HOME4_DATA",dataWaysApproach)
    }, [dataWaysApproach]);

    useLayoutEffect(() => {
        if(dataWaysApproach && apiStatus == 'success'){
            gsap.registerPlugin(ScrollTrigger);

            const ctx = gsap.context(() => {
                const items = document.querySelectorAll(".home2_aprroach");

                items.forEach(function (item, index) {
                    const tl = gsap.timeline({ paused: true })
                                .fromTo(item.querySelector(".approachBackground"), { opacity: 0, xPercent:100 }, { opacity: 1,xPercent:0,duration: .8 })
                                .fromTo(item.querySelector(".approachImage"), { opacity: 0 },{ opacity: 1,duration: .4 },"<.3")
                                .fromTo(item.querySelector(".approachParagraf"), { opacity: 0 },{ opacity: 1,duration: .4 },"<");

                    item.querySelector("h2").addEventListener("mouseenter", () => tl.play());
                    item.querySelector("h2").addEventListener("mouseleave", () => tl.reverse());       
                    
                });

                gsap.set(".home4_fadeIn",{
                    autoAlpha: 0,
                })

                timelineRef.current = gsap.timeline({ 
                    scrollTrigger:{
                        trigger: "#whyus",
                        start: 'top top+=10%'
                    }
                })
                .fromTo(".home4_fadeIn",{
                    autoAlpha: 0,
                },{
                    autoAlpha: 1,
                    stagger: .5,
                    
                })
            });
            return () => ctx.revert();
        }
        
        return () => {};
    }, [dataWaysApproach,apiStatus]);

    return (
        <div id="whyus" className='relative text-[#3D210F] bg-[#f3f2ed] py-24 lg:mb-0'>
            <h6 className='home4_fadeIn text-center text-[0.75rem] tracking-[0.24px] font-hero-new-regular'>WHY US AS PART OF YOUR GREATEST DAY IN BALI</h6>
            <h2 className='home4_fadeIn text-center text-[2rem] lg:text-[3rem] tracking-[1.44px] font-the-seasons-bold mt-2 lg:mt-4'>OUR WAYS OF APPROACH</h2>

            <div className='w-full flex flex-col md:flex-row justify-between'>
                <div className='home4_fadeIn
                        home2_aprroach
                        realtive md:translate-x-[15%] translate-y-[0] md:translate-y-[-18%]
                        w-full md:w-fit
                        p-4 lg:p-8 flex flex-col overflow-x-hidden
                    '
                >
                    <div className='approachBackground w-full h-full absolute top-0 right-0 bottom-0 left-0 -z-[1]'
                        style={{
                            backgroundColor: `${dataWaysApproach.length > 0 ? dataWaysApproach[0]?.color : "#F3F2ED"}`,
                        }}
                    ></div>

                    <div className="
                            approachImage
                            self-end mb-4
                            w-full md:w-[400px] 
                            h-[150px] md:h-[250px]
                            bg-cover bg-center bg-no-repeat
                        "
                        style={{
                            backgroundImage: `url(${dataWaysApproach.length > 0 ? dataWaysApproach[0]?.image : ""})`,
                        }}
                    ></div>

                    <h2 className='approachTitle cursor-default font-the-seasons-bold text-[1.5rem] md:text-[1.75rem] lg:text-[2.25rem] tracking-[1.08px]'>
                        {dataWaysApproach.length > 0 ? dataWaysApproach[0]?.title : ""}
                    </h2>

                    <div className='approachParagraf cursor-default font-hero-new-regular text-[11px] lg:text-[16px] lg:leading-[24px]' dangerouslySetInnerHTML={{ __html: dataWaysApproach.length > 0 ? dataWaysApproach[0]?.desc : "" }}>
                    </div>
                </div>

                <div className='home4_fadeIn
                        home2_aprroach
                        realtive translate-x-[0] lg:translate-x-[-8%] translate-y-[0] md:translate-y-[10%] lg:translate-y-[20%]
                        w-full md:w-fit
                        p-4 lg:p-8 flex flex-col overflow-x-hidden
                    '
                >
                    <div className='approachBackground w-full h-full absolute top-0 right-0 bottom-0 left-0 -z-[1]'
                        style={{
                            backgroundColor: `${dataWaysApproach.length > 0 ? dataWaysApproach[1]?.color : "#F3F2ED"}`,
                        }}
                    ></div>

                    <div className="
                            approachImage
                            self-end mb-4
                            w-full md:w-[400px] 
                            h-[150px] md:h-[250px]
                            bg-cover bg-center bg-no-repeat
                        "
                        style={{
                            backgroundImage: `url(${dataWaysApproach.length > 0 ? dataWaysApproach[1]?.image : ""})`,
                        }}
                    ></div>

                    <h2 className='approachTitle cursor-default font-the-seasons-bold text-[1.5rem] md:text-[1.75rem] lg:text-[2.25rem] tracking-[1.08px]'>
                        {dataWaysApproach.length > 0 ? dataWaysApproach[1]?.title : ""}
                    </h2>

                    <div className='approachParagraf cursor-default font-hero-new-regular text-[11px] lg:text-[16px] lg:leading-[24px]' dangerouslySetInnerHTML={{ __html: dataWaysApproach.length > 0 ? dataWaysApproach[1]?.desc : "" }}>
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-col md:flex-row justify-between'>
                <div className='home4_fadeIn
                        home2_aprroach
                        realtive md:translate-x-[5%] translate-y-[0] md:translate-y-[-20%]
                        w-full md:w-fit
                        p-4 lg:p-8 flex flex-col overflow-x-hidden
                    '
                >
                    <div className='approachBackground w-full h-full absolute top-0 right-0 bottom-0 left-0 -z-[1]'
                        style={{
                            backgroundColor: `${dataWaysApproach.length > 0 ? dataWaysApproach[2]?.color : "#F3F2ED"}`,
                        }}
                    ></div>

                    <div className="
                            approachImage
                            self-end mb-4
                            w-full md:w-[400px] 
                            h-[150px] md:h-[250px]
                            bg-cover bg-center bg-no-repeat
                        "
                        style={{
                            backgroundImage: `url(${dataWaysApproach.length > 0 ? dataWaysApproach[2]?.image : ""})`,
                        }}
                    ></div>

                    <h2 className='approachTitle cursor-default font-the-seasons-bold text-[1.5rem] md:text-[1.75rem] lg:text-[2.25rem] tracking-[1.08px]'>
                        {dataWaysApproach.length > 0 ? dataWaysApproach[2]?.title : ""}
                    </h2>

                    <div className='approachParagraf cursor-default font-hero-new-regular text-[11px] lg:text-[16px] lg:leading-[24px]' dangerouslySetInnerHTML={{ __html: dataWaysApproach.length > 0 ? dataWaysApproach[2]?.desc : "" }}>
                    </div>
                </div>

                <div className='home4_fadeIn
                        home2_aprroach
                        relative md:-translate-x-[5%] translate-y-[0] md:translate-y-[5%]
                        w-full md:w-fit
                        p-4 lg:p-8 flex flex-col overflow-x-hidden
                    '
                >
                    <div className='approachBackground w-full h-full absolute top-0 right-0 bottom-0 left-0 -z-[1]'
                        style={{
                            backgroundColor: `${dataWaysApproach.length > 0 ? dataWaysApproach[3]?.color : "#F3F2ED"}`,
                        }}
                    ></div>

                    <div className="
                            approachImage
                            self-end mb-4
                            w-full md:w-[400px] 
                            h-[150px] md:h-[250px]
                            bg-cover bg-center bg-no-repeat
                        "
                        style={{
                            backgroundImage: `url(${dataWaysApproach.length > 0 ? dataWaysApproach[3]?.image : ""})`,
                        }}
                    ></div>

                    <h2 className='approachTitle cursor-default font-the-seasons-bold text-[1.5rem] md:text-[1.75rem] lg:text-[2.25rem] tracking-[1.08px] md:text-right'>
                        {dataWaysApproach.length > 0 ? dataWaysApproach[3]?.title : ""}
                    </h2>

                    <div className='approachParagraf cursor-default font-hero-new-regular text-[11px] lg:text-[16px] lg:leading-[24px]' dangerouslySetInnerHTML={{ __html: dataWaysApproach.length > 0 ? dataWaysApproach[3]?.desc : "" }}>
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-col md:flex-row justify-between'>
                <div className='home4_fadeIn
                        home2_aprroach
                        relative md:translate-x-[11%] -translate-y-[0] md:-translate-y-[37%]
                        w-full md:w-fit
                        p-4 lg:p-8 flex flex-col overflow-x-hidden
                    '
                >
                    <div className='approachBackground w-full h-full absolute top-0 right-0 bottom-0 left-0 -z-[1]'
                        style={{
                            backgroundColor: `${dataWaysApproach.length > 0 ? dataWaysApproach[4]?.color : "#F3F2ED"}`,
                        }}
                    ></div>

                    <div className="
                            approachImage
                            self-end mb-4
                            w-full md:w-[400px] 
                            h-[150px] md:h-[250px]
                            bg-cover bg-center bg-no-repeat
                        "
                        style={{
                            backgroundImage: `url(${dataWaysApproach.length > 0 ? dataWaysApproach[4]?.image : ""})`,
                        }}
                    ></div>

                    <h2 className='approachTitle cursor-default font-the-seasons-bold text-[1.5rem] md:text-[1.75rem] lg:text-[2.25rem] tracking-[1.08px]'>
                        {dataWaysApproach.length > 0 ? dataWaysApproach[4]?.title : ""}
                    </h2>

                    <div className='approachParagraf cursor-default font-hero-new-regular text-[11px] lg:text-[16px] lg:leading-[24px]' dangerouslySetInnerHTML={{ __html: dataWaysApproach.length > 0 ? dataWaysApproach[4]?.desc : "" }}>
                    </div>
                </div>

                <div className='home4_fadeIn
                        home2_aprroach
                        relative md:translate-x-[-10%]
                        w-full md:w-fit
                        p-4 lg:p-8 flex flex-col overflow-x-hidden
                    '
                >
                    <div className='approachBackground w-full h-full absolute top-0 right-0 bottom-0 left-0 -z-[1]'
                        style={{
                            backgroundColor: `${dataWaysApproach.length > 0 ? dataWaysApproach[5]?.color : "#F3F2ED"}`,
                        }}
                    ></div>

                    <div className="
                            approachImage
                            self-end mb-4
                            w-full md:w-[400px] 
                            h-[150px] md:h-[250px]
                            bg-cover bg-center bg-no-repeat
                        "
                        style={{
                            backgroundImage: `url(${dataWaysApproach.length > 0 ? dataWaysApproach[5]?.image : ""})`,
                        }}
                    ></div>

                    <h2 className='approachTitle cursor-default font-the-seasons-bold text-[1.5rem] md:text-[1.75rem] lg:text-[2.25rem] tracking-[1.08px]'>
                        {dataWaysApproach.length > 0 ? dataWaysApproach[5]?.title : ""}
                    </h2>

                    <div className='approachParagraf cursor-default font-hero-new-regular text-[11px] lg:text-[16px] lg:leading-[24px]' dangerouslySetInnerHTML={{ __html: dataWaysApproach.length > 0 ? dataWaysApproach[5]?.desc : "" }}>
                    </div>
                </div>
            </div>
        </div>
  );
}
