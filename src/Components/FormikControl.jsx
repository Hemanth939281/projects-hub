import PropTypes from 'prop-types';
import { Field } from 'formik';
import Input from './FieldTypes/Input';
import { ErrorMessage } from 'formik';

const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case 'input':
      return <Input {...rest} />;
      
    case 'textarea':
      return (
           <div>
                 <label htmlFor={rest.name} className="block text-md font-medium my-2">
                   {rest.label}
                 </label>
                 <Field as="textarea" {...rest} className="mt-1 block w-full px-2 md:px-4 py-2 rounded-md shadow-sm border-2 border-gray-500 bg-transparent focus:outline-none focus:border-cyan-500" />
                 <ErrorMessage name={rest.name} component="div" className="text-red-500" />
            </div>
            )
    case 'select':
      return (
        <Field as="select" {...rest} className="p-2 text-sm rounded-md focus:border-2 focus:border-cyan-500 focus:outline-none">
          {rest.options && rest.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      );
    default:
      return <Field  {...rest}/>;

  }
};

FormikControl.propTypes = {
  control: PropTypes.string.isRequired,
};

export default FormikControl;
