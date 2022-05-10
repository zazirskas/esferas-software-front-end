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
  IconButton,
  FormErrorMessage,
} from '@chakra-ui/react';
import { validate } from 'gerador-validador-cpf';
import { useNavigate } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import InputMask from 'react-input-mask';
import { useEffect, useState } from 'react';
import findAddressUsingCep from '../../services/addressFinder';

export const Form = () => {
  const navigate = useNavigate();

  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [email, setEmail] = useState(null);
  const [telephone, setTelephone] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [number, setNumber] = useState(null);
  const [complement, setComplement] = useState(null);
  const [area, setArea] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [invalidName, setInvalidName] = useState(false);
  const [invalidSurname, setInvalidSurname] = useState(false);
  const [invalidCpf, setInvalidCpf] = useState(false);
  const [invalidTelephone, setInvalidTelephone] = useState(false);
  const [invalidCep, setInvalidCep] = useState(false);

  const validateAndSend = fields => {
    const {
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
    } = fields;
  };

  useEffect(() => {
    if (cep.length === 9) {
      findAddressUsingCep(cep)
        .then(response => {
          const { logradouro, bairro, localidade, uf, erro } = response.data;
          if (erro) {
            setInvalidCep(true);
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
          <FormControl isInvalid={invalidCpf ? true : false} id="cpf">
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
          <FormControl id="email">
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
              <IconButton aria-label="Add to friends" icon={<AddIcon />} />
              <Input
                onChange={e => setEmail(e.target.value)}
                type="email"
                maxW={{
                  md: '3xl',
                }}
              />
            </Stack>
            <VStack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '3',
              }}
              align="flex-end"
              justify="space-evenly"
              marginTop={3}
            >
              <Input
                onChange={e => setEmail(e.target.value)}
                type="email"
                maxW={{
                  md: '3xl',
                }}
              />
            </VStack>
          </FormControl>
          <FormControl isRequired isInvalid={invalidTelephone} id="telephone">
            <FormErrorMessage>Telefone inválido</FormErrorMessage>
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
              <IconButton aria-label="Add to friends" icon={<AddIcon />} />
              <Input
                onChange={e => setTelephone(e.target.value)}
                as={InputMask}
                mask={
                  telephone.length === 14 ? '(99)99999-9999' : '(99)9999-99999'
                }
                maskChar={null}
                placeholder="DDD + Telefone"
                type="tel"
                maxW={{
                  md: '3xl',
                }}
              />
            </Stack>
            <VStack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '3',
              }}
              align="flex-end"
              justify="space-evenly"
              marginTop={3}
            >
              <Input
                onChange={e => setTelephone(e.target.value)}
                type="tel"
                maxW={{
                  md: '3xl',
                }}
              />
            </VStack>
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
            isInvalid={number === '' ? true : false}
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
            <Button variant="primary">Adicionar</Button>
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
};
