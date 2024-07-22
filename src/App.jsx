import Header from "./Components/Header"
import Body from './Components/Body';
import Footer from "./Components/Footer";
import LoginModal from "./Components/LoginModal";
import { useContext } from "react";
import AuthContext from "./Components/AuthContext";
const App = () => {
  const {showModal} = useContext(AuthContext);
  return (
    <div className='Applayout'>
      <Header/>
      <Body/>
      {showModal && <LoginModal />}
      <Footer/>
      
    </div>
  )
}
// https://images.unsplash.com/photo-1714677529582-ab6c96836537?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

export default App
