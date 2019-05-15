import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import PropTypes from 'prop-types';
import { makeSelectChange } from '../selectors';


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

const renderDateTimePicker = ({ input: { onChange, value } }) =>
  (<DateTimePicker
    onChange={onChange}
    format="DD-MM-YYYY  HH : mm"
    // time={showTime}
    time={false}
    {...this.props}
    culture="ru"
    value={!value ? null : new Date(value)}
    placeholder="Начало смены"
  />);

const renderDatePicker = ({ input: { onChange, value } }) =>
  (<DateTimePicker
    onChange={onChange}
    format="DD-MM-YYYY"
    {...this.props}
    time={false}
    culture="ru"
    placeholder="Дата"

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

class ChangeForm extends React.Component {

  // logiс for data in form Id input ( permanent view in input) --------------------------------
  componentDidMount() {
    const id = `${v4()}`; // autogenerating key
    this.handleInitialize(id);
  }

  handleInitialize(id) {
    const initData = {};
    initData.id = id;
    this.props.initialize(initData);
  }

  render() {
    const { handleSubmit, pristine, submitting, post } = this.props;
    const postData = post.postData.map((item) => {
      return <option key={item.id} value={item.id}>{item.name}</option>;
    });
    const areaData = post.areaData.map((item) => {
      return <option key={item.id} value={item.id}>{item.name}</option>;
    });

    return (
      <form className="change-form" onSubmit={handleSubmit}>
        <div className="positionForm">
          <div style={{ flex: '2.6' }}>
            <Field
              name="date"
              component={renderDatePicker}
              type="input"
              validate={[required]}
            />
          </div>
          <div style={{ flex: '2' }}>
            <Field
              name="start"
              type="input"
              showTime
              component={renderDateTimePicker}
              validate={[required]}
            />
          </div>
          <div style={{ flex: '2' }}>
            <Field
              name="finish"
              type="input"
              showTime
              component={renderDateTimePicker1}
              validate={[required]}
            />
          </div>
          <div style={{ flex: '2' }}>
            <Field
              name="number"
              type="input"
              component={renderField}
              validate={[required]}
              label="Номер смены"
            />
          </div>
          <div style={{ flex: '2' }}>
            <select className="select_post select_post_1">
              <option
                value=""
                disabled
                selected
              > Произв. участок
              </option>
              {areaData}
            </select>
          </div>
          <div style={{ flex: '2' }}>
            <select className="select_post select_post_2">
              <option
                value=""
                disabled
                selected
              > Выберите Пост
              </option>
              {postData}
            </select>
          </div>
          <div style={{ flex: '2' }}>
            <Field
              name="name"
              type="input"
              component={renderField}
              validate={[required]}
              label="Наименование"
            />
          </div>
          {/* <div style={{ flex: '2' }}>
            <Field
              name="worker"
              type="input"
              component={renderField}
              validate={[required]}
              label="Работники"
            />
          </div> */}
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

ChangeForm.propTypes = {
  handleSubmit: PropTypes.func,
  initialize: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  post: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  post: makeSelectChange(),
});


ChangeForm = connect(mapStateToProps, null)(ChangeForm);

export default reduxForm({
  form: 'ChangeForm',
})(ChangeForm);
