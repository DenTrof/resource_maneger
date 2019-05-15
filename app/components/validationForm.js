

export default function validate(value, itemName = 'FormCTRs') {
  const nameId = [];
  Array.from(document.getElementsByClassName(itemName)).forEach((item) =>
    nameId.push(item.name));

  const errors = {};
  const isError = false;


  for (let i = 0; i < nameId.length; i++) {
    if (!value[nameId[i]]) {
      errors[nameId[i]] = 'Requared';
    } else if (isNaN(Number(value[nameId[i]]))) {
      errors[nameId[i]] = 'Only number';
    }
  }

  return errors;
}
