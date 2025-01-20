import { NavLink } from "react-router-dom";
import UserShows from "./UserShows";
import UserSwapMeets from "./UserSwapMeets";
import UserPosts from "./UserPosts";
import UserReviews from "./UserReviews";
import "./ProfilePage.css";

function ProfilePage() {
  return (
    <>
      <div className="userProfile">
        <h2>Shows</h2>
        <NavLink className="userProfileLink" to={"/shows/create"}>
          Create New Show
        </NavLink>
        <UserShows />
        <h2>Swap Meets</h2>
        <NavLink className="userProfileLink" to={"/swapMeets/create"}>
          Create New Swap Meet
        </NavLink>
        <UserSwapMeets />
        <h2>Posts</h2>
        <NavLink className="userProfileLink" to={"/posts/create"}>
          Create New Post
        </NavLink>
        <UserPosts />
        <h2>Reviews</h2>
        <UserReviews />
      </div>
    </>
  );
}

export default ProfilePage;
