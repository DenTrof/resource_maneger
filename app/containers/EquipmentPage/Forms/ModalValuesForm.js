import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import { submitAction } from '../actions';
import { makeValuesEquipmentForm, makeSelectEquipment } from '../selectors';


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
  <div><DropdownList
    {...input}
    data={data}
    placeholder="Выберите пост"
    valueField={valueField}
    textField={textField}
    onBlur={() => input.onBlur()}
    placeholder="Ввыбрать оборудование"
  /></div>
);


class EquipmentForm extends React.Component {
  
  render() {
    const { handleSubmit, pristine, submitting, post } = this.props;
    const postData = post.postData.map((item) => {
      return <option key={item.id} value={item.id}>{item.name}</option>;
    });
    // console.log('postData', postData )
    return (
      <form className="equipment-form" onSubmit={handleSubmit}>
        <div className="positionForm">
          <div style={{ flex: '5.4' }}>
            <Field
              name="name"
              component={renderField}
              label="Наименование оборудования"
              type="input"
              validate={[required]}
            />
          </div>
          <div style={{ flex: '2' }}>
            <Field
              name="inventory_number"
              type="input"
              component={renderField}
              label="Инвентарный номер"
              validate={[required]}
            />
          </div>
          <div style={{ flex: '2' }}>
            <Field
              name="performance_per_hour"
              type="input"
              component={renderField}
              label="Производительность в час"
              validate={[required]}
            />
          </div>
          <div style={{ flex: '2' }}>
            <select className="select_post">
              <option value="" disabled selected> Выберите Пост</option>
              {postData}
            </select>
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

function mapDispatchToProps(dispatch) {
  return {
    saveData: (modal) => dispatch(submitAction(modal)),
  };
}

const mapStateToProps = createStructuredSelector({
  post: makeSelectEquipment(),
  valuesModal: makeValuesEquipmentForm(),
});


EquipmentForm = connect(mapStateToProps, mapDispatchToProps)(EquipmentForm);
export default reduxForm({
  form: 'EquipmentForm',
})(EquipmentForm);
