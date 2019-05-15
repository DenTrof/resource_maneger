import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
  Card, CardBody, CardHeader, Modal, ModalBody,
  ModalFooter, ModalHeader,
} from 'reactstrap';
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import AreaEditor from './AreaEditor';
import PositionEditor from './PositionEditor';
import ModalValuesForm from './Forms/ModalValuesForm';
import { makeSelectEmployees, makeValuesEmployeesForm } from './selectors';
import { submitAction } from './actions';
import noImage from './Forms/no_img.png';


const createAreaEditor = (onUpdate, props) => (<AreaEditor onUpdate={onUpdate} {...props} />);
const createPositionEditor = (onUpdate, props) => (<PositionEditor onUpdate={onUpdate} {...props} />);
export class EmployeesPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      nameId: null,
      nameId1: null,
      idEquip: null,
      equipmentValue: '',
      idTable: null,
      idEq: null,
      cellVal: true,
      cellValTd: true,
    };

    this.toggleModalAddNew = this.toggleModalAddNew.bind(this);
  }

  componentDidUpdate() {

    const selectPost1 = document.querySelector('.select_post_1');
    const selectPost2 = document.querySelector('.select_post_2');
    if (selectPost1) {
      selectPost1.addEventListener('click', (e) => {
        const postId = e.target.value;
        if (postId) {
          this.setState({
            nameId: postId,
          });
        }
      });
    }

    if (selectPost2) {
      selectPost2.addEventListener('click', (e) => {
        const postId1 = e.target.value;
        if (postId1) {
          this.setState({
            nameId1: postId1,
          });
        }
      });
    }

    document.querySelector('#employees tbody').onclick = (e) => {
      const cell = e.target;
      if (cell.tagName.toLowerCase() === 'div') {
        this.setState({
          cellVal: !this.state.cellVal,
          buttonId: cell.id,
        });
      }

      if (cell.tagName.toLowerCase() === 'td') {
        this.setState({
          cellValTd: false,
        });
      }

      if (cell.tagName.toLowerCase() != 'td') { return; }
      const rowIndex = cell.parentNode.rowIndex;
      const idEquipment = document.getElementsByTagName('tr')[rowIndex + 1];
      const idEquiTd = idEquipment.getElementsByTagName('td')[1].innerHTML;
      this.setState({
        idTable: rowIndex,
        idEq: idEquiTd,
      });
    };

    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.saveAllData();
      }
    });
  }

  saveAllData = () => {
    const { employees } = this.props;
    const eqData = employees.employeesData[this.state.idTable];
    console.log('eqData55555555', eqData);
    if (eqData) {
      try {
        return axios.put(`http://manufacture-service-api.dn-kronas.local/api/web/v1/employees/${this.state.idEq}`,
          {
            first_name: eqData.first_name,
            last_name: eqData.last_name,
            patronymic: eqData.patronymic,
            position_id: +(this.state.cellValTd ? eqData.position_id : eqData.position_id_id),
            position_id_id: +eqData.position_id,
            production_area_id: +(this.state.cellValTd ? eqData.production_area_id : eqData.production_area_id_id),
            production_area_id_id: +eqData.production_area_id,
            // login
            // password
            photo: eqData.photo,
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  }

  reductPost = () => {
    this.setState({
      cellVal: false,
    });
  }

  toggleModalAddNew() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  statusFormatterAppsName(cell, row) {
    return (
      <Link to={`${row.appLink}`}><i className="fa icon-pencil"></i></Link>
    );
  }

  formatterImg(cell, row) {
    return (
      <Link to={`${row.appLink}`}>
        <img
          onError={(e) => { e.target.onerror = null; e.target.src = noImage; }}
          style={{ width: '50px' }}
          src={row.photo}
        />
      </Link>
    );
  }

  createCustomDeleteButton = (onBtnClick) => (
    <button id="position-delete" style={{ color: 'red' }} onClick={onBtnClick}>
      <i className="fa icon-trash"></i>
    </button>
  )
  createCustomInsertButton = () => (
    <div>
      <button
        className="add_position-button"
        onClick={this.toggleModalAddNew}
      >
        Добавить
    </button>
      <button
        className="position_delete"
        onClick={this.сustomDelete}
      ><i className="fa icon-trash"></i> Удалить
      </button>
      <button
        className="position_reload"
        onClick={this.reloadData}
      ><i className="fa icon-action-redo"></i>
      </button>
    </div>
  )

  saveChangedData = () => {
    const { valuesForm } = this.props;
    const equData = this.props.employees.employeesData;
    const eqData = equData[equData.length - 1].id;
    const employees = {
      id: +eqData + 1,
      first_name: `${valuesForm.EmployeesForm.values.name}`,
      last_name: `${valuesForm.EmployeesForm.values.lastname}`,
      patronymic: `${valuesForm.EmployeesForm.values.patronymic}`,
      position_id: `${this.state.nameId}`,
      production_area_id: `${this.state.nameId1}`,
      photo: `${valuesForm.EmployeesForm.values.foto}`,
      // login: `${valuesForm.EmployeesForm.values.login}`,
      // password: `${valuesForm.EmployeesForm.values.position}`,
      // appLink: '/employee/1',
    };

    const { savedata } = this.props;
    return savedata(employees);
  }

  reloadData = () => {
    location.reload();
  }

  сustomDeleteButton = () => (<button
    className="del-butt-marg"
    style={{ color: 'red' }}
    onClick={this.сustomDelete}
  ></button>)

  сustomDelete = () => {
    document.querySelector('#position-delete').click();
  }

  formaterPostId = (cell, row) => {
    const postId = row.production_area_id_id;
    return `${postId}`;
  }

  formaterPostId1 = (cell, row) => {
    const postId1 = row.position_id_id;
    return `${postId1}`;
  }

  customMultiSelect(props) {
    const { type, disabled, onChange, rowIndex } = props;
    if (rowIndex === 'Header') {
      return (
        <div className="checkbox-personalized">
          <Checkbox {...props} />
          <label htmlFor={`checkbox${rowIndex}`}>
            <div className="check"></div>
          </label>
        </div>);
    }
    return (
      <div className="checkbox-personalized">
        <input
          type={type}
          name={`checkbox${rowIndex}`}
          id={rowIndex}
          disabled={disabled}
          onChange={(e) => onChange(e, rowIndex)}
        />
      </div>);
  }

  customConfirm = (next, row) => {
    if (confirm('ВЫ ДЕЙСТВИТЕЛЬНО ХОТИТЕ УДАЛИТЬ ЭТУ ЗАПИСЬ ?')) {
      next();
      try {
        return axios.delete(`http://manufacture-service-api.dn-kronas.local/api/web/v1/employees/${row[0]}`);
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    const options = {
      handleConfirmDeleteRow: this.customConfirm,
      deleteBtn: this.createCustomDeleteButton,
      insertBtn: this.createCustomInsertButton,
      page: 1,  // which page you want to show as default
      sizePerPage: 10,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5,  // the pagination bar size.
      prePage: '<<', // Previous page button text
      nextPage: '>>', // Next page button text
      firstPage: 'Первая', // First page button text
      lastPage: 'Последняя', // Last page button text
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      paginationPosition: 'bottom',  // default is bottom, top and both is all available
      hideSizePerPage: true, // You can hide the dropdown for sizePerPage
    };

    const cellEditProp = {
      mode: 'click',
    };
    const selectRow = {
      mode: 'checkbox',
      bgColor: '#f5a8dd',
      clickToSelect: true,
    };

    const { employees } = this.props;
    return (
      <div id="employees">
        <div className="animated fadeIn">
          <p /><p />
          <Card>
            <CardHeader>Справочник Список Сотрудников</CardHeader>
            <CardBody>
              <AccountModalAdd
                isOpen={this.state.showModal}
                toggleModal={this.toggleModalAddNew}
                saveChangedData={this.saveChangedData}
              />
              <BootstrapTable
                data={employees.employeesData}
                striped
                hover
                pagination
                options={options}
                insertRow
                cellEdit={cellEditProp}
                selectRow={selectRow}
                deleteRow
                version="4"
              >
                <TableHeaderColumn
                  width="4%"
                  isKey
                  dataField="id"
                > ID </TableHeaderColumn>
                <TableHeaderColumn
                  width="0%"
                  dataField="id"
                  dataFormat={this.сustomDeleteButton}
                  dataAlign="center"
                ><button
                  className="del-butt-marg"
                  onClick={this.сustomDelete}
                ></button></TableHeaderColumn>
                <TableHeaderColumn
                  dataField="id"
                  width="6%"
                  dataFormat={this.formatterImg}
                >
                </TableHeaderColumn>
                <TableHeaderColumn
                  width="4%"
                  dataField="lastname"
                  dataFormat={this.statusFormatterAppsName}
                  dataAlign="center"
                >
                </TableHeaderColumn>
                <TableHeaderColumn
                  width="15%"
                  dataField="last_name"
                  dataSort
                >
                  Фамилия</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="first_name"
                  dataSort
                >
                  Имя</TableHeaderColumn>
                <TableHeaderColumn
                  width="15%"
                  dataField="patronymic"
                  dataSort
                >
                  Отчество</TableHeaderColumn>
                {this.state.cellValTd ? <TableHeaderColumn
                  dataField="position_id"
                  dataSort
                  customEditor={{ getElement: createPositionEditor }}
                >Должность
                </TableHeaderColumn> :
                  <TableHeaderColumn
                    dataField="position_id_id"
                    dataFormat={this.formaterPostId1}
                    dataSort
                    customEditor={{ getElement: createPositionEditor }}
                  >Должность
              </TableHeaderColumn>}
                {this.state.cellValTd ? <TableHeaderColumn
                  dataField="production_area_id"
                  dataSort
                  customEditor={{ getElement: createAreaEditor }}
                >Подразделение
                </TableHeaderColumn> :
                <TableHeaderColumn
                  dataField="production_area_id_id"
                  dataFormat={this.formaterPostId}
                  dataSort
                  customEditor={{ getElement: createAreaEditor }}
                > Подразделение
              </TableHeaderColumn>}
                {/* <TableHeaderColumn
                  width="8%"
                  dataField="login"
                  dataSort
                >
                  Логин</TableHeaderColumn>
                <TableHeaderColumn
                  width="8%"
                  dataField="password"
                  dataSort
                >
                  Пароль</TableHeaderColumn> */}
              </BootstrapTable>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

class Checkbox extends React.Component {
  render() {
    return (
      <input
        className="react-bs-select-all"
        type="checkbox"
        name={`checkbox${this.props.rowIndex}`}
        id={`checkbox${this.props.rowIndex}`}
      />
    );
  }
}

class AccountModalAdd extends React.Component {
  constructor(props) {
    super(props);
    const { isOpen } = this.props;
    this.state = {
      showModal: isOpen || false,
      account: 1,
    };
  }

  onSubmit = () => {
    this.toggleModal();
    this.saveData();
  }

  toggleModal = () => {
    const { toggleModal } = this.props;
    toggleModal();
  }

  saveData = () => {
    const { saveChangedData } = this.props;
    saveChangedData();
  }

  render() {
    return (this.props.isOpen ? <Modal isOpen className="modal-lg large" toggle={this.toggleModal}>
      <ModalHeader toggle={this.toggleModal}>Добавить Сотрудника</ModalHeader>
      <ModalBody>
        <ModalValuesForm fomId={this.state.fomId} handleSubmit={this.onSubmit} />
      </ModalBody>
      <ModalFooter>
      </ModalFooter>
    </Modal> : null);
  }
}


EmployeesPage.propTypes = {
  valuesForm: PropTypes.object,
  savedata: PropTypes.func,
  employees: PropTypes.object,
};

AccountModalAdd.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  saveChangedData: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    savedata: (employees) => dispatch(submitAction(employees)),
  };
}

const mapStateToProps = createStructuredSelector({
  employees: makeSelectEmployees(),
  valuesForm: makeValuesEmployeesForm(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'employees', reducer });
const withSaga = injectSaga({ key: 'employees', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EmployeesPage);
