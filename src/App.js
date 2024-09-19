import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import { Loader } from "lucide-react";
import {
  RouterProvider,
} from "react-router-dom";
import router from "./router-provider";
import "../src/globel.css";
import { useDispatch } from 'react-redux';
import { setAdminStatus } from './redux/adminSlice';
import { fetchAuthSession } from "aws-amplify/auth";


Amplify.configure(awsExports);

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAuthSession()
      .then(session => {
        console.log("Session:", session); // Debug: Log the session object

        const accessToken = session.tokens?.accessToken?.toString();
        if (!accessToken) {
          console.error("Access Token is missing in the session object");
          return;
        }

        const groups = session.tokens.accessToken.payload["cognito:groups"];
        console.log("User Groups:", groups); // Debug: Log the groups
        if (groups && groups.includes('admin')) {
          dispatch(setAdminStatus(true));
         
        } else {
          dispatch(setAdminStatus(false));
        }
      })
      .catch((error) => {
        console.error("Error fetching session:", error);
       
      });
  }, []);

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
