
const About = () => {
  const features = [
    { icon: "💡", title: "Project Listing & Exploration", description: "Browse and explore innovative projects within your college and department." },
    { icon: "🤝", title: "Team Collaboration", description: "Form dynamic teams with dedicated Team Admins to drive project success." },
    { icon: "🎯", title: "Vacancy Management", description: "Apply for roles in exciting projects and contribute your unique skills." },
    { icon: "⚡", title: "Admin Control", description: "College Admins efficiently manage projects, vacancies, and team roles." },
    { icon: "🔒", title: "Role-Based Access", description: "Structured workflow ensures quality with admin-controlled project creation." },
    { icon: "🛡️", title: "Secure Authentication", description: "Firebase Authentication provides enterprise-grade security for all users." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-white py-16 px-4">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent pb-4">
            Campus Project Hub
          </h1>
          <div className="mt-8 flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="relative">
                <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  A revolutionary platform connecting brilliant minds, fostering innovation, and transforming college projects into remarkable achievements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mt-20">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white px-6 py-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-24 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto transform hover:scale-105 transition-transform duration-500">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Join the Innovation Journey</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Whether you're an aspiring developer, designer, or innovator, Campus Project Hub provides the perfect environment to turn your ideas into reality. Connect, collaborate, and create something extraordinary.
            </p>
            <div className="mt-8">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;