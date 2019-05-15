import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
  Card, CardBody, CardHeader,
} from 'reactstrap';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reactLocalStorage } from 'reactjs-localstorage';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import PostEditor from './PostEditor';
import { makeSelectEquipment, makeValuesEquipmentForm } from './selectors';
import ModalValuesForm from './Forms/ModalValuesForm';
import { submitAction } from './actions';

const createPriceEditor = (onUpdate, props) => (<PostEditor onUpdate={onUpdate} {...props} />);

export class EquipmentPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      nameId: null,
      nameId5: null,
      idEquip: null,
      equipmentValue: '',
      idTable: null,
      idEq: null,
      cellVal: true,
      cellValTd: true,
      buttonId: null,
      equOp: false,
    };
    this.toggleModalAddNew = this.toggleModalAddNew.bind(this);
  }

 

  componentDidMount() {
    document.addEventListener('click', (e) => {
      const postId = e.target.value;
      const equipOperationId = e.target.id;

      reactLocalStorage.set('equipId', equipOperationId);
      if (postId) {
        this.setState({
          nameId: postId,
        });
      }
      // if (postId5) {
      //   this.setState({
      //     nameId5: postId5,
      //   });
      // }
    });
  }

  componentDidUpdate() {
    // console.log(reactLocalStorage.get('postId5', true));
    document.querySelector('#equipment tbody').onclick = (e) => {
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
      const idEquiTd = idEquipment.getElementsByTagName('td')[3].innerHTML;
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
    const { equipment } = this.props;
    const eqData = equipment.equipmentData[this.state.idTable];
    // console.log('eqData55555555', eqData);
    if (eqData) {
      try {
        return axios.put(`http://manufacture-service-api.dn-kronas.local/api/web/v1/equipment/${this.state.idEq}`,
          {
            name: eqData.name,
            inventory_number: eqData.inventory_number,
            performance_per_hour: eqData.performance_per_hour,
            post_id: +(this.state.cellValTd ? eqData.post_id : eqData.post_id_id),
            post_id_id: +(eqData.post_id),
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

  saveData = (id) => {
    this.setState({
      equipmentValue: id,
    });
  }

  createCustomDeleteButton = (onBtnClick) => (
    <button id="position-delete" style={{ color: 'red' }} onClick={onBtnClick}>
      <i className="fa icon-trash"></i> Удалить
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
    const equData = this.props.equipment.equipmentData;
    const eqData = equData[equData.length - 1].id;
    const formData = valuesForm.EquipmentForm.values;
    const equipment = {
      id: +eqData + 1,
      name: `${formData.name}`,
      inventory_number: `${formData.inventory_number}`,
      performance_per_hour: `${formData.performance_per_hour}`,
      post_id: `${this.state.nameId}`,
    };
    const { savedata } = this.props;
    savedata(equipment);
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
    const postId = row.post_id_id;
    return `${postId}`;
  }

  formatterEquipment = (cel, row) => (
    <Link to="/directory/equioperation" >
      <button
        id={row.id}
        className="pencil_blue"
        onClick={this.refreshData}
      >
      </button>
    </Link>
  )

  refreshData = () => {
    this.forceUpdate();
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
        return axios.delete(`http://manufacture-service-api.dn-kronas.local/api/web/v1/equipment/${row[0]}`);
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    const options = {
      handleConfirmDeleteRow: this.customConfirm,
      onRowClick: this.onRowClick,
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
      customComponent: this.customMultiSelect,
    };

    const { equipment } = this.props;
    return (
      <div id="equipment">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>Справочник Оборудование</CardHeader>
            <CardBody>
              <PositionModal
                isOpen={this.state.showModal}
                toggleModal={this.toggleModalAddNew}
                saveChangedData={this.saveChangedData}
                reductPost={this.reductPost}
              />
              <BootstrapTable
                className="equipment-table"
                data={equipment.equipmentData}
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
                >
                </TableHeaderColumn>
                <TableHeaderColumn
                  width="4.3%"
                  dataField="id"
                  dataFormat={this.formatterEquipment}
                />
                <TableHeaderColumn
                  isKey
                  width="10%"
                  filter={{ type: 'TextFilter' }}
                  dataField="id"
                  dataSort
                >ID</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="name"
                  width="30%"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                >Наименование
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="inventory_number"
                  dataSort
                  filter={{ type: 'NumberFilter' }}
                >Инвентарный номер</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="performance_per_hour"
                  dataSort
                  filter={{ type: 'NumberFilter' }}
                >Производит. в час
                </TableHeaderColumn>
                {this.state.cellValTd ? <TableHeaderColumn
                  dataField="post_id"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                  customEditor={{ getElement: createPriceEditor }}
                >Пост
                </TableHeaderColumn> :
                  <TableHeaderColumn
                    dataField="post_id_id"
                    dataFormat={this.formaterPostId}
                    dataSort
                    filter={{ type: 'TextFilter' }}
                    customEditor={{ getElement: createPriceEditor }}
                  >Пост
              </TableHeaderColumn>}
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

class PositionModal extends React.Component {
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
    this.props.reductPost();
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


EquipmentPage.propTypes = {
  valuesForm: PropTypes.object,
  savedata: PropTypes.func,
  equipment: PropTypes.object,
};

PositionModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  saveChangedData: PropTypes.func,
  reductPost: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    savedata: (equipment) => dispatch(submitAction(equipment)),
  };
}

const mapStateToProps = createStructuredSelector({
  equipment: makeSelectEquipment(),
  valuesForm: makeValuesEquipmentForm(),
});


const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'equipment', reducer });
const withSaga = injectSaga({ key: 'equipment', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EquipmentPage);
