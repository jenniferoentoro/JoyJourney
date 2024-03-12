import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import axios from 'axios';

import Image from 'next/image';

import styles from '../../styles/album.module.css';


export default function Album() {
  const [apiStatus, setApiStatus] = useState('idle');
  const [albumData, setAlbumData] = useState({
    "album_header_text": '',
    "album_header_image": '',
    "album_header_desc": '',
    "album_header_desc_mobile": '',
    "album_header_points": '',
    
    "album_cover_finish_details": '',
    "album_cover_material_text": '',
    "album_cover_material_images": '',
    "album_cover_finish_images": [],

    "album_size_details_title": '',
    "album_size_details_desc": '',
    "album_size_details_price": '',
    "album_size_images": '',
  });
  
  const [selectAlbum_size_index, setSelectAlbum_size_index] = useState(null)
  const [albumSizePrice, setAlbumSizePrice] = useState(0)

  const [selectAlbum_material_index, setSelectAlbum_material_index] = useState(null)

  const [selectAlbum_finish_index, setSelectAlbum_finish_index] = useState(null)
  const [albumFinishPrice, setAlbumFinishPrice] = useState(0)


  const tl_starting = useRef();
  const tl_album_desc = useRef();

  const imageRefs = useRef([]);
  const tl_imageRefs = useRef([]);

  // API
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);

    const fetchData = async () => {
      try {
        setApiStatus('loading');
        const response = await axios.get(`https://control.vowrever.com/wp-json/qubick-api/v1/album`);
        const responseData = response.data;
        
        setAlbumData({
          ...albumData,
          album_header_text: responseData.album_header_text,
          album_header_image: responseData.album_header_image,
          album_header_desc: responseData.album_header_desc,
          album_header_desc_mobile: responseData.album_header_desc_mobile,
          album_header_points: responseData.album_header_points,   

          album_cover_finish_details: responseData.album_cover_finish_details,
          album_cover_material_text: responseData.album_cover_material_text,
          album_cover_material_images: responseData.album_cover_material_images,
          album_cover_finish_images: responseData.album_cover_finish_images,  

          album_size_details_title: responseData.album_size_details_title,
          album_size_details_desc: responseData.album_size_details_desc,
          album_size_details_price: responseData.album_size_details_price,
          album_size_images: responseData.album_size_images,  
        });

        setApiStatus('success');
      } catch (error) {
        console.error(error);
        setApiStatus('error');
      }
    };

    fetchData();

  },[]);

  useLayoutEffect(() => {
    gsap.set("#modal-load",{autoAlpha: 0,zIndex: -1})
    gsap.set("#modal-load-suscess",{autoAlpha: 0,display: 'none'})
    gsap.set("#modal-load-faild",{autoAlpha: 0,display: 'none'})

    if(albumData && apiStatus == 'success'){
      const ctx = gsap.context(() => {
        var navLogoElement = document.getElementById("nav-logo"); // Replace "yourElementId" with the actual ID of your element
        // Set mix-blend-mode
        navLogoElement.style.mixBlendMode = "difference";
        // Set filter brightness
        navLogoElement.style.filter = "brightness(100)";

        // Initialize GSAP timeline for the album header animation
        gsap.set(".album_size_cover_circle",{autoAlpha: 0})
        gsap.set(".album_material_circle",{autoAlpha: 0})
        gsap.set(".album_finish_circle",{autoAlpha: 0})
        gsap.set("#scrollText",
        {
          autoAlpha: 0,
          xPercent: 0,
        })

        gsap.set(".fadeIn",
        {
          autoAlpha: 0,
        })

        tl_starting.current = gsap.timeline()
        .fromTo("#albumHeader",
        {
          autoAlpha: 0
        }, {
          autoAlpha: 1,
          duration: 2,
        })
        .to("#scrollText",{
          autoAlpha: 1,
          duration: 3.5, // Fixed typo (duretion -> duration)
          xPercent: 10,
        })

        tl_starting.current.play();

        // Scroll-triggered animations
        gsap.to('#scrollText',{
          x: (window.innerWidth <= 768 ? -(window.innerWidth) * 2 : (window.innerWidth > 768 && window.innerWidth < 1024 ? -(window.innerWidth) * 2.5 : -(window.innerWidth))),
          scrollTrigger: {
            trigger: '#albumHeader',
            start: 'top top',
            scrub: true,
            // markers: true,
          }
        });

        tl_album_desc.current = gsap.timeline({
          scrollTrigger: {
            trigger: '#album-desc',
            start: 'top center',
            // markers: true,
          }
        })
        .fromTo('#album-desc .fadeIn ',
        {
          autoAlpha: 0,
        }, {
          autoAlpha: 1,
          stagger: .3
        });

        // Create a timeline for section scrolling animations
        let sections = gsap.utils.toArray("[panel]");
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: "#container-album",
            pin: true,
            start: "top top",
            scrub: 2,
            // snap: {
            //   snapTo: 1 / (sections.length - 1),
            //   inertia: true,
            //   duration: { min: 0.1, max: 0.1 }
            // },
            end: () => "+=" + (document.querySelector("#container-album").offsetWidth - window.innerWidth)
          }
        })

        gsap.fromTo("#album-size .fadeIn", 
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          stagger: .7,
          scrollTrigger: {
            trigger: "#album-size",
            start: 'top center',
            // markers: true,
          }
        })

        gsap.fromTo("#album-cover .fadeIn", 
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          stagger: .2,
          scrollTrigger: {
            trigger: "#album-cover",
            start: 'top center',
            // markers: true,
          }
        })
        
        gsap.fromTo("#album-finish .fadeIn", 
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          stagger: .7,
          scrollTrigger: {
            trigger: "#album-finish",
            start: 'top center',
            // markers: true,
          }
        })

        gsap.fromTo("#album-submit .fadeIn", 
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          stagger: .3,
          scrollTrigger: {
            trigger: "#album-submit",
            start: 'top center',
            // markers: true,
          }
        })

        imageRefs.current.forEach((ref, index) => {
          const tl = gsap.timeline({ paused: true });
          tl.to(ref.querySelector('img.album_size_cover'), { 
            scale: 1.2,
            transformOrigin: 'center center',
            duration: 1
          })
          tl_imageRefs.current.push(tl);
  
          // Attach event handlers
          ref.addEventListener('mouseenter', () => {
            tl.play();
          });
          ref.addEventListener('mouseleave', () => {
            tl.reverse();
          });
        });

      });
      return () => ctx.revert();
    }
  }, [apiStatus,albumData]);
  
  

  const handleMouseEnter_AlbumSize = (event, index) => {
    const element = event.target;
    const theImage = element.querySelector("img.album_size_cover")
    const theImage_circle = element.querySelector("img.album_size_cover_circle")


    if(selectAlbum_size_index != index){
      gsap.fromTo(theImage_circle,{
        autoAlpha: 0,
      },{
        autoAlpha: 1,
        duration: .3
      });
    }
  };

  const handleMouseLeave_AlbumSize = (event,index) => {
    const element = event.target;
    const theImage = element.querySelector("img.album_size_cover")
    const theImage_circle = element.querySelector("img.album_size_cover_circle")

    if(selectAlbum_size_index != index){
      gsap.fromTo(theImage_circle,{
        autoAlpha: 1,
      },{
        autoAlpha: 0,
        duration: .3
      });
    }
  };

  const handleClick_AlbumSize = (event, index, thePrice) => {
    gsap.set(".album_size_cover_circle",{autoAlpha: 0})

    if(selectAlbum_size_index  == index){
      setSelectAlbum_size_index(null);
      setAlbumSizePrice(0);
    }
    else{
      setSelectAlbum_size_index(index);
      setAlbumSizePrice(thePrice);
    }

    const element = event.target;
    const theImage_circle = element.querySelector("img.album_size_cover_circle")

    gsap.set(theImage_circle,{autoAlpha: 1})
  }


  const handleMouseEnter_AlbumMaterial = (event, index) => {
    const element = event.target;
    const theImage_circle = element.querySelector("img.album_material_circle")

    if(selectAlbum_material_index != index){
      gsap.fromTo(theImage_circle,{
        autoAlpha: 0,
      },{
        autoAlpha: 1,
        duration: .3
      });
    }
  };

  const handleMouseLeave_AlbumMaterial = (event,index) => {
    const element = event.target;
    const theImage_circle = element.querySelector("img.album_material_circle")

    if(selectAlbum_material_index != index){
      gsap.fromTo(theImage_circle,{
        autoAlpha: 1,
      },{
        autoAlpha: 0,
        duration: .3
      });
    }
  };

  const handleClick_AlbumMaterial = (event, index) => {
    if(index >= 0){
      gsap.set(".album_material_circle",{autoAlpha: 0})

      if(selectAlbum_material_index  == index){
        setSelectAlbum_material_index(null);
      }
      else{
        setSelectAlbum_material_index(index);
      }
      
  
      const element = event.target;
      const theImage_circle = element.querySelector("img.album_material_circle")
  
      gsap.set(theImage_circle,{autoAlpha: 1})
    }
  }


  const handleMouseEnter_AlbumFinish = (event, index) => {
    const element = event.target;
    const theImage_circle = element.querySelector("img.album_finish_circle")


    if(selectAlbum_finish_index != index){
      gsap.fromTo(theImage_circle,{
        autoAlpha: 0,
      },{
        autoAlpha: 1,
        duration: .3
      });
    }
  };

  const handleMouseLeave_AlbumFinish = (event,index) => {
    const element = event.target;
    const theImage_circle = element.querySelector("img.album_finish_circle")

    if(selectAlbum_finish_index != index){
      gsap.fromTo(theImage_circle,{
        autoAlpha: 1,
      },{
        autoAlpha: 0,
        duration: .3
      });
    }
  };

  const handleClick_AlbumFinish = (event, index, thePrice) => {
    gsap.set(".album_finish_circle",{autoAlpha: 0})

    if(selectAlbum_finish_index  == index){
      setSelectAlbum_finish_index(null);
      setAlbumFinishPrice(0);
    }
    else{
      setSelectAlbum_finish_index(index);
      setAlbumFinishPrice(thePrice);
    }
    

    const element = event.target;
    const theImage_circle = element.querySelector("img.album_finish_circle")

    gsap.set(theImage_circle,{autoAlpha: 1})
  }

  const sendDataToWordPressAPI = async (formData) => {
    try {
      const response = await fetch('https://control.vowrever.com/wp-json/qubick-api/v1/heirloom', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(formData),
      });

      const data = await response.json();

      if(data.response == 200){
        gsap.to("#modal-load-suscess",{autoAlpha: 1,display: 'flex'})
      }
      else{
        gsap.to("#modal-load-faild",{autoAlpha: 1,display: 'flex'})
      }
      return data;
    } catch (error) {
      console.error('Error sending data to WordPress API:', error);
      throw error;
    }
  };


  const handleSubmit = async () => {
    document.body.classList.add("overflow-hidden");
    gsap.to("#modal-load",{autoAlpha: 1,zIndex: 200})
    gsap.set("#modal-load-loading",{autoAlpha: 1,display: 'flex'})
    gsap.set("#modal-load-suscess",{autoAlpha: 0,display: 'none'})
    gsap.set("#modal-load-faild",{autoAlpha: 0,display: 'none'})

    const formData = {
      album_size: document.querySelector('.album_size_title[index="'+selectAlbum_size_index+'"]').getAttribute('data'),
      album_size_price: albumSizePrice.toString(),
      album_cover_material: document.querySelector('.album_material[index="'+selectAlbum_material_index+'"]').getAttribute('data'),
      album_cover_material_price: "0",
      album_cover_finish: document.querySelector('.album_finish[index="'+selectAlbum_finish_index+'"]').getAttribute('data'),
      album_cover_finish_price: albumFinishPrice.toString(),
      album_name: document.getElementsByName('name')[0].value,
      album_email: document.getElementsByName('email')[0].value,
      album_note: document.getElementsByName('note')[0].value,
    };

    try {
        const response = await sendDataToWordPressAPI(formData);
        gsap.set("#modal-load-loading",{autoAlpha: 0,display: 'none'})
    } catch (error) {
        console.error('Error handling form submission:', error);
    }
  };

  const closeSubmit = () => {
    document.body.classList.remove("overflow-hidden");
    gsap.to("#modal-load",{autoAlpha: 0,zIndex: -1})
    gsap.to("#modal-load-loading",{autoAlpha: 1,display: 'bloxk'})
  }

  return (
    <div className={'relative max-w-[100vw] overflow-x-hidden'}>
      <div className="fixed bg-[#972E00] rounded-md
            z-[5] w-[130px]
            px-4 py-1
            right-4 lg:right-20 bottom-4 
            font-the-seasons-regular text-white 
            flex justify-between
            text-[1em]
          "
      >
        <div>Total:</div> 
        <div>${parseFloat(albumSizePrice) + parseFloat(albumFinishPrice)}</div>
      </div>

      <div id='albumHeader'
          className='
            min-h-[100vh] w-[100vw] 
            bg-no-repeat bg-cover bg-center
            relative
          '
          style={{backgroundImage: `url(${albumData.album_header_image})`}} 
      >
        <h2 id="scrollText" 
            className={`${styles.scrollText} whitespace-nowrap w-fit text-[2.5em] md:text-[6.25em] font-hero-new-super-italic bottom-14`}
        >
          {albumData.album_header_text}
        </h2>
      </div>

      <div id="album-desc"
        className='bg-[#f3f2ed] text-[#3D210F] font-hero-new-light leading-[1.5em] p-4 md:py-20 xl:py-16 md:px-20 xl:px-20 2xl:px-36'
      >
        <div className='grid grid-cols-1 xl:flex xl:flex-row justify-between'>
          <div className='hidden md:block fadeIn order-1 w-fit text-left font-hero-new-light text-[1em] leading-[1.5em] tracking-[1px] md:mb-8 xl:mb-0' 
            dangerouslySetInnerHTML={{ __html: albumData.album_header_desc }}
          >
          </div>

          <div className='md:hidden fadeIn order-1 w-fit text-left font-hero-new-light text-[1em] leading-[1.5em] tracking-[1px] mb-8' 
            dangerouslySetInnerHTML={{ __html: albumData.album_header_desc_mobile }}
          >
          </div>

          <div className='order-2 w-full xl:w-[20%] mb-8 xl:mb-0 text-center xl:text-left'>
            <h3 className='font-hero-new-medium text-[1.25em] mb-4 leading-[1.5em] tracking-[1px] fadeIn'>OUR ALBUM</h3>
            <p className='text-[1em] leading-[1.5em] leading-[1.5em] fadeIn'>
              ✓ HIGH-END QUALITY PRINT<br/>
              ✓ CRAFTED BY EXPERT HANDS<br/>
              ✓ FLAWLESS FINISHING TOUCH
            </p>
          </div>
        </div>

        <div>
          <h1 className='fadeIn text-center font-the-seasons-bold text-[1.75em] md:text-[3em] leading-[1.5em] tracking-[1px] my-12 lg:my-24'>
            IT IS NOT JUST AN ALBUM<br/>
            IT IS AN HEIRLOOM
          </h1>
        </div>

        <div className='fadeIn text-center font-hero-new-regular text-[.75em] md:text-[1em] leading-[1.5em] fadeIn'>
          SCROLL DOWN TO LEARN MORE<br/>
          ABOUT THE PROCESS
        </div>
      </div>

      <div id="albums-slider">
        <div id='container-album' className={`${styles.container} relative`}>
          <div panel=""
            className='w-[100vw] h-[100vh] bg-[#E3DACD] flex flex-col justify-center items-center relative px-4 lg:px-0'
          >
            <div className='text-center font-the-seasons-bold text-[#972E00] text-[1.5rem] md:text-[2.25em] leading-[1.5em] tracking-[1px]'>
              That is it for the introduction.<br/>
              So, how does this work?
            </div>

            <div className='font-hero-new-regular text-[#972E00] text-[1em] absolute bottom-[30%] md:bottom-8'>KEEP SCROLLING</div>
          </div>

          <div panel=""
            className='w-[100vw] h-[100vh] bg-[#E3DACD] flex flex-col justify-center items-center relative px-4 lg:px-0'
          >
            <div className='text-center text-[#972E00] leading-[1.5em] tracking-[1px] inline-block'>
              <div className='font-hero-new-regular text-[1em] mb-[24px]'>STEP 1</div>
              <div className='font-the-seasons-bold text-[2.25em] mb-[24px]'>Designing Album</div>
              <p className='w-full font-hero-new-regular text-[1em] m-auto'>
                Select your favorite 80-100 photos based on your package and<br/>
                pick your preferable album`s size, cover, & finishing options so we<br/>
                can start designing your album.
              </p>
            </div>
          </div>

          <div panel=""
            className='w-[100vw] h-[100vh] bg-[#E3DACD] flex flex-col justify-center items-center relative px-4 lg:px-0'
          >
            <div className='text-center text-[#972E00] leading-[1.5em] tracking-[1px] inline-block'>
              <div className='font-hero-new-regular text-[1em] mb-[24px]'>STEP 2</div>
              <div className='font-the-seasons-bold text-[2.25em] mb-[24px]'>Layout Preview</div>
              <p className='w-full font-hero-new-regular text-[1em] m-auto'>
                I will share a PDF file containing all photos of your choosing that<br/>
                are arranged on a minimalist layout design to your email as soon<br/>
                as the layout process is done.
              </p>
            </div>
          </div>

          <div panel=""
            className='w-[100vw] h-[100vh] bg-[#E3DACD] flex flex-col justify-center items-center relative px-4 lg:px-0'
          >
            <div className='text-center text-[#972E00] leading-[1.5em] tracking-[1px] inline-block'>
              <div className='font-hero-new-regular text-[1em] mb-[24px]'>STEP 3</div>
              <div className='font-the-seasons-bold text-[2.25em] mb-[24px]'>Layout Revision</div>
              <p className='w-full font-hero-new-regular text-[1em] m-auto'>
                Revision (max. 1 time) is allowed to make sure you are satisfied<br/>
                with the overall layout. Please feel free to change anything you<br/>
                don`t like within this period of time.
              </p>
            </div>
          </div>

          <div panel=""
            className='w-[100vw] h-[100vh] bg-[#E3DACD] flex flex-col justify-center items-center relative px-4 lg:px-0'
          >
            <div className='text-center text-[#972E00] leading-[1.5em] tracking-[1px] inline-block'>
              <div className='font-hero-new-regular text-[1em] mb-[24px]'>STEP 4</div>
              <div className='font-the-seasons-bold text-[2.25em] mb-[24px]'>Album Creation</div>
              <p className='w-full font-hero-new-regular text-[1em] m-auto'>
                After you approved the final layout design, we will start to print<br/>
                the photos and create your album based on all the selections<br/>
                that you made before.
              </p>
            </div>
          </div>

          <div panel=""
            className='w-[100vw] h-[100vh] bg-[#E3DACD] flex flex-col justify-center items-center relative px-4 lg:px-0'
          >
            <div className='text-center text-[#972E00] leading-[1.5em] tracking-[1px] inline-block'>
              <div className='font-hero-new-regular text-[1em] mb-[24px]'>STEP 5</div>
              <div className='font-the-seasons-bold text-[2.25em] mb-[24px]'>Album Delivery</div>
              <p className='w-full font-hero-new-regular text-[1em] m-auto'>
                Once the album production is done and passed our quality<br/>
                checks, your album alongside the loose prints that come with the<br/>
                package will be shipped to your postal address immediately.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="album-size"
        className='bg-[#f3f2ed] text-[#3D210F] font-hero-new-light py-12 lg:py-16 px-4 md:px-20 lg:px-40 2xl:px-64 mt-[-1px]'
      >
        <h3 className='fadeIn font-the-seasons-bold text-[2.5rem] leading-[1.5] lg:text-[3em] tracking-[1px] text-center mb-[66.66px]'>SELECT YOUR ALBUM SIZE</h3>

        <div className='grid grid-col-1 lg:grid-cols-3 text-center'>
          {Array.isArray(albumData.album_size_images) && albumData.album_size_images.length > 0 ? (
            albumData.album_size_images.map((item, index) => (
              <div className='fadeIn w-full py-8 lg:py-0 lg:px-4 cursor-pointer flex items-center flex-col mb-[2rem] lg:mb-0' 
                key={index}
                onClick={(event) => handleClick_AlbumSize(event, index, albumData.album_size_details_price[index])}
                ref={(element) => (imageRefs.current[index] = element)}
                onMouseEnter={(event) => handleMouseEnter_AlbumSize(event, index)}
                onMouseLeave={(event) => handleMouseLeave_AlbumSize(event, index)}
              >
                <div className='pointer-events-none w-[300px] h-[300px] overflow-hidden'>
                  <img className="album_size_cover w-full" src={item} alt={`Album Image ${index}`} />
                </div>

                <div className="pointer-events-none relative w-full flex items-center flex-col">
                  <img
                    src="/images/album_circle.png"
                    className={`album_size_cover_circle z-0 pointer-events h-full lg:h-auto w-auto lg:w-[85%] absolute top-[2%] lg:top-[23%]`}
                  />
                  <h3 index={index} data={albumData.album_size_details_title[index]} className="album_size_title z-1 pointer-events-none my-4 lg:my-[40px] font-the-seasons-bold text-[2rem] lg:text-[2.25em] leading-[50px]">
                    {albumData.album_size_details_title[index]}
                  </h3>
                  <div className='z-1 pointer-events-none text-[1em] leading-[33.33px]' dangerouslySetInnerHTML={{ __html: albumData.album_size_details_desc[index] }}></div>
                  <h3 index={index} data={albumData.album_size_details_price[index]} className="album_size_price z-1 pointer-events-none mt-4 lg:mt-[40px] font-the-seasons-bold text-[2rem] lg:text-[2.25em]">
                    ${albumData.album_size_details_price[index]}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div id="album-cover"
        className='bg-[#f3f2ed] text-[#3D210F] font-hero-new-regular p-4 py-14 lg:py-16 md:px-20 lg:px-40 2xl:px-64'
      >
        <hr className='fadeIn w-[50px] lg:w-[100px] rotate-90 border-[#3D210F] m-auto'/>
        <h3 className='fadeIn font-the-seasons-bold text-[2.5rem] lg:text-[3em] lg:leading-[50px] tracking-[1px] text-center mb-8 lg:mb-[66.66px] mt-[2rem] lg:mt-[4rem]'>SELECT YOUR COVER MATERIAL</h3>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-y-4 lg:gap-y-8 gap-x-2 lg:gap-x-4 mb-24'>
          {Array.isArray(albumData.album_cover_material_images) && albumData.album_cover_material_images.length > 0 ? (
            albumData.album_cover_material_images.map((item, index) => (
              <div className='fadeIn cursor-pointer w-full lg:px-4 flex items-center relative'
                key={index}
                onClick={(event) => handleClick_AlbumMaterial(event, index)}
                onMouseEnter={(event) => handleMouseEnter_AlbumMaterial(event, index)}
                onMouseLeave={(event) => handleMouseLeave_AlbumMaterial(event, index)}
              >
                <div 
                  className='pointer-events-none w-[50px] lg:w-[100px] h-[50px] lg:h-[100px] bg-cover bg-no-repeat rounded-full'
                  style={{backgroundImage: `url(${item}`}}
                ></div>

                <div className="w-fit relative">
                  <img src="/images/album_circle_landscape.png"
                    className="pointer-events-none album_material_circle w-[80%] absolute -translate-y-[25%] translate-x-[20%]"
                  />

                  <div index={index} data={albumData.album_cover_material_text[index]} className="album_material pointer-events-none ml-2 lg:ml-4 text-[0.563em] md:text-[0.875em] leading-[1.5em]">{albumData.album_cover_material_text[index]}</div>                      
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div id="album-finish"
        className='bg-[#f3f2ed] text-[#3D210F] font-hero-new-regular p-4 pb-14 lg:py-16 md:px-20 xl:px-64'
      >
        <hr className='fadeIn w-[50px] lg:w-[100px] transform rotate-90 border-[#3D210F] m-auto '/>

        <h3 className='fadeIn font-the-seasons-bold text-[2.5rem] lg:text-[3em] leading-[50px] tracking-[1px] text-center mb-8 lg:mb-[66.66px] mt-[2rem] lg:mt-[4rem] '>SELECT YOUR COVER FINISH</h3>

        <div className='grid grid-cols-1 gap-y-14 lg:gap-y-8 gap-x-4 w-fit m-auto'>
          {Array.isArray(albumData.album_cover_finish_images) && albumData.album_cover_finish_images.length > 0 ? (
            albumData.album_cover_finish_images.map((item, index) => (
              <div className='fadeIn cursor-pointer w-full lg:px-4 lg:flex text-center lg:text-left lg:items-center'
                key={index}
                onClick={(event) => handleClick_AlbumFinish(event, index, albumData.album_cover_finish_details[index].price)}
                onMouseEnter={(event) => handleMouseEnter_AlbumFinish(event, index)}
                onMouseLeave={(event) => handleMouseLeave_AlbumFinish(event, index)}
              >
                <img src={item}
                  className="pointer-events-none w-full lg:w-[320px] h-fit mb-4 lg:mb-0"
                />

                <div className="relative">
                  <img src="/images/album_circle_landscape2.png"
                    className="pointer-events-none album_finish_circle w-[80%] absolute translate-y-[-25%] lg:translate-y-[0] translate-x-[10%] lg:translate-x-[20%]"
                  />
                  <div className="pointer-events-none lg:ml-14 text-2xl lg:text-[2.25em] font-the-seasons-bold leading-[1.2]">
                    <span index={index} data={albumData.album_cover_finish_details[index].title} className="album_finish">{albumData.album_cover_finish_details[index].title}</span> <br/>
                    ${albumData.album_cover_finish_details[index].price}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div id="album-submit"
        className='bg-[#E3DACD] text-[#972E00] font-hero-new-regular py-14 lg:py-24'
      >
        <div className="px-4 lg:px-0">
          <h3 className='fadeIn font-the-seasons-bold text-[2.5rem] lg:text-[4rem] leading-[1.5] tracking-[1px] text-center mb-4 lg:mb-[18.66px]'>
            LET’S CREATE YOUR HEIRLOOM
          </h3>
          <p className='fadeIn text-[1em] leading-[32px] text-center w-full m-auto mb-[66.66px]'>
            Did you make up your mind yet? If you don't, that is fine. Take your time as you might have a tough time narrowing it down to one.<br/>
            They are all incredible and durable! When you are ready, please fill out the order form below.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-14 lg:gap-y-0 gap-x-14 px-4 lg:px-20'>
          <div className='flex flex-col gap-y-4'>
            <div className="fadeIn">
              {albumSizePrice ? 
                <div>
                  <div className='border-[#972E00] border-b-[1px] flex justify-between text-[1em] mb-4 pb-4'>
                    <span>SIZE SELECTION</span>
                    <span>PRICE</span>
                  </div>

                  <div className='flex justify-between font-the-seasons-bold text-[2em] leading-[42.8px] tracking-[1px]'>
                    <span>{albumData.album_size_details_title[selectAlbum_size_index]}</span>
                    <span>${albumData.album_size_details_price[selectAlbum_size_index]}</span>
                  </div>
                </div>
                : '' 
              }
            </div>

            <div className="fadeIn">
              {selectAlbum_material_index ? 
                  <div>
                    <div className='border-[#972E00] border-b-[1px] flex justify-between text-[1em] mb-4 pb-4'>
                      <span>SIZE SELECTION</span>
                      <span>PRICE</span>
                    </div>

                    <div className='flex justify-between font-the-seasons-bold text-[2em] leading-[42.8px] tracking-[1px]'>
                      <span>{albumData.album_cover_material_text[selectAlbum_material_index]}</span>
                      <span>$0</span>
                    </div>
                  </div>
                : '' 
              }
            </div>

            <div className="fadeIn">
              {albumFinishPrice ? 
                <div>
                  <div className='border-[#972E00] border-b-[1px] flex justify-between text-[1em] mb-4 pb-4'>
                    <span>COVER FINISH SELECTION</span>
                    <span>PRICE</span>
                  </div>

                  <div className='flex justify-between font-the-seasons-bold text-[2em] leading-[42.8px] tracking-[1px]'>
                    <span>{albumData.album_cover_finish_details[selectAlbum_finish_index].title}</span>
                    <span>${albumFinishPrice}</span>
                  </div>
                </div>
                : '' 
              }
            </div>
          </div>

          <div className='font-the-seasons-bold text-[2.25em] text-[#972E00]'>
            <div>
              <div className='grid grid-col-1 lg:grid-cols-2 gap-y-8 lg:gap-y-0 gap-x-8 mb-8'>
                <input name="name" className='fadeIn w-full py-3 lg:py-0 lg:p-3 pt-0 border-b-[1px] border-[#972E00]' placeholder='Your Name' type='text' album="" style={{ padding: '0px' }}/>
                <input name="email" className='fadeIn w-full py-3 lg:py-0 lg:p-3 pt-0 border-b-[1px] border-[#972E00]' placeholder='Your Email' type='email' album="" style={{ padding: '0px' }}/>
              </div>

              <textarea name="note" className='fadeIn py-3 lg:py-0 lg:p-3 border-b-[1px] border-[#972E00] w-full lg:h-[75%]' placeholder="Order Note" album="" style={{ padding: '0px' }}></textarea>

              <div className="fadeIn cursor-pointer
                    rounded-md
                    z-[5] w-fit mt-4
                    font-hero-new-regular 
                    text-[#972E00] hover:text-[#CB967F] 
                    text-[16px] leading-[24px]
                  "
                  onClick={handleSubmit}
              >
                CRAFT MY HEIRLOOM
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="modal-load" className="top-0 fixed backdrop-blur-sm w-[100vw] h-[100vh] flex justify-center items-center">
        <div id="modal-load-loading" className="flex justify-content items-center flex-col text-[#972e00] ">
          <img src="./images/modal_popup_loading.gif"
            className="w-[200PX]"
          />
          <h6 className="font-the-seasons-regular text-[2rem] text-[#972e00] text-center tracking-[2px]">
            LOAD
          </h6>
        </div>

        <div id="modal-load-suscess" className="flex justify-content items-center flex-col text-[#972e00] ">
          <img src="./images/modal_popup_sucess.gif"
            className="w-[200PX]"
          />
          <h6 className="translate-y-[-80%] font-the-seasons-regular text-[2rem] tracking-[2px]">
            SUBMIT SUCCES
          </h6>
          <button className="font-hero-new-regular hover:opacity-100 opacity-50 transition-all duration-300" type="button" onClick={closeSubmit}>OK</button>
        </div>

        <div id="modal-load-faild" className="flex justify-content items-center flex-col text-[#972e00] ">
          <img src="./images/modal_popup_error.gif"
            className="w-[200PX]"
          />
          <h6 className="translate-y-[-80%] font-the-seasons-regular text-[2rem] tracking-[2px]">
            SUBMIT FAILD
          </h6>
          <button className="font-hero-new-regular hover:opacity-100 opacity-50 transition-all duration-300" type="button" onClick={closeSubmit}>OK</button>
        </div>
      </div>
    </div>
  );
}
