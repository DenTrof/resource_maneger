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

class TechnologyForm extends React.Component {

  render() {
    const { handleSubmit, pristine, submitting, technology } = this.props;
    
    const techData = technology.groupData.map((item) => {
      return <option key={item.id} value={item.id}>{item.name}</option>;
    });

    return (
      <form className="equipment-form" onSubmit={handleSubmit}>
        <div className="positionForm">
          <div style={{ flex: '3.7' }}>
            <Field
              name="name"
              component={renderField}
              label="Введите технологическую опирацию"
              type="input"
              validate={[required]}
            />
          </div>
          <div style={{ flex: '2' }}>
            <select className="select_post">
              <option value="" disabled selected> Выберите группу опираций</option>
              {techData}
            </select>
          </div>
          <div style={{ flex: '2' }}>
            <Field
              name="unit"
              type="input"
              component={renderField}
              label="Введите единицу измерения"
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

const mapStateToProps = createStructuredSelector({
  technology: makeSelectTehnology(),
});


TechnologyForm = connect(mapStateToProps, null)(TechnologyForm);

export default reduxForm({
  form: 'TehnologyForm',
})(TechnologyForm);
