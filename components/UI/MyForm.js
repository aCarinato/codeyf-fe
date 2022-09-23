import classes from './MyForm.module.css';
// own components
import BtnCTA from './BtnCTA';
import { Fragment } from 'react';

function MyForm(props) {
  const { formFields, labelCTA, formSubmit, error } = props;

  return (
    <form className={classes.container} onSubmit={formSubmit}>
      {formFields.map((field, index) => (
        <div className={classes['myform-input-section']} key={index}>
          <label className={classes['myform-label']} htmlFor={field.id}>
            {field.label}
          </label>
          {field.type === 'input' && (
            <Fragment>
              <input
                className={
                  field.inputIsInvalid
                    ? 'input-invalid'
                    : classes['myform-text-input']
                }
                id={field.id}
                type={field.inputType}
                // ref={field.ref}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                //   defaultValue={field.defaultValue}
                placeholder={field.placeholder}
                required
              />
              {field.inputIsInvalid && (
                <p className="input-error-msg">{field.inputErrorMsg}</p>
              )}
            </Fragment>
          )}
          {field.type === 'textarea' && (
            <textarea
              id={field.id}
              // ref={field.ref}
              rows="5"
              cols="33"
              //   defaultValue={field.defaultValue}
              placeholder={field.placeholder}
              required
            />
          )}
          {field.type === 'fieldset' && (
            <fieldset>
              {field.options.map((option, index) => (
                <div key={index}>
                  <input
                    type={field.subtype === 'radio' ? 'radio' : 'checkbox'}
                    id={option.label}
                    name={field.name}
                    value={field.subtype === 'radio' && option.value}
                  />
                  <label htmlFor={option.value}>{option.label}</label>
                </div>
              ))}
            </fieldset>
          )}
          {field.type === 'select' && (
            <div>
              <select name={field.id} id={field.id}>
                <option value="">--Please choose a country--</option>
                {field.options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      ))}
      {error && <div>{error}</div>}
      <br></br>
      <div className={classes['btn-container']}>
        <BtnCTA classname="btn-dark" type="submit" label={labelCTA} />
      </div>
    </form>
  );
}

export default MyForm;
