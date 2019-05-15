import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
  Card, CardBody, CardHeader,
} from 'reactstrap';
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import PostEditor from './PostEditor';
import { makeSelectTehnology, makeValuesTehnologyForm } from './selectors';
import ModalValuesForm from './Forms/ModalValuesForm';
// import ProcessInput from './ProcessInput';
import { submitAction } from './actions';


const createProcessEditor = (onUpdate, props) => (<PostEditor onUpdate={onUpdate} {...props} />);
export class TehnologyPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      nameId: null,
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
      if (postId) {
        this.setState({
          nameId: postId,
        });
      }
    });
  }

  componentDidUpdate() {
    document.querySelector('#proucess_content tbody').onclick = (e) => {
      const cell = e.target;
      console.log(cell.tagName.toLowerCase());
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
    const { tehnology } = this.props;
    const eqData = tehnology.tehnologyData[this.state.idTable];
    console.log('eqData55555555', eqData);
    if (eqData) {
      try {
        return axios.put(`http://manufacture-service-api.dn-kronas.local/api/web/v1/technological-operation-order/${this.state.idEq}`,
          {
            // order_id: 1,
            technological_operation_id: +(this.state.cellValTd ? eqData.technological_operation_id[0].id : eqData.technological_operation_id_id),
            technological_operation_id_id: +eqData.technological_operation_id,
            number: +eqData.number,
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
  createCustomInsertButton = () => {
    return (<div>
      {/* <button
        className="add_position-button"
        onClick={this.toggleModalAddNew}
      > Добавить
      </button> */}
      <button
        className="position_delete"
        onClick={this.сustomDelete}
      ><i className="fa icon-trash"></i> Удалить
        </button>
      <Link to="/directory/process" ><button
        className="close_position-button"
      > Закрыть
      </button></Link>
      <button
        className="position_reload"
        onClick={this.reloadData}
      ><i className="fa icon-action-redo"></i>
      </button>
    </div>
    );
  }
  saveChangedData = () => {
    const { valuesForm } = this.props;
    const formData = valuesForm.TehnologyProcessForm.values;
    // const equData = this.props.tehnology.tehnologyData;
    // const eqData = equData[equData.length - 1].id;
    const tehnology = {
      // id: +eqData + 1,
      order_id: `${formData.order_id}`,
      technological_operation_id: `${this.state.nameId}`,
      // number: `${formData.number}`,
    };
    const { savedata } = this.props;
    return savedata(tehnology);
  }

  сustomDeleteButton = () => (<button
    className="del-butt-marg"
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
    const postId = row.technological_operation_id_id;
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
        return axios.delete(`http://manufacture-service-api.dn-kronas.local/api/web/v1/technological-operation-order/${row[0]}`);
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
      <div id="proucess_content">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              Технологический процесс
              {/* <ProcessInput /> */}
            </CardHeader>
            <CardBody>
              <TehnologyModal
                isOpen={this.state.showModal}
                toggleModal={this.toggleModalAddNew}
                saveChangedData={this.saveChangedData}
              />
              <BootstrapTable
                className="equipment-table"
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
                  width="4%"
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
                  width="0%"
                  dataField="id"
                >ID</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="order_id"
                  dataSort
                  // filter={{ type: 'TextFilter' }}
                >№ П/П
                </TableHeaderColumn>
                {this.state.cellValTd ? <TableHeaderColumn
                  dataField="technological_operation_id"
                  dataSort
                  filter={{ type: 'TextFilter' }}
                  customEditor={{ getElement: createProcessEditor }}
                >Группа операций
                </TableHeaderColumn> :
                  <TableHeaderColumn
                    dataField="technological_operation_id_id"
                    dataFormat={this.formaterPostId}
                    dataSort
                    filter={{ type: 'TextFilter' }}
                    customEditor={{ getElement: createProcessEditor }}
                  >Группа операций
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
  tehnology: PropTypes.object,
};

TehnologyModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  saveChangedData: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    savedata: (tehnology) => dispatch(submitAction(tehnology)),
  };
}

const mapStateToProps = createStructuredSelector({
  tehnology: makeSelectTehnology(),
  valuesForm: makeValuesTehnologyForm(),
});


const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'tehnology', reducer });
const withSaga = injectSaga({ key: 'tehnology', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TehnologyPage);
