
const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center py-14 md:py-12 md:flex-row md:justify-around text-white bg-[#04052E] border-t-2 border-slate-50">
        <div className="flex flex-col py-2 text-center">
            <h2>Campus Projects Hub</h2>
        </div>
        <div className="flex flex-col py-2 text-center" data-aos="zoom-in">
            <p>About</p>
            <p>Services</p>
            <p>FAQ</p>
        </div>
        <div className="flex flex-col py-2 text-center" data-aos="zoom-in">
            <p>Privacy policy</p>
            <p>Terms of services</p>
            <p>legal info</p>
        </div>
        <div className="flex flex-col py-2" data-aos="zoom-in">
            <p className="ml-6">
                &copy; Copy 2024 Rights Reserved
            </p>
            <div className="block space-x-4 mt-2 text-center">
                <a href="#">Facebook</a>
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
                <a href="#">Instagram</a>
            </div>
        </div>
    </div>
  )
}

export default Footer