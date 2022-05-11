import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  HStack,
  VStack,
  StackDivider,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react';
import formatStringDash from '../../services/formatString';
import { validate } from 'gerador-validador-cpf';
import { useNavigate, useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { useEffect, useState } from 'react';
import findAddressUsingCep from '../../services/addressFinder';
import { contactValidationSchema } from '../../model/validation/contactValidation';
import axios from 'axios';

export const Form = props => {
  const params = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [cpf, setCpf] = useState(null);
  const [email, setEmail] = useState(null);
  const [telephone, setTelephone] = useState(' ');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState();
  const [complement, setComplement] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [invalidName, setInvalidName] = useState(false);
  const [invalidSurname, setInvalidSurname] = useState(false);
  const [invalidCpf, setInvalidCpf] = useState(false);
  const [invalidTelephone, setInvalidTelephone] = useState(false);
  const [invalidCep, setInvalidCep] = useState(false);
  const [invalidNumber, setInvalidNumber] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [sentContact, setSentContact] = useState(false);
  const [mask, setMask] = useState('(99)99999-9999');

  const validateAndSend = async contact => {
    setSentContact(false);
    setInvalidCpf(false);
    setInvalidName(false);
    setInvalidSurname(false);
    setInvalidNumber(false);
    setInvalidEmail(false);
    setInvalidTelephone(false);

    await contactValidationSchema
      .validate(contact, { abortEarly: false })
      .catch(err => {
        const failedValidationField = err.errors[0];
        console.log(failedValidationField);
        if (failedValidationField === 'name') {
          setInvalidName(true);
        } else if (failedValidationField === 'surname') {
          setInvalidSurname(true);
        } else if (failedValidationField === 'telephone') {
          setInvalidTelephone(true);
        } else if (failedValidationField === 'number') {
          setInvalidNumber(true);
        } else if (failedValidationField === 'cep') {
          setInvalidCep(true);
        } else if (failedValidationField === 'email') {
          setInvalidEmail(true);
        }
      });

    if (telephone.includes('_')) {
      setInvalidTelephone(true);
    }
    const validation = await contactValidationSchema.isValid(contact);

    if (cpf && !validate(cpf)) {
      setInvalidCpf(true);
    } else {
      setInvalidCpf(false);
    }

    if (
      (validation && validate(cpf) && !telephone.includes('_')) ||
      ((cpf === null || cpf === '') && validation && !telephone.includes('_'))
    ) {
      if (props.method === 'post') {
        await axios.post('http://localhost:3000/contacts', {
          name: name,
          surname: surname,
          cpf: cpf,
          email: email,
          telephone: telephone,
          cep: cep,
          address: address,
          number: number,
          complement: complement,
          area: area,
          city: city,
          state: state,
        });
        setSentContact(true);
        setName();
        setSurname();
        setCpf(null);
        setEmail(null);
        setTelephone(' ');
        setCep('');
        setAddress('');
        setNumber();
        setComplement('');
        setArea('');
        setCity('');
        setState('');
        navigate('/contacts');
      } else if (props.method === 'put') {
        console.log(telephone.includes('_'));
        await axios.put(`http://localhost:3000/contacts/${params.id}`, {
          name: name,
          surname: surname,
          cpf: cpf,
          email: email,
          telephone: telephone,
          cep: cep,
          address: address,
          number: number,
          complement: complement,
          area: area,
          city: city,
          state: state,
        });

        navigate('/contacts');
      }
    }
  };

  useEffect(() => {
    if (cep.length === 9) {
      findAddressUsingCep(cep)
        .then(response => {
          const { logradouro, bairro, localidade, uf, erro } = response.data;
          if (erro === 'true') {
            console.log(response.data);
            setInvalidCep(true);
            setAddress('');
            setArea('');
            setCity('');
            setState('');
          } else {
            setInvalidCep(false);
            setAddress(logradouro);
            setArea(bairro);
            setCity(localidade);
            setState(uf);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [cep]);

  useEffect(() => {
    if (props.method === 'put') {
      axios
        .get(`http://localhost:3000/contacts/${params.id}`)
        .then(response => {
          setName(response.data[0].name);
          setSurname(response.data[0].surname);
          setCpf(response.data[0].cpf);
          setEmail(response.data[0].email);
          setTelephone(response.data[0].telephone);
          setCep(response.data[0].cep);
          setAddress(response.data[0].address);
          setNumber(response.data[0].number);
          setComplement(response.data[0].complement);
          setArea(response.data[0].area);
          setCity(response.data[0].city);
          setState(response.data[0].state);
          if (response.data[0].telephone.length === 12)
            setMask('(99)9999-9999');
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(telephone.length);

  return (
    <Container
      py={{
        base: '4',
        md: '8',
      }}
    >
      <Stack spacing="5">
        <Stack
          spacing="4"
          direction={{
            base: 'column',
            sm: 'row',
          }}
          justify="space-between"
        >
          <Box>
            <VStack justify="center" align="flex-start">
              <Text fontSize="lg" fontWeight="medium" textAlign="left">
                {props.title}
              </Text>
              <Text color="muted" fontSize="sm" textAlign="left">
                {props.subtitle}
              </Text>
            </VStack>
          </Box>
          <HStack
            wrap="wrap"
            justifyContent="center"
            alignContent="space-around"
            height={100}
          >
            <Button
              onClick={() => navigate('/')}
              variant="primary"
              alignSelf="start"
            >
              Voltar ao início
            </Button>
            <Button
              onClick={() => navigate('/contacts')}
              variant="secondary"
              alignSelf="start"
            >
              Ver todos os contatos
            </Button>
          </HStack>
        </Stack>
        <Divider />
        <Stack spacing="5" divider={<StackDivider />}>
          <FormControl
            isRequired
            isInvalid={name === '' || invalidName ? true : false}
            id="name"
          >
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">Nome</FormLabel>
              <FormErrorMessage>Nome inválido</FormErrorMessage>
              <Input
                value={props.method === 'put' ? name : undefined}
                onChange={e => setName(e.target.value)}
                maxW={{
                  md: '3xl',
                }}
              />
            </Stack>
          </FormControl>
          <FormControl
            isInvalid={surname === '' || invalidSurname ? true : false}
            isRequired
            id="surname"
          >
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">Sobrenome</FormLabel>
              <FormErrorMessage>Sobrenome inválido</FormErrorMessage>
              <Input
                value={props.method === 'put' ? surname : undefined}
                onChange={e => setSurname(e.target.value)}
                maxW={{
                  md: '3xl',
                }}
              />
            </Stack>
          </FormControl>
          <FormControl isInvalid={invalidCpf} id="cpf">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">CPF</FormLabel>
              <FormErrorMessage>CPF Inválido!</FormErrorMessage>
              <Input
                value={props.method === 'put' ? cpf : undefined}
                onChange={e => setCpf(e.target.value)}
                type="inline"
                as={InputMask}
                mask="999.999.999-99"
                maxW={{
                  md: '3xl',
                }}
              />
            </Stack>
          </FormControl>
          <FormControl isInvalid={invalidEmail} id="email">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">Email</FormLabel>
              <FormErrorMessage>Email inválido!</FormErrorMessage>
              <Input
                value={props.method === 'put' ? email : undefined}
                onChange={e => setEmail(e.target.value)}
                type="email"
                maxW={{
                  md: '3xl',
                }}
              />
            </Stack>
          </FormControl>
          <FormControl isRequired isInvalid={invalidTelephone} id="telephone">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">Telefone</FormLabel>
              <FormErrorMessage>Telefone inválido</FormErrorMessage>
              <Input
                value={telephone}
                onChange={e => setTelephone(formatStringDash(e.target.value))}
                onFocus={e => setMask('(99)99999-9999')}
                onBlur={e =>
                  telephone.length === 12
                    ? setMask('(99)9999-9999')
                    : setMask('(99)99999-9999')
                }
                as={InputMask}
                mask={mask}
                placeholder="DDD + Telefone"
                type="tel"
                maxW={{
                  md: '3xl',
                }}
              />
            </Stack>
          </FormControl>
          <FormControl isRequired isInvalid={invalidCep} id="cep">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">CEP</FormLabel>
              <FormErrorMessage>CEP Inválido!</FormErrorMessage>
              <Input
                value={props.method === 'put' ? cep : undefined}
                as={InputMask}
                mask="99999-999"
                maskChar={null}
                onChange={e => setCep(e.target.value)}
                maxW={{
                  md: '3xl',
                }}
              />
            </Stack>
          </FormControl>
          <FormControl isRequired id="address">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">Endereço</FormLabel>
              <Input
                value={address}
                readOnly
                isDisabled
                maxW={{
                  md: '3xl',
                }}
              />
            </Stack>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={number === '' || invalidNumber ? true : false}
            id="number"
          >
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">Número</FormLabel>
              <FormErrorMessage>Número inválido</FormErrorMessage>
              <Input
                value={props.method === 'put' ? number : undefined}
                type={'text'}
                onChange={e => setNumber(e.target.value)}
                maxW={{
                  md: '3xl',
                }}
              />
            </Stack>
          </FormControl>
          <FormControl id="complement">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">Complemento</FormLabel>
              <Input
                value={props.method === 'put' ? complement : undefined}
                onChange={e => setComplement(e.target.value)}
                maxW={{
                  md: '3xl',
                }}
              />
            </Stack>
          </FormControl>
          <FormControl isRequired id="area">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">Bairro</FormLabel>
              <Input
                value={area}
                readOnly
                isDisabled
                maxW={{
                  md: '3xl',
                }}
              />
            </Stack>
          </FormControl>
          <FormControl isRequired id="city">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">Cidade</FormLabel>
              <Input
                value={city}
                readOnly
                isDisabled
                maxW={{
                  md: '3xl',
                }}
              />
            </Stack>
          </FormControl>
          <FormControl isRequired id="state">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">Estado</FormLabel>
              <Input
                value={state}
                readOnly
                isDisabled
                maxW={{
                  md: '3xl',
                }}
              />
            </Stack>
          </FormControl>
          {sentContact && (
            <Text color="green.400">Contato adicionado com sucesso!</Text>
          )}
          <Flex direction="row-reverse">
            <Button
              onClick={() =>
                validateAndSend({
                  name,
                  surname,
                  cpf,
                  email,
                  telephone,
                  cep,
                  address,
                  number,
                  complement,
                  area,
                  city,
                  state,
                })
              }
              variant="primary"
            >
              {props.action}
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
};
