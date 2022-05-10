import axios from 'axios';

const findAddressUsingCep = cep => {
  const stringArray = cep.split('');
  const removeIndex = stringArray.indexOf('-');
  stringArray.splice(removeIndex, 1);
  const treatedCep = stringArray.join('');
  return axios.get(`https://viacep.com.br/ws/${treatedCep}/json`);
};

export default findAddressUsingCep;
