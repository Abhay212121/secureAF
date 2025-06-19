import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { PostForm } from "./postForm";
import { Post } from "./Post";
import { Skeleton } from "antd";

export function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [member, setMember] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProtectedData = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      // const res = await axios.get("http://localhost:3000/posts", {
      const res = await axios.get(
        "https://secureaf-backend.onrender.com/posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            userNameHeader: `${localStorage.getItem("username")}`,
          },
        }
      );
      console.log("protected data:", res.data);
      const reversed = [...res.data.data].reverse();
      setPosts(reversed);
      console.log(res.data.role);
      if (res.data.role === "is a member") {
        setMember(true);
        localStorage.setItem("member", true);
      } else {
        localStorage.setItem("member", false);
      }
    } catch (error) {
      console.error("Unautohorized", error);
    } finally {
      setLoading(false);
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
    // <div className="bg-gradient-to-br from-sky-900 to-purple-800 min-h-screen">
    <div className="bg-[#061432] min-h-screen pb-20">
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        displayAll={true}
      />
      <PostForm
        onPostCreate={fetchProtectedData}
        loggedIn={loggedIn}
      />
      {loading && (
        <div>
          <div className="min-w-150 w-[40%] mx-auto my-16 p-4 rounded-2xl bg-[#1A2946] min-h-40">
            <Skeleton active={true}></Skeleton>
          </div>
          <div className="min-w-150 w-[40%] mx-auto my-16 p-4 rounded-2xl bg-[#1A2946] min-h-40">
            <Skeleton active={true}></Skeleton>
          </div>
          <div className="min-w-150 w-[40%] mx-auto my-16 p-4 rounded-2xl bg-[#1A2946] min-h-40">
            <Skeleton active={true}></Skeleton>
          </div>
        </div>
      )}
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
