import NavBar from "../../components/NavBar.tsx";
import PostForm from "../../components/PostForm.tsx";

export default function AddPost() {
    return (
      <>
      <NavBar/>
      <div>
        <PostForm></PostForm>
      </div>
      </>
    );
  }