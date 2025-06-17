import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { PostForm } from "./postForm";
import { Post } from "./Post";

export function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("protected data:", res.data);
        setPosts(res.data.data);
        console.log(res.data);
        if (res.data.status == 200) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Unautohorized", error);
      }
    };
    fetchProtectedData();
  }, []);

  return (
    <div>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <PostForm />
      {posts.map((post) => {
        return <Post data={post} />;
      })}
    </div>
  );
}
