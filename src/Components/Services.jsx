import { useState, useEffect, useContext } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, where, query } from "firebase/firestore";
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';


const Services = () => {
  const { user, } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/services')
    }
  }, [user,navigate]);

  const [projects, setProjects] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', stack: '', members: '' });
  const [newVacancy, setNewVacancy] = useState({ projectTitle: '', stack: '', contact: '', });
  const [newUser, setNewUser] = useState({ email: '', password: '', role: 'student' });

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.collegename) return;

      const collegeDocRef = doc(db, "colleges", user.collegename);
      const projectsRef = collection(collegeDocRef, 'projects');
      const vacanciesRef = collection(collegeDocRef, 'vacancies');

      const projectsSnapshot = await getDocs(projectsRef);
      const vacanciesSnapshot = await getDocs(vacanciesRef);

      setProjects(projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setVacancies(vacanciesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, [user?.collegename]);

  const handleAddProject = async () => {
    const collegeDocRef = doc(db, "colleges", user.collegename);
    const projectsRef = collection(collegeDocRef, 'projects');
    if(!newProject.projectTitle || !newProject.stack || !newProject.contact) {
      alert("Project details are required");
      return;
    }
    const newProjectDoc = await addDoc(projectsRef, newProject);
    setProjects([...projects, { id: newProjectDoc.id, ...newProject }]);
    setNewProject({ name: '', stack: '', members: '' });
  };

  const handleDeleteProject = async (id) => {
    const projectDoc = doc(db, "colleges", user.collegename, 'projects', id);
    await deleteDoc(projectDoc);
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleAddVacancy = async () => {
    const collegeDocRef = doc(db, "colleges", user.collegename);
    const vacanciesRef = collection(collegeDocRef, 'vacancies');
    if(!newVacancy.projectTitle || !newVacancy.stack || !newVacancy.contact) {
      alert("Vacancy details are required");
      return;
    }
    const newVacancyDoc = await addDoc(vacanciesRef, newVacancy);
    setVacancies([...vacancies, { id: newVacancyDoc.id, ...newVacancy }]);
    setNewVacancy({ projectTitle: '', stack: '', contact: '',vacancies: '' });
  };

  const handleDeleteVacancy = async (id) => {
    const vacancyDoc = doc(db, "colleges", user.collegename, 'vacancies', id);
    await deleteDoc(vacancyDoc);
    setVacancies(vacancies.filter(vacancy => vacancy.id !== id));
  };

  const handleAddUser = async () => {
    const collegeDocRef = doc(db, "colleges", user.collegename);
    const usersRef = collection(collegeDocRef, newUser.role === 'student' ? 'users' : 'admins');
    const q = query(usersRef, where("email", "==", newUser.email));
    console.log(q)
    if(!newUser.email || !newUser.password || !newUser.role){
      alert("User details are required");
      return;
    }
    else if (q){
      alert("User already exists");
      return;
    }
    setNewUser({ email: '', password: '', role: 'student' });
    alert("user added");
  };

  if (!user) {
    return (
      <div className='text-3xl flex w-full h-screen items-center justify-center bg-[#04052E] text-white'>
        Login to Access content of Services
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6 text-indigo-700">Services</h1>
      {user.role === 'student' ? (
        <>
          <div className="mb-6">
            <h2 className="text-3xl font-semibold mb-4 text-blue-600">Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 z-10">
                  <h3 className="text-2xl font-semibold text-blue-700">{project.name}</h3>
                  <p className="text-gray-700 mt-2"><span className="font-semibold text-indigo-600">Stack:</span> {project.stack}</p>
                  <p className="text-gray-700"><span className="font-semibold text-indigo-600">Members:</span> {project.members}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-3xl font-semibold mb-4 text-blue-600">Vacancies</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vacancies.map((vacancy, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 z-10">
                  <h3 className="text-2xl font-semibold text-blue-700">{vacancy.projectTitle}</h3>
                  <p className="text-gray-700 mt-2"><span className="font-semibold text-indigo-600">Stack:</span> {vacancy.stack}</p>
                  <p className="text-gray-700"><span className="font-semibold text-indigo-600">Contact:</span> {vacancy.contact}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-3xl font-semibold mb-4 text-blue-600">Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div key={project.id} className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 z-10">
                  <h3 className="text-2xl font-semibold text-blue-700">{project.name}</h3>
                  <p className="text-gray-700 mt-2"><span className="font-semibold text-indigo-600">Stack:</span> {project.stack}</p>
                  <p className="text-gray-700"><span className="font-semibold text-indigo-600">Members:</span> {project.members}</p>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2 text-indigo-700">Add New Project</h3>
              <input
                type="text"
                placeholder="Project Name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Stack"
                value={newProject.stack}
                onChange={(e) => setNewProject({ ...newProject, stack: e.target.value })}
                className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Members"
                value={newProject.members}
                onChange={(e) => setNewProject({ ...newProject, members: e.target.value })}
                className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={handleAddProject}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-blue-600 hover:to-green-500 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Add Project
              </button>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-3xl font-semibold mb-4 text-blue-600">Vacancies</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vacancies.map((vacancy) => (
                <div key={vacancy.id} className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 z-10">
                  <h3 className="text-2xl font-semibold text-blue-700">{vacancy.projectTitle}</h3>
                  <p className="text-gray-700 mt-2"><span className="font-semibold text-indigo-600">Stack:</span> {vacancy.stack}</p>
                  <p className="text-gray-700"><span className="font-semibold text-indigo-600">Contact:</span> {vacancy.contact}</p>
                  <button
                    onClick={() => handleDeleteVacancy(vacancy.id)}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2 text-indigo-700">Add New Vacancy</h3>
              <input
                type="text"
                placeholder="Project Title"
                value={newVacancy.projectTitle}
                onChange={(e) => setNewVacancy({ ...newVacancy, projectTitle: e.target.value })}
                className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Stack"
                value={newVacancy.stack}
                onChange={(e) => setNewVacancy({ ...newVacancy, stack: e.target.value })}
                className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Contact"
                value={newVacancy.contact}
                onChange={(e) => setNewVacancy({ ...newVacancy, contact: e.target.value })}
                className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {/* <input
                type="text"
                placeholder="Vacancies"
                value={newVacancy.vacancies}
                onChange={(e) => setNewVacancy({ ...newVacancy, vacancies: e.target.value })}
                className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              /> */}
              <button
                onClick={handleAddVacancy}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-blue-600 hover:to-green-500 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Add Vacancy
              </button>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-3xl font-semibold mb-4 text-blue-600">Manage Users</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2 text-indigo-700">Add New User</h3>
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-blue-600 hover:to-green-500 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Add User
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Services;
