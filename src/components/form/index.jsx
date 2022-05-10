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
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { useEffect, useState } from 'react';
import findAddressUsingCep from '../../services/addressFinder';
import { contactValidationSchema } from '../../model/validation/contactValidation';

export const Form = () => {
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

  const validateAndSend = async contact => {
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

    const validation = await contactValidationSchema.isValid(contact);

    if (
      (validation && validate(cpf)) ||
      ((cpf === null || cpf === '') && validation)
    ) {
      console.log('Contato adicionado com sucesso!');
      console.log(contact);
    } else {
      setInvalidCpf(true);
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

  useEffect(() => {}, [invalidCpf]);

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
                Novo contato
              </Text>
              <Text color="muted" fontSize="sm" textAlign="left">
                Insira as informações do novo contato
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
                onChange={e => setTelephone(formatStringDash(e.target.value))}
                as={InputMask}
                mask={
                  telephone.length === 13 ? '(99)99999-9999' : '(99)9999-99999'
                }
                maskChar={null}
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
              Adicionar
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
};
