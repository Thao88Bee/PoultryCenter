import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import ProfilePage from "./components/ProfilePage";
import ShowPage from "./components/ShowPage";
import SingleShow from "./components/SingleShow";
import SwapMeetPage from "./components/SwapMeetPage";
import SingleSwapMeet from "./components/SingleSwapMeet";
import PostPage from "./components/PostPage";
import SinglePost from "./components/SinglePost";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/shows",
        element: <ShowPage />,
      },
      {
        path: "/shows/:showId",
        element: <SingleShow />,
      },
      {
        path: "/swapMeets",
        element: <SwapMeetPage />,
      },
      {
        path: "/swapMeets/:swapMeetId",
        element: <SingleSwapMeet />,
      },
      {
        path: "/posts",
        element: <PostPage />,
      },
      {
        path: "/posts/:postId",
        element: <SinglePost />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
