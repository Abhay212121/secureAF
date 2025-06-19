import { useNavigate } from "react-router-dom";

export function Header({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  const handleLogSwitch = () => {
    //logging out the user
    if (loggedIn) {
      localStorage.removeItem("token");
      setLoggedIn(false);
    } else {
      //if user is already logged out, he's redirected to the login page.
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-between py-6 items-center w-[90%] px-10 mx-auto">
      <p
        className="text-5xl font-head italic cursor-pointer text-[#FFE3A9] !mb-0 "
        onClick={() => navigate("/")}
      >
        SecureAF
      </p>
      {loggedIn && (
        <p
          className={`text-xl font-body mr-30 px-2 py-1 rounded-2xl border-2 cursor-pointer text-[#FFE3A9] !mb-0 `}
          onClick={() => navigate("/membership")}
        >
          Membership
        </p>
      )}
      <p
        className="text-xl font-body rounded-2xl px-2 py-1 cursor-pointer border-2 text-[#FFE3A9] !mb-0"
        onClick={handleLogSwitch}
      >
        {loggedIn ? "Logout" : "Login"}
      </p>
    </div>
  );
}
