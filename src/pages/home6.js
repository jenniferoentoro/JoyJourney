import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import gsap from 'gsap';
import axios from 'axios';

// import WaterWave from 'react-water-wave';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/home6.module.css';



export default function Home6() {

    const [dataAPI, setDataAPI] =  useState({
        home6_cloud : '/images/image_placeholder.jpg',
        home6_bird : '/images/image_placeholder.jpg',
        home6_distance : '/images/image_placeholder.jpg',
        home6_island : '/images/image_placeholder.jpg',
        home6_island_center : '/images/image_placeholder.jpg',
        home6_gate_right : '/images/image_placeholder.jpg',
        home6_gate_left : '/images/image_placeholder.jpg',
        home6_gate_rippleimage : '/images/image_placeholder.jpg',
    });
    const [apiStatus, setApiStatus] = useState('idle');
    const [countdown, setCountdown] = useState(5);


    const tl_starter = useRef();
    const tl_gate = useRef();
    const tl_minigame = useRef() 
    const tl_minigame_indicator = useRef() 
    const ref_home6_parent = useRef();

    const ref_home6_minigame = useRef();
    const ref_home6_minigame_text = useRef();
    const ref_home6_minigame_game = useRef();
    const ref_home6_minigame_indicator = useRef();
    const ref_home6_minigame_countdown = useRef(null);


    // API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setApiStatus('loading');
                const response = await axios.get(`https://control.vowrever.com/wp-json/qubick-api/v1/offer`);
      
                setDataAPI({...dataAPI,
                    home6_cloud : '/images/home6_bg_cloud.png',
                    home6_bird : '/images/home6_bg_bird.png',
                    home6_distance : '/images/home6_bg_island_distance.png',
                    home6_island : '/images/home6_bg_island.png',
                    home6_island_center : '/images/home6_bg_island_center.png',
                    home6_gate_right : '/images/home6_bg_island_center_gate_right.png',
                    home6_gate_left : '/images/home6_bg_island_center_gate_left.png',
                    home6_gate_rippleimage : '/images/home6_minigame.png',
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
        gsap.set(ref_home6_minigame.current,{autoAlpha: 0})
        gsap.set(ref_home6_minigame_game.current,{autoAlpha: 0})
        gsap.set(ref_home6_minigame_indicator.current,{xPercent: 100})

        if(dataAPI && apiStatus == 'success'){
            const ctx = gsap.context(() => {
                gsap.registerPlugin(ScrollTrigger);

                tl_minigame.current = gsap.timeline({
                    paused: true, 
                    onComplete: ()=>{
                        tl_minigame_indicator.current.play()
                    }
                }) 
                .fromTo(ref_home6_minigame.current,{
                    autoAlpha: 0,
                },{
                    autoAlpha: 1
                })
                .fromTo(ref_home6_minigame_text.current,{
                    autoAlpha: 1,
                },{
                    autoAlpha: 0,
                    duration: 6,
                })
                .fromTo(ref_home6_minigame_game.current,{
                    autoAlpha: 0,
                },{
                    autoAlpha: 1,
                })

                tl_minigame_indicator.current = gsap.timeline({
                    paused: true, 
                }) 
                .fromTo(ref_home6_minigame_indicator.current,{
                    xPercent: 100,
                },{
                    xPercent: 0,
                    duration: 8.8,
                    delay: 3
                })
                .add(startCountdown,"<")

                
                gsap.fromTo(".home6_bg_fade",{
                    autoAlpha: 0,
                },{
                    autoAlpha: 1,
                    scrollTrigger:{
                        trigger: ref_home6_parent.current,
                        start: "top center",
                    }
                })

                tl_starter.current = gsap.timeline({
                })  

                .fromTo("#home6_text",{
                    yPercent: 100,
                },{
                    yPercent: 0,
                    scrollTrigger: {
                        trigger: ref_home6_parent.current,
                        start: "top center",
                        end: "top top+=10%",
                        scrub: true,
                    }
                })

                .fromTo("#home6_bg_island_distance",{
                    yPercent: 10,
                },{
                    yPercent: 0,
                    scrollTrigger: {
                        trigger: ref_home6_parent.current,
                        start: "top center",
                        end: "top top",
                        scrub: true,
                    }
                })
    
                .fromTo("#home6_bg_bird",{
                    yPercent: 30,
                },{
                    yPercent: 0,
                    scrollTrigger: {
                        trigger: ref_home6_parent.current,
                        start: "top center",
                        end: "bottom bottom",
                        scrub: true,
                    }
                })
    
                .fromTo("#home6_bg_island_center_container",{
                    yPercent: 30,
                },{
                    yPercent: 0,
                    scrollTrigger: {
                        trigger: ref_home6_parent.current,
                        start: "top center",
                        end: "center center",
                        scrub: true,
                    }
                })
    
                tl_gate.current = gsap.timeline({
                    defaults:{
                        duration: 2,
                    },
                    scrollTrigger: {
                        trigger: ref_home6_parent.current,
                        start: "center center",
                    }
                })
                .fromTo("#home6_bg_island_center_gate_left",{
                    xPercent: 0,
                },{
                    xPercent: -8,
                })
                .fromTo("#home6_bg_island_center_gate_right",{
                    xPercent: 0,
                },{
                    xPercent: 8,
                },"<")
                .fromTo("#home6_bg_island_center_gate_rippleimage",{
                    autoAlpha: 0,
                    zIndex: 3,
                },{
                    autoAlpha: 1,
                    zIndex: 5,
                },"-=.5")
                
            });
            return () => ctx.revert();
        }
    }, [dataAPI,apiStatus]);

    const island_center_handler = () => {
        document.body.classList.add('overflow-hidden');
        tl_minigame.current.play()
    }

    const startCountdown = () => {
        const intervalId = setInterval(() => {
          // If countdown reaches 0, stop the interval
          if (countdown <= 0) {
            clearInterval(intervalId);
            console.log("Countdown complete!");
            // Add your logic for space or left-click here
            // Example: handleSpaceOrLeftClick();
          } else {
            // Update the countdown value
            console.log("Countdown",countdown);
            setCountdown((prevCount) => (prevCount > 0 ? prevCount - 1 : 0))
            // Update the displayed value during the animation
            // ref_home6_minigame_countdown.current.textContent =
            //   countdown < 10 ? `0${countdown}` : countdown;
          }
        }, 1000); // Update every second (1000 milliseconds)
    };

    const handleSpaceOrLeftClick = () => {
        // Add your logic here for handling space or left-click
        console.log("Space or left-click detected!",countdown);
        window.location.href = '/works';
    };

    useEffect(() => {
        if(countdown == 0){
            // Add event listeners for space and left-click
            const handleKeyPress = (event) => {
                if (event.code === 'Space') {
                handleSpaceOrLeftClick();
                }
            };

            const handleMouseClick = () => {
                handleSpaceOrLeftClick();
            };

            window.addEventListener('keydown', handleKeyPress);
            window.addEventListener('click', handleMouseClick);

            // Clean up event listeners on component unmount
            return () => {
                window.removeEventListener('keydown', handleKeyPress);
                window.removeEventListener('click', handleMouseClick);
            };
        }
    }, [countdown]);

    if (!dataAPI) {
        return <div></div>;
    }

    return (
        <div id="Home6" ref={ref_home6_parent}
            className='home6_section relative text-[#3D210F] bg-[#f3f2ed] min-h-[100v]'
        >
            <div className="relative">
                <div id="home6_text" className="home6_bg_fade absolute w-full h-fit z-[2] top-[5em] flex flex-col items-center">
                    <h2 className="font-the-seasons-bold text-[3em]">
                        Everyone deserve the wildly ethereal &<br/>
                        unforgettable wedding of their dreams.
                    </h2>
                    <p className="hero-new-regular text-[1em]">SOMETHING INSPIRING WAITING YOU BEHIND THE DOOR</p>
                </div>

                <img src={dataAPI.home6_cloud}
                    id="home6_bg_cloud"
                    className="home6_bg_fade w-full z-[0] relative"
                />
                
                <img src={dataAPI.home6_bird}
                    id="home6_bg_bird"
                    className="home6_bg_fade w-full absolute z-[1] left-0 top-0"
                />

                <img src={dataAPI.home6_distance}
                    id="home6_bg_island_distance"
                    className="home6_bg_fade w-full absolute z-[2] left-0 top-0"
                />

                <img src={dataAPI.home6_island}
                    id="home6_bg_island"
                    className="home6_bg_fade w-full absolute z-[3] left-0 top-0"
                />

                <div id="home6_bg_island_center_container"
                    className={`home6_bg_fade  w-full absolute z-[4] left-0 top-0`}
                    
                >
                    <img src={dataAPI.home6_island_center}
                        className="w-full relative z-[4]"
                    />

                    {/* <WaterWave
                        imageUrl={dataAPI.home6_gate_rippleimage}
                        id="home6_bg_island_center_gate_rippleimage"
                        className="w-full h-screen cursor-pointer absolute z-[3] left-0 top-0"
                    >
                        {({ pause, play }) => (
                            <img src={dataAPI.home6_gate_rippleimage}
                            id="home6_bg_island_center_gate_rippleimage"
                            className="w-full cursor-pointer absolute z-[3] left-0 top-0"
                            onClick={island_center_handler}
                        />
                        )}
                    </WaterWave> */}

                    <img src={dataAPI.home6_gate_rippleimage}
                        id="home6_bg_island_center_gate_rippleimage"
                        className="w-full cursor-pointer absolute z-[3] left-0 top-0"
                        onClick={island_center_handler}
                    />

                    <img src={dataAPI.home6_gate_right}
                        id="home6_bg_island_center_gate_right"
                        className="w-full absolute z-[3] left-0 top-0"
                    />

                    <img src={dataAPI.home6_gate_left}
                        id="home6_bg_island_center_gate_left"
                        className="w-full absolute z-[3] left-0 top-0"
                    />
                </div>
            </div>

            <div id="Home6_MiniGame" ref={ref_home6_minigame}
                className="z-[6] fixed left-0 top-0 h-screen w-full bg-[#f3f2ed] bg-opacity-[0.93] flex flex-col justify-center items-center"
            >
                <div id="Home6_MiniGame_Text" ref={ref_home6_minigame_text}
                    className="h-full w-full absolute top-0 left-0 text-[#3D210F] flex flex-col justify-center items-center"
                >
                    <p className="text-center text-[1.5em] lg:text-[3em] font-the-seasons-bold">
                        Play the mini-game to unveil what is behind the dorr!
                    </p>
                    <p className="mb-8 text-center text-[12px] lg:text-[1em] font-hero-new-regular">
                        WATCH YOUR TIMING AND PRESS [SPACE] or [LEFT CLICK]!
                    </p>
                </div>

                <div id="Home6_MiniGame_Game" ref={ref_home6_minigame_game}
                    className="absolute top-0 left-0 w-full lg:w-[85%] h-full flex items-center relative overflow-hidden"
                >
                    <div className="w-full">
                        <div ref={ref_home6_minigame_countdown} 
                            className={`absolute top-[48%] lg:top-[44%] left-[6.5%] lg:left-[6%] z-[7] font-the-seasons-bold text-[#3D210F] text-[1.2em] lg:text-[4em] lg:px-4`}
                        >
                            {countdown == 0 ? <span className="text-[.7em]">GO!</span> : <span>0{countdown}</span>}
                        </div>

                        <img src="/images/home6_minigame_indicator.png"
                            className="w-full relative z-[1]"
                        />

                        <p className="absolute top-[44%] lg:top-[30%] left-[23%] lg:left-[24%] font-the-seasons-bold text-[1em] lg:text-[3em]">Trigger!</p>

                        <div className="absolute z-[0] w-[67.5%] h-[1.5em] lg:h-[2em] lg:h-[5em] top-[48.6%] lg:top-[45%] left-[23.3%] right-0 overflow-hidden">
                            <div id="home6_mini_indicator_higlight" 
                                ref={ref_home6_minigame_indicator}
                                className="w-full h-full bg-[#3D210F] absolute left-0 top-0"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
