import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AuthContext from "./AuthContext";
import LoginModal from "./LoginModal";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout, openModal, } = useContext(AuthContext);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  

  return (
    <div className="sticky top-0 z-50 shadow-md bg-[#04052E] shadow-slate-50">
      <nav className="flex justify-between px-7 py-4">
        <div>
          <h2 className="text-2xl text-white font-bold">
            <Link to="/">Campus Projects Hub</Link>
          </h2>
        </div>
        <button className="text-white md:hidden" onClick={handleToggleMenu}>
          {showMenu ? <CloseIcon /> : <MenuIcon />}
        </button>

        <ul className={`bg-[#04052E] md:bg-transparent fixed top-0 left-0 flex flex-col justify-center items-center w-full h-screen md:static md:w-auto md:h-auto md:flex md:flex-row text-white transition-transform transform ${showMenu ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}>
          <li onClick={() => setShowMenu(false)}>
            <Link to="/" className="px-4 py-3 md:py-1 md:py-2 hover:text-orange-500">Home</Link>
          </li>
          <li onClick={() => setShowMenu(false)}>
            <Link to="/about" className="px-4 py-3 md:py-1 md:py-2 hover:text-orange-500">About</Link>
          </li>
          <li onClick={() => setShowMenu(false)}>
            <Link to="/services" className="px-4 py-3 md:py-1 md:py-2 hover:text-orange-500">Services</Link>
          </li>
          <li onClick={() => setShowMenu(false)}>
            <Link to="/contact" className="px-4 py-3 md:py-1 md:py-2 hover:text-orange-500">Contact</Link>
          </li>
          {user ? (
            <>
              <span className="px-4 py-3 md:py-1 md:py-2">{user.email}</span>
              <li className="px-4 py-3 md:py-2 block lg:flex gap-4">
                <button onClick={logout} className="md:px-4 md:py-2 md:rounded-md md:border-2 md:border-white-500 md:hover:bg-white md:hover:text-black md:font-bold">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="px-4 py-3 md:py-2 md:rounded-md md:outline-none md:border-2 md:hover:border-white-500 md:hover:bg-white md:hover:text-black md:font-bold" onClick={() => { setShowMenu(false); openModal(); }}>
              <button className="border-none outline-none">Login</button>
            </li>
          )}
        </ul>
 
        {showMenu && (
          <button className="absolute top-5 right-5 text-white md:hidden" onClick={() => setShowMenu(false)}>
            <CloseIcon />
          </button>
        )}
      </nav>
      <LoginModal/>
    </div>
  );
};

export default Header;
