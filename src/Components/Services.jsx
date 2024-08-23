import { useState, useEffect, useContext } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, setDoc, doc, where, query } from "firebase/firestore";
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AddBranchAdmin from './AddMembers/AddBranchAdmin';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddTeamAdmin from './AddMembers/AddTeamAdmin';
import { Formik, Form, } from 'formik';
import FormikControl from './FormikControl';
import * as Yup from "yup"
import ideaSubmissionPhoto from '../assets/ideaSubmissionPhoto.png'

const Services = () => {
  const { user, showDeleteAdminModal, openDeleteAdminModal, closeDeleteAdminModal, showBranchAdminModal, openBranchAdminModal, closeBranchAdminModal,openModal, closeModal, showModal} = useContext(AuthContext);
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
    if (!newUser.email || !newUser.password || !newUser.role) {
      alert("User details are required");
      return;
    }
  
    const collegeDocRef = doc(db, "colleges", user.collegename);
    const usersRef = collection(collegeDocRef, newUser.role === 'student' ? 'users' : 'admins');
    const q = query(usersRef, where("email", "==", newUser.email));
    
    try {
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        alert("User already exists");
        return;
      }
  
      const newUserDocRef = doc(usersRef);
      await setDoc(newUserDocRef, {
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      });
  
      setNewUser({ email: '', password: '', role: 'student' });
      alert("User added successfully");
    } catch (error) {
      console.error("Error adding user: ", error);
      alert("Failed to add user");
    }
  };

  const initialValues = {
    name: "",
    year: "",
    skills: "",
    technologies: "",
    idea: ""
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    year: Yup.string().required("Year is required"),
    skills: Yup.string().required("Skills are required"),
    technologies: Yup.string().required("Technologies are required"),
    idea: Yup.string().required("Idea is required")
  })
  //idea form submission
  const handleSubmit = async(values, {resetForm, setSubmitting}) =>{
    console.log("Form submitted", values);
    if(values){
      const ideaCollRef = collection(db, "colleges", user.collegename,'Branches',user.branch, 'ideas');
      const newIdeaDocRef = doc(ideaCollRef); 
      await setDoc(newIdeaDocRef, { 
      name: values.name,
      year: values.year,
      skills: values.skills,
      technologies: values.technologies,
      idea: values.idea,
      submittedBy: user.email,
      createdAt: new Date(),
      status: 'Pending'
});

      alert("Idea submitted successfully");
    }
    resetForm();
    setSubmitting(false);
    closeModal();
  }

  if (!user) {
    return (
      <div className='text-xl md:text-3xl flex w-full h-screen items-center justify-center bg-[#04052E] text-white p-5'>
        Login to Access content of Services
      </div>
    );
  }
  if(user.role === "Institute admin"){
    return(
      <>
      <div className=' bg-[#04052E] p-10'>
          <h2 className="text-2xl md:text-4xl font-bold mb-16 text-white text-center p-5 md:pt-10 md:mb-10">Manage Branch Admins</h2>
          <div className='h-[60vh] w-full flex flex-wrap gap-12 justify-center items-center pb-10'>
                <div className="bg-white p-4 md:px-8 rounded-lg shadow-lg text-black text-center">
                  <h3 className="text-2xl font-semibold mb-2 text-indigo-700">Add New Admin</h3>
          <button className=" py-2 px-4 bg-white font-bold rounded-full focus:outline-none focus:ring-4 focus:ring-offset-4 focus:ring-green-500" onClick={()=>{openBranchAdminModal()}}>
          <PersonAddAltIcon style={{fontSize:50}}/>
            </button>
            </div>
            {
              showBranchAdminModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                 <div className="relative w-full max-w-md bg-[#04052E] rounded-lg shadow-lg p-8 text-white max-h-[90vh] overflow-y-auto mx-4">
                 <button onClick={()=>{closeBranchAdminModal()}} className="absolute top-4 right-4 text-white">
              <    CloseIcon />
                 </button>
                 <AddBranchAdmin style={{fontSize:50}}/>
                 </div>
                </div>
              )
              }
              <div className="bg-white p-4 md:px-10 rounded-lg shadow-lg text-black text-center">
                  <h3 className="text-2xl font-semibold mb-2 text-indigo-700">Delete Admin</h3>
          <button className="py-2 px-4 bg-white font-bold rounded-full focus:outline-none focus:ring-4 focus:ring-offset-4 focus:ring-green-500" onClick={()=>{openDeleteAdminModal()}}>
          <PersonRemoveIcon style={{fontSize:50}}/>
            </button>
            </div>
            {
              showDeleteAdminModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                 <div className="relative w-full max-w-md bg-[#04052E] rounded-lg shadow-lg p-8 text-white max-h-[90vh] overflow-y-auto mx-4">
                 <button onClick={()=>{closeDeleteAdminModal()}} className="absolute top-4 right-4 text-white">
              <    CloseIcon />
                 </button>
                 <AddBranchAdmin style={{fontSize:50,}}/>
                 </div>
                </div>
              )
              }
          </div>
        </div>
      </>
    )
  }

  if(user?.role === "Branch admin"){
    return (
      <div className='h-screen w-full flex justify-center items-center bg-[#04052E] text-white text-3xl'>
        <AddTeamAdmin/>
      </div>
    )
  }

  if(user?.role === "Team admin"){
    return (
      <div className='h-screen w-full flex justify-center items-center bg-[#04052E] text-white text-3xl'>Hello Team admin</div>
    )
  }
  if(user?.role === "student"){
    return (
      <div className='w-full bg-[#04052E]'>
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6 text-white text-center">Services</h1>
            <div className="mb-6">
              <h2 className="text-3xl font-semibold my-8 text-white">Projects</h2>
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
            <div className="mb-16">
              <h2 className="text-3xl font-semibold my-8 text-white">Vacancies</h2>
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
            <div className='w-full text-white md:my-16 p-5'>
            <h1 className='text-3xl font-semibold my-8 text-white text-center mb-16'>Idea Submission</h1>
                <div className='flex flex-col md:flex-row items-center justify-center gap-x-48'>
                  <img src={ideaSubmissionPhoto} alt="photoBesideForm" className='md:w-1/3 rounded-lg border-2 border-white'/>
                  <div className='mt-4 md:w-2/3 text-center'>
                <h1>A single idea, the sudden flash of a thought, may be worth a million dollars</h1>
                <button onClick={()=>{openModal()}} className='p-2 my-16 border-2 border-white rounded-md hover:bg-blue-500 hover:text-white hover:font-bold'>Submit Idea</button>
                </div>
                </div>
              </div>
            { showModal && 
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-xl bg-[#04052E] rounded-lg shadow-lg p-8 text-white h-[95vh] overflow-y-auto">
            <button onClick={()=>{closeModal()}} className="absolute top-4 right-4 text-white">
              <    CloseIcon />
                 </button>
              <div className="w-full text-white flex justify-center items-center md:p-4">
                <div className='w-full max-w-xl flex flex-col p-4 md:p-10 md:rounded-lg md:shadow-md md:shadow-slate-50'>
               <h1 className="text-3xl font-bold text-center mb-6">Idea Submission</h1>
               <Formik
                 initialValues={initialValues}
                 validationSchema={validationSchema}
                 onSubmit={handleSubmit}
               >
                 {({ isSubmitting }) => (
                   <Form>
                     <FormikControl control="input" name="name" type="text" label="Name" />
                     <FormikControl control="input" name="year" type="text" label="Year"/>
                     <FormikControl control="input" name="skills" type="text" label="Skills"/>
                     <FormikControl control="input" name="technologies" type="text" label="Technologies To be needed"/>
                     <FormikControl control="textarea" name="idea" type="text" label="Idea"/>
                     <button disabled={isSubmitting} type="submit" className="w-full mt-4 py-2 px-4 bg-white text-black hover:bg-blue-500 hover:text-white font-bold rounded-md shadow-sm active:ring-4 active:ring-white-500">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
                     </Form>
                 )}
                     </Formik>
                   </div>
                   </div>
                   </div>
                   </div>
                    }
                   </div>
                   </div>
                )}

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
