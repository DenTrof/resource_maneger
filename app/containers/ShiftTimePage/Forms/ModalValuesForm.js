import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import PropTypes from 'prop-types';
import { makeSelectShift } from '../selectors';


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


const renderDateTimePicker = ({ input: { onChange, value } }) =>
  (<DateTimePicker
    onChange={onChange}
    // format="DD-MM-YYYY  HH : mm"
    format="DD-MM-YYYY"
    // time={showTime}
    time={false}
    {...this.props}
    culture="ru"
    value={!value ? null : new Date(value)}
    placeholder="Начало смены"
  />);

const renderDateTimePicker1 = ({ input: { onChange, value } }) =>
  (<DateTimePicker
    onChange={onChange}
    format="DD-MM-YYYY"
    {...this.props}
    time={false}
    culture="ru"
    placeholder="Конец смены"
  />);

class ShiftForm extends React.Component {

  render() {
    const { handleSubmit, area } = this.props;
    const areaData = area.areaData.map((item) => {
      return <option key={item.id} value={item.id}>{item.name}</option>;
    });

    return (
      <form className="positionForm shift_form" onSubmit={handleSubmit}>
        
        <div style={{ flex: '5', marginRight: '10%' }}>
            <select className="select_post select_post_1">
              <option
                value=""
                disabled
                selected
              > Фильтр по производственному участку
              </option>
              {areaData}
            </select>
          </div>
          <div style={{ flex: '6.5', marginLeft: '20%' }}>
            <Field
              name="start"
              type="input"
              showTime
              component={renderDateTimePicker}
              validate={[required]}
            />
            <Field
              name="finish"
              type="input"
              showTime
              component={renderDateTimePicker1}
              validate={[required]}
            />
          </div>
      </form>
    );
  }
}

ShiftForm.propTypes = {
  handleSubmit: PropTypes.func,
  area: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  area: makeSelectShift(),
});


ShiftForm = connect(mapStateToProps, null)(ShiftForm);
export default reduxForm({
  form: 'ShiftForm',
})(ShiftForm);
