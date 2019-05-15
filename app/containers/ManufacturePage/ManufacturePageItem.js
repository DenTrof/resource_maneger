/**
 *
 * ManufacturePage
 *
 */
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from 'reactstrap';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import injectSaga from 'utils/injectSaga';
import { Link } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import ComplitedForm from './Forms/ComplitedForm';


export class ManufacturePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModal1: false,
    };
  }

  toggleModalAddNew = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  }
  complitedModal = () => {
    this.setState({
      showModal1: !this.state.showModal1,
    });
  }

  statusFormatterAppsName(cell, row) {
    return (
      <Link to={`${row.appLink}`}>{row.account}</Link>
    );
  }
  nomName = (cell, row) => <div>{row.account}</div>

  allName = (data, date, change, dataDiviant) => {
    const deviant = dataDiviant ? <div style={{ color: 'red' }}>Отклонения Eсть...</div> : <div style={{ color: '#20a8d8' }}>Отклонений Нет</div>;
    return data === 'Сделано' ? <div style={{ color: 'green' }}>{data === 'Не включено в план' ? <div style={{ color: 'red' }}>{data}<Link to="#" className="swich_link"> Включить</Link></div> :
    <div>{data} {date}<br />{change}</div>}
      {deviant}<Button
        className="button_margin"
        color="primary"
        onClick={this.complitedModal}
        type="button"
      ><i className="fa icon-star"></i> Выполнено</Button><Link to="#" className="history_link">История...</Link></div> :
    <div>{data === 'Не включено в план' ? <div style={{ color: 'red' }}>{data}<Link to="#" className="swich_link"> Включить</Link></div> :
    <div>{data} {date}<br />{change}</div>}
      {deviant}<Button
        className="button_margin"
        color="primary"
        onClick={this.complitedModal}
        type="button"
      ><i className="fa icon-star"></i> Выполнено</Button><Link to="#" className="history_link">История...</Link></div>;
  }
  cutName = (cell, row) => {
    const data = row.cut;
    const date = row.dateCut;
    const change = row.changeCut;
    const dataDiviant = row.deviant;
    const dataStatus = row.cutStatus;
    return this.allName(data, date, change, dataDiviant, dataStatus);
  }

  dirName = (cell, row) => {
    const data = row.dirEdge;
    const date = row.dateDirEdge;
    const change = row.changeDirEdge;
    const dataDiviant = row.deviantEdge;
    const dataStatus = row.dirStatus;
    return this.allName(data, date, change, dataDiviant, dataStatus);
  }

  crName = (cell, row) => {
    const data = row.crEdge;
    const date = row.dateCrEdge;
    const change = row.changeCrEdge;
    const dataDiviant = row.deviantCrEdge;
    const dataStatus = row.crStatus;
    return this.allName(data, date, change, dataDiviant, dataStatus);
  }

  holeName = (cell, row) => {
    const data = row.hole;
    const date = row.dateHole;
    const change = row.changeHole;
    const dataDiviant = row.deviantHole;
    const dataStatus = row.holeStatus;
    return this.allName(data, date, change, dataDiviant, dataStatus);
  }

  millingName = (cell, row) => {
    const data = row.milling;
    const date = row.dateMilling;
    const change = row.changeMilling;
    const dataDiviant = row.deviantMilling;
    const dataStatus = row.millingStatus;
    return this.allName(data, date, change, dataDiviant, dataStatus);
  }

  packName = (cell, row) => {
    const data = row.pack;
    const date = row.datePack;
    const change = row.changePack;
    const dataDiviant = row.deviantPack;
    const dataStatus = row.packStatus;
    return this.allName(data, date, change, dataDiviant, dataStatus);
  }

  FormaterButton = (cell, row) => row.status === 'Принято' ? <Button
      // onClick={this.manufactureModal}
    color="success"
    type="button"
  >
    <i className="fa icon-layers"></i> Принятo
      </Button> : row.status === 'Непринято' ? <Button
        // onClick={this.manufactureModal}
        color="secondary"
        type="button"
      >
        <i className="fa icon-layers"></i> Не принято
      </Button> : <Button
          // onClick={this.manufactureModal}
        color="secondary"
        type="button"
      >
        <i className="fa icon-layers"></i> Принять
      </Button>

  render() {
    const options = {
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

    const { manufacturePage, id } = this.props;
    return (
      <div id="manufacture-page">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <div className="card_flex">
                <div>{`ЗАКАЗ№ ${id}`}</div>
                <div className="card_f">Филиал(производство): г.Киев/пер.Куренёвский, 17 </div>
                <div className="card_f">Филиал(менеджер): г.Одесса/ул.Дальницкая, 38/Фамилия И.О </div>
              </div>
            </CardHeader>
            <CardBody>
              <ComplitedModal
                isOpen={this.state.showModal1}
                toggleModal1={this.complitedModal}
              />
              <BootstrapTable
                data={manufacturePage}
                striped
                hover
                pagination
                options={options}
                insertRow
                version="4"
              >
                <TableHeaderColumn isKey dataField="id" width="3%">ID</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="nomName"
                  width="12%"
                  dataFormat={this.nomName}
                  dataSort
                > Номенклатура</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="cutName"
                  dataFormat={this.cutName}
                > Порезка </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="dirName"
                  dataFormat={this.dirName}
                > Прям. кромковка </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="crName"
                  dataFormat={this.crName}
                > Крив. кромковка </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="holeName"
                  dataFormat={this.holeName}
                > Отверстия </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="millingName"
                  dataFormat={this.millingName}
                > Фрезерование </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="packName"
                  dataFormat={this.packName}
                > Упаковка </TableHeaderColumn>
                {/* <TableHeaderColumn
                  dataFormat={this.FormaterButton}
                > Упаковка </TableHeaderColumn> */}
              </BootstrapTable>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

class ComplitedModal extends React.Component {
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
    this.props.toggleModal1();
  }

  render() {
    return (this.props.isOpen ? <Modal isOpen className="modal-lg large" toggle={this.toggleModal}>
      <ModalHeader toggle={this.toggleModal}>Выполнено</ModalHeader>
      <ModalBody>
        <ComplitedForm id={this.props.id} />
      </ModalBody>
      <ModalFooter>
      </ModalFooter>
    </Modal> : null);
  }
}

ManufacturePage.propTypes = {
  manufacturePage: PropTypes.object,
  id: PropTypes.func,
};

ComplitedModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal1: PropTypes.func,
  id: PropTypes.object,
};

ManufacturePage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // manufacturepage: makeSelectManufacturePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manufacturePage', reducer });
const withSaga = injectSaga({ key: 'manufacturePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManufacturePage);
