import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import FormikControl from '../FormikControl';
import { useContext } from 'react';
import AuthContext from '../AuthContext';
import CloseIcon from '@mui/icons-material/Close';

const initialValues = {
  collegename: '',
  email: '',
  password: '',
  role: '',
  branch:'',
};

const validationSchema = Yup.object({
  collegename: Yup.string().required('College Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, "Password must be greater than 8 characters").required('Password is required'),
  role: Yup.string().oneOf(['Branch admin','Team admin','student']).required('Role is required'),
  branch: Yup.string().oneOf(['CSE','AI&DS','AI&ML','IT','ECE','EEE','CIVIL','CSBS']).required("select any one branch"),
});

const OthersLogin = () => {
  const navigate = useNavigate();
  const { login, showOthersModal, closeOthersModal} = useContext(AuthContext);

  const handleSubmit = async ({ collegename, email, password, role, branch }, { resetForm, setSubmitting }) => {
    try {
      let subCollectionPath;
      if (role === "student") {
        subCollectionPath = "users";
      } else if (role === "Branch admin") {
        subCollectionPath = "admins/Branch admin/branch admins";
      } else if (role === "Team admin") {
        subCollectionPath = "admins/Team admin/team admins";
      }

      const subCollectionRef = collection(db, "colleges", collegename, "Branches", branch, subCollectionPath);
      const q = query(subCollectionRef, where("email", "==", email), where("password", "==", password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("Login successful");
        closeOthersModal();
        login({ role: role, collegename: collegename, email: email,branch: branch });
        navigate("/services");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      alert("Error logging in");
    }
    resetForm();
    setSubmitting(false);
  };

  return (
    <div>
      {showOthersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md mx-4 bg-[#04052E] mx-[8%] rounded-lg shadow-lg p-8 shadow-slate-100 text-white max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeOthersModal}
              className="absolute top-4 right-4 text-white"
            >
              <CloseIcon />
            </button>
    <div className="w-full max-w-md text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormikControl control="input" name="collegename" type="text" label="College Name" />
            <FormikControl control="input" name="email" type="email" label="Email"/>
            <FormikControl control="input" name="password" type="password" label="Password"/>
            <div className='mb-4'>
              <label className="block text-sm font-medium">Branch</label>
              <Field name="branch" as="select"
                className="mt-1 block w-full px-4 py-2 rounded-md shadow-sm border-2 border-gray-500 bg-transparent focus:text-orange-500 focus:outline-none focus:border-cyan-500 sm:text-sm">
                <option value="" label="Select Branch" />
                <option value="CSE" label="CSE" />
                <option value="AI&DS" label="AI&DS" />
                <option value="AI&ML" label='AI&ML'/>
                <option value="IT" label='IT'/>
                <option value="ECE" label='ECE'/>
                <option value="EEE" label='EEE'/>
                <option value="CIVIL" label='CIVIL'/>
                <option value="CSBS" label='CSBS'/>
              </Field>
              <ErrorMessage name="branch" component="div" className="text-red-500 text-sm" />
            </div>
            <div className='mb-4'>
              <label className="block text-sm font-medium">Role</label>
              <Field name="role" as="select"
                className="mt-1 block w-full px-4 py-2 rounded-md shadow-sm border-2 border-gray-500 bg-transparent focus:text-orange-500 focus:outline-none focus:border-cyan-500 sm:text-sm">
                <option value="" label="Select role" />
                <option value="student" label="Student" />
                <option value="Branch admin" label="Branch admin" />
                <option value="Team admin" label='Team admin'/>

              </Field>
              <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
            </div>
            <button disabled={isSubmitting} type="submit" className="w-full py-2 px-4 bg-white text-black hover:bg-blue-500 hover:text-white font-bold rounded-md shadow-sm active:ring-4 active:ring-white-500">
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
    </div>
        </div>
      )}
    </div>
  );
};

export default OthersLogin;
