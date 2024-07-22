import Login from "./Login";
import AuthContext from "./AuthContext";
import { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";

const LoginModal = () => {
  const { showModal, closeModal } = useContext(AuthContext);

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md mx-4 bg-[#04052E] mx-[8%] rounded-lg shadow-lg p-8 shadow-slate-100 text-white max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white"
            >
              <CloseIcon />
            </button>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
