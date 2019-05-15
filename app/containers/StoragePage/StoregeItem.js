/* eslint-disable linebreak-style */
/**
 *
 * StoregeItem
 *
 */
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectingFormData, makeValuesStoregeForm } from './selectors';
import reducer from './reducer';
import saga from './saga';
import SelectingFormValuesForm from './Forms/SelectingFormValuesForm';
import ManufactureForm from './Forms/ManufactureForm';
import { submitAction } from './actions';

export class StoregeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModal1: false,
      showModal2: false,
    };
  }

  toggleModalAddNew = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  }
  manufactureModal = () => {
    this.setState({
      showModal2: !this.state.showModal2,
    });
  }
  manufactureSave = () => {
    alert('SAVE DATA');
  }

  AddNewBtn = () => (
    <div className="card_flex">
      <div className="card_flex"><Button
        block
        color="primary"
        onClick={this.toggleModalAddNew}
        type="button"
      ><i className="fa_b"> + </i> Новый заказ
      </Button>
        <Button
          style={{ marginLeft: '10px' }}
          onClick={this.manufactureModal}
          color="secondary"
          type="button"
        >
          <i className="fa icon-layers"></i> Применить Статус
      </Button>
      </div>
      <div>
        <Button
          style={{ marginLeft: '10px' }}
          onClick={this.manufactureSave}
          color="info"
          type="button"
        >
          <i className="fa icon-note"></i> Сохранить
      </Button>
      </div>
    </div>
  )
