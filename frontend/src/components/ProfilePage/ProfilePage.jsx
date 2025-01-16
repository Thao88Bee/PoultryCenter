import UserShows from "./UserShows";
import UserSwapMeets from "./UserSwapMeets";
import UserPosts from "./UserPosts";
import UserReviews from "./UserReviews";
import Footer from "../Footer";
import "./ProfilePage.css";

function ProfilePage() {
  return (
    <>
      <div className="userProfile">
        <h2>User Shows</h2>
        <UserShows />
        <h2>User Swap Meets</h2>
        <UserSwapMeets />
        <h2>User Posts</h2>
        <UserPosts />
        <h2>User Reviews</h2>
        <UserReviews />
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;
