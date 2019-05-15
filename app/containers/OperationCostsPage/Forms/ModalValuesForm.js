import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import { makeSelectCosts } from '../selectors';

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


class OperationCostsForm extends React.Component {

  render() {
    const { handleSubmit, pristine, submitting, costs } = this.props;
    const areaData = costs.areaData.map((item) => {
      return <option key={item.id} value={item.id}>{item.name}</option>;
    });
    const operatData = costs.operatData.map((item) => {
      return <option key={item.id} value={item.id}>{item.name}</option>;
    });

    return (
      <form className="equipment-form" onSubmit={handleSubmit}>
        <div className="positionForm">
          <div style={{ flex: '3.7' }}>
            <select className="select_post select_post_1">
              <option value="" disabled selected> Выберите Производственный участок</option>
              {areaData}
            </select>
          </div>
          <div style={{ flex: '2' }}>
            <Field
              name="equipment_id"
              type="input"
              component={renderField}
              validate={[required]}
              label="Оборудование"
            />
          </div>
          <div style={{ flex: '2' }}>
            <select className="select_post select_post_2">
              <option value="" disabled selected> Выберите операцию</option>
              {operatData}
            </select>

          </div>
          <div style={{ flex: '2' }}>
            <Field
              name="wage"
              type="input"
              component={renderField}
              validate={[required]}
              label="З/П работника"
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

const mapStateToProps = createStructuredSelector({
  costs: makeSelectCosts(),
});


OperationCostsForm = connect(mapStateToProps, null)(OperationCostsForm);

export default reduxForm({
  form: 'OperationCostsForm',
})(OperationCostsForm);
