import Footer from "../Footer";
import UserShows from "./UserShows";
import UserSwapMeets from "./UserSwapMeets";
import UserPosts from "./UserPosts";
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
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;
