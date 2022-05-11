import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom"

export const Hero = () => {

  const navigate = useNavigate();

  return (
    <Box as="section">
      <Box
        maxW="3xl"
        mx="auto"
        px={{ base: '6', lg: '8' }}
        py={{ base: '16', sm: '20' }}
        textAlign="center"
      >
        <Heading
          my="4"
          fontSize={{ base: '3xl', md: '5xl' }}
          fontWeight="extrabold"
          letterSpacing="tight"
          lineHeight="1.2"
        >
          Bem-vindo ao sistema de contatos da{' '}
          <Box
            as="mark"
            bg="unset"
            color={useColorModeValue('blue.600', 'blue.200')}
            whiteSpace="nowrap"
          >
            Esferas Software
          </Box>
        </Heading>
        <Text fontSize="lg" maxW="xl" mx="auto">
          Um sistema feito para você organizar os seus contatos da melhor
          maneira possível!
        </Text>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          mt="10"
          justify="center"
          spacing={{ base: '3', md: '5' }}
          maxW="md"
          mx="auto"
        >
          <Button
            as="a"
            size="lg"
            onClick={() => navigate('new-contact')}
            h="16"
            px="10"
            colorScheme="blue"
            fontWeight="bold"
            flex={{ md: '2' }}
          >
            Registrar um novo contato
          </Button>
          <Button
            as="a"
            flex={{ md: '1' }}
            variant="outline"
            onClick={() => navigate("contacts")}
            size="lg"
            h="16"
            px="10"
            fontWeight="bold"
          >
            Ver contatos
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
