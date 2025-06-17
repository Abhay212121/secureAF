import { useNavigate } from "react-router-dom";

export function Header({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  const handleLogSwitch = () => {
    if (loggedIn) {
      localStorage.removeItem("token");
      setLoggedIn(false);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-between py-4 items-center w-[80%] mx-auto">
      <p
        className="text-5xl font-form-head italic cursor-pointer"
        onClick={() => navigate("/")}
      >
        SecureAF
      </p>
      {loggedIn && (
        <p
          className={`text-2xl font-form-head mr-30 px-2 py-1 rounded-2xl border-1 cursor-pointer `}
          onClick={() => navigate("/membership")}
        >
          Membership
        </p>
      )}
      <p
        className="text-2xl font-form-head border-1 rounded-2xl px-2 py-1 border-black cursor-pointer"
        onClick={handleLogSwitch}
      >
        {loggedIn ? "Logout" : "Login"}
      </p>
    </div>
  );
}
