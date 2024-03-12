import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import axios from 'axios';




export default function Home1({ updateHome1State }) {
  const [apiStatus, setApiStatus] = useState('idle'); // idle, loading, success, error
  const [data_text_firstLine, setDataFirstLine] = useState(['', '', '', '', '']);
  const [data_text_secondLine, setDataSecondLine] = useState(['', '', '', '', '']);
  const [data_image, setDataImage] = useState([...Array(5).fill('/images/image_placeholder.jpg')]);

  const [text_firstLine,setTextFirstLine] = useState('')
  const [text_secondLine,setTextSecondLine] = useState('')

  // ATTRIBUTE
  const [counter_slide, setCounterSlide] = useState(-1)
  const [listening, setListening] = useState(false)
  const [direction, setDirection] = useState('down')
  
  const [listening_firstLine, setListening_firstLine] = useState(false)
  const [listening_secondLine, setListening_secondLine] = useState(false)
  const [listening_counter, setListening_counter] = useState(false)
  const [listening_image, setListening_image] = useState(false)


  const tl_starter = useRef();
  const tl_counter = useRef();
  const tl_firstLine = useRef();
  const tl_secondLine = useRef();
  const tl_image = useRef();


  // API RESPONSE
  useEffect(() => {
    gsap.set(".home_1 .inner-container",{autoAlpha: 0})

    axios.get(`${process.env.API_ENDPOINT}/home_slider`)
      .then(response => {
        setApiStatus('loading');
        const fetchDataPromises = response.data.map(element => {
          const indexData = element.home_slider_order_position - 1;
          return fetch(`${process.env.API_ENDPOINT}/media/${element.home_slider_image}`)
            .then(response => response.json())
            .then(theDataImage => {
              const imageLink = theDataImage.source_url;
              setDataFirstLine(prevDataFirstLine => {
                const newDataFirstLine = [...prevDataFirstLine];
                newDataFirstLine[indexData] = element.home_slider_first_line_text;
                return newDataFirstLine;
              });
              setDataSecondLine(prevDataSecondLine => {
                const newDataSecondLine = [...prevDataSecondLine];
                newDataSecondLine[indexData] = element.home_slider_first_second_text; // fix typo here
                return newDataSecondLine;
              });
              setDataImage(prevDataImage => {
                const newDataImage = [...prevDataImage];
                newDataImage[indexData] = imageLink;
                return newDataImage;
              });
            })
            .catch(error => console.error(error));
        });

        Promise.all(fetchDataPromises).then(() => {
          setApiStatus('success');
        });
      })
      .catch(error => {
        console.error(error);
        setApiStatus('error');
      });
  }, []);

  // Running First Animation Without Scroll Trigger
  useLayoutEffect(() => {
    if(apiStatus == 'success'){
      const ctx = gsap.context(() => {
      // console.log("[FUNCTION] FIRST ANIMATION",listening)
      // console.log(`current listening=>${listening}`)

      // TL STARTER == START
      tl_starter.current = gsap.timeline({
        paused: true,
        defaults:{
          duration: 1
        },
        onComplete: () => {
          console.log("[HOME1] set listening=>true, firstLine=>[0], secondLine=>[0]")
          setCounterSlide(counter_slide+1)
          // setListening(true)
          // setTextFirstLine(data_text_firstLine[0]);
          // setTextSecondLine(data_text_secondLine[0]); 
        }
      })

      tl_starter.current.fromTo(".home_1 .inner-container",{autoAlpha: 0},{autoAlpha: 1})
      tl_starter.current.play(0)

      tl_firstLine.current = gsap.timeline({
        paused: true
      })
      tl_secondLine.current = gsap.timeline({
        paused: true
      })
      // TL STARTER == END

      });
      return () => ctx.revert();
      
      
    }
  }, [apiStatus]);

  // Counter
  useEffect(() =>{
    if (counter_slide >= 0){
      setTextFirstLine(data_text_firstLine[counter_slide]);
      setTextSecondLine(data_text_secondLine[counter_slide]); 
      
      if(direction == 'down'){
        tl_counter.current = gsap.timeline({
          defaults:{
            duration: 0.5,
            ease: 'power2.easeInOut',
          },
          onComplete: () => {
            setListening_counter(true) 
          }
        })
        .fromTo("#node0",
          {
            yPercent: 0,
          },{
            yPercent: -100,
          }
        )
        .fromTo("#node1",
          {
            yPercent: 0,
          },{
            yPercent: -100,
          }
        );
      }
      else{
        tl_counter.current = gsap.timeline({
          defaults:{
            duration: 0.5,
            
          },
          onComplete: () => {
            setListening_counter(true) 
          }
        })
        .fromTo("#node1",
          {
            yPercent: -100,
          },{
            yPercent: 0,
          }
        )
        .fromTo("#node0",
          {
            yPercent: -100,
          },{
            yPercent: 0,
            
          }
        );
      }
    }
  },[counter_slide,direction])

  // Reveal First Line
  useEffect(() => {
    const textFirstLine_element = document.querySelectorAll("#text_firstLine span");

    if (textFirstLine_element.length > 0) {
      if(tl_firstLine.current.isActive()){
        tl_firstLine.current.reverse(0.4);
      }


      gsap.set("#text_firstLine span", {
        autoAlpha: 0,
        x: 80,
      })

      tl_firstLine.current = gsap.timeline({
        defaults:{
          duration: 1
        },
        onStart: () => {
          setListening_firstLine(false);
        },
        onComplete: () => {
          setListening_firstLine(true) 
        }
      })
      .fromTo("#text_firstLine span", {
        autoAlpha: 0,
        x: 80,
      }, {
        autoAlpha: 1,
        x: 0,
        stagger: 0.05
      })
    }
  }, [text_firstLine]);
  
  // Reveal Second Line
  useEffect(() => {
    const textSecondLine_element = document.querySelectorAll("#text_secondLine span");

    if (textSecondLine_element.length > 0) {
      if(tl_secondLine.current.isActive()){
        tl_secondLine.current.reverse(0.4);
      }

      gsap.set("#text_secondLine span", {
        autoAlpha: 0,
        x: 80,
      })

      tl_secondLine.current = gsap.timeline({
        defaults:{
          duration: 1
        },
        onStart: () => {
          setListening_secondLine(false);
        },
        onComplete: () => {
          setListening_secondLine(true) 
        }
      })
      .fromTo("#text_secondLine span", {
        autoAlpha: 0,
        x: 80,
      }, {
        autoAlpha: 1,
        x: 0,
        stagger: 0.05
      })
    }
  }, [text_secondLine]);

  useEffect(() => {
    console.log("[HOME1] MASUK TRIGGER")
  }, [text_firstLine,text_secondLine]);

  // Reveal Image
  useEffect(() =>{
    if(counter_slide >= 0){
      gsap.set(".revealLayer",{left: 0, right: 'unset'})

      tl_image.current = gsap.timeline({
        defaults:{
          duration: 1.5,
          ease: "power2.out",
        },
        onStart: () => {
          setListening_image(false);
        },
        onComplete: () => {
          setListening_image(true)
          if(counter_slide == 4){
            document.body.classList.remove("overflow-hidden");
          }
        },
      })
      
      .fromTo('#image'+ counter_slide, 
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
        }
      )
      .fromTo(".revealLayer", 
        {
          width: '100%',
        },
        {
          width: '0%',
        },
        "<"
      )
      .fromTo('#image'+counter_slide, 
        {
          xPercent: 15,
        },
        {
          xPercent: 0,
        },
        "<"
      );
      
      
      // // Out Image
      // if(counter_slide + 1 > 1){
      //   let previousSlider = counter_slide - 1;
        
      //   tl_image.fromTo(".revealLayer", 
      //   {
      //     width: '0',
      //   },
      //   {
      //     width: '100%',
      //     duration: 1,
      //     ease: "power2.in",
      //   },
      //   "<"
      //   )
      //   tl_image.fromTo('#image'+ previousSlider, 
      //   {
      //     autoAlpha: 1,
      //   },
      //   {
      //     delay: .3,
      //     duration: 1,
      //     autoAlpha: 0,
      //     ease: "power2.in",
      //   },
      //   "<"
      //   )
      // }
      
      
      // // Revel Next Image
      
      
      // tl_image.play(0);
    }
  },[counter_slide])

  
  useEffect(() => {
    if (apiStatus == 'success'){

      const handleScroll = (e) => {
        if (window.scrollY === 0) {
          if (
            listening_firstLine &&
            listening_secondLine &&
            listening_counter &&
            listening_image
          ) {
            let _direction = e.deltaY < 0 ? "up" : "down";
            
      
            // Add a check to prevent scroll while animations are active
            if (
              _direction === "down" &&
              counter_slide < 4 &&
              !tl_image.current.isActive() // Check if image animation is not active
            ) {
              setListening_counter(false);
              setDirection(_direction);
              tl_image.current.reverse(0.4);
              setCounterSlide(counter_slide + 1);

              if (counter_slide === 4) {
                setDirection(_direction);
                updateHome1State(true);
                document.body.classList.remove("overflow-hidden");
              } else {
                setDirection(_direction);
                updateHome1State(false);
                document.body.classList.add("overflow-hidden");
              }
            }
            else if (
              _direction === "up" &&
              counter_slide > 0 &&
              !tl_image.current.isActive() // Check if image animation is not active
            ) {
              setListening_counter(false);
              setDirection(_direction);
              tl_image.current.reverse(0.4);
              setCounterSlide(counter_slide - 1);

              if (counter_slide === 4) {
                setDirection(_direction);
                updateHome1State(true);
                document.body.classList.add("overflow-hidden");
              } else {
                setDirection(_direction);
                updateHome1State(false);
                document.body.classList.add("overflow-hidden");
              }
            }
            
            
          }
      
          // Prevent the default scroll behavior only when animations are active
          if (
            listening_firstLine ||
            listening_secondLine ||
            listening_counter ||
            listening_image
          ) {
            e.preventDefault();
          }
        }
      };
      

      let xDown = null;
      let yDown = null;

      function handleTouchStart(evt) {
        const firstTouch = evt.touches[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
      }

      function handleTouchMove(evt) {
        if (!xDown || !yDown) {
          return;
        }
        
        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;
        
        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;
        
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          // Horizontal swipe
          if (xDiff > 0) {
            // Swipe to left
            // console.log('Swipe to left');
          } else {
            // Swipe to right
            // console.log('Swipe to right');
          }
        } else {
          // Vertical swipe
          if (yDiff > 0) {
            // Swipe up
            // console.log('Swipe up');
          } else {
            // Swipe down
            // console.log('Swipe down');
          }
        }
        
        // Reset values
        xDown = null;
        yDown = null;
      }
      window.addEventListener('wheel', handleScroll);
      document.addEventListener('touchstart', handleTouchStart, false);
      document.addEventListener('touchmove', handleTouchMove, false);
  
      return () => {
        window.removeEventListener('wheel', handleScroll);
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
      };
    }
  }, [apiStatus,counter_slide,listening_firstLine,listening_secondLine,listening_counter,listening_image]);
  


  return (
    <div id='Home1' className="home_1 bg-[#f3f2ed]">
      <div className='inner-container text-[#3D210F] relative h-[100vh] w-[100vw]realtive'>
        {/* COUNTER NUMBER */}
        <div className="font-hero-new-regular absolute flex revealFirst 
              left-[5%] top-[60%] h-[21px] overflow-y-hidden
              text-[16px] z-[2] tracking-[0.36px]
              select-none
            "
            ref={tl_counter}
        >
          <div className='w-[10px] relative'>
            <div id="node0">{(direction == 'down' ? (counter_slide-1 < 0 ? 0 : counter_slide) : (counter_slide + 1))}</div>
            <div id="node1">{(direction == 'down' ? (counter_slide + 1) : (counter_slide + 2 ))}</div>
          </div>

          <div className='w-[10px] mx-1'>
            /
          </div>

          <div className='w-[10px]'>
            5
          </div>
        </div>
        
        {/* BALI BASED */}
        <div className="font-hero-new-regular absolute revealFirst
              left-[5%] bottom-4 lg:bottom-[10%]
              text-[16px] z-[2] tracking-[0.36px]
              select-none
              leading-[24px]
            "
        >
          BALI-BASED <br/>
          WEDDING PHOTOGRAPHER 
        </div>

        
        <section className={`rellative h-full w-full`}>
          {/* HEADING FIRST LINE */}
          <div 
            id='text_firstLine'
            className="font-the-seasons-regular lg:tracking-[1.92px] leading-[1]
              absolute text-[1.3rem] lg:text-[2.5rem] z-[2]
              top-[35%] lg:top-[37.5%] left-[5%]
              select-none
            "
            ref={tl_firstLine}
          >
            {text_firstLine.split('').map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </div>
          
          {/* HEADING SECOND LINE */}
          <div 
            id='text_secondLine'
            className='font-the-seasons-bold lg:tracking-[1.92px] leading-[1]
              absolute text-[2.5rem] lg:text-[4rem] z-[2]
              top-[40%] lg:top-[45%] left-[5%] lg:left-[7.5%]
              select-none
            '
            ref={tl_secondLine}
          >
            {text_secondLine.split('').map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </div>

          <div id='image0'
              className='absolute overflow-hidden bg-[#f3f2ed]
                flex flex-col justify-end items-end
                w-[95%] lg:w-[58.33vw] 
                right-0 bottom-[8rem] lg:bottom-0
                opacity-0 z-[1]
              '
              style={{
                transformOrigin: 'right center 0px'
              }}
          >
            <img src={data_image[0]}
              className='
                w-full h-auto
              '
              alt='Bali Photography'
            />
            <div className='revealLayer w-[100%] h-[100%] absolute top-0 left-0 bg-[#f3f2ed]'></div>
          </div>

          <div id='image1'
              className='absolute bg-[#f3f2ed]
                flex flex-col justify-right items-end
                right-0 bottom-0
                opacity-0 z-[1]
              '
              style={{
                transformOrigin: 'right center 0px'
              }}
          >
            <img src={data_image[1]}
              className='object-cover
                w-auto h-[100vh]
              '
              alt='Bali Photography'
            />
            <div className='revealLayer w-[100%] h-[100%] absolute top-0 left-0 bg-[#f3f2ed]'></div>
          </div>

          <div id='image2'
              className='absolute overflow-hidden bg-[#f3f2ed]
                flex flex-col justify-right items-end
                left-[15%] top-[-4%]
                opacity-0 z-[1]
              '
              style={{
                transformOrigin: 'right center 0px'
              }}
          >
            <img src={data_image[2]}
              className='
                w-[50vw] lg:w-[15.625vw] h-auto
              '
              alt='Bali Photography'
            />
            <div className='revealLayer w-[100%] h-[100%] absolute top-0 left-0 bg-[#f3f2ed]'></div>
          </div>

          <div id='image3'
              className='absolute overflow-hidden bg-[#f3f2ed]
                flex flex-col justify-right items-end
                right-0 top-0
                opacity-0 z-[1]
              '
              style={{
                transformOrigin: 'right center 0px'
              }}
          >
            <img src={data_image[3]}
              className='
                w-full lg:w-[33.33vw] h-auto
              '
              alt='Bali Photography'
            />
            <div className='revealLayer w-[100%] h-[100%] absolute top-0 left-0 bg-[#f3f2ed]'></div>
          </div>

          <div id='image4'
              alt=""
              className='absolute overflow-hidden bg-[#f3f2ed]
                flex flex-col justify-end items-end
                right-0 bottom-[10%]
                opacity-0 z-[1]
              '
              style={{
                transformOrigin: 'right center 0px'
              }}
          >
            <img src={data_image[4]}
              className='
                w-[95%] lg:w-[38.89vw] h-auto
              '
              alt='Bali Photography'
            />
            <div className='revealLayer w-[100%] h-[100%] absolute top-0 left-0 bg-[#f3f2ed]'></div>
          </div>
        </section>
      </div>
    </div>
  );
}
