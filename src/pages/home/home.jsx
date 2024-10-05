import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { getCurrentUser, fetchUserAttributes } from "@aws-amplify/auth";
import Logo from "../../components/logo/logo";
import { Authenticator } from "@aws-amplify/ui-react";
import "./home.css";
import MainNavigator from "../navigator/main-navigator";
import Search from "../../components/search/search";
import Genre from "../../components/cards/genre";
import Albums from "../../components/albums/albums";
import { Link } from "react-router-dom";
import RecommendationPage from "../recomandation-page/recommendation-page";

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
      <Search />
      <div className="categories">
        <h2>Genre</h2>
        {/* <p className="text-3xl font-bold underline">aduiahidhaihdi</p> */}
        <Genre />
      </div>
      <div className="albums">
      <h2>Albums</h2>
      <Albums/>
      </div>
      <RecommendationPage/>
      {/* <div className="Recommendations">
      <h2>Recommendations</h2>
      <Link to="/musicplayer">go to music</Link>
      </div> */}
    </section>
  );
}

export default Home;
