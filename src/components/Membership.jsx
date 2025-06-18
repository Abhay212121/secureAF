import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Membership() {
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const [membershipError, setMembershipError] = useState();

  const handleClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/membership",
        { key },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data.msg);
      if (res.data.status == 200) {
        navigate("/");
      } else {
        setMembershipError(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-col flex items-center gap-2 justify-center h-screen font-form-text">
      <input
        type="text"
        name="membershipKey"
        id="membershipKey"
        placeholder={membershipError ? membershipError : "Enter the secret key"}
        value={key}
        onChange={(e) => {
          setKey(e.target.value);
        }}
        className={`border px-4 py-2 ${membershipError && "border-red-500"}`}
      />
      <button
        className="border px-4 py-2"
        disabled={!key}
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
}
