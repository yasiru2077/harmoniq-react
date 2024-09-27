import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
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
import AddAlbum from "./pages/add-album/add-album";

const AdminRoleWrapper = ({ children }) => {
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  return isAdmin ? <AdminHome /> : <Home />;
};

const AdminProtectedRoute = ({ children }) => {
  const isAdmin = useSelector((state)=>state.admin.isAdmin);
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AuthenticatorPage />}>
      <Route index element={<AdminRoleWrapper />} />      
      <Route path="/musicplayer" element={<MusicPlayer />}></Route>
      <Route element={<AdminProtectedRoute />}>
      <Route path="/Analytics" element={<Analytics />}></Route>
      <Route path="/Albums" element={<AlbumPage />}></Route>
      <Route path="/addAlbum" element={<AddAlbum />}></Route>
      </Route>
    </Route>
  )
);

export default router;
