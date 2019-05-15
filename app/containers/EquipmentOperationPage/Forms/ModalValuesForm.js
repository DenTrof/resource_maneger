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

class EquipmentOperationForm extends React.Component {

  render() {
    const { handleSubmit, pristine, submitting, tehnology } = this.props;
    const operationData = tehnology.operationData.map((item) => {
      return <option key={item.id} value={item.id}>{item.name}</option>;
    });

    return (
      <form className="positionForm" onSubmit={handleSubmit}>
        <div style={{ flex: '7' }}>
          <select className="select_post">
            <option value="" disabled selected> Выберите Наименование</option>
            {operationData}
          </select>
        </div>
        <div style={{ flex: '4' }}>
          <Field
            name="time"
            type="input"
            component={renderField}
            validate={[required]}
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

const mapStateToProps = createStructuredSelector({
  tehnology: makeSelectTehnology(),
});


EquipmentOperationForm = connect(mapStateToProps, null)(EquipmentOperationForm);

export default reduxForm({
  form: 'EquipmentOperationForm',
})(EquipmentOperationForm);
