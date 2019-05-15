/**
 *
 * EmployeePage
 *
 */

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
  Badge, Card, CardBody, CardHeader, Modal, ModalBody,
  ModalFooter, ModalHeader, Form,
} from 'reactstrap';
import noImage from 'containers/EmployeesPage/Forms/no_img.png';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ModalValuesForm from 'containers/EmployeesPage/Forms/ModalValuesForm';
import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

import makeSelectEmployee from './selectors';


export class EmployeePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      nameId: null,
    };
    this.toggleModalAddNew = this.toggleModalAddNew.bind(this);
    this.toggleSeveChangedData = this.toggleSeveChangedData.bind(this);
  }

  toggleModalAddNew() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }


  toggleSeveChangedData() {
  }

  // Неизвестно, какие будут статусы, добавил обработку для примера
  statusFormatter(cell) {
    switch (cell) {
      case 'ОК':
        return <Badge color="success">Выполняется</Badge>;
      case 'ERROR':
        return <Badge color="danger">Ошибка</Badge>;
      default:
        return <Badge color="secondary">Незивестно</Badge>;
    }
  }


  render() {
    const { employee, match } = this.props;
    // ------------------ Rendering by Id ------------------------------------- //
    const employeeId = match.params.employeeId; // Id of URL page
    const idFilter = employee.employeeData ? employee.employeeData.filter((item) => item.id === +employeeId) : null;
    // console.log(idFilter);

    return (
      <div id="cmaccounts">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>Справочник Сотрудника</CardHeader>
            <CardBody>
              <EmployeeModalAdd isOpen={this.state.showModal} toggleModal={this.toggleModalAddNew} />
              <EmployeeInfo account={idFilter} />
              <div className="employee-info" >
                <button
                  onClick={this.toggleModalAddNew}
                  className="position_delete"
                ><i className="fa fa-user-plus "></i> Изменить
                  </button>
                <Link to="/employees" >
                  <button
                    className="position_reload"
                  ><i className="fa icon-action-redo"></i> Назад
                  </button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

class EmployeeModalAdd extends React.Component {
  constructor(props) {
    super(props);
    const { isOpen } = this.props;
    this.state = {
      showModal: isOpen || false,
      account: 1,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.toggleModal();
  }

  toggleModal = () => {
    const { toggleModal } = this.props;
    toggleModal();
  }

  render() {
    return (this.props.isOpen ? <Modal isOpen className="modal-lg large" toggle={this.toggleModal}>
      <ModalHeader toggle={this.toggleModal}>Изменить</ModalHeader>
      <ModalBody>
        <ModalValuesForm />
        <Form className="form-horizontal" onSubmit={this.onSubmit}>
        </Form>
      </ModalBody>
      <ModalFooter>
      </ModalFooter>
    </Modal> : null);
  }
}

class EmployeeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.account,
    };
  }

  render() {
    return (<dl className="row">
      <dt className="col-sm-2">
        <img
          src={this.state[0] ? this.state[0].photo : null}
          alt="image"
          style={{ width: '250px', height: '250px' }}
          onError={(e) => { e.target.onerror = null; e.target.src = noImage; }}
        />
      </dt>
      <dd className="col-sm-10">
      </dd>
      <dt className="col-sm-2" ></dt>
      <dd className="col-sm-10"></dd>
      <dt className="col-sm-2">Фамилия</dt>
      <dd className="col-sm-10">{this.state[0] ? this.state[0].last_name : null}</dd>
      <dt className="col-sm-2">Имя</dt>
      <dd className="col-sm-10">{this.state[0] ? this.state[0].first_name : null}</dd>
      <dt className="col-sm-2">Отчество</dt>
      <dd className="col-sm-10">{this.state[0] ? this.state[0].patronymic : null}</dd>
      <dt className="col-sm-2">Должность</dt>
      <dd className="col-sm-10">{this.state[0] ? this.state[0].position_id : null}</dd>
      <dt className="col-sm-2" >Подразделение</dt>
      <dd className="col-sm-10">{this.state[0] ? this.state[0].production_area_id : null}</dd>
      <dt className="col-sm-2" ></dt>
      <dd className="col-sm-10"></dd>
    </dl>);
  }

}


EmployeePage.propTypes = {
  employee: PropTypes.object,
  match: PropTypes.object,
};

EmployeeModalAdd.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  employee: makeSelectEmployee(),
});


const withConnect = connect(mapStateToProps, null);

const withReducer = injectReducer({ key: 'employee', reducer });
const withSaga = injectSaga({ key: 'employee', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EmployeePage);
