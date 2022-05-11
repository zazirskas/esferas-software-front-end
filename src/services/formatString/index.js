const formatStringDash = (string) => {
  const stringArray = string.split('');
  const removeIndex = stringArray.indexOf('-');
  stringArray.splice(removeIndex, 1);
  if (stringArray.indexOf('_') >= 0) {
    stringArray.splice(stringArray.indexOf('_'), 1);
  }
  const treatedString = stringArray.join('');

  return treatedString;
}

export default formatStringDash;