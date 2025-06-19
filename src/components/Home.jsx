import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { PostForm } from "./postForm";
import { Post } from "./Post";

export function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [member, setMember] = useState(false);

  const fetchProtectedData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
          userNameHeader: `${localStorage.getItem("username")}`,
        },
      });
      console.log("protected data:", res.data);
      const reversed = [...res.data.data].reverse();
      setPosts(reversed);
      console.log(res.data.role);
      if (res.data.role === "is a member") {
        setMember(true);
        console.log("member");
      }
    } catch (error) {
      console.error("Unautohorized", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    fetchProtectedData();

    const handleTabClose = () => {
      const rememberMe = localStorage.getItem("rememberMe");
      if (rememberMe == "false") {
        localStorage.removeItem("token");
      }
    };
    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-sky-900 to-purple-800 min-h-screen">
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <PostForm onPostCreate={fetchProtectedData} />
      {posts.map((post, index) => {
        return (
          <Post
            key={post.title + post.username + index}
            data={post}
            member={member}
            loggedIn={loggedIn}
          />
        );
      })}
    </div>
  );
}
