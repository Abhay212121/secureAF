import axios from "axios";
import { useState } from "react";
import { Button, message } from "antd";

export function PostForm({ onPostCreate, loggedIn }) {
  const [postData, setPostData] = useState({ postTitle: "", postMessage: "" });
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      // const res = await axios.post("http://localhost:3000/posts", postData, {
      const res = await axios.post(
        `${import.meta.env.BACKEND_URL}/posts`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("form sent!");
      if (res.data.status == 200) {
        message.success("Post added!");
      } else {
        message.error("Try again");
      }
      onPostCreate();
      setPostData((prev) => ({ ...prev, postMessage: "", postTitle: "" }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loggedIn && (
        <div className="flex min-w-150 w-[40%] mx-auto p-6 rounded-lg gap-4 my-10 bg-[#1A2946]">
          <div className="flex flex-col w-[65%] gap-6 font-form-text">
            <input
              type="text"
              placeholder="Title of the post"
              name="postTitle"
              id="postTitle"
              className="py-1 px-2 rounded-md bg-white"
              onChange={(e) => {
                setPostData((prev) => ({ ...prev, postTitle: e.target.value }));
              }}
              value={postData.postTitle}
            />
            <textarea
              name="postMessage"
              id="postMessage"
              cols="30"
              rows="3"
              placeholder="Type your message here....."
              className="py-1 px-2 rounded-md bg-white  !resize-none"
              value={postData.postMessage}
              onChange={(e) => {
                setPostData((prev) => ({
                  ...prev,
                  postMessage: e.target.value,
                }));
              }}
            ></textarea>
          </div>
          <div className=" mx-auto font-form-head flex flex-col gap-8 items-center group">
            <Button
              className={`!text-2xl !h-full !w-40  !font-head !rounded-xl !border-0 ${
                loading ? "cursor-progress" : "cursor-pointer"
              }`}
              style={{
                backgroundColor: "#134874dc",
                color: "#FFE3A9",
              }}
              loading={loading}
              onClick={handleClick}
              disabled={postData.postMessage == "" || postData.postTitle == ""}
            >
              <p className="!mb-0 relative ">
                {loading ? "CREATING..." : "CREATE"}{" "}
                <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#FFE3A9] transition-all duration-300 group-hover:w-full"></span>
              </p>
            </Button>
          </div>
        </div>
      )}
      {!loggedIn && (
        <div className="flex min-w-150 w-[70%] mx-auto p-6 rounded-lg gap-4 my-10 bg-[#1A2946] text-[#F2E9E4] ">
          <p className="!mb-0 font-post-heading text-3xl text-center w-full animate-pulse">
            Please Login to create posts...
          </p>
        </div>
      )}
    </>
  );
}
