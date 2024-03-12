import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useRouter } from 'next/router';


function MobileNav({ open, setOpen,handleUpdateHome1State }) {
  const router = useRouter();

  const tl_nav_1 = useRef();
  const tl_nav_2 = useRef();
  const tl_nav_3 = useRef();
  const tl_nav_4 = useRef();
  const tl_nav_5 = useRef();
  const tl_nav_6 = useRef();
  const tl_nav_7 = useRef();
  const tl_nav_8 = useRef();

  const handleButtonClick = (index) => {
    document.body.classList.remove("overflow-hidden");

    // if (index.includes('#')) {
    //   // Internal link with #
    //   const targetId = index.replace(/.*\#/, "");
    //   const elem = document.getElementById(targetId);
    //   console.log("elem", elem, targetId);
      
    //   if (elem) {
    //     setTimeout(() => {
    //       elem.scrollIntoView({ behavior: "smooth" });
    //     }, 700);
    //   }
    // } else {
    //   // External link, change page or URL
    //   window.location.href = index;
    // }

    window.location.href = index;
  
    setOpen(false);
  };

  const handleMouseEnter = (index) => {
    if (index == 1){
      tl_nav_1.current.play();
    }
    else if(index == 2){
      tl_nav_2.current.play();
    }
    else if(index == 3){
      tl_nav_3.current.play();
    }
    else if(index == 4){
      tl_nav_4.current.play();
    }
    else if(index == 5){
      tl_nav_5.current.play();
    }
    else if(index == 6){
      tl_nav_6.current.play();
    }
    else if(index == 7){
      tl_nav_7.current.play();
    }
    else if(index == 8){
      tl_nav_8.current.play();
    }
  };

  const handleMouseLeave = (index) => {
    if (index == 1){
      tl_nav_1.current.reverse();
    }
    else if(index == 2){
      tl_nav_2.current.reverse();
    }
    else if(index == 3){
      tl_nav_3.current.reverse();
    }
    else if(index == 4){
      tl_nav_4.current.reverse();
    }
    else if(index == 5){
      tl_nav_5.current.reverse();
    }
    else if(index == 6){
      tl_nav_6.current.reverse();
    }
    else if(index == 7){
      tl_nav_7.current.reverse();
    }
    else if(index == 8){
      tl_nav_8.current.reverse();
    }
  };

  useEffect(() => {
    const allKnot = document.querySelectorAll(`.knot`);
    allKnot.forEach((element) => {
      gsap.set(element, { autoAlpha: 0 });
    });
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl_nav_1.current = gsap.timeline({
        paused: true,
      })
      .to(`.tali[data="1"]`, {
        autoAlpha: 0,
        duration: 0
      })
      .to(`.knot[data="1"]`, {
        autoAlpha: 1,
        duration: 0
      },"<")

      tl_nav_2.current = gsap.timeline({
        paused: true,
      })
      .to(`.tali[data="2"]`, {
        autoAlpha: 0,
        duration: 0
      })
      .to(`.knot[data="2"]`, {
        autoAlpha: 1,
        duration: 0
      },"<")

      tl_nav_3.current = gsap.timeline({
        paused: true,
      })
      .to(`.tali[data="3"]`, {
        autoAlpha: 0,
        duration: 0
      })
      .to(`.knot[data="3"]`, {
        autoAlpha: 1,
        duration: 0
      },"<")

      tl_nav_4.current = gsap.timeline({
        paused: true,
      })
      .to(`.tali[data="4"]`, {
        autoAlpha: 0,
        duration: 0
      })
      .to(`.knot[data="4"]`, {
        autoAlpha: 1,
        duration: 0
      },"<")

      tl_nav_5.current = gsap.timeline({
        paused: true,
      })
      .to(`.tali[data="5"]`, {
        autoAlpha: 0,
        duration: 0
      })
      .to(`.knot[data="5"]`, {
        autoAlpha: 1,
        duration: 0
      },"<")

      tl_nav_6.current = gsap.timeline({
        paused: true,
      })
      .to(`.tali[data="6"]`, {
        autoAlpha: 0,
        duration: 0
      })
      .to(`.knot[data="6"]`, {
        autoAlpha: 1,
        duration: 0
      },"<")
      
      tl_nav_7.current = gsap.timeline({
        paused: true,
      })
      .to(`.tali[data="7"]`, {
        autoAlpha: 0,
        duration: 0
      })
      .to(`.knot[data="7"]`, {
        autoAlpha: 1,
        duration: 0
      },"<")

      tl_nav_8.current = gsap.timeline({
        paused: true,
      })
      .to(`.tali[data="8"]`, {
        autoAlpha: 0,
        duration: 0
      })
      .to(`.knot[data="8"]`, {
        autoAlpha: 1,
        duration: 0
      },"<")
    });
    return () => ctx.revert();
  }, []);



  return (
    <div
      className={`absolute top-0 right-0 h-screen w-screen bg-[#F3F2ED] transform 
      flex flex-col lg:flex-row justify-between
      ${
        open ? "translate-y-0" : "-translate-y-full"
      } transition-transform duration-300 ease-in-out z-[11]`}
    >
      <div className='relative
            w-full md:h-[70vh] lg:h-full lg:w-[60%]
            px-0 lg:px-[5%]
            flex justify-center
            scale-[0.9] lg:scale-[1]
            -translate-y-[6%] lg:-translate-y-[0%]
            translate-x-[-2%] lg:translate-x-[-2%]
          '
      >
        <img src='/images/navbar/navbar_base.png'
            className='
              w-auto h-full
            '
        />

        {/* SECTION 1 */}
        <img src='/images/navbar/navbar_tali_1.png'
            className='absolute tali
              w-auto h-full
              top-0
            '
            data='1'
        />
        <img src='/images/navbar/navbar_knot_1.png'
            className='absolute knot
              w-auto h-full
              top-0
            '
            data='1'
        />

        {/* SECTION 2 */}
        <img src='/images/navbar/navbar_tali_2.png'
            className='absolute tali
              w-auto h-full
              top-0
            '
            data='2'
        />
        <img src='/images/navbar/navbar_knot_2.png'
            className='absolute knot
              w-auto h-full
              top-0
            '
            data='2'
        />

        {/* SECTION 3 */}
        <img src='/images/navbar/navbar_tali_3.png'
            className='absolute tali
              w-auto h-full
              top-0
            '
            data='3'
        />
        <img src='/images/navbar/navbar_knot_3.png'
            className='absolute knot
              w-auto h-full
              top-0
            '
            data='3'
        />

        {/* SECTION 4 */}
        <img src='/images/navbar/navbar_tali_4.png'
            className='absolute tali
              w-auto h-full
              top-0
            '
            data='4'
        />
        <img src='/images/navbar/navbar_knot_4.png'
            className='absolute knot
              w-auto h-full
              top-0
            '
            data='4'
        />

        {/* SECTION 5 */}
        <img src='/images/navbar/navbar_tali_5.png'
            className='absolute tali
              w-auto h-full
              top-0
            '
            data='5'
        />
        <img src='/images/navbar/navbar_knot_5.png'
            className='absolute knot
              w-auto h-full
              top-0
            '
            data='5'
        />

        {/* SECTION 6 */}
        <img src='/images/navbar/navbar_tali_6.png'
            className='absolute tali
              w-auto h-full
              top-0
            '
            data='6'
        />
        <img src='/images/navbar/navbar_knot_6.png'
            className='absolute knot
              w-auto h-full
              top-0
            '
            data='6'
        />

        {/* SECTION 7 */}
        <img src='/images/navbar/navbar_tali_7.png'
            className='absolute tali
              w-auto h-full
              top-0
            '
            data='7'
        />
        <img src='/images/navbar/navbar_knot_7.png'
            className='absolute knot
              w-auto h-full
              top-0
            '
            data='7'
        />

        {/* SECTION 8 */}
        <img src='/images/navbar/navbar_tali_8.png'
            className='absolute tali
              w-auto h-full
              top-0
            '
            data='8'
        />
        <img src='/images/navbar/navbar_knot_8.png'
            className='absolute knot
              w-auto h-full
              top-0
            '
            data='8'
        />
      </div>

      <div className="w-full md:w-fit lg:w-[40%] 
            md:translate-x-[7%] lg:translate-x-[-20%] 
            translate-y-[-20%] lg:translate-y-[3%] 
            flex lg:flex-col lg:content-center lg:justify-center flex-wrap gap-y-8 lg:gap-y-4
            text-left 
            px-4 lg:px-0
            text-[#3D210F]
          "
      >
        <div className='w-1/2 lg:w-full h-fit flex align-end'>
          <span className='h-fit self-end -translate-y-[20%] md:-translate-y-[60%] lg:-translate-y-[80%] md:translate-0 lg:translate-x-[50%] h-fit font-chivo-regular text-[10px] md:text-[14px] lg:text-[0.833vw] w-[20%]'>I.</span>
          <a onClick={() => handleButtonClick('./#home')} 
                onMouseEnter={() => {handleMouseEnter(1)}}
                onMouseLeave={() => {handleMouseLeave(1)}}
                className="h-fit cursor-pointer uppercase hover:capitalize leading-0 font-the-seasons-bold hover:font-the-seasons-light-italic 
                  text-[16px] md:text-[2rem] lg:text-[2.8vw] tracking-[1.44px] 
                  origin-bottom-left transition-transform duration-300 ease-in-out
                  hover:translate-y-[7%] hover:scale-[1.2]
                " 
                ref={tl_nav_1}
          >
            Home
          </a>
        </div>

        <div className='w-1/2 lg:w-full h-fit flex align-end'>
          <span className='h-fit self-end -translate-y-[20%] md:-translate-y-[60%] lg:-translate-y-[80%] md:translate-0 lg:translate-x-[50%] h-fit font-chivo-regular text-[10px] md:text-[14px] lg:text-[0.833vw] w-[20%]'>II.</span>
          <a onClick={() => handleButtonClick('./#about')} 
                onMouseEnter={() => {handleMouseEnter(2)}}
                onMouseLeave={() => {handleMouseLeave(2)}}
                className="h-fit cursor-pointer uppercase hover:capitalize leading-0 font-the-seasons-bold hover:font-the-seasons-light-italic 
                  text-[16px] md:text-[2rem] lg:text-[2.8vw] tracking-[1.44px] 
                  origin-bottom-left transition-transform duration-300 ease-in-out
                  hover:translate-y-[7%] hover:scale-[1.2]
                " 
                ref={tl_nav_2}
          >
            About
          </a>
        </div>

        <div className='w-1/2 lg:w-full h-fit flex align-end'>
          <span className='h-fit self-end -translate-y-[20%] md:-translate-y-[60%] lg:-translate-y-[80%] md:translate-0 lg:translate-x-[50%] h-fit font-chivo-regular text-[10px] md:text-[14px] lg:text-[0.833vw] w-[20%]'>III.</span>
          <a onClick={() => handleButtonClick('./#whyus')} 
                onMouseEnter={() => {handleMouseEnter(3)}}
                onMouseLeave={() => {handleMouseLeave(3)}}
                className="h-fit cursor-pointer uppercase hover:capitalize leading-0 font-the-seasons-bold hover:font-the-seasons-light-italic 
                  text-[16px] md:text-[2rem] lg:text-[2.8vw] tracking-[1.44px] 
                  origin-bottom-left transition-transform duration-300 ease-in-out
                  hover:translate-y-[7%] hover:scale-[1.2]
                "
                ref={tl_nav_3}
          >
            Why Us
          </a>
        </div>

        <div className='w-1/2 lg:w-full h-fit flex align-end'>
          <span className='h-fit self-end -translate-y-[20%] md:-translate-y-[60%] lg:-translate-y-[80%] md:translate-0 lg:translate-x-[50%] h-fit font-chivo-regular text-[10px] md:text-[14px] lg:text-[0.833vw] w-[20%]'>IV.</span>
          <a onClick={() => handleButtonClick('./#Home6')} 
                onMouseEnter={() => {handleMouseEnter(4)}}
                onMouseLeave={() => {handleMouseLeave(4)}}
                className="h-fit cursor-pointer uppercase hover:capitalize leading-0 font-the-seasons-bold hover:font-the-seasons-light-italic 
                  text-[16px] md:text-[2rem] lg:text-[2.8vw] tracking-[1.44px] 
                  origin-bottom-left transition-transform duration-300 ease-in-out
                  hover:translate-y-[7%] hover:scale-[1.2]
                "
                ref={tl_nav_4}
          >
            Works
          </a>
        </div>

        <div className='w-1/2 lg:w-full h-fit flex align-end'>  
          <span className='h-fit self-end -translate-y-[20%] md:-translate-y-[60%] lg:-translate-y-[80%] md:translate-0 lg:translate-x-[50%] h-fit font-chivo-regular text-[10px] md:text-[14px] lg:text-[0.833vw] w-[20%]'>V.</span>
          <a onClick={() => handleButtonClick('/album')} 
                onMouseEnter={() => {handleMouseEnter(5)}}
                onMouseLeave={() => {handleMouseLeave(5)}}
                className="h-fit cursor-pointer uppercase hover:capitalize leading-0 font-the-seasons-bold hover:font-the-seasons-light-italic 
                  text-[16px] md:text-[2rem] lg:text-[2.8vw] tracking-[1.44px] 
                  origin-bottom-left transition-transform duration-300 ease-in-out
                  hover:translate-y-[7%] hover:scale-[1.2]
                " 
                ref={tl_nav_5}
          >
            Album
          </a>
        </div>

        <div className='w-1/2 lg:w-full h-fit flex align-end'>
          <span className='h-fit self-end -translate-y-[20%] md:-translate-y-[60%] lg:-translate-y-[80%] md:translate-0 lg:translate-x-[50%] h-fit font-chivo-regular text-[10px] md:text-[14px] lg:text-[0.833vw] w-[20%]'>VI.</span>
          <a onClick={() => handleButtonClick('./#Home8')} 
                onMouseEnter={() => {handleMouseEnter(6)}}
                onMouseLeave={() => {handleMouseLeave(6)}}
                className="h-fit cursor-pointer uppercase hover:capitalize leading-0 font-the-seasons-bold hover:font-the-seasons-light-italic 
                  text-[16px] md:text-[2rem] lg:text-[2.8vw] tracking-[1.44px] 
                  origin-bottom-left transition-transform duration-300 ease-in-out
                  hover:translate-y-[7%] hover:scale-[1.2]
                " 
                ref={tl_nav_6}
          >
            Letters
          </a>
        </div>

        <div className='w-1/2 lg:w-full h-fit flex align-end'>
          <span className='h-fit self-end -translate-y-[20%] md:-translate-y-[60%] lg:-translate-y-[80%] md:translate-0 lg:translate-x-[50%] h-fit font-chivo-regular text-[10px] md:text-[14px] lg:text-[0.833vw] w-[20%]'>VII.</span>
          <a onClick={() => handleButtonClick('./#Home9')} 
                onMouseEnter={() => {handleMouseEnter(7)}}
                onMouseLeave={() => {handleMouseLeave(7)}}
                className="h-fit cursor-pointer uppercase hover:capitalize leading-0 font-the-seasons-bold hover:font-the-seasons-light-italic 
                  text-[16px] md:text-[2rem] lg:text-[2.8vw] tracking-[1.44px] 
                  origin-bottom-left transition-transform duration-300 ease-in-out
                  hover:translate-y-[7%] hover:scale-[1.2]
                " 
                ref={tl_nav_7}
          >
            Faq
          </a>
        </div>

        <div className='w-1/2 lg:w-full h-fit flex align-end'>
          <span className='h-fit self-end -translate-y-[20%] md:-translate-y-[60%] lg:-translate-y-[80%] md:translate-0 lg:translate-x-[50%] h-fit font-chivo-regular text-[10px] md:text-[14px] lg:text-[0.833vw] w-[20%]'>VIII.</span>
          <a onClick={() => handleButtonClick('./#Home10')} 
                onMouseEnter={() => {handleMouseEnter(8)}}
                onMouseLeave={() => {handleMouseLeave(8)}}
                className="h-fit cursor-pointer uppercase hover:capitalize leading-0 font-the-seasons-bold hover:font-the-seasons-light-italic 
                  text-[16px] md:text-[2rem] lg:text-[2.8vw] tracking-[1.44px] 
                  origin-bottom-left transition-transform duration-300 ease-in-out
                  hover:translate-y-[7%] hover:scale-[1.2]
                " 
                ref={tl_nav_8}
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Navbar({ updateHome1State }) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  
  
  useEffect(() => {
    gsap.registerPlugin();

    const revealFirst = document.querySelectorAll('.revealFirst');
    gsap.set(revealFirst,{autoAlpha: 0})

    gsap.fromTo(revealFirst,{autoAlpha: 0},{autoAlpha: 1,duration: 3, delay: 1})
  }, []);

  return (
    <nav className='max-w-[100vw] relative'>
      {router.pathname != '/works' ?
        <Link href="/"
              className='w-[15%] md:w-[90px] revealFirst
                absolute 
                top-4 left-4 z-[10]
                lg:top-8 lg:left-[5%]
              '
        >
          <img id="nav-logo" src="/images/logo.png"
              className="w-full h-full"
          />
        </Link>
        : ''
      }

      <div
        className="absolute w-fit revealFirst
          flex justify-between 
          top-4 right-4 z-[12]
          lg:top-8 lg:right-[5%]
        "
      >
        <div
          className="relative cursor-pointer hover:opacity-50 transition-all duration-300 ease-in-out"
          onClick={() => setOpen(!open)}
        >
          <div
            className={`h-[1.5px] my-1 ${((router.pathname === '/album') && !open ? 'bg-[#FFFFFF]' : 'bg-[#3D210F]')}  w-[2rem] transform transition-all duration-300 ease-in-out ${
              open ? "translate-y-[300%]  rotate-[45deg]" : ""
            }`}
          />
          <div
            className={`h-[1.5px] my-1 ${((router.pathname === '/album') && !open ? 'bg-[#FFFFFF]' : 'bg-[#3D210F]')}  w-[2rem] transform transition-all duration-300 ease-in-out ${
              open ? "opacity-0" : ""
            }`}
          />
          <div
            className={`h-[1.5px] my-1 ${((router.pathname === '/album') && !open ? 'bg-[#FFFFFF]' : 'bg-[#3D210F]')}  w-[2rem] transform transition-all duration-300 ease-in-out ${
              open ? "translate-y-[-450%]  rotate-[-45deg] " : "translate-y-[70%]"
            }`}
          />
        </div>
      </div>
      
      <MobileNav open={open} setOpen={setOpen} handleUpdateHome1State={updateHome1State}/>
    
    </nav>
  );
}
