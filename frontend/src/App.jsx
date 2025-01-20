import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
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
import CreateShow from "./components/Create/CreateShow";
import UpdateShow from "./components/Update/UpdateShow";
import CreateSwapMeet from "./components/Create/CreateSwapMeet";
import UpdateSwapMeet from "./components/Update/UpdateSwapMeet";
import CreatePost from "./components/Create/CreatePost";
import UpdatePost from "./components/Update/UpdatePost";
import NoChickenPage from "./components/NoChickenPage";
import Footer from "./components/Footer";

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
      <ScrollRestoration />
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
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
        path: "/shows/create",
        element: <CreateShow />,
      },
      {
        path: "/shows/:showId/update",
        element: <UpdateShow />,
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
        path: "/swapMeets/create",
        element: <CreateSwapMeet />,
      },
      {
        path: "/swapMeets/:swapMeetId/update",
        element: <UpdateSwapMeet />,
      },
      {
        path: "/posts",
        element: <PostPage />,
      },
      {
        path: "/posts/:postId",
        element: <SinglePost />,
      },
      {
        path: "/posts/create",
        element: <CreatePost />,
      },
      {
        path: "/posts/:postId/update",
        element: <UpdatePost />,
      },
    ],
  },
  {
    path: "*",
    element: <NoChickenPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
