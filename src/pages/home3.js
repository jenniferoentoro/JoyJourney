import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import gsap from "gsap";
import axios from "axios";

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import Typewriter from "typewriter-effect";
import Collapse from "react-collapse";

export default function Home3() {
  const [activeIndices, setActiveIndices] = useState([0]);

  const tl_starting = useRef();

  const [dataTeam, setDataTeam] = useState({
    home_teams_long_description: "",
    home_teams_long_description_text_change_list: "",
    home_teams_team: [],
  });
  const [apiStatus, setApiStatus] = useState("idle");

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      tl_starting.current = 
      gsap.timeline({
        scrollTrigger:{
          trigger: "#Home3",
          start: "top top+=10%",
        },
      })

      .fromTo(".home3_fadeIn",{
        autoAlpha: 0,
        yPercent: 10
      },{
        autoAlpha: 1,
        yPercent: 0,
        stagger: .3
      })
      
    });
    return () => ctx.revert();
  }, [dataTeam]);

  // API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setApiStatus("loading");
        const response = await axios.get(
          `https://control.vowrever.com/wp-json/qubick-api/v1/teams`
        );
        const responseData = response.data;

        setDataTeam({
          ...dataTeam,
          home_teams_long_description: responseData.home_teams_long_description,
          home_teams_long_description_text_change_list:
            responseData.home_teams_long_description_text_change_list,
          home_teams_team: responseData.home_teams_team,
        });

        setApiStatus("success");
      } catch (error) {
        console.error(error);
        setApiStatus("error");
      }
    };

    fetchData();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((item) => item !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  if (!dataTeam) {
    // Handle the loading state or provide default values
    return (
      <div className="bg-[#E3DACD] flex justify-center items-center flex-col p-24">
        Loading...
      </div>
    );
  }

  return (
    <div id="Home3" className="bg-[#E3DACD] w-full flex justify-center items-center flex-col px-4 lg:px-24 py-8 md:py-36" ref={tl_starting}>
      <div
        className="home3_fadeIn text-[2rem] md:text-[2.3rem] xl:text-[3rem] text-center font-the-seasons-bold text-[#972E00] w-full tracking-[1.44px] leading-[1.5]"
        dangerouslySetInnerHTML={{
          __html: dataTeam.home_teams_long_description,
        }}
      ></div>

      <div className="home3_fadeIn text-[2rem] md:text-[2.3rem] xl:text-[3rem] text-center font-the-seasons-italic tracking-[1.44px] text-[#972E00] mb-8 md:mb-28">
        <Typewriter
          options={{
            strings: dataTeam.home_teams_long_description_text_change_list,
            autoStart: true,
            loop: true,
          }}
        />
      </div>

      <div className="home3_fadeIn w-0.5 h-10 md:h-20 bg-[#972E00] border-l-1 border-r-1 border-[#972E00]"></div>

      <div className="home3_fadeIn text-[2.3rem] lg:text-[3rem] tracking-[1.44px] text-center font-the-seasons-bold text-[#972E00] my-4">
        MEET THE TEAMS
      </div>

      <div className="w-full md:w-1/2 lg:w-full flex flex-col lg:flex-row justify-center gap-x-20 gap-y-20 md:gap-y-0">
        {Array.isArray(dataTeam.home_teams_team) &&
        dataTeam.home_teams_team.length > 0 ? (
          dataTeam.home_teams_team.map((member, index) => (
            <div
              className={
                index % 2 === 0
                  ? "home3_fadeIn w-full lg:w-[600px]"
                  : "home3_fadeIn w-full lg:w-[600px] mt-0 md:mt-32"
              }
              key={index}
            >
              <div className="home3_fadeIn image-container relative w-full flex justify-center relative">
                <div
                  className={`h-[500px] w-[300px] rounded-[10rem] bg-cover bg-center`}
                  style={{ backgroundImage: `url(${member.image})` }}
                ></div>
                <p className="home3_fadeIn absolute top-5 lg:text-nowrap text-[2.3rem] md:text-[4rem] tracking-[2.1px] text-center font-the-seasons-bold text-[#972E00]">
                  {member.name}
                </p>
              </div>

              <p className="home3_fadeIn text-center font-hero-new-regular text-[#972E00] mt-4 mb-8 text-[1.25rem] tracking-[0.4px]">
                {member.position}
              </p>

              <Collapse isOpened={activeIndices.includes(index)}>
                <div
                  className="home3_fadeIn leading-[24px] text-center font-hero-new-regular text-[#972E00] mt-2 text-[11px] md:text-[16px] tracking-[0px] lg:tracking-[0.24px] leading-[24px]"
                  id={`description${index}`}
                  dangerouslySetInnerHTML={{ __html: member.desc }}
                >
                </div>
              </Collapse>

              <div className="home3_fadeIn flex items-center justify-center">
                <div className="border-b-[1px] border-[#972E00] w-full mt-3"></div>
              </div>

              <p
                className="home3_fadeIn text-center font-hero-new-regular text-[#972E00] text-[0.75rem] tracking-[0.24px] leading-[24px] mt-3 cursor-pointer"
                onClick={() => toggleAccordion(index)}
                style={{ transition: "height 500ms" }}
              >
                {activeIndices.includes(index)
                  ? "- HIDE DETAILS ON HOW I GET INTO HERE"
                  : "+ VIEW DETAILS ON HOW I GET INTO HERE"}
              </p>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
