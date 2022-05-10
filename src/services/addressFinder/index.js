import axios from 'axios';
import formatStringDash from '../formatString';

const findAddressUsingCep = cep => {
  const treatedCep = formatStringDash(cep);
  return axios.get(`https://viacep.com.br/ws/${treatedCep}/json`);
};

export default findAddressUsingCep;
