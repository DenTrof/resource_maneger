
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectTehnology } from '../selectors';


export class PostEditor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = { amount: props.defaultValue.amount, curr: props.defaultValue.curr };
  }
  focus() {
    this.refs.inputRef.focus();
  }
  updateData() {
    this.props.onUpdate({ amount: this.state.amount, curr: this.state.curr });
  }
  render() {
    const { tehnology } = this.props;
    const data = tehnology.operationData;

    return (
      <span>
        <select
          ref='inputRef'
          className="form-control editor edit-select"
          value={this.state.curr}
          onKeyDown={this.props.onKeyDown}
          onChange={(ev) => { this.setState({ curr: ev.currentTarget.value }); }} >
          {data.map((item) => (<option key={item.id} value={item.id}>{item.name}</option>))}
        </select>
      </span>
    );
  }
}

PostEditor.propTypes = {
  // valuesForm: PropTypes.object,
  // savedata: PropTypes.func,
  tehnology: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  tehnology: makeSelectTehnology(),
});


const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(PostEditor);
