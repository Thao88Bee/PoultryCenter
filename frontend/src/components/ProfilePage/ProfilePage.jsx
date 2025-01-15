import Footer from "../Footer";
import "./ProfilePage.css";
import UserPosts from "./UserPosts";

function ProfilePage() {

  return (
    <>
      <div className="userProfilePost">
        <h2>User Posts</h2>
      <UserPosts />
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;
