
// import React from 'react';
// import { Field, reduxForm } from 'redux-form/immutable';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import 'react-widgets/dist/css/react-widgets.css';
// import { makeSelectEquipment } from 'containers/EquipmentPage/selectors';

// const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
//   <div>
//     <input className="form_modal" {...input} placeholder={label} type={type} />
//   </div>
// );

// class EquipmentProcess extends React.Component {

//   render() {
//     const { handleSubmit, pristine, submitting } = this.props;

//     return (
//       <form onSubmit={handleSubmit}>
//         <div className="form_process">
// <label>Наименование:</label>
//           <Field
//             name="group"
//             type="input"
//             component={renderField}
//           />
//         </div>
//       </form>
//     );
//   }
// }

// export default reduxForm({
//   form: 'EquipmentProcessForm',
// })(EquipmentProcess);
