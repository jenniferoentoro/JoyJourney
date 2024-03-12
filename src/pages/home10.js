import React, { useState, useEffect } from "react";
import gsap from 'gsap';

import styles from '../styles/home10.module.css';

const Home10 = () => {
  const [questions, setQuestions] = useState([
    {
      question: '1. WHAT IS YOUR NAME?',
      answer: '',
      placeholder: 'type here',
      title: 'My name is',
    },
    {
      question: '2. HOW CAN WE CONTACT YOU?',
      answer: '',
      placeholder: 'type here',
      title: 'My email address is',
    },
    {
      question: '3. WHAT SESSION DO YOU INTEREST IN?',
      answer: '',
      placeholder: 'type here',
      title: 'I have a plan in mind to hold a',
    },
    {
      question: '4. DO YOU HAVE ANY QUESTIONS FOR US?',
      answer: '',
      placeholder: 'type here',
      title: '',
    },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      

      submitHandle();

      console.log('Submitting form...');
    } else {
      if (questions[currentQuestion].answer.trim() !== '') {
        gsap.to('#warning', { duration: 1, opacity: 0, ease: 'power2.out' });
        gsap.to('.questions', { duration: 0.4, opacity: 0, y: -20, ease: 'power2.out', onComplete: () => {
          setCurrentQuestion(currentQuestion + 1);
          gsap.fromTo('.questions', { opacity: 0, y: 20 }, { duration: 0.4, opacity: 1, y: 0, ease: 'power2.out' });
        }});
      } else {
        const warningMessages = [
          'Please fill your name',
          'Please fill your email',
          'Please fill your session',
          'Please fill your question',
        ];
        document.getElementById('warning').innerHTML = warningMessages[currentQuestion];
        gsap.to('#warning', { duration: 1, opacity: 1, ease: 'power2.out' });
      }
    }
  };

  const handlePrevQuestion = () => {
    gsap.to('#warning', { duration: 1, opacity: 0, ease: 'power2.out' });
    gsap.to('.questions', { duration: 0.4, opacity: 0, y: -20, ease: 'power2.out', onComplete: () => {
      setCurrentQuestion(currentQuestion - 1);
      gsap.fromTo('.questions', { opacity: 0, y: 20 }, { duration: 0.4, opacity: 1, y: 0, ease: 'power2.out' });
    }});
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].answer = value;
    setQuestions(updatedQuestions);
  };

  const sendDataToWordPressAPI = async (formData) => {
    try {
      const response = await fetch('https://control.vowrever.com/wp-json/qubick-api/v1/contactus', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(formData),
      });

      const data = await response.json();

      if(data.response == 200){
        document.getElementById('warning').innerHTML = 'Thank You For Submitting...';

        gsap.to(".home10_fadeIn_form",{
          autoAlpha: 0,
        })

        gsap.to("#warning",{
          autoAlpha: 1,
          color: '#972E00'
        })

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

  const submitHandle = async () => {
    document.body.classList.add("overflow-hidden");
    gsap.to("#modal-load",{autoAlpha: 1,zIndex: 200})
    gsap.set("#modal-load-loading",{autoAlpha: 1,display: 'flex'})
    gsap.set("#modal-load-suscess",{autoAlpha: 0,display: 'none'})
    gsap.set("#modal-load-faild",{autoAlpha: 0,display: 'none'})

    const formData = {
      name: questions[0].answer.toString(),
      email: questions[1].answer.toString(),
      session: questions[2].answer.toString(),
      question: questions[3].answer.toString(),
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

  useEffect(() => {
    gsap.set("#modal-load",{autoAlpha: 0,zIndex: -1})
    gsap.set("#modal-load-suscess",{autoAlpha: 0,display: 'none'})
    gsap.set("#modal-load-faild",{autoAlpha: 0,display: 'none'})

    gsap.fromTo(".home10_fadeIn",{
      autoAlpha: 0,
      yPercent: 50,
    },{
      autoAlpha: 1,
      yPercent: 0,
      stagger: .5,
      scrollTrigger:{
        trigger: "#contact",
        start: "top center",
      }
    })
  }, []);

  return (
    <div id="contact" className="bg-[#E3DACD] text-[#972E00] flex font-the-seasons-regular justify-start items-center flex-col h-fit py-14">
      <div className="w-full">
        <div className="px-4 lg:px-0 mx-[auto]">
          <h1 className="home10_fadeIn font-the-seasons-bold tracking-[1.44px] text-[2rem] md:text-[2.5rem] lg:text-[3rem] lg:leading-[70px] text-center text-[#972E00] mb-8">
            NOW THAT YOU HAVE GOT TO KNOW ABOUT US<br/>
            WE WOULD LOVE TO HEAR ABOUT YOU THIS TIME <br/>
            THINK WE WOULD MAKE A GOOD FIT?
          </h1>
        </div>

        <div className="mx-auto w-0.5 h-20 bg-[#972E00] border-l-1 border-r-1"></div>

        <div className="p-12 px-4 lg:p-12">
          <div className="flex flex-col gap-2 mb-14">
            <div className="flex justify-between">
              <h2 className="home10_fadeIn_form home10_fadeIn questions text-[#972E00] text-[0.75rem] font-hero-new-regular tracking-[0.24px]">{questions[currentQuestion].question}</h2>
              <h2 className="home10_fadeIn_form home10_fadeIn text-[#972E00] text-[0.75rem] font-hero-new-regular tracking-[0.24px]">INQUIRE US</h2>
            </div>

            <div className="questions flex flex-col lg:flex-row justify-center lg:justify-start lg:items-center text-2xl">
              <label className="home10_fadeIn_form home10_fadeIn mr-2 mb-4 lg:mb-0 text-[#972E00] font-the-seasons-bold tracking-[1.08px] text-[2.25rem]">{questions[currentQuestion].title}</label>
              <input
                type="text"
                className={`home10_fadeIn_form home10_fadeIn border-none bg-transparent border-b-2 w-[70%] text-[#cb967f] focus:outline-none font-the-seasons-bold tracking-[1.08px] text-[2.25rem]`}
                value={questions[currentQuestion].answer}
                onChange={handleInputChange}
                placeholder={questions[currentQuestion].placeholder}
              />

            </div>
          </div>

          <div className="flex justify-center">
            <span id="warning" className="text-[#cb967f] font-hero-new-regular text-xs">&nbsp;</span>
          </div>

          <div className="flex justify-between mt-6 font-hero-new-regular">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className={`${styles.button} home10_fadeIn_form home10_fadeIn text-[1rem] lg:text-[1.25rem] tracking-[0.4px] ${currentQuestion === 0 ? styles.disabled : ""}`}
            >
              PREVIOUS
            </button>
            {
              currentQuestion === questions.length - 1 ? (
                <button className="home10_fadeIn_form home10_fadeIn text-[1rem] lg:text-[1.25rem] tracking-[0.4px]" onClick={handleNextQuestion}>SUBMIT</button>
              ) : (
                <button className="home10_fadeIn_form home10_fadeIn text-[1rem] lg:text-[1.25rem] tracking-[0.4px]" onClick={handleNextQuestion}>NEXT</button>
              )
            }
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
};

export default Home10;
