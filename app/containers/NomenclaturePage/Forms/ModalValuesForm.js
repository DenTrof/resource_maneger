
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';


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


class NomenclatureForm extends React.Component {
  constructor(props) {
    super(props);
  }

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
    const { handleSubmit, pristine, submitting } = this.props;
    const positionData = ['Ланжероновская', 'Ланжероновская',
      'Ланжероновская', 'Ланжероновская'];

    return (
      <form className="equipment-form" onSubmit={handleSubmit}>
        <div className="positionForm">
          <div style={{ display: 'none' }}>
            <Field
              name="id"
              component={renderField}
            />
          </div>
          <div style={{ flex: '3.7' }}>
            <Field
              name="name"
              component={renderField}
              label="Номенклатура"
              type="input"
              validate={[required]}
            />
          </div>
          <div style={{ flex: '2' }}>
            <Field
              name="articul"
              type="input"
              component={renderField}
              label="Артикул"
              validate={[required]}
            />
          </div>
          <div style={{ flex: '2' }}>
            <Field
              name="link"
              type="input"
              component={renderField}
              label="Ссылка на сайт"
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

export default reduxForm({
  form: 'NomenclatureForm',
})(NomenclatureForm);
