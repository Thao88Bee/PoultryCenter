import Footer from "../Footer";
import "./ProfilePage.css";
import UserPosts from "./UserPosts";
import UserShows from "./UserShows";

function ProfilePage() {
  return (
    <>
      <div className="userProfile">
        <h2>User Shows</h2>
        <UserShows />
        <h2>User Posts</h2>
        <UserPosts />
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;
