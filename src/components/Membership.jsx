import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { message } from "antd";
import { Header } from "./Header";
import { backendURL } from "../constant/constant";

export function Membership() {
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const [membershipError, setMembershipError] = useState();
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState(
    () => localStorage.getItem("member") === "true"
  );

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        // "http://localhost:3000/membership",
        `${backendURL}/membership`,
        { key },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data.msg);
      if (res.data.status == 200) {
        localStorage.setItem("member", "true");
        message.success("You are now a member!");
        navigate("/");
      } else {
        message.error("Invalid key!");
        setMembershipError(res.data.msg);
        setKey("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeClick = async () => {
    console.log(localStorage.getItem("member"));
    try {
      setLoading(true);
      const username = localStorage.getItem("username");
      // const res = await axios.post("http://localhost:3000/revokeMembership", {
      const res = await axios.post(`${backendURL}/revokeMembership`, {
        username,
      });
      if (res.data.status == 200) {
        setMember("false");
        localStorage.setItem("member", "false");
        message.success("Membership Revoked");
      } else {
        message.error(`Error revoking membersip`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-900 to-purple-800 ">
      <div className="absolute">
        <Header />
      </div>
      <div className="flex items-center justify-center h-screen font-form-text ">
        <div className="w-100 flex flex-col  gap-3 px-8 py-4 rounded-md bg-white ">
          {member ? (
            <div className="flex flex-col gap-4">
              <p className="text-3xl font-form-head !mb-0 text-center">
                You are already a member!
              </p>
              <Button
                loading={loading}
                onClick={handleRevokeClick}
                style={{
                  backgroundColor: "#4070F4",
                  borderColor: "#4070F4",
                  color: "white",
                }}
                className="place-self-center"
              >
                Revoke Membership
              </Button>
            </div>
          ) : (
            <>
              <p className="group relative w-fit font-form-head text-2xl !mb-0">
                Become a member!
                <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#4070F4] transition-all duration-300 group-hover:w-full"></span>
              </p>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="membershipKey"
                  className=" font-form-head text-lg"
                >
                  Enter the key:
                </label>
                <input
                  type="text"
                  name="membershipKey"
                  id="membershipKey"
                  placeholder={
                    membershipError ? membershipError : "Enter the secret key"
                  }
                  value={key}
                  onChange={(e) => {
                    setKey(e.target.value);
                  }}
                  className={`font-form-head border-1 px-4 py-1 rounded-sm shadow cursor-pointer hover:shadow-md hover:border-[#4070F4] focus:border-[#4070f4] focus:cursor-default transition duration-200 ${
                    membershipError && "border-red-500"
                  }`}
                />
              </div>
              <Button
                className="border px-4 py-2"
                disabled={!key}
                loading={loading}
                onClick={handleClick}
                style={{
                  backgroundColor: "#4070F4",
                  borderColor: "#4070F4",
                  color: "white",
                }}
              >
                Submit
              </Button>
              <p className="font-form-text text-md bg-[#2121211b] p-2 rounded-lg">
                As a member, see{" "}
                <span className="font-bold text-[#4070F4]">who posted</span> and{" "}
                <span className="font-bold text-[#4070F4]">
                  when it was posted.
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
