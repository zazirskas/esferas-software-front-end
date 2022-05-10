const formatStringDash = (string) => {
  const stringArray = string.split('');
  const removeIndex = stringArray.indexOf('-');
  stringArray.splice(removeIndex, 1);
  const treatedString = stringArray.join('');

  return treatedString;
}

export default formatStringDash;