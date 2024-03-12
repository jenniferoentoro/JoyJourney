import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import styles from '../styles/home8.module.css';

function App() {
  gsap.registerPlugin(ScrollTrigger);

  const [activeContent, setActiveContent] = useState(undefined);

  const [dataHome8, setDataHome8] = useState([]);
  const [apiStatus, setApiStatus] = useState("idle");

  
  // API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setApiStatus('loading');
        const response = await axios.get(`https://control.vowrever.com/wp-json/qubick-api/v1/testimoni`);
        const responseData = response.data;
  
        setDataHome8([])
        setDataHome8(prevData => {
          let count = 1;
          return [
            ...prevData,
            ...responseData.map(element => ({
              id: `content-${count++}`,
              title: element.testiomoni_client,
              text: element.testiomoni_ways_description.replace(/<\/?p>/g, ""),
              image: element.image 
            }))
          ];
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
    if (dataHome8.length > 0 && apiStatus === 'success') {
      gsap.set("#Home8",{autoAlpha: 0})

      gsap.fromTo("#Home8",
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 1.5,
          scrollTrigger:{
            trigger: "#Home8",
            start: "top top+=10%", 
            // markers: true,
          },
        }
      )
      console.log("dataHome8",dataHome8)
    }
  },[dataHome8]);


  useLayoutEffect(() => {
    if (activeContent) {
      let str = activeContent;
  
      let match = str.match(/content-(\d+)/);

      if (match) {
        let numericPart = match[1] - 1;
  
        let myElement = document.getElementById("testimoni-indicator");
        let elementHeight = myElement.offsetHeight / dataHome8.length;
        let elementPos = elementHeight * numericPart;
  
        gsap.to("#testimoni-circle", {
          top: (elementPos ? elementPos : 0 ),
          duration: 0.5,
        });

      }
    }
  }, [activeContent]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveContent(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px 0px 0px" } 
    );

    document.querySelectorAll(".content").forEach((elem) => {
      observer.observe(elem);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (dataHome8.length > 0 && apiStatus === 'success'){
      const handleActiveContent = () => {
        document.querySelectorAll('.content').forEach((elem) => {
          const elemTop = elem.getBoundingClientRect().top;
          if (elemTop >= 0 && elemTop <= window.innerHeight) {
            setActiveContent(elem.id);
          }
        });
      };
  
      window.addEventListener('scroll', handleActiveContent);
  
      return () => {
        window.removeEventListener('scroll', handleActiveContent);
      };
    }
  }, [dataHome8]);



  // STICKY
  useEffect(() => {
    if (dataHome8.length > 0 && apiStatus === 'success') {

      window.addEventListener('scroll', isSticky);
      return () => {
        window.removeEventListener('scroll', isSticky);
      };
    }
  }, [dataHome8]);

  const isSticky = () => {
    const sidebarEl = document.querySelector('.sidebar');
    
    sidebarEl.classList.add(styles.isStickyCss);
  };
  
  
  
    const handleScroll = (e) => {
      e.preventDefault();
      const href = e.currentTarget.href;
      const targetId = href.replace(/.*\#/, "");
      const elem = document.getElementById("content-section-"+targetId);
      elem?.scrollIntoView({ behavior: "smooth" });
    };

  
    return (
      <div className="min-h-screen bg-[#F3F2ED] text-[#3D210F] target-home8">
        <div id='Home8' className="w-full px-4 xl:px-24 py-12 lg:py-14">
          <div className="flex flex-wrap pt-10">
            <div className="bg-[#f3f2ed] w-full md:w-1/3 lg:block sticky top-0 lg:relative pb-4 mb-8 lg:mb-0">
              <div className="sidebar">
                <div className="mb-4 lg:mb-8 text-[14px] lg:text-[16px] tracking-[0.24px] font-chivo-regular">LOVE LETTERS OPENED FROM BALI</div>

                <div className='relative'>
                  <ul className="text-[#3D210F]" id='testimoni-indicator'>
                    {dataHome8.map((content) => (
                      <li
                        key={content.id}
                        className={`text-[1.5rem] lg:text-[2rem] tracking-[0.96px] font-the-seasons-bold mb-2`}
                      >
                        <a href={`#${content.id}`} onClick={handleScroll}>{content.title}</a>
                      </li>
                    ))}
                  </ul>

                  <img src="/images/home_circle_testimoni.png"
                    className='w-[17%] lg:w-[30%] absolute top-0 translate-x-[15%] lg:translate-x-[25%]'
                    id="testimoni-circle"
                  /> 
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3 pt-16">
              {dataHome8.map((content) => (
                <div key={content.id} id={`content-section-${content.id}`} className="relative h-[70vh] md:h-[85vh] lg:h-[100vh] flex flex-wrap md:flex-row mb-16 justify-start">
                  <div className="flex flex-wrap h-fit justify-between w-full">
                    <div className="font-the-seasons-bold text-[1.5em] lg:text-[1.25em] tracking-[0.6px] mb-4 lg:mb-0">What They Say</div>

                    <div 
                      className="h-fit w-fit font-hero-new-regular text-[1em] md:text-[1em] leading-[24px] tracking-[0.24px]" 
                      dangerouslySetInnerHTML={{ __html: content.text }}
                    >
                    </div>
                  </div>

                  <div className="relative flex flex-wrap w-fit lg:w-full">
                    <img src={content.image} alt="testimonial" className="my-4 w-auto w-full h-fit" />
                    <div className='content w-full h-[30%] absolute bottom-0' id={content.id} ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default App;
