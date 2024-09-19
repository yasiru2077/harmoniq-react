import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import AuthenticatorPage from "./pages/Authenticator/authenticator";
import MusicPlayer from "./pages/music-player/music-player";
import Home from "./pages/home/home";
import AdminHome from "./pages/admin-home-page/admin-home";
import AlbumPage from "./pages/Albums/album-page";
import Analytics from "./pages/analytics/analytics";
// import { fetchAuthSession } from '@aws-amplify/auth';
// import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
// import { Amplify } from 'aws-amplify';
import { useSelector } from "react-redux";

const AdminRoleWrapper = ({ children }) => {
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  return isAdmin ? <AdminHome /> : <Home />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AuthenticatorPage />}>
      {/* {isAdmin ? (
        <Route index element={<AdminHome />} />
      ) : (
        <Route index element={<Home />} />
      )} */}
      <Route index element={<AdminRoleWrapper />} />
      <Route path="/Albums" element={<AlbumPage />}></Route>
      <Route path="/Analytics" element={<Analytics />}></Route>
      <Route path="/musicplayer" element={<MusicPlayer />}></Route>
    </Route>
  )
);

export default router;
