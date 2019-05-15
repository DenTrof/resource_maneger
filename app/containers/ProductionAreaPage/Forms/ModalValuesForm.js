import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
// import Multiselect from 'react-widgets/lib/Multiselect';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import { submitAction } from '../actions';
import { makeValuesProductionForm, makeSelectProduction } from '../selectors';

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


class ProductionForm extends React.Component {

  render() {
    const { handleSubmit, pristine, submitting, production } = this.props;
    const prodData = production.productionData.map((item) => {
      return <option key={item.id} value={item.id}>{item.name}</option>;
    });
    return (
      <form className="positionForm" onSubmit={handleSubmit}>
        <div style={{ flex: '4' }}>
          <Field
            name="name"
            component={renderField}
            label="Введите производственный участок"
            type="input"
            validate={[required]}
          />
        </div>
        <div style={{ flex: '2' }}>
          <select className="select_post">
            <option value="" disabled selected> Выберите филиал</option>
            {prodData}
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

function mapDispatchToProps(dispatch) {
  return {
    saveData: (modal) => dispatch(submitAction(modal)),
  };
}

const mapStateToProps = createStructuredSelector({
  production: makeSelectProduction(),
  valuesModal: makeValuesProductionForm(),
});


ProductionForm = connect(mapStateToProps, mapDispatchToProps)(ProductionForm);
export default reduxForm({
  form: 'ProductionForm',
})(ProductionForm);
