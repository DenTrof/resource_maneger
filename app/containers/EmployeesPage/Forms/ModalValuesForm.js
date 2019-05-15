import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Button } from 'reactstrap';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import noImage from './no_img.png';
import { makeSelectEmployees } from '../selectors';
const v4 = require('uuid/v4'); // autogenerating key

// form validation --------------------------------------------------------------
const required = (value) => (value ? undefined : 'Поле обязательное для заполнения');
// -------------------------------------------------------------------------------

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <input className="form_modal" {...input} placeholder={label} type={type} />
    <div style={{ fontWeight: "bold", color: "red" }}>{touched &&
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


class EmployeesForm extends React.Component {

  componentDidMount() {
    const id = `${v4()}`; // autogenerating key
    this.handleInitialize(id);
  }

  addFoto = () => {
    document.querySelector('.addFile').click();
  }

  handleInitialize(id) {
    const initData = {};
    initData.id = id;
    this.props.initialize(initData);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, employees } = this.props;
    const areaData = employees.areaData.map((item) => {
      return <option key={item.id} value={item.id}>{item.name}</option>;
    });
    const positionData = employees.positionData.map((item) => {
      return <option key={item.id} value={item.id}>{item.name}</option>;
    });
    /*----------------- Read file URL ---------------------------------*/
    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          const blah = document.querySelector('#blah')
          blah.setAttribute('src', e.target.result);

        }
        reader.readAsDataURL(input.files[0]);
      }
    }
    const imgInp = document.querySelector("#imgInp");
    if (imgInp) {
      imgInp.addEventListener('change', function () {
        readURL(this);
      });
    }

    return (
      <form className="employees_form" onSubmit={handleSubmit}>
        <Field
          component={FileInput}
          validate={[required]}
          name="foto"
        />
        <div className="worker_img">
          <img id="blah" src="#" alt="preview image" onError={(e) => { e.target.onerror = null; e.target.src = noImage; }} />
        </div>
        <div>
          <Button className="worker" color="secondary" onClick={this.addFoto} >
            <i className="fa fa-user-plus "></i> Добавить фото </Button>
        </div>
        <div>
          <label>Фамилия</label>
          <div>
            <Field
              name="lastname"
              component={renderField}
              type="text"
              placeholder="Enter you login"
              validate={[required]}
            />
          </div>
        </div>
        <div>
          <label>Имя</label>
          <div>
            <Field
              name="name"
              component={renderField}
              type="text"
              placeholder="Enter you login"
              validate={[required]}
            />
          </div>
        </div>
        <div>
          <label>Отчество</label>
          <div>
            <Field
              name="patronymic"
              component={renderField}
              type="text"
              placeholder="Enter you login"
              validate={[required]}
            />
          </div>
        </div>
        <div>
          <label>Должность</label>
          <select className="select_post select_post_2">
            <option
              value=""
              disabled
              selected
            ></option>
            {positionData}
          </select>
        </div>
        <div>
          <label>Подразделение</label>
          <select className="select_post select_post_1">
            <option
              value=""
              disabled
              selected
            ></option>
            {areaData}
          </select>
        </div>
        <div>
          <label>Логин</label>
          <div>
            <Field
              name="login"
              component={renderField}
              type="text"
              placeholder="Enter you login"
              validate={[required]}

            />
          </div>
        </div>
        <div>
          <label>Пароль</label>
          <div>
            <Field
              name="password"
              component={renderField}
              type="password"
              placeholder="Enter you password"
              validate={[required]}
            />
          </div>
        </div>
        <div>
          <button
            onClick={this.toggleSeveChangedData}
            style={{ marginLeft: '51%' }}
            color="primary"
            disabled={pristine || submitting}
            type="submit"
          ><i className="fa fa-paper-plane"></i> Сохранить
  </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            <i className="fa fa-refresh"></i>&nbsp;&nbsp;Очистить
  </button>
        </div>
      </form>
    );
  }
}

const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0])

const FileInput = ({
  input: {
    value: omitValue,
    onChange,
    onBlur,
    ...inputProps,
  },
  meta: omitMeta,
  ...props,
}) =>
  <input id="imgInp" type="file" name="image" className="addFile" onChange={adaptFileEventToValue(onChange)} onBlur={adaptFileEventToValue(onBlur)} {...inputProps} {...props} />

const mapStateToProps = createStructuredSelector({
  employees: makeSelectEmployees(),
});

EmployeesForm = connect(mapStateToProps, null)(EmployeesForm);

export default reduxForm({
  form: 'EmployeesForm',
})(EmployeesForm);
