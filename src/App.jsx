import Header from "./Components/Header"
import Body from './Components/Body';
import Footer from "./Components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const App = () => {
  useEffect(()=>{
    AOS.init({
      duration: 1000,
      // once:"true"
    });
  },[])
  return (
    <div className='Applayout'>
      <Header/>
      <Body/>
      <Footer/>
      
    </div>
  )
}

export default App
