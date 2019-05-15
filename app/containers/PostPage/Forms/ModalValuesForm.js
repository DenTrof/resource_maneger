import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import { submitAction } from '../actions';
import { makeValuesPostForm, makeSelectPost } from '../selectors';

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


class PostForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, pristine, submitting, post } = this.props;
    const postData = post.postsData.map((item) => {
      return <option key={item.id} value={item.id}>{item.name}</option>;
    });

    return (
      <form className="positionForm" onSubmit={handleSubmit}>
        <div style={{ flex: '4' }}>
          <Field
            name="name"
            component={renderField}
            label="Ввести наименованте поста"
            type="input"
            validate={[required]}
          />
        </div>
        <div style={{ flex: '2' }}>
          <select className="select_post">
            <option value="" disabled selected> Выберите производственный участок</option>
            {postData}
          </select>
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
  post: makeSelectPost(),
  valuesModal: makeValuesPostForm(),
});


PostForm = connect(mapStateToProps, mapDispatchToProps)(PostForm);
export default reduxForm({
  form: 'PostForm',
})(PostForm);
