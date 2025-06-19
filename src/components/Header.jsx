import { useNavigate } from "react-router-dom";

export function Header({ loggedIn, setLoggedIn, displayAll = false }) {
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
    <div className="flex justify-between py-6 items-center  px-20">
      <div>
        <p
          className="text-5xl font-head italic cursor-pointer text-[#FFE3A9] !mb-0 hover:scale-105 duration-200"
          onClick={() => navigate("/")}
        >
          SecureAF
        </p>
      </div>
      {displayAll && (
        <div className="flex gap-10 items-center">
          {loggedIn && (
            <p
              className={`text-xl font-body place-content-end px-2 py-1 rounded-2xl border-2 cursor-pointer text-[#FFE3A9] !mb-0 hover:shadow-[0_0_5px_#FFE3A9] `}
              onClick={() => navigate("/membership")}
            >
              Membership
            </p>
          )}
          <p
            className="text-xl font-body rounded-2xl px-2 py-1 cursor-pointer border-2 text-[#FFE3A9] !mb-0 hover:shadow-[0_0_5px_#FFE3A9]"
            onClick={handleLogSwitch}
          >
            {loggedIn ? "Logout" : "Login"}
          </p>
        </div>
      )}
    </div>
  );
}
