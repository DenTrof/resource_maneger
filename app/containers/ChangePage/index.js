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
import { Link } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import PostEditor from './PostEditor';
import AreaEditor from './AreaEditor';
import { makeSelectChange, makeValuesChangeForm } from './selectors';
import ModalValuesForm from './Forms/ModalValuesForm';
import { submitAction } from './actions';

const createPostEditor = (onUpdate, props) => (<PostEditor onUpdate={onUpdate} {...props} />);
const createAreaEditor = (onUpdate, props) => (<AreaEditor onUpdate={onUpdate} {...props} />);
export class ChangePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
    document.addEventListener('click', (e) => {
      const positionId = e.target.id;
      reactLocalStorage.set('equipId', positionId);
    });
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

    document.querySelector('#change tbody').onclick = (e) => {
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
    const { change } = this.props;
    const eqData = change.changeData[this.state.idTable];
    console.log('eqData55555555', eqData);
    if (eqData) {
      try {
        return axios.put(`http://manufacture-service-api.dn-kronas.local/api/web/v1/work-shift/${this.state.idEq}`,
          {
            date: eqData.date,
            start_shift: eqData.start_shift,
            shift_end: eqData.shift_end,
            shift_number: +eqData.shift_number,
            production_area_id: +(this.state.cellValTd ? eqData.production_area_id : eqData.production_area_id_id),
            production_area_id_id: +eqData.production_area_id,
            post_id: +(this.state.cellValTd ? eqData.post_id : eqData.post_id_id),
            post_id_id: +(eqData.post_id),
            name: eqData.name,
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
      <Link to={`${row.appLink}`}>{row.account}</Link>
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
    const formData = valuesForm.ChangeForm.values;
    const equData = this.props.change.changeData;
    const eqData = equData[equData.length - 1].id;
    const change = {
      id: +eqData + 1,
      date: `${new Date(formData.date).getFullYear()}-${(new Date(formData.date).getMonth() + 1) < 10 ? '0' + (new Date(formData.date).getMonth() + 1) : new Date(formData.date).getMonth() + 1}-${(new Date(formData.date).getDate()) < 10 ? "0" + (new Date(formData.date).getDate()) : new Date(formData.date).getDate()}`,
      start_shift: `${new Date(formData.start).getFullYear()}-${(new Date(formData.start).getMonth() + 1) < 10 ? '0' + (new Date(formData.start).getMonth() + 1) : new Date(formData.start).getMonth() + 1}-${(new Date(formData.start).getDate()) < 10 ? "0" + (new Date(formData.start).getDate()) : new Date(formData.start).getDate()} ${new Date(formData.start).getHours()}:${new Date(formData.start).getMinutes()}`,
      shift_end: `${new Date(formData.finish).getFullYear()}-${(new Date(formData.finish).getMonth() + 1) < 10 ? '0' + (new Date(formData.finish).getMonth() + 1) : new Date(formData.finish).getMonth() + 1}-${(new Date(formData.finish).getDate()) < 10 ? "0" + (new Date(formData.finish).getDate()) : new Date(formData.finish).getDate()} ${new Date(formData.finish).getHours()}:${new Date(formData.finish).getMinutes()}`,
      shift_number: `${formData.number}`,
      production_area_id: `${this.state.nameId}`,
      post_id: `${this.state.nameId1}`,
      name: `${formData.name}`,
    };
    const { savedata } = this.props;
    return savedata(change);
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
    const postId = row.post_id_id;
    return `${postId}`;
  }

  formatterPosition = (cel, row) => (
    <Link to="/change_position" >
      <button
        id={row.id}
        className="pencil_blue"
        onClick={this.refreshData}
      >
      </button>
    </Link>
  )

  formaterPostId1 = (cell, row) => {
    const postId1 = row.production_area_id_id;
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
  // --------------------------------------------------------------------------------------
  customConfirm = (next, row) => {
    if (confirm('ВЫ ДЕЙСТВИТЕЛЬНО ХОТИТЕ УДАЛИТЬ ЭТУ ЗАПИСЬ ?')) {
      next();
      try {
        return axios.delete(`http://manufacture-service-api.dn-kronas.local/api/web/v1/work-shift/${row[0]}`);
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
      customComponent: this.customMultiSelect,
    };

    const { change } = this.props;
    // const changeTypes = change.changeTypes ? change.changeTypes.map((item) => item.name): null;
    return (
      <div id="change">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>Справочник Смена</CardHeader>
            <CardBody>
              <ChangeModal
                isOpen={this.state.showModal}
                toggleModal={this.toggleModalAddNew}
                saveChangedData={this.saveChangedData}
              />
              <BootstrapTable
                className="equipment-table"
                data={change.changeData}
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
                  width="4%"
                  dataField="id"
                >ID</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="date"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                >Дата</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="start_shift"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                >Начало смены
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="shift_end"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                >Окончание смены
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="shift_number"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                >Номер смены</TableHeaderColumn>
                {this.state.cellValTd ? <TableHeaderColumn
                  dataField="production_area_id"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                  customEditor={{ getElement: createAreaEditor }}
                >Производст. участок
                </TableHeaderColumn> :
                  <TableHeaderColumn
                    dataField="production_area_id_id"
                    dataFormat={this.formaterPostId1}
                    dataSort
                    filter={{ type: 'TextFilter' }}
                    customEditor={{ getElement: createAreaEditor }}
                  >Производст. участок
              </TableHeaderColumn>}
                {this.state.cellValTd ? <TableHeaderColumn
                  dataField="post_id"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                  customEditor={{ getElement: createPostEditor }}
                >Пост
                </TableHeaderColumn> :
                  <TableHeaderColumn
                    dataField="post_id_id"
                    dataFormat={this.formaterPostId}
                    dataSort
                    filter={{ type: 'TextFilter' }}
                    customEditor={{ getElement: createPostEditor }}
                  >Пост
              </TableHeaderColumn>}
                <TableHeaderColumn
                  dataField="name"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                >Наименование
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="worker"
                  dataFormat={this.formatterPosition}
                  dataSort
                  dataAlign="center"
                  filter={{ type: 'TextFilter' }}
                >Работники
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

class ChangeModal extends React.Component {
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
    return (this.props.isOpen ? <ModalValuesForm handleSubmit={this.onSubmit} /> : null);
  }
}


ChangePage.propTypes = {
  valuesForm: PropTypes.object,
  savedata: PropTypes.func,
  change: PropTypes.object,
};

ChangeModal.propTypes = {
  toggleModal: PropTypes.func,
  saveChangedData: PropTypes.func,
  isOpen: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return {
    savedata: (change) => dispatch(submitAction(change)),
  };
}

const mapStateToProps = createStructuredSelector({
  change: makeSelectChange(),
  valuesForm: makeValuesChangeForm(),
});


const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'change', reducer });
const withSaga = injectSaga({ key: 'change', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ChangePage);
