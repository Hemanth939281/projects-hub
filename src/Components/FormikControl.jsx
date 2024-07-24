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
                 <Field as="textarea" {...rest} />
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
