import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';

const required = (value) => (!value ? 'Поле обязательное для заполнения' : null);
// const number = (value) => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <input className="form_modal" {...input} placeholder={label} type={type} />
    <div style={{ fontWeight: 'bold', color: 'red' }}>{touched &&
      ((error && <span>&nbsp;&nbsp;{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);


const renderDropdownList = ({ input, data, valueField, textField, label, type, meta: { touched, error, warning } }) => (
  <div>
    <DropdownList
      placeholder="Выберите наименование филиала"
      {...input}
      data={data}
      valueField={valueField}
      textField={textField}
      onBlur={() => input.onBlur()}
      validate={[required]}
    />
    <div style={{ fontWeight: 'bold', color: 'red' }}>{touched &&
      ((error && <span>&nbsp;&nbsp;{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);
const renderDropdownList1 = ({ input, data, valueField, textField, label, type, meta: { touched, error, warning } }) => (
  <div>
    <DropdownList
      placeholder="Выберите область"
      {...input}
      data={data}
      valueField={valueField}
      textField={textField}
      onBlur={() => input.onBlur()}
      validate={[required]}
    />
    <div style={{ fontWeight: 'bold', color: 'red' }}>{touched &&
      ((error && <span>&nbsp;&nbsp;{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);
const renderDropdownList2 = ({ input, data, valueField, textField, label, type, meta: { touched, error, warning } }) => (
  <div>
    <DropdownList
      placeholder="Выберите город"
      {...input}
      data={data}
      valueField={valueField}
      textField={textField}
      onBlur={() => input.onBlur()}
      validate={[required]}
    />
    <div style={{ fontWeight: 'bold', color: 'red' }}>{touched &&
      ((error && <span>&nbsp;&nbsp;{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);


class BranchForm extends React.Component {

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const cityData = ['Одесса', 'Киев',
      'Харьков', 'Донецк'];
    const areaData = ['Одесская', 'Донецкая',
      'Харьковская', 'Донецкая'];

    return (
      <form className="equipment-form" onSubmit={handleSubmit}>
        <div className="positionForm">
          <div style={{ flex: '3.7' }}>
            <Field
              name="name"
              component={renderField}
              label="Ввведите наименование филиала"
              type="input"
              validate={[required]}
            />
          </div>
          <div style={{ flex: '2' }}>
            <Field
              name="region"
              component={renderDropdownList1}
              data={cityData}
              type="input"
              validate={[required]}
            />
          </div>
          <div style={{ flex: '2' }}>
            <Field
              name="city"
              component={renderDropdownList2}
              data={areaData}
              type="input"
              validate={[required]}
            />
          </div>
        </div>
        <div >
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

BranchForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};


export default reduxForm({
  form: 'BranchForm',
})(BranchForm);
