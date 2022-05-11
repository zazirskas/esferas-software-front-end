import {
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const ContactTable = props => {
  const navigate = useNavigate();

  const { contacts, removeContact } = props;

  return (
    <Skeleton isLoaded={props.loaded}>
      <Table {...props}>
        <Thead>
          <Tr>
            <Th>
              <HStack spacing="3">
                <Checkbox />
                <HStack spacing="1">
                  <Text>Nome</Text>
                  <Icon as={''} color="muted" boxSize="4" />
                </HStack>
              </HStack>
            </Th>
            <Th>Sobrenome</Th>
            <Th>Telefone</Th>
            <Th>Email</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {contacts.map(contact => (
            <Tr key={contact.id}>
              <Td>
                <HStack spacing="3">
                  <Checkbox />
                  <Box>
                    <Text fontWeight="medium">{contact.name}</Text>
                    <Text color="muted">{contact.handle}</Text>
                  </Box>
                </HStack>
              </Td>
              <Td>
                <Text>{contact.surname}</Text>
              </Td>
              <Td>
                <Text color="muted">{contact.telephone}</Text>
              </Td>
              <Td>
                <Text color="muted">{contact.email}</Text>
              </Td>
              <Td>
                <Text color="muted"></Text>
              </Td>
              <Td>
                <HStack spacing="1">
                  <IconButton
                    icon={<FiTrash2 fontSize="1.25rem" />}
                    variant="ghost"
                    aria-label="Delete contact"
                    onClick={() => removeContact(contact.id)}
                  />
                  <IconButton
                    icon={<FiEdit2 fontSize="1.25rem" />}
                    variant="ghost"
                    aria-label="Edit member"
                    onClick={() => navigate(`/edit/${contact.id}`)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Skeleton>
  );
};
