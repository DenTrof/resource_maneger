import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectManufacturePage } from 'containers/ManufacturePage/selectors';
import { changeDateRange } from 'containers/ManufacturePage/actions';

class DateRange extends Component {
  handleDayClick = (day) => {
    const { changeDateRange, dateRange } = this.props;
    console.log('day',dateRange);
    changeDateRange(DateUtils.addDayToRange(day, dateRange.dateRange));
        // console.log({changeDateRange, dateRange});
  }

  handleResetClick = (e) => {
    e.preventDefault();
    this.props.changeDateRange({
      from: null,
      to: null,
    });
  }

  render() {
    const { from, to } = this.props.dateRange.dateRange;
        // console.log( this.props.dateRange );
    const selectedRange = from && to && `${from.toDateString()} - ${to.toDateString()}`;
        // console.log(selectedRange);
    return (
      <div className="date-range">
        <DayPicker
          ref="daypicker"
          selectedDays={(day) => DateUtils.isDayInRange(day, { from, to })}
          onDayClick={this.handleDayClick}
                />
        <div>
          <strong>{selectedRange} &nbsp; <a href="." onClick={this.handleResetClick}>Reset</a></strong>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dateRange: makeSelectManufacturePage(),
});

export default connect(mapStateToProps, { changeDateRange })(DateRange);
