
import React, { useEffect , useState} from 'react';
import axios from 'axios';

import NavBar from "./navbar.js";
import Home1 from './home1.js'
import Home2 from './home2.js'
import Home3 from './home3.js'
import Home4 from './home4.js'
import Home5 from './home5.js'
import Home6 from './home6.js'
import Home7 from './home7.js'
import Home8 from './home8.js'
import Home9 from './home9.js'
import Home10 from './home10.js'
import Footer from './footer.js'

export default function Home() {
  const [home1_state,setHome1State] = useState(false)

  const [homeApiStatus, setHomeApiStatus] = useState('idle');
  const [homeData, setHomeData] = useState({
    home_running_text_first_text: '',
    home_running_text_second_text: '',
    home_running_text_image: '/images/image_placeholder.jpg',
    home_running_text_long_description: '',

    home_teams_long_description: '',
    home_teams_long_description_text_change_list: '',
    home_teams_team_name: '',
    home_teams_team_description: '',

    home_what_we_can_offer_title_no_1: '',
    home_what_we_can_offer_description_no_1: '',
    home_what_we_can_offer_image_no_1: '/images/image_placeholder.jpg',
    home_what_we_can_offer_title_no_2: '',
    home_what_we_can_offer_description_no_2: '',
    home_what_we_can_offer_image_no_2: '/images/image_placeholder.jpg',
    home_what_we_can_offer_title_no_3: '',
    home_what_we_can_offer_description_no_3: '',
    home_what_we_can_offer_image_no_3: '/images/image_placeholder.jpg',
  });

  const updateHome1State = (newValue) => {
    setHome1State(newValue);
  };

  const getImageUrl = async (imageId) => {
    try {
      const response = await fetch(`${process.env.API_ENDPOINT}/media/${imageId}`);
      const theDataImage = await response.json();
      return theDataImage.source_url;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        setHomeApiStatus('loading');
        const response = await axios.get(`${process.env.API_ENDPOINT}/pages/17`);
        const responseData = response.data;

        const imageLink_home_running_text = await getImageUrl(responseData.home_running_text_image);
        const imageLink_home_whatWeCanOffer_image1 = await getImageUrl(responseData.home_what_we_can_offer_image_no_1);
        const imageLink_home_whatWeCanOffer_image2 = await getImageUrl(responseData.home_what_we_can_offer_image_no_2);
        const imageLink_home_whatWeCanOffer_image3 = await getImageUrl(responseData.home_what_we_can_offer_image_no_3);

        setHomeData({
          ...homeData,
          home_running_text_first_text: responseData.home_running_text_first_text,
          home_running_text_second_text: responseData.home_running_text_second_text,
          home_running_text_image: imageLink_home_running_text,
          home_running_text_long_description: responseData.home_running_text_long_description,

          home_teams_long_description: responseData.home_teams_long_description,
          home_teams_long_description_text_change_list: responseData.home_teams_long_description_text_change_list,
          home_teams_team_name: responseData.home_teams_team_name,
          home_teams_team_description: responseData.home_teams_team_description,

          home_what_we_can_offer_title_no_1: responseData.home_what_we_can_offer_title_no_1,
          home_what_we_can_offer_description_no_1: responseData.home_what_we_can_offer_description_no_1,
          home_what_we_can_offer_image_no_1: imageLink_home_whatWeCanOffer_image1,
          home_what_we_can_offer_title_no_2: responseData.home_what_we_can_offer_title_no_2,
          home_what_we_can_offer_description_no_2: responseData.home_what_we_can_offer_description_no_2,
          home_what_we_can_offer_image_no_2: imageLink_home_whatWeCanOffer_image2,
          home_what_we_can_offer_title_no_3: responseData.home_what_we_can_offer_title_no_3,
          home_what_we_can_offer_description_no_3: responseData.home_what_we_can_offer_description_no_3,
          home_what_we_can_offer_image_no_3: imageLink_home_whatWeCanOffer_image3,    
        });
      } catch (error) {
        console.error(error);
        setHomeApiStatus('error');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // console.log('[HOME_JS] homeData', homeData);
  }, [homeData]);

  useEffect(() => {
    if (document.readyState === 'loading') {
      console.log('Page is still loading.');
    } else {
      console.log('Page has already finished loading.');
    }
    
    const handleScrollPosition = (e) => {
      if (window.scrollY === 0) {
        setHome1State(false);
      } else {
        setHome1State(true);
      }
    };
  
    window.addEventListener('wheel', handleScrollPosition);
  
    return () => {
      window.removeEventListener('wheel', handleScrollPosition);
    };
  }, []);
  

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    // document.getElementById("main-content").classList.add("overflow-hidden");
  },[])

//   useEffect(() => {
//     // Get the hash fragment from the URL
//     const hash = window.location.hash;

//     console.log("aaaaaa",window.location.hash)

//     // Check if the hash fragment matches '#whyus'
//     if (hash === '#whyus') {
//         // Remove a class from the body element
//         updateHome1State(true);
//         document.getElementById('whyus').scrollIntoView({ behavior: 'smooth', block: 'start' })
//     }
//     else{
//       updateHome1State(false);
//     }
// }, []);

  return (
    // <div id="main-content" className={'relative max-w-[100vw] overflow-x-hidden' }>
    <div id="main-content" className={'relative max-w-[100vw]' }>
      <NavBar updateHome1State={updateHome1State}/>
      <Home1 updateHome1State={updateHome1State} />
      <Home2 homeData={homeData} />
      <Home3/>
      <Home4/>
      <Home5/>
      <Home6/>
      <Home7/>
      <Home8/>
      <Home9/>
      <Home10/>
      <Footer/>
    </div>
  )
}
