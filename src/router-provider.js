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

// const Layout = ()=>(
//     <AuthenticatorPage>
//     <Outlet/>
//     </AuthenticatorPage>
// )

const role = "admin";

const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route element={<Layout/>}>
    // </Route>
    <Route path="/" element={<AuthenticatorPage />}>
      {role === "admin" ? (
        <Route index element={<AdminHome />} />
      ) : (
        <Route index element={<Home />} />
      )}
      <Route path="/Albums" element={<AlbumPage/>}></Route>
      <Route path="/Analytics" element={<Analytics/>}></Route>
      <Route path="/musicplayer" element={<MusicPlayer />}></Route>
    </Route>
  )
);

export default router;
