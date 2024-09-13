import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { getCurrentUser, fetchUserAttributes } from "@aws-amplify/auth";
import Logo from "../../components/logo/logo";
import { Authenticator } from "@aws-amplify/ui-react";
import "./home.css";
import MainNavigator from "../navigator/main-navigator";
import Search from "../../components/search/search";
import classic from "../../assets/images/Image Container.png";


// Amplify.configure({
//   Auth: {
//     region: 'ap-south-1',
//     userPoolId: 'ap-south-1_Npk4HakXd',
//     userPoolWebClientId: '57ds5b4maokudjc3hm0p0g0rlv'
//   }
// });

function Home() {
  const [userName, setUserName] = useState("");

  // useEffect(() => {
  //   fetchUserName();
  // }, []);

  // async function fetchUserName() {
  //   try {
  //     const user = await getCurrentUser();
  //     const attributes = await fetchUserAttributes();
  //     setUserName(attributes.name || user.username);
  //   } catch (error) {
  //     console.error('Error fetching user', error);
  //   }
  // }

  return (
    <section className="home-page">
      <div className="welcome">
        <h1>
          Hi, <strong>Yasiru</strong>
        </h1>
      </div>
      <Search/>
      <div className="categories">
        <h2>Genre</h2>
        {/* <p className="text-3xl font-bold underline">aduiahidhaihdi</p> */}
      

<div class="max-w-72 bg-white border border-gray-200 rounded-lg shadow ">
    <a href="#">
        <img class="rounded-t-lg w-full" src={classic} alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
        </a>
      
    </div>
</div>

      </div>
     
    </section>
  );
}

export default Home;
