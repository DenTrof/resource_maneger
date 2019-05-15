import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
  Card, CardBody, CardHeader,
} from 'reactstrap';
import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import AreaEditor from './AreaEditor';
import OperatEditor from './OperatEditor';
import { makeSelectCosts, makeValuesCostsForm } from './selectors';
import ModalValuesForm from './Forms/ModalValuesForm';
import { submitAction } from './actions';

const createAreaEditor = (onUpdate, props) => (<AreaEditor onUpdate={onUpdate} {...props} />);
const createOperatEditor = (onUpdate, props) => (<OperatEditor onUpdate={onUpdate} {...props} />);

export class OperationCostsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
      buttonId: null,
    };

    this.toggleModalAddNew = this.toggleModalAddNew.bind(this);
  }

  componentDidMount() {

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
      selectPost1.addEventListener('click', (e) => {
        const postId1 = e.target.value;
        if (postId1) {
          this.setState({
            nameId1: postId1,
          });
        }
      });
    }



    document.querySelector('#cost_operation tbody').onclick = (e) => {
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
      const idEquiTd = idEquipment.getElementsByTagName('td')[2].innerHTML;
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
    const { operations } = this.props;
    const eqData = operations.operationsData[this.state.idTable];
    console.log('eqData55555555', eqData);
    if (eqData) {
      try {
        return axios.put(`http://manufacture-service-api.dn-kronas.local/api/web/v1/cost-operation/${this.state.idEq}`,
          {
            production_area_id: +(this.state.cellValTd ? eqData.production_area_id : eqData.production_area_id_id),
            production_area_id_id: +eqData.production_area_id,
            equipment_id: +(eqData.equipment_id),
            technological_operation_id: +(this.state.cellValTd ? eqData.technological_operation_id : eqData.technological_operation_id_id),
            technological_operation_id_id: +(eqData.technological_operation_id),
            wage: eqData.wage,
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
    const formData = valuesForm.OperationCostsForm.values;
    const equData = this.props.operations.operationsData;
    const eqData = equData[equData.length - 1].id;
    const operations = {
      id: +eqData + 1,
      production_area_id: `${this.state.nameId}`,
      equipment_id: `${formData.equipment_id}`,
      technological_operation_id: `${this.state.nameId1}`,
      wage: `${formData.wage}`,
    };
    const { savedata } = this.props;
    return savedata(operations);
  }

  reloadData = () => {
    location.reload();
  }

  сustomDeleteButton = (cell, row) => (<button
    className="del-butt-marg"
    id={row.id}
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
    const postId1 = row.technological_operation_id_id;
    return `${postId1}`;
  }

  formatterEquipment = (cel, row) => (
    <Link to="/directory/equioperation" ><button id={row.name} onClick={this.toggleEquipment}>
      <i className="fa icon-pencil blue"></i>
    </button></Link>
  )

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
        return axios.delete(`http://manufacture-service-api.dn-kronas.local/api/web/v1/cost-operation/${row[0]}`);
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

    const { operations } = this.props;

    return (
      <div id="cost_operation">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>Справочник Себестоимость операции</CardHeader>
            <CardBody>
              <TehnologyModal
                isOpen={this.state.showModal}
                toggleModal={this.toggleModalAddNew}
                saveChangedData={this.saveChangedData}
              />
              <BootstrapTable
                className="equipment-table"
                data={operations.operationsData}
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
                  width="0%"
                  dataField="id"
                  dataFormat={this.сustomDeleteButton}
                  dataAlign="center"
                ><button
                  className="del-butt-marg"
                  onClick={this.сustomDelete}
                ></button>
                </TableHeaderColumn>
                <TableHeaderColumn
                  isKey
                  width="10%"
                  filter={{ type: 'TextFilter' }}
                  dataField="id"
                  dataSort
                >ID</TableHeaderColumn>
                {this.state.cellValTd ? <TableHeaderColumn
                  dataField="production_area_id"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                  customEditor={{ getElement: createAreaEditor }}
                >Производственный участок
                </TableHeaderColumn> :
                  <TableHeaderColumn
                    dataField="production_area_id_id"
                    dataFormat={this.formaterPostId}
                    dataSort
                    filter={{ type: 'TextFilter' }}
                    customEditor={{ getElement: createAreaEditor }}
                  >Производственный участок
              </TableHeaderColumn>}
                <TableHeaderColumn
                  dataField="equipment_id"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                // editable={{ type: 'select', options: { values: operationsTypes } }}
                >Оборудование
                </TableHeaderColumn>
                {this.state.cellValTd ? <TableHeaderColumn
                  dataField="technological_operation_id"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                  customEditor={{ getElement: createOperatEditor }}
                >Операция
                </TableHeaderColumn> :
                  <TableHeaderColumn
                    dataField="technological_operation_id_id"
                    dataFormat={this.formaterPostId1}
                    dataSort
                    filter={{ type: 'TextFilter' }}
                    customEditor={{ getElement: createOperatEditor }}
                  >Операция
              </TableHeaderColumn>}
                <TableHeaderColumn
                  dataField="wage"
                  dataSort
                  filter={{
                    type: 'NumberFilter',
                    delay: 1000,
                    numberComparators: ['=', '>', '<='],
                  }}
                >ЗП работника грн.
                </TableHeaderColumn>
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

class TehnologyModal extends React.Component {
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
    this.props.toggleModal();
  }

  saveData = () => {
    this.props.saveChangedData();
  }

  render() {
    return (this.props.isOpen ? <ModalValuesForm handleSubmit={this.onSubmit} /> : null);
  }
}


OperationCostsPage.propTypes = {
  valuesForm: PropTypes.object,
  savedata: PropTypes.func,
  operations: PropTypes.object,
};

TehnologyModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  saveChangedData: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    savedata: (operations) => dispatch(submitAction(operations)),
  };
}

const mapStateToProps = createStructuredSelector({
  operations: makeSelectCosts(),
  valuesForm: makeValuesCostsForm(),
});


const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'operationCosts', reducer });
const withSaga = injectSaga({ key: 'operationCosts', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OperationCostsPage);
