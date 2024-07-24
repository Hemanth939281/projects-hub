import { useContext } from "react";
import AuthContext from "./AuthContext";
import InstituteLogin from "./Logins/InstituteLogin";
import OthersLogin from "./Logins/OthersLogin"
import CloseIcon from "@mui/icons-material/Close";

const LoginModal = () => {
  const { showModal, closeModal, openInstituteModal, showInstituteModal, showOthersModal, openOthersModal} = useContext(AuthContext);

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md bg-[#04052E] rounded-lg shadow-lg p-8 text-white max-h-[90vh] overflow-y-auto">
            <button onClick={closeModal} className="absolute top-4 right-4 text-white">
              <CloseIcon />
            </button>
            <button className="w-full mt-4 py-2 px-4 bg-white text-black hover:bg-blue-500 hover:text-white font-bold rounded-md shadow-sm active:ring-4 active:ring-white-500" onClick={openInstituteModal}>
              Institute Admin Login
            </button>
            <button className="w-full mt-4 py-2 px-4 bg-white text-black hover:bg-blue-500 hover:text-white font-bold rounded-md shadow-sm active:ring-4 active:ring-white-500" onClick={openOthersModal}>
              Others Login
            </button>
          </div>
        </div>
      )}

      {showInstituteModal && <InstituteLogin />}
      {showOthersModal && <OthersLogin/>}
    </div>
  );
};

export default LoginModal;
