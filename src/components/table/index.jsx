import {
  Box,
  Container,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { ContactTable } from './contactTable';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Table = () => {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [displayList, setDisplayList] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [length, setLength] = useState(0);

  const removeContact = async id => {
    try {
      axios.delete(`http://localhost:3000/contacts/${id}`);
    } catch (error) {
      console.log(error);
    }

    contacts.splice(
      contacts.findIndex(contact => contact.id === id),
      1
    );
    setLength(contacts.length);
    setContacts([...contacts]);
    setDisplayList([...contacts]);
  };

  const searchByName = value => {
    const filteredList = contacts.filter(
      item => item.name.toUpperCase().search(value.toUpperCase()) > -1
    );
    setDisplayList(filteredList);
  };

  useEffect(() => {
    axios.get('http://localhost:3000/contacts').then(response => {
      setContacts(response.data);
      setLength(response.data.length);
      setLoaded(true);
    });
  }, []);

  return (
    <Container
      py={{
        base: '4',
        md: '8',
      }}
      px={{
        base: '0',
        md: 8,
      }}
    >
      <Box
        bg="bg-surface"
        boxShadow={{
          base: 'none',
          md: useColorModeValue('sm', 'sm-dark'),
        }}
        borderRadius={useBreakpointValue({
          base: 'none',
          md: 'lg',
        })}
      >
        <Stack spacing="5">
          <Box
            px={{
              base: '4',
              md: '6',
            }}
            pt="5"
          >
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              justify="space-between"
            >
              <Text fontSize="lg" fontWeight="medium">
                Contatos
              </Text>
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
                  onClick={() => navigate('/new-contact')}
                  variant="secondary"
                  alignSelf="start"
                >
                  Inserir contato novo
                </Button>
              </HStack>
              <InputGroup maxW="xs">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color="muted" boxSize="5" />
                </InputLeftElement>
                <Input
                  placeholder="Busca por nome"
                  onChange={e => searchByName(e.target.value)}
                />
              </InputGroup>
            </Stack>
          </Box>
          <Box overflowX="auto">
            <ContactTable
              contacts={displayList ? displayList : contacts}
              loaded={loaded}
              removeContact={removeContact}
            />
          </Box>
          <Box
            px={{
              base: '4',
              md: '6',
            }}
            pb="5"
          >
            <HStack spacing="3" justify="space-between">
              {!isMobile && (
                <Text color="muted" fontSize="sm">
                  Você possui {length} contatos em sua lista
                </Text>
              )}
            </HStack>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default Table;
