import img1 from "../assets/img1.png"
import BrushIcon from "@mui/icons-material/Brush";
import CodeIcon from "@mui/icons-material/Code";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import thinking from "../assets/thinking.png"
import "./home.css"

const Home = () => {
  return (
    <>
    <div className="max-w-full container bg-[#04052E] relative h-[90vh] flex justify-center items-center">
      <div className="flex flex-wrap items-center">
        <div className="md:flex block">
        <div className="w-full px-4 text-center" data-aos="fade-up" data-aos-duration="3000">
          <h1 className="block font-sans text-4xl md:text-5xl leading-tight text-white mb-6 font-black">
            Your story starts with us.
          </h1>
          <p className="block font-sans md:text-xl text-white opacity-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium similique iure facere iusto, omnis asperiores mollitia deleniti, repellat provident vero, beatae quia doloremque iste sunt tempora. Officiis error aut numquam.
          </p>
        </div>
        <div className="md:w-2/3 md:mr-4 m-4 bounce-animate">
          <img className="w-full rounded-lg h-full" src={img1} alt="Image"/>
        </div>
        </div>
      </div>
    </div>
    <div className="max-w-full h-100 bg-[#04052E] flex flex-col items-center text-white">
      <div className="block text-center max-w-md mt-4 p-5" data-aos="fade-right">
        <h3 className="text-xl">Co-Working</h3>
        <h2 className="text-3xl mt-6">Build Something</h2>
        <p className="mt-6">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste debitis dolorem sint tempora minus consequuntur?</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-14 mt-[6%] mb-[6%]">
        <div className="block p-5 text-center w-64 shadow-md shadow-slate-50" data-aos="zoom-in">
          <span><BrushIcon style={{fontSize:50}}/></span>
          <h3 className="font-bold text-3xl">Design</h3>
          <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="block p-5 text-center w-64 shadow-md shadow-slate-50" data-aos="zoom-in">
          <span><CodeIcon style={{fontSize:50}}/></span>
          <h3 className="font-bold text-3xl">Develop</h3>
          <p className="mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        </div>
        <div className="block p-5 text-center w-64 shadow-md shadow-slate-50" data-aos="zoom-in">
          <span><CloudUploadIcon style={{fontSize:50}}/></span>
          <h3 className="font-bold text-3xl">Deploy</h3>
          <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      </div>
    <div className="max-w-full h-100 bg-[#04052E] flex justify-center items-center text-white p-12">
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 lg:gap-52 w-[80%]">
      <div className="md:w-1/3 w-2/3" data-aos="fade-right">
          <img src={thinking} alt="thinking photo" />
      </div>
      <div className="block text-center p-5" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-white">Why Projects ?</h2>
        <p className="mt-12 text-white block lg:flex"><span className="mr-4 font-bold text-xl">Benifits:</span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus!</p>
        <p className="mt-6 text-white block lg:flex"><span className="mr-4 font-bold text-xl">Benifits:</span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus!</p>
        <p className="mt-6 text-white block lg:flex"><span className="mr-4 font-bold text-xl">Benifits:</span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus!</p>
      </div>
      </div>
    </div>
    <div className="max-w-full h-100 bg-[#04052E] flex justify-center items-center text-white md:p-10">
    <div className="text-center">
    <h2 className="w-full text-4xl font-bold xl:mt-10 md:mt-auto mb-4" data-aos="zoom-in">Contact Us</h2>
      <div className="flex justify-center items-center w-[80%] ml-auto mr-auto">
        <div className="flex flex-col md:flex-row justify-center items-center p-5 text-center w-md gap-12 md:gap-24">
          <div>
          <h3 className="text-3xl"  data-aos="zoom-in">Want to Work with us</h3>
          <h3 className="mt-4 text-lg"  data-aos="zoom-in">Complete this form we and will get back to you in 24 hours</h3>
          </div>
          <div className="w-full lg:w-2/4"  data-aos="zoom-in">
          <form >
            <input type="text" placeholder="Name" className="w-full text-black mt-4 p-3 border-2 border-white-500 focus:border-red-500 focus:outline-none"/>
            <input type="email" placeholder="Email" className="w-full text-black mt-4 p-3 border-2 border-white-500 focus:border-red-500 focus:outline-none"/>
            <textarea placeholder="Message" className="mt-4 p-3 w-full text-black border-2 border-white-500 focus:border-red-500 focus:outline-none"/>
            <button type="submit" className="mt-4 p-3 w-full bg-red-500 text-white font-bold hover:bg-red-400">Submit</button>
          </form>
          </div>
        </div>
        </div>
        </div>
    </div>
    </>
  );
};

export default Home;
