import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
  Card, CardBody, CardHeader,
} from 'reactstrap';
import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { reactLocalStorage } from 'reactjs-localstorage';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import PostEditor from './PostEditor';
import { makeSelectTehnology, makeValuesTehnologyForm } from './selectors';
import ModalValuesForm from './Forms/ModalValuesForm';
import { submitAction, ServerDataLoaded, IdLoaded } from './actions';


const createOperationEditor = (onUpdate, props) => (<PostEditor onUpdate={onUpdate} {...props} />);
export class TehnologyPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      equipmentId: null,
      showModal: false,
      nameId: null,
      nameEquip: null,
      idEquip: null,
      equipmentValue: '',
      idTable: null,
      idEq: null,
      cellVal: true,
      cellValTd: true,
    };

    this.toggleModalAddNew = this.toggleModalAddNew.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', (e) => {
      const postId = e.target.value;
      const nameEquip = e.target;
      const valueOption = nameEquip.options[nameEquip.selectedIndex].innerHTML;
      if (postId) {
        this.setState({
          nameId: postId,
          nameEquip: valueOption,
        });
      }
    });
  }

  componentDidUpdate() {
    const equipmentId = reactLocalStorage.get('equipId');
    if (equipmentId !== undefined) {
      this.setState({
        equipmentId,
      });
    }

    document.querySelector('#equipment_operation tbody').onclick = (e) => {
      const cell = e.target;
      if (cell.tagName.toLowerCase() === 'div') {
        this.setState({
          cellVal: !this.state.cellVal,
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

//   shouldComponentUpdate(nextProps, nextState) {
//     // вместо !== будет какое то сравнение между this.props.tableData и nextProps.tableData
//     return this.state !== nextState;
// }

  saveAllData = () => {
    const { tehnology } = this.props;
    const eqData = tehnology.tehnologyData[this.state.idTable];
    // console.log('eqData55555555', eqData);
    if (eqData) {
      try {
        return axios.put(`http://manufacture-service-api.dn-kronas.local/api/web/v1/equipment-operation/${this.state.idEq}`,
          {
            equipment_id: +this.state.equipmentId,
            time: +eqData.time,
            technological_operation_id: +this.state.nameId,
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
  createCustomInsertButton = () => (<div>
    <button
      className="add_position-button"
      onClick={this.toggleModalAddNew}
    > Добавить
      </button>
    <button
      className="position_delete"
      onClick={this.сustomDelete}
    ><i className="fa icon-trash"></i> Удалить
        </button>
    <button
      className="position_refresh"
      onClick={this.loadData}
    ><i className="fa icon-cloud-download"></i> Обновить данные
        </button>
    <Link to="/directory/equipment" >
      <button
        className="close_position-button"
        onClick={this.reloadData}
      > Вернуться
      </button>
    </Link>
    {/* <button
      className="position_reload"
      onClick={this.reloadData}
    ><i className="fa icon-action-redo"></i>
    </button> */}
  </div>)

  loadData = () => {
    const id = this.state.equipmentId;
    axios.get(`http://manufacture-service-api.dn-kronas.local/api/web/v1/equipment-operation/card-equipment-operation?id=${id}`)
      .then((res) => {
        const { equipData } = this.props;
        equipData(res.data);
        this.setState({
          id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    const refresh = document.querySelector('.position_refresh');
    refresh.disabled = true;
    refresh.style.opacity = '0.4';
  }

  saveChangedData = () => {
    const { valuesForm } = this.props;
    const formData = valuesForm.EquipmentOperationForm.values;
    const equData = this.props.tehnology.tehnologyData;
    const eqData = equData[equData.length - 1].id;
    const tehnology = {
      id: +eqData + 1,
      equipment_id: this.state.equipmentId,
      time: `${formData.time}`,
      name: `${this.state.nameEquip}`,
      technological_operation_id: `${this.state.nameId}`,
    };
    const { savedata } = this.props;
    return savedata(tehnology);
  }

  сustomDeleteButton = (cell, row) => (<button
    className="del-butt-marg"
    id={row.id}
    style={{ color: 'red' }}
    onClick={this.сustomDelete}
  ></button>);

  сustomDelete = () => {
    document.querySelector('#position-delete').click();
  }

  reloadData = () => {
    location.reload();
  }

  formaterPostId = (cell, row) => {
    const postId = row.name;
    return `${postId}`;
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
  // --------------------------------------------------------------------------------------
  customConfirm = (next, row) => {
    if (confirm('ВЫ ДЕЙСТВИТЕЛЬНО ХОТИТЕ УДАЛИТЬ ЭТУ ЗАПИСЬ ?')) {
      next();
      try {
        return axios.delete(`http://manufacture-service-api.dn-kronas.local/api/web/v1/equipment-operation/${row[0]}`);
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
      customComponent: this.customMultiSelect,
    };

    const { tehnology } = this.props;

    return (
      <div id="equipment_operation">
        <div className="animated fadeIn">
          <Card>
            <CardHeader> Карточка оборудование операция
              {/* <EquipmentInput /> */}
            </CardHeader>
            <CardBody>
              <TehnologyModal
                isOpen={this.state.showModal}
                toggleModal={this.toggleModalAddNew}
                saveChangedData={this.saveChangedData}
              />
              <BootstrapTable
                className="equipment-table"
                // data={this.state.data}
                data={tehnology.tehnologyData}
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
                {/* <TableHeaderColumn
                  dataField="equipment_id"
                  width="30%"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                  editable={{ type: 'select', options: { values: tehnologyTypes } }}
                >Оборудование
                </TableHeaderColumn> */}
                {/* <TableHeaderColumn
                  dataField="name"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                  customEditor={{ getElement: createOperationEditor }}
                >Технологическая операция
                </TableHeaderColumn> */}
                {this.state.cellValTd ? <TableHeaderColumn
                  dataField="name"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                  customEditor={{ getElement: createOperationEditor }}
                >Технологическая операция
                </TableHeaderColumn> :
                  <TableHeaderColumn
                    dataField="name"
                    dataFormat={this.formaterPostId}
                    dataSort
                    filter={{ type: 'TextFilter' }}
                    customEditor={{ getElement: createOperationEditor }}
                  >Технологическая операция
              </TableHeaderColumn>}
                <TableHeaderColumn
                  dataField="time"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                >Время выполнения, сек.
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

TehnologyPage.propTypes = {
  valuesForm: PropTypes.object,
  savedata: PropTypes.func,
  equipData: PropTypes.func,
  tehnology: PropTypes.object,
  // idData: PropTypes.func,
};

TehnologyModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  saveChangedData: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    savedata: (tehnology) => dispatch(submitAction(tehnology)),
    equipData: (equipment) => dispatch(ServerDataLoaded(equipment)),
    idData: (id) => dispatch(IdLoaded(id)),
  };
}

const mapStateToProps = createStructuredSelector({
  tehnology: makeSelectTehnology(),
  valuesForm: makeValuesTehnologyForm(),
});


const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'equipmentop', reducer });
const withSaga = injectSaga({ key: 'equipmentop', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TehnologyPage);
