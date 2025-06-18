import axios from "axios";
import { useState } from "react";

export function PostForm({ onPostCreate }) {
  const [postData, setPostData] = useState({ postTitle: "", postMessage: "" });
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/posts", postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("form sent!");
      console.log(onPostCreate());
      onPostCreate();
      console.log(res.data);
      setPostData((prev) => ({ ...prev, postMessage: "", postTitle: "" }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex border-2 min-w-150 w-[40%] mx-auto p-6 rounded-2xl gap-4">
      <div className="flex flex-col w-[65%] gap-4 font-form-text">
        <input
          type="text"
          placeholder="Title of the post"
          name="postTitle"
          id="postTitle"
          className="border-2 py-1 px-2 rounded-xl"
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
          placeholder="Type your message here"
          className="border-2 py-1 px-2 rounded-xl"
          value={postData.postMessage}
          onChange={(e) => {
            setPostData((prev) => ({ ...prev, postMessage: e.target.value }));
          }}
        ></textarea>
      </div>
      <div className="w-fit mx-auto font-form-head flex flex-col gap-4 items-center">
        <h2 className="text-xl">CREATE POST</h2>
        <button
          className={`text-2xl border-2 p-8 rounded-xl ${
            loading ? "cursor-progress" : "cursor-pointer"
          }`}
          onClick={handleClick}
          disabled={postData.postMessage == "" || postData.postTitle == ""}
        >
          {loading ? "CREATING..." : "CREATE"}
        </button>
      </div>
    </div>
  );
}
