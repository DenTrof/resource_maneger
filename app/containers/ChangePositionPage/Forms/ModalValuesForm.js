import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
// import Multiselect from 'react-widgets/lib/Multiselect';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import { submitAction } from '../actions';
import { makeValuesPositionForm } from '../selectors';

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
    placeholder="Выбрать должность"
  />
);


class PositionForm extends React.Component {

  // logiс for data in form Id input ( permanent view in input) --------------------------------
  componentDidMount() {
    const id = `${v4().split('-')[0]}`; // autogenerating key
    this.handleInitialize(id);
  }

  handleInitialize(id) {
    const initData = {};
    initData.id = id;
    this.props.initialize(initData);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const positionData = ['Сборщик Корпусной Мебели', 'Разнорабочий/столярный цех', 'Распиловщик',
      'Мастер производства'];

    return (
      <form className="positionForm" onSubmit={handleSubmit}>
        <div >
          <Field
            name="position"
            component={renderField}
            label="Введите должность"
            type="input"
            textField="name"
            validate={[required]}
          />
        </div>
        <div style={{ flex: '1' }}>
          <button
            // color="primary"
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
  valuesModal: makeValuesPositionForm(),
});


PositionForm = connect(mapStateToProps, mapDispatchToProps)(PositionForm);
export default reduxForm({
  form: 'PositionForm',
})(PositionForm);
