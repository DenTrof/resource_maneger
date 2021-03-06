
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';


const v4 = require('uuid/v4');
const required = (value) => (value ? undefined : 'Поле обязательное для заполнения');
// const number = (value) => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <input className="form_modal" {...input} placeholder={label} type={type} />
    <div style={{ fontWeight: 'bold', color: 'red' }}>{touched &&
      ((error && <span>&nbsp;&nbsp;{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const renderDropdownList = ({ input, data, valueField, textField }) => (
  <DropdownList
    {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onBlur={() => input.onBlur()}
  />
);


class StatusForm extends React.Component {

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const positionData = ['Сборщик Корпусной Мебели', 'Разнорабочий/столярный цех', 'Распиловщик',
      'Мастер производства'];

    return (
      <form className="positionForm" onSubmit={handleSubmit}>
        <div style={{ flex: '8' }}>
          <Field
            name="name"
            component={renderField}
            type="input"
            validate={[required]}
            label="Bведите статус"
          />
          <Field
            name="description"
            component={renderField}
            type="input"
            validate={[required]}
            label="Bведите описание"
          />
        </div>
        <div style={{ flex: '1' }}>
          <button
            disabled={pristine || submitting}
            type="submit"
          >&nbsp;&nbsp;<i className="fa fa-paper-plane"></i>&nbsp;&nbsp;
          </button>
          <button
            onClick={handleSubmit}
            color="primary"
            type="button"
          ><span><b> &nbsp;&nbsp;×&nbsp;&nbsp; </b></span>
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'StatusForm',
})(StatusForm);
