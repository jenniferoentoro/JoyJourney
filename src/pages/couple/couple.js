import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import gsap from 'gsap';
import axios from 'axios';


import styles from '../../styles/works_detail.module.css';
import { list } from "postcss";


export default function worksArchive () {

  const [projectList, setProjectList] = useState([]);
  const [apiStatus, setApiStatus] = useState('idle');

  const tl_starter = useRef();
  

  useLayoutEffect(() => {
    if(projectList && apiStatus == 'success'){
      let listProject = document.querySelectorAll(".projectThumbnail")
      
      const ctx = gsap.context(() => {
        let sequence = 0;
        listProject.forEach((element, index) => {
          gsap.set(element,{
            zIndex: listProject.length - index,
            filter: (index == 0 ? "blur(0)" : "blur("+(index*5)+"px)"),
          })
          if(sequence == 0){
            gsap.set(element.querySelector("img"),{
              z: -(index * 50 * (index/2)) + 'px' ,
              x: (index * 50) + 'px' ,
              y: (index * 50) + 'px' ,
            })
          }
          else if(sequence == 1){
            gsap.set(element.querySelector("img"),{
              z: -(index * 50 * (index/2)) + 'px' ,
              x: -(index * 25) + 'px' ,
            })
          }
          else if(sequence == 2){
            gsap.set(element.querySelector("img"),{
              z: -(index * 50 * (index/2)) + 'px' ,
              x: (index * 25) + 'px' ,
              y: -(index * 50) + 'px' ,
            })
          }
          else if(sequence == 3){
            gsap.set(element.querySelector("img"),{
              z: -(index * 50 * (index/2)) + 'px' ,
              x: -(index * 25) + 'px' ,
              y: -(index * 50) + 'px' ,
            })
          }
          
          if(sequence == 3){
            sequence = 0
          }
          else{
            sequence++;
          }
        });
        

        
      });
      return () => ctx.revert();
    }
  }, [projectList,apiStatus]);

  // API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setApiStatus("loading");
        let response = await axios.get(
          `https://control.vowrever.com/wp-json/qubick-api/v1/works-couple`
        );
        let responseData = response.data;

        setProjectList([
          ...responseData
        ]);

        setApiStatus("success");
      } catch (error) {
        console.error(error);
        setApiStatus("error");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (apiStatus == 'success'){

      const handleScroll = (e) => {
        let listProject = document.querySelectorAll(".projectThumbnail")
        let sequence = 0;
        let activeIndex = document.querySelector("#couple").getAttribute("active")
        
        listProject.forEach((element, index) => {
          let elementImage = element.querySelector("img")
          const elementComputed = window.getComputedStyle(element);
          const elementImageComputed = window.getComputedStyle(elementImage);
          const transformValue = elementImageComputed.getPropertyValue("transform");
          const translateValues = parseTransformValue(transformValue);

          const filterValue = elementComputed.getPropertyValue("filter");
          const blurValue = extractBlurValue(filterValue);

          if(activeIndex == index){
            gsap.to(element,{
              filter: 'blur('+(blurValue-1)+'px)',
            })
          }
          else if(activeIndex != index && blurValue > 5){
            console.log("MASUK,", index, blurValue)
            gsap.to(element,{
              filter: 'blur('+(blurValue-(1/2))+'px)',
            })
          }

          if(sequence == 0){
            gsap.to(element.querySelector("img"),{
              z: (translateValues.z + 20) + 'px' ,
              x: (translateValues.x - 50) + 'px' ,
              y: (translateValues.y - 50) + 'px' ,
            })
          }
          else if(sequence == 1){
            if(activeIndex == 1){
              gsap.to(element.querySelector("img"),{
                z: (translateValues.z + 20) + 'px' ,
                x: (translateValues.x + 50) + 'px' ,
                y: (translateValues.y - 50) + 'px' ,
              })
            }
            else{
              gsap.to(element.querySelector("img"),{
                z: (translateValues.z + 10) + 'px' ,
                x: (translateValues.x + 10) + 'px' ,
                y: (translateValues.y - 10) + 'px' ,
              })
            }
          }
          else if(sequence == 2){
            gsap.to(element.querySelector("img"),{
              z: (translateValues.z + 10) + 'px' ,
              x: (translateValues.x - 10) + 'px' ,
              y: (translateValues.y - 10) + 'px' ,
            })
          }
          else if(sequence == 3){
            gsap.to(element.querySelector("img"),{
              z: (translateValues.z + 10) + 'px' ,
              x: (translateValues.x + 10) + 'px' ,
              y: (translateValues.y + 10) + 'px' ,
            })
          }
          
          if(sequence == 3){
            sequence = 0
          }
          else{
            sequence++;
          }
          console.log(filterValue)
        })
      }

      const parseTransformValue = (transformValue) => {
        if (!transformValue || transformValue === "none") {
          return { x: 0, y: 0, z: 0 };
        }
      
        const matrixRegex = /matrix3d\((.+)\)/;
        const match = transformValue.match(matrixRegex);
      
        if (match && match[1]) {
          const values = match[1].split(',').map(parseFloat);
          // Extract translation values
          const x = values[12];
          const y = values[13];
          const z = values[14];
          return { x, y, z };
        } else {
          return { x: 0, y: 0, z: 0 };
        }
      };

      const extractBlurValue = (filterValue) => {
        const blurMatch = filterValue.match(/blur\(([0-9]+)px\)/);
        if (blurMatch && blurMatch[1]) {
          return parseInt(blurMatch[1]);
        } else {
          return 0; // Default value if blur not found
        }
      }

      window.addEventListener('wheel', handleScroll);
      // window.addEventListener('touchmove', handleTouchMove);
  
      return () => {
        window.removeEventListener('wheel', handleScroll);
      };
    }
  }, [projectList,apiStatus]);


  return (
    <div id="couple" active="0" scroll="0" className="font-hero-new-regular text-[1em] text-[#972E00] bg-[#E3DACD] w-full max-h-[100vh] h-[100vh] overflow-hidden flex justify-center items-center flex-col">
      <div className="z-[1] relative flex w-[60%]">
        <div className="w-full">
          <p className="text-center">
            An intimate photo session where the got lost in favored destination places together.<br/>
            The strengthen their relationship bond before they tie the knot into a new chapter of their life.
          </p>

          <hr className="border-[#972E00] my-[1.75em]"/>
        </div>
        
        <a href="/works" className="absolute bottom-0 right-0 translate-y-[-80%] translate-x-[200%]">
          <div className="relative cursor-pointer hover:opacity-50 transition-all duration-300 ease-in-out">
            <div className={`h-[1.5px] my-1 bg-[#972E00] w-[2rem] transform transition-all duration-300 ease-in-out translate-y-[300%] rotate-[45deg]`}/>
            <div className={`h-[1.5px] my-1 bg-[#972E00] w-[2rem] transform transition-all duration-300 ease-in-out opacity-0`}/>
            <div className={`h-[1.5px] my-1 bg-[#972E00] w-[2rem] transform transition-all duration-300 ease-in-out translate-y-[-450%] rotate-[-45deg]`}/>
          </div>
        </a>
      </div>

      <div className="z-[0] w-screen h-screen absolute top-0 left-0">
        {projectList.map((item, index) => {
          const sequence = index % 4; // Modulo operation to ensure sequence repeats from 0 to 3

          return (
            <div key={index}
              className={`${styles.works_thumbnail} projectThumbnail absolute ${
                sequence === 0 ? 'bottom-[50%] right-[50%] satu' :
                sequence === 1 ? 'bottom-[50%] left-[50%] dua' :
                sequence === 2 ? 'top-[50%] right-[50%] tiga' :
                sequence === 3 ? 'top-[50%] left-[50%] empat' : ''
              }`}
            >
              <img
                src={item.thumbnail}
                className={`h-[30vh] w-auto relative `}
            />
            </div>
          );
        })}
      </div>

      <div className="z-[1] relative w-[60%] px-8 flex justify-between">
        {projectList.map((item, index) => (
          <div key={index}>
            {item.client}
          </div>
        ))}
      </div>
    </div>
  );
};
