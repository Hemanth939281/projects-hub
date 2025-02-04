// import About from "./About"

// const Contact = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 py-16 px-4">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-5xl md:text-7xl font-bold text-center text-gray-800 mb-16">
//           Contact Us
//         </h1>
        
//         {/* Contact Form */}
//         <div className="bg-white p-8 rounded-xl shadow-xl">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-4">We'd love to hear from you</h2>
//           <p className="text-gray-600 mb-6">
//             Please feel free to reach out with any questions or inquiries, and we will get back to you as soon as possible.
//           </p>
          
//           {/* Form */}
//           <form>
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-gray-700">Name</label>
//               <input type="text" id="name" name="name" className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </div>
            
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-gray-700">Email</label>
//               <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </div>
            
//             <div className="mb-6">
//               <label htmlFor="message" className="block text-gray-700">Message</label>
//               <textarea id="message" name="message" rows="4" className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
//             </div>
            
//             <button type="submit" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-200">
//               Send Message
//             </button>
//           </form>
//         </div>

//         <div className="mt-24">
//           <About/>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Contact

import { MessageSquare, Mail, User, Send } from 'lucide-react';
import About from "./About";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent pb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
              We're excited to connect with you. Share your thoughts, questions, or ideas - we're here to help!
            </p>
          </div>

          {/* Contact Form Card */}
          <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-15"></div>
            <div className="relative">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <MessageSquare className="text-purple-600" />
                Let's Start a Conversation
              </h2>

              <form className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-900" />
                  </div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-900" />
                  </div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur"
                  />
                </div>

                <div className="relative">
                  <textarea
                    placeholder="Your Message"
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur"
                  ></textarea>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                  >
                    Send Message
                    <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>

              {/* Contact Info */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-800 mb-2">Email Us</h3>
                    <p className="text-purple-600">contact@projecthub.com</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-800 mb-2">Follow Us</h3>
                    <div className="flex justify-center gap-4">
                      {/* Social Icons */}
                      <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </a>
                      <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                      </a>
                      <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.654-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-24">
          <About />
        </div>
      </div>
    </div>
  );
};

export default Contact;