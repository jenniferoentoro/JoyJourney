import React, { useEffect, useState, useRef } from "react";
import gsap from 'gsap';

import { Collapse } from "react-collapse";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const AccordionItem = ({title, desc}) => {

  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    fetch(`${process.env.API_ENDPOINT}/faq`)
    .then((response) => response.json())
    .then((data) => {
      const faqData = data.map((item) => ({
        title: item.faq_question,
        desc: item.faq_answear.replace(/<\/?div>/g, ""),
      }));
      setAccordionFaq(faqData);
    })
    .catch((error) => {
    });
    
    gsap.set(".home9_item_fadeIn",{
      autoAlpha: 0,
      yPercent: 50,
    })
    
    gsap.fromTo(".home9_item_fadeIn",{
      autoAlpha: 0,
      yPercent: 50,
    },{
      autoAlpha: 1,
      yPercent: 0,
      stagger: .1,
      scrollTrigger:{
        trigger: ".home9_item_fadeIn",
        start: "top center",
        // toggleActions: 'restart resume restart restart',
      }
    })
  }, []);
  
  return(
    <div className="home9_item_fadeIn flex flex-col border-b border-[#3D210F] justify-item-start">
      <div className="py-[24px]  flex cursor-pointer" onClick={() => setIsOpened(!isOpened)}>
        <p className="text-[1.3em] lg:text-[2em] font-the-seasons-bold text-[#3D210F] tracking-[0.96px]">{title}</p>

        <div className="text-[0.875em] lg:text-[1.25em] ml-auto text-[#3D210F]">
          {isOpened? <AiOutlineMinus className="h-8"/> : <AiOutlinePlus className="h-8" />}
        </div>
      </div>
      
      <Collapse isOpened={isOpened}>
        <div className="text-[1em] text-[#3D210F] leading-[24px] tracking-[0.96px] pb-[20px] font-hero-new-regular">{desc}</div>
      </Collapse>
    </div>
    
    )
  }
  export default AccordionItem