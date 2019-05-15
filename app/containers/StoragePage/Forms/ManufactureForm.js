
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DropdownList from 'react-widgets/lib/DropdownList';
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';


// moment.locale('fr', {
//   months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декбрь'.split('_'),
//   monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
//   monthsParseExact: true,
//   weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
//   weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
//   weekdaysMin: 'Вс_Сб_Пт_Чт_Ср_Вт_Пн'.split('_'),
//   weekdaysParseExact: true,
//   longDateFormat: {
//     LT: 'HH:mm',
//     LTS: 'HH:mm:ss',
//     L: 'DD/MM/YYYY',
//     LL: 'D MMMM YYYY',
//     LLL: 'D MMMM YYYY HH:mm',
//     LLLL: 'dddd D MMMM YYYY HH:mm',
//   },
//   calendar: {
//     sameDay: '[Aujourd’hui à] LT',
//     nextDay: '[Demain à] LT',
//     nextWeek: 'dddd [à] LT',
//     lastDay: '[Hier à] LT',
//     lastWeek: 'dddd [dernier à] LT',
//     sameElse: 'L',
//   },
//   relativeTime: {
//     future: 'dans %s',
//     past: 'il y a %s',
//     s: 'quelques secondes',
//     m: 'une minute',
//     mm: '%d minutes',
//     h: 'une heure',
//     hh: '%d heures',
//     d: 'un jour',
//     dd: '%d jours',
//     M: 'un mois',
//     MM: '%d mois',
//     y: 'un an',
//     yy: '%d ans',
//   },
//   dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
//   ordinal(number) {
//     return number + (number === 1 ? 'er' : 'e');
//   },
//   meridiemParse: /PD|MD/,
//   isPM(input) {
//     return input.charAt(0) === 'M';
//   },
//   meridiem(hours, minutes, isLower) {
//     return hours < 12 ? 'PD' : 'MD';
//   },
//   week: {
//     dow: 1, // Monday is the first day of the week.
//     doy: 4,  // Used to determine first week of the year.
//   },
// });

// momentLocalizer(moment);

const required = (value) => (value ? undefined : 'Поле обязательное для заполнения');

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <input className="form_modal" {...input} placeholder={label} type={type} />
    <div style={{ fontWeight: 'bold', color: 'red' }}>{touched &&
      ((error && <span>&nbsp;&nbsp;{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const renderDropdownList = ({ input, data, valueField, textField }) => (
  <DropdownList
    {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onBlur={() => input.onBlur()}
  />
);

const renderDateTimePicker = ({ input: { onChange, value }, showTime,}) =>
  (<DateTimePicker
    onChange={onChange}
    format="DD-MM-YYYY  HH : mm"
    time={false}
    {...this.props}
    culture="ru"
  />);


class ManufactureForm extends React.Component {

  // ------------- Form id  --------------------------------
  componentDidMount() {
    const { fomId } = this.props; // autogenerating key
    this.handleInitialize(fomId);
  }

  handleInitialize(fomId) {
    const initData = {};
    initData.id = fomId;
    this.props.initialize(initData);
  }


  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const mastersData = ['Ожидает', 'Укомплектован', 'Планирование', 'Запланирован',
      'Вработе', 'Готов', 'Доставка', 'Выдан', 'Производство', 'Комплектация'];

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="id"
            component={renderField}
            type="hidden"
          />
        </div>
        <div >
          <label>Статус</label>
          <Field
            name="status"
            component={renderDropdownList}
            type="input"
            data={mastersData}
            validate={[required]}
          />
        </div>
        <div className="dateTime" >
          <label>Дата: ( Производство/Комплектация )</label>
          <Field
            name="dateStatus"
            showTime
            component={renderDateTimePicker}
            validate={[required]}
          />
        </div>
        <div>
          <button
            style={{ marginLeft: '51%' }}
            color="primary"
            disabled={pristine || submitting}
            type="submit"
          >
            <i className="fa fa-paper-plane" /> Отправить
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            <i className="fa fa-refresh" />&nbsp;&nbsp; Очистить
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'ManufactureStorValues',
})(ManufactureForm);
