import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import Home from "./pages/home/home";
import Logout from "./components/logout/logout";
import { Loader } from "lucide-react";
import MainNavigator from "./pages/navigator/main-navigator";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthenticatorPage from "./pages/Authenticator/authenticator";
import MusicPlayer from "./pages/music-player/music-player";
import router from "./router-provider";
import "../src/globel.css";

Amplify.configure(awsExports);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust this time as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <Loader className="w-16 h-16 mx-auto text-blue-500 animate-spin" />
          <p className="mt-4 text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default withAuthenticator(App);
