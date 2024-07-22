
import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";

const Input = ({ label, name, type, }) => {
  return (
    <div>
      <label htmlFor={name} className="block mt-1 text-md font-medium">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        className=" mt-1 block w-full px-2 md:px-4 py-2 rounded-md shadow-sm border-2 border-gray-500 bg-transparent focus:outline-none focus:border-cyan-500 text-sm"
      />
      <ErrorMessage name={name} component="div" className=" text-red-500 mt-1" />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,

};

export default Input;
