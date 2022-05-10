import * as yup from 'yup';

export const contactValidationSchema = yup.object().shape({
  name: yup.string('name').required('name'),
  surname: yup.string('surname').required('surname'),
  cpf: yup.string().nullable(),
  email: yup.string().nullable().email('email'),
  telephone: yup.string().min(12, 'telephone').max(13),
  cep: yup.string().required('cep').min(9, 'cep'),
  address: yup.string().required('cep').nullable(),
  number: yup.string().required('number'),
  complement: yup.string().nullable(),
  area: yup.string().required('cep').nullable(),
  city: yup.string().required('cep').nullable(),
  state: yup.string().required('cep').nullable(),
});
