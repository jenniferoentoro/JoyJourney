import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import gsap from 'gsap';

import AccordionItem from "./AccordionItem";

const home9 = () => {
  const [accordionFaq, setAccordionFaq] = useState([]);


  useLayoutEffect(() => {
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
        console.error("Error fetching FAQ data:", error);
      });

      gsap.set(".home9_fadeIn",{
        autoAlpha: 0,
        yPercent: 50,
      })
  
      gsap.fromTo("#faq .home9_fadeIn",{
        autoAlpha: 0,
        yPercent: 50,
      },{
        autoAlpha: 1,
        yPercent: 0,
        stagger: .01,
        scrollTrigger:{
          trigger: "#faq",
          start: "top center",
          end: "bottom bottom",
          // markers: true
          // toggleActions: 'restart resume restart restart',
        }
      })
  }, []);

  return (
    <div id="faq" className="bg-[#F3F2ED] flex font-the-seasons-bold justify-center items-center flex-col py-24 text-[#3D210F] p-4 lg:p-24">
      <div className="flex justify-end w-full">
        <div className="w-full xl:w-[70%]">
          <h1 className="home9_fadeIn text-[1.75em] md:text-[2.5em] lg:text-[3em] leading-[1.5] tracking-[1.44px] mb-8">
            COMMON QUESTIONS<br/> USUALLY CLIENTS ASK
          </h1>

          <section className="place-items-center">
            <div className="w-full">
              {accordionFaq.map((data, index) => (
                <AccordionItem
                  key={index}
                  title={data.title}
                  desc={data.desc}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default home9;
