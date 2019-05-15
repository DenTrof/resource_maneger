import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import Multiselect from 'react-widgets/lib/Multiselect';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
// import moment from 'moment';
// import momentLocalizer from 'react-widgets-moment';
import DropdownList from 'react-widgets/lib/DropdownList';

// moment.locale('ru', {
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
//     dow: 1,
//     doy: 4,
//   },
// });

// momentLocalizer(moment);

const required = (value) => (value ? undefined : 'Поле обязательное для заполнения');
// const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <input className="form_modal" {...input} placeholder={label} type={type} />
    <div style={{ fontWeight: 'bold', color: 'red' }}>{touched &&
      ((error && <span>&nbsp;&nbsp;{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const renderMultiselect = ({ input, data, valueField, textField }) => (
  <Multiselect
    style={{ border: '0' }}
    {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
  />
);

const renderDropdownList = ({ input, label, data, valueField, textField }) => (
  <DropdownList
    {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onBlur={() => input.onBlur()}
  />
);

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) => {

  return <DateTimePicker
    onChange={onChange}
    format="DD-MM-YYYY  HH : mm"
    time={false}
    {...this.props}
    culture="ru"
  />;
};

class SponsorFormValuesForm extends React.Component {

  // ------------- Form id  --------------------------------
  componentDidMount() {
    const { id } = this.props; // autogenerating key
    this.handleInitialize(id);
  }

  handleInitialize(id) {
    const initData = {};
    initData.id = id;
    this.props.initialize(initData);
  }

  render() {
    const { fullName, handleSubmit, pristine, reset, submitting } = this.props;
    const changeData = ['Cмена №155 Brandt', 'Cмена №19 Brandt', 'Cмена №17 Brandt', 'Cмена №13 Brandt',
      'Cмена №14 Brandt', 'Cмена №18 Brandt'];
    const change = changeData.map((item) => <option value={`${item}`}>{item}</option>);

    return (
      <form classNane="complited" onSubmit={handleSubmit}>
        <div>
          <Field
            name="id"
            component={renderField}
            type="hidden"
          />
        </div>
        <div className="master_catecory">
          <label>Смена:</label>
        </div>
        <div className="master_catecory">
          <label>Оборудоваеие:</label>
        </div>
        <div className="master_catecory">
          <label>Фамилия И.О:</label>
        </div>
        <div className="dateTime">
          <label>Порезка</label>
          <Field name="cut" component="select">
            <option value="" disabled selected> Выберите Статус</option>
            <option value="Сделано"> Сделано</option>
            <option value="В работу"> В работу</option>
            <option value="Не включено в план"> Не включено в план</option>
          </Field>
          <Field
            name="dateCut"
            showTime
            component={renderDateTimePicker}
          />
          <Field name="changeCut" component="select" >
            <option value="" disabled selected> Выберите Смену</option>
            {change}
          </Field>
          <Field name="deviant" component="select">
            <option value="" disabled selected> Отклонения</option>
            <option value> Есть</option>
            <option value={false}> Нет</option>
          </Field>
        </div>
        <div className="dateTime" >
          <label>Прямая Кромковка</label>
          <Field name="dirEdge" component="select">
            <option value="" disabled selected> Выберите Статус</option>
            <option value="Сделано"> Сделано</option>
            <option value="В работу"> В работу</option>
            <option value="'Не включено в план"> Не включено в план</option>
          </Field>
          <Field
            name="dateDirEdge"
            showTime
            component={renderDateTimePicker}
          />
          <Field name="changeDirEdge" component="select" >
            <option value="" disabled selected> Выберите Смену</option>
            {change}
          </Field>
          <Field name="deviantDirEdge" component="select">
            <option value="" disabled selected> Отклонения</option>
            <option value> Есть</option>
            <option value={false}> Нет</option>
          </Field>
        </div>
        <div className="dateTime" >
          <label>Крив. Кромковка</label>
          <Field name="crEdge" component="select">
            <option value="" disabled selected> Выберите Статус</option>
            <option value="Сделано"> Сделано</option>
            <option value="В работу"> В работу</option>
            <option value="'Не включено в план"> Не включено в план</option>
          </Field>
          <Field
            name="dateCrEdge"
            showTime
            component={renderDateTimePicker}
          />
          <Field name="changeCrEdgee" component="select" >
            <option value="" disabled selected> Выберите Смену</option>
            {change}
          </Field>
          <Field name="deviantCrEdge" component="select">
            <option value="" disabled selected> Отклонения</option>
            <option value> Есть</option>
            <option value={false}> Нет</option>
          </Field>
        </div>
        <div className="dateTime" >
          <label>Отверстие</label>
          <Field name="hole" component="select">
            <option value="" disabled selected> Выберите Статус</option>
            <option value="Сделано"> Сделано</option>
            <option value="В работу"> В работу</option>
            <option value="'Не включено в план"> Не включено в план</option>
          </Field>
          <Field
            name="dateHole"
            showTime
            component={renderDateTimePicker}
          />
          <Field name="changeHole" component="select" >
            <option value="" disabled selected> Выберите Смену</option>
            {change}
          </Field>
          <Field name="deviantHole" component="select">
            <option value="" disabled selected> Отклонения</option>
            <option value> Есть</option>
            <option value={false}> Нет</option>
          </Field>
        </div>
        <div className="dateTime" >
          <label>Фрезеровка</label>
          <Field name="milling" component="select">
            <option value="" disabled selected> Выберите Статус</option>
            <option value="Сделано"> Сделано</option>
            <option value="В работу"> В работу</option>
            <option value="'Не включено в план"> Не включено в план</option>
          </Field>
          <Field
            name="dateMilling"
            showTime
            component={renderDateTimePicker}
          />
          <Field name="changeMilling" component="select" >
            <option value="" disabled selected> Выберите Смену</option>
            {change}
          </Field>
          <Field name="deviantMilling" component="select">
            <option value="" disabled selected> Отклонения</option>
            <option value> Есть</option>
            <option value={false}> Нет</option>
          </Field>
        </div>
        <div className="dateTime" >
          <label>Упаковка</label>
          <Field name="pack" component="select">
            <option value="" disabled selected> Выберите Статус</option>
            <option value="Сделано"> Сделано</option>
            <option value="В работу"> В работу</option>
            <option value="'Не включено в план"> Не включено в план</option>
          </Field>
          <Field
            name="datePack"
            showTime
            component={renderDateTimePicker}
          />
          <Field name="changePack" component="select" >
            <option value="" disabled selected> Выберите Смену</option>
            {change}
          </Field>
          <Field name="deviantPack" component="select">
            <option value="" disabled selected> Отклонения</option>
            <option value> Есть</option>
            <option value={false}> Нет</option>
          </Field>
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

export default reduxForm({
  form: 'MasterFormValues',
})(SponsorFormValuesForm);
