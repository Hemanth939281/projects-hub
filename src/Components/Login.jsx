import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { db } from '../firebase';
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import FormikControl from './FormikControl';
import { useContext } from 'react';
import AuthContext from './AuthContext';

const initialValues = {
  collegename: '',
  email: '',
  password: '',
  role: ''
};

const validationSchema = Yup.object({
  collegename: Yup.string().required('College Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, "Password must be greater than 8 characters").required('Password is required'),
  role: Yup.string().oneOf(['student', 'admin']).required('Role is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login,} = useContext(AuthContext);

  const handleSubmit = async ({ collegename, email, password, role }, { resetForm, setSubmitting }) => {
    try {
      const collegeDocRef = doc(db, "colleges", collegename);
      const subCollectionRef = collection(collegeDocRef, role === 'student' ? 'users' : 'admins');
      const q = query(subCollectionRef, where("email", "==", email), where("password", "==", password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("Login successful");
        login({ role: role, collegename: collegename, email: email });
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
              <label className="block text-sm font-medium">Role</label>
              <Field name="role" as="select"
                className="mt-1 block w-full px-4 py-2 rounded-md shadow-sm border-2 border-gray-500 bg-transparent focus:text-black focus:outline-none focus:border-cyan-500 sm:text-sm">
                <option value="" label="Select role" />
                <option value="student" label="Student" />
                <option value="admin" label="Admin" />
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
  );
};

export default Login;