// ------------- Date formater ----------------------------------------------- //
  newData = (formData) => `${new Date(formData).getDate()}/${new Date(formData).getMonth() + 1}/${new Date(formData).getFullYear()} ${new Date(formData).getHours()}:${new Date(formData).getMinutes()}`

  statusFormatter = (cell, row) => {
    const date = this.newData(row.dateStatus);
    switch (row.status) {
      case 'undefined':
        return <Badge color="secondary">Незивестно</Badge>;
      case 'Производство':
        return <div><Badge color="danger">Производство</Badge><br />{date}</div>;
      case 'Комплектация':
        return <div> <Badge color="success">Полная компл.</Badge><br />{date}</div>;
      default:
        return <Badge color="primary">{row.status}</Badge>;
    }
  }

  saveChangedData = () => {
    const { valuesForm } = this.props;
    const valForm = valuesForm.StoragFormValues.values;
    const storage = {
      id: `${valuesForm.MasterFormValues.values.id}`,
      material: [
        {
          // id: `${valForm.id}`,
          account: `${valForm.account}`,
          cut: this.newData(valForm.cut),
          dirEdge: this.newData(valForm.dirEdge),
          crEdge: this.newData(valForm.crEdge),
          hole: this.newData(valForm.hole),
          milling: this.newData(valForm.milling),
          pack: this.newData(valForm.pack),
          data: `${valForm.data}`,
          status: `${valForm.status}`,
        }],
    };
    const { savedata } = this.props;
    return savedata(storage);
  }

  nomName = (cell, row) => <div>{row.account}</div>

  allName = (data, amount) => (data === 'NaN/NaN/NaN NaN:NaN' || data === '' || data === 'undefined' ? <div style={{ color: 'red' }}>Нет</div> :
  <div style={{ color: 'blue' }}>Подтвержден {data} <br /><span style={{ color: 'black' }}><b>&Sigma;</b> : {amount}</span></div>);

  cutName = (cell, row) => {
    const data = row.cut;
    const amount = row.amountCut;
    return this.allName(data, amount);
  }

  dirName = (cell, row) => {
    const data = row.dirEdge;
    const amount = row.amountDirEdge;
    return this.allName(data, amount);
  }

  crName = (cell, row) => {
    const data = row.crEdge;
    const amount = row.amountCrEdge;
    return this.allName(data, amount);
  }

  holeName = (cell, row) => {
    const data = row.hole;
    const amount = row.amountHole;
    return this.allName(data, amount);
  }

  millingName = (cell, row) => {
    const data = row.milling;
    const amount = row.amountMilling;
    return this.allName(data, amount);
  }

  packName = (cell, row) => {
    const data = row.pack;
    const amount = row.amountPack;
    return this.allName(data, amount);
  }

  render() {
    this.newData();
    const options = {
      onRowClick: this.onRowClick,
      insertBtn: this.AddNewBtn,
      page: 1,  // which page you want to show as default
      sizePerPage: 5,  // which size per page you want to locate as default
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
    const { makeData, id, date, filials, filialManager,
      managerName, 
      //operations 
    } = this.props;
      // console.log('operations', operations.tehnologyData);
    return (
      <div id="cmaccounts">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <div className="card_flex">
                <div>(ID) Заказ№ {id} {`( ${date} )`}</div>
                <div className="card_f"><span className="c_b">Производство</span>: {filials}</div>
                <div className="card_f"><span className="c_g">Менеджер</span>: {filialManager} / {managerName}</div>
              </div>
            </CardHeader>
            <CardBody>
              <StorageModalAdd
                isOpen={this.state.showModal}
                toggleModal={this.toggleModalAddNew}
                saveChangedData={this.saveChangedData}
                id={id}
              />
              <ManufactureStorModal
                isOpen={this.state.showModal2}
                toggleModal2={this.manufactureModal}
              />
              <BootstrapTable
                data={makeData}
                striped
                hover
                pagination
                options={options}
                cellEdit={cellEditProp}
                insertRow
                version="4"
              >
                <TableHeaderColumn isKey dataField="id" width="3%">ID</TableHeaderColumn>
                <TableHeaderColumn
                  width="12%"
                  dataFormat={this.nomName}
                  dataField="account"
                  dataSort
                > Номенклатура</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="amountAccount"
                  width="4%"
                >&Sigma;</TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={this.cutName}
                  dataField="cut"
                > Порезка </TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={this.dirName}
                  dataField="dirEdge"
                > Прям. кромковка </TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={this.crName}
                  dataField="crEdge"
                > Крив. кромковка </TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={this.holeName}
                  dataField="hole"
                > Отверстия </TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={this.millingName}
                  dataField="milling"
                > Фрезерование </TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={this.packName}
                  dataField="pack"
                > Упаковка </TableHeaderColumn>
                <TableHeaderColumn
                  dataAlign="center"
                  dataField="status"
                  dataFormat={this.statusFormatter}
                > Статус </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="description"
                  width="9%"
                > Примечание </TableHeaderColumn>
              </BootstrapTable>
              <BootstrapTable
                data={makeData}
                striped
                hover
                pagination
                cellEdit={cellEditProp}
                insertRow
                version="4"
              >
                <TableHeaderColumn
                  isKey
                  dataField="id"
                  width="3%"
                > ID Смены</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="operationId"
                  dataSort
                >ID операции
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="operationId"
                  dataSort
                >Кол-во план
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="operationId"
                  dataSort
                >Кол-во факт
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="operationId"
                  dataSort
                >Дата + время планирования
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="operationId"
                  dataSort
                >Дата + время выполнения
                </TableHeaderColumn>
              </BootstrapTable>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

class StorageModalAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.isOpen ? this.props.isOpen : false,
      account: 1,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.toggleModal();
    this.saveData();
  }

  toggleModal = () => {
    this.props.toggleModal();
  }

  saveData = () => {
    this.props.saveChangedData();
  }

  render() {
    return (this.props.isOpen ? <Modal isOpen className="modal-lg large" toggle={this.toggleModal}>
      <ModalHeader toggle={this.toggleModal}>Создать новый заказ</ModalHeader>
      <ModalBody>
        <SelectingFormValuesForm id={this.props.id} handleSubmit={this.onSubmit} />
      </ModalBody>
      <ModalFooter>
      </ModalFooter>
    </Modal> : null);
  }
}
class ManufactureStorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.isOpen ? this.props.isOpen : false,
      account: 1,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.toggleModal();
  }

  toggleModal = () => {
    this.props.toggleModal2();
  }

  render() {
    return (this.props.isOpen ? <Modal isOpen className="modal-lg large" toggle={this.toggleModal}>
      <ModalHeader toggle={this.toggleModal}>Статус</ModalHeader>
      <ModalBody>
        <ManufactureForm handleSubmit={this.onSubmit} />
      </ModalBody>
      <ModalFooter>
      </ModalFooter>
    </Modal> : null);
  }
}
StorageModalAdd.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  saveChangedData: PropTypes.func,
  id: PropTypes.number,
};

StoregeItem.propTypes = {
  valuesForm: PropTypes.object,
  savedata: PropTypes.func,
  makeData: PropTypes.array,
  id: PropTypes.number,
  date: PropTypes.string,
  filials: PropTypes.string,
  filialManager: PropTypes.string,
  managerName: PropTypes.string,
};

ManufactureStorModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal2: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  storage: makeSelectingFormData(),
  valuesForm: makeValuesStoregeForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    savedata: (storage) => dispatch(submitAction(storage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'storegePage', reducer });
const withSaga = injectSaga({ key: 'storegePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StoregeItem);
