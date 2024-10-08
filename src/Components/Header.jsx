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
          <h2 className="text-2xl text-white font-bold" data-aos="fade-right">
            <Link to="/">Campus Projects Hub</Link>
          </h2>
        <button className="text-white md:hidden" onClick={handleToggleMenu}>
          {showMenu ? <CloseIcon /> : <MenuIcon />}
        </button>

        <ul className={`bg-[#04052E] md:bg-transparent fixed top-0 left-0 w-screen flex gap-6 flex-col justify-center items-center w-full h-screen md:static md:w-auto md:h-auto md:flex md:flex-row text-white transition-transform transform ${showMenu ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}>
          <li onClick={() => setShowMenu(false)}>
            <Link to="/" className="hover:text-orange-500" data-aos="fade-down" data-aos-duration="2000">Home</Link>
          </li>
          <li onClick={() => setShowMenu(false)}>
            <Link to="/about" className="hover:text-orange-500" data-aos="fade-down" data-aos-duration="2000">About</Link>
          </li>
          <li onClick={() => setShowMenu(false)}>
            <Link to="/services" className="hover:text-orange-500" data-aos="fade-down" data-aos-duration="2000">Services</Link>
          </li>
          <li onClick={() => setShowMenu(false)}>
            <Link to="/contact" className="hover:text-orange-500" data-aos="fade-down" data-aos-duration="2000">Contact</Link>
          </li>
          {user?.role === "Branch admin" ? <li onClick={() => setShowMenu(false)}>
            <Link to="/branchadminblog" className="hover:text-orange-500" data-aos="fade-down" data-aos-duration="2000">Requests</Link>
          </li> : null}
          {user ? (
            <>
              <li className="md:p-2 md:rounded-md md:border-2 md:border-white-500 md:hover:bg-white md:hover:text-black md:font-bold">
                <button onClick={logout} className="border-none outline-none" data-aos="fade-down" data-aos-duration="2000">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="md:p-2 md:rounded-md md:outline-none md:border-2 md:hover:border-white-500 md:hover:bg-white md:hover:text-black md:font-bold" onClick={() => { setShowMenu(false); openModal(); }} data-aos="fade-down">
              <button className="border-none outline-none" data-aos="fade-down" data-aos-duration="2000">Login</button>
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
