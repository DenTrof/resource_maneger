import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
// import Multiselect from 'react-widgets/lib/Multiselect';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DropdownList from 'react-widgets/lib/DropdownList';

const v4 = require('uuid/v4');


moment.locale('ru', {
  months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декбрь'.split('_'),
  monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
  monthsParseExact: true,
  weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
  weekdaysMin: 'Вс_Сб_Пт_Чт_Ср_Вт_Пн'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[Aujourd’hui à] LT',
    nextDay: '[Demain à] LT',
    nextWeek: 'dddd [à] LT',
    lastDay: '[Hier à] LT',
    lastWeek: 'dddd [dernier à] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'dans %s',
    past: 'il y a %s',
    s: 'quelques secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'un an',
    yy: '%d ans',
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
  ordinal(number) {
    return number + (number === 1 ? 'er' : 'e');
  },
  meridiemParse: /PD|MD/,
  isPM(input) {
    return input.charAt(0) === 'M';
  },

  meridiem(hours) {
    return hours < 12 ? 'PD' : 'MD';
  },
  week: {
    dow: 1,
    doy: 4,
  },
});

momentLocalizer(moment);

const required = (value) => (value ? undefined : 'Поле обязательноу для заполнения');
// const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <input className="form_modal" {...input} placeholder={label} type={type} />
    <div style={{ fontWeight: 'bold', color: 'red' }}>{touched &&
      ((error && <span>&nbsp;&nbsp;{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

// const renderMultiselect = ({ input, data, valueField, textField }) => (
//   <Multiselect
//     style={{ border: '0' }}
//     {...input}
//     onBlur={() => input.onBlur()}
//     value={input.value || []} // requires value to be an array
//     data={data}
//     valueField={valueField}
//     textField={textField}
//   />
// );

const renderDropdownList = ({ input, data, valueField, textField }) => (
  <DropdownList
    {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onBlur={() => input.onBlur()}
  />
);

const renderDateTimePicker = ({ input: { onChange } }) => (<DateTimePicker
  onChange={onChange}
  format="DD-MM-YYYY  HH : mm"
  time={false}
  {...this.props}
  culture="ru"
/>);

const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        <b>+ Добавить</b>
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        > <i style={{ color: 'red' }} className="fa icon-trash"></i></button>
        <span> Наименование {index + 1}</span>
        <Field
          name={`${member}.firstName`}
          type="text"
          component={renderField}
          label="Введите наименование для поиска"
        />
      </li>
    ))}
  </ul>
);


class StorageValuesForm extends React.Component {

  // logiс for data in form Id input ( permanent view in input) --------------------------------
  componentDidMount() {
    const id = `${v4().split('-')[0]}`; // autogenerating key
    this.handleInitialize(id);
  }

  handleInitialize(id) {
    const initData = {};
    initData.id = id;
    this.props.initialize(initData);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const mastersData = ['Киев, пер. Куреневский, 17', 'Киев, проспект Академика Королёва, 1',
      'Одесса, ул. Дальницкая, 39', 'Одесса, ул. Николаевская дорога, 138',
      'Запорожье, пр. Маяковского, 11', 'Мариуполь, ул. Макара Мазая, 10 ',
      'Краматорск, ул. Тихого (Орджоникидзе), 1а ', 'Житомир, ул. Якова Зайка (Бугайченко), 7'];
    const fiflialData = ['Киев, пер. Куреневский, 17', 'Киев, проспект Академика Королёва, 1',
      'Одесса, ул. Дальницкая, 39', 'Одесса, ул. Николаевская дорога, 138',
      'Запорожье, пр. Маяковского, 11', 'Мариуполь, ул. Макара Мазая, 10 ',
      'Краматорск, ул. Тихого (Орджоникидзе), 1а ', 'Житомир, ул. Якова Зайка (Бугайченко), 7'];

    return (
      <form className="storag-form" onSubmit={handleSubmit}>
        <div>
          <Field
            name="id"
            component={renderField}
            type="hidden"
          />
        </div>
        <div className="dateTime" >
          <label>Дата Заказа</label>
          <Field
            name="date"
            showTime
            component={renderDateTimePicker}
          />
        </div>
        <div className="master_catecory">
          <label>Филиал (производство)</label>
          <Field
            name="filials"
            component={renderDropdownList}
            type="input"
            data={fiflialData}
            validate={[required]}
          />
        </div>
        <div className="dateTime master_catecory">
          <label>Номенклатура (наименование)</label>
          <Field
            name="account"
            type="input"
            component={renderField}
            validate={[required]}
            label="Введите наименование для поиска"
          />
          <Field
            name="amountAccount"
            type="input"
            component={renderField}
            validate={[required]}
            label="Введите кол-во единиц материала"
          />
        </div>
        <div>
          <label>Добавить номенклатуру </label>
          <div>
            <FieldArray
              name="accounts"
              component={renderMembers}
            />
          </div>
        </div>
        <div className="dateTime ">
          <label>Порезка</label>
          <Field
            onChange={this.handleChange}
            name="cut"
            showTime
            component={renderDateTimePicker}
          />
          <Field
            name="amountCut"
            type="input"
            component={renderField}
            validate={[required]}
            label="Кол-во"
          />
        </div>
        <div className="dateTime" >
          <label>Прямая Кромковка</label>
          <Field
            name="dirEdge"
            showTime
            component={renderDateTimePicker}
          />
          <Field
            name="amountDirEdge"
            type="input"
            component={renderField}
            validate={[required]}
            label="Кол-во"
          />
        </div>
        <div className="dateTime" >
          <label>Криволинейная Кромковка</label>
          <Field
            name="crEdge"
            showTime
            component={renderDateTimePicker}
          />
          <Field
            name="amountCrEdge"
            type="input"
            component={renderField}
            validate={[required]}
            label="Кол-во"
          />
        </div>
        <div className="dateTime" >
          <label>Отверстие</label>
          <Field
            name="hole"
            showTime
            component={renderDateTimePicker}
          />
          <Field
            name="amountHole"
            type="input"
            component={renderField}
            validate={[required]}
            label="Кол-во"
          />
        </div>
        <div className="dateTime" >
          <label>Фрезеровка</label>
          <Field
            name="milling"
            showTime
            component={renderDateTimePicker}
          />
          <Field
            name="amountMilling"
            type="input"
            component={renderField}
            validate={[required]}
            label="Кол-во"
          />
        </div>
        <div className="dateTime" >
          <label>Упаковка</label>
          <Field
            name="pack"
            showTime
            component={renderDateTimePicker}
          />
          <Field
            name="amountPack"
            type="input"
            component={renderField}
            validate={[required]}
            label="Кол-во"
          />
        </div>
        <div className="master_catecory">
          <label>Филиал (менеджер)</label>
          <Field
            name="filialManager"
            component={renderDropdownList}
            type="input"
            data={fiflialData}
            validate={[required]}
          />
        </div>
        <div className="master_catecory">
          <label>Манеджер Ф.И.О </label>
          <Field
            name="managerName"
            component={renderDropdownList}
            type="input"
            data={mastersData}
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
            <i className="fa fa-paper-plane" /> Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            <i className="fa fa-refresh" />&nbsp;&nbsp;Clear Values</button>
        </div>
      </form >
    );
  }
}
StorageValuesForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  id: PropTypes.string,
  initialize: PropTypes.func,
};
export default reduxForm({
  form: 'StoragFormValues',
})(StorageValuesForm);
