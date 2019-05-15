import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import 'react-widgets/dist/css/react-widgets.css';
import { makeSelectTehnology } from '../selectors';

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

class ProcessContentForm extends React.Component {

  render() {
    const { handleSubmit, pristine, submitting, process } = this.props;
    const processData = process.groupData.map((item) => {
      return <option key={item.id} value={item.id}>{item.name}</option>;
    });

    return (
      <form className="positionForm" onSubmit={handleSubmit}>
        <div style={{ flex: '6' }}>
          <Field
            name="group"
            type="input"
            component={renderField}
            validate={[required]}
            label="№ группы операций в процессе"
          />
        </div>
        <div style={{ flex: '4' }}>
          <select className="select_post">
            <option value="" disabled selected> Группа операций </option>
            {processData}
          </select>
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

const mapStateToProps = createStructuredSelector({
  process: makeSelectTehnology(),
});


ProcessContentForm = connect(mapStateToProps, null)(ProcessContentForm);

export default reduxForm({
  form: 'ProcessOperationForm',
})(ProcessContentForm);
