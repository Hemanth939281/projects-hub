import Header from "./Components/Header"
import Body from './Components/Body';
import Footer from "./Components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import {Toaster} from "react-hot-toast";

const App = () => {
  useEffect(()=>{
    AOS.init({
      duration: 1000,
      // once:"true"
    });
  },[])
  return (
    <div className='Applayout font-roboto'>
      <Header/>
      <Body/>
      <Footer/>
      <Toaster position="top-center" />
    </div>
  )
}

export default App
