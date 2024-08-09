import { Link } from "react-router-dom";
import { loginUser } from "../state/user/userActions";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export const Login = () => {
  const email = useInput();
  const password = useInput();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email.value, password.value);
    navigate("/");
  };

  return (
    <Box
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg={useColorModeValue("white", "gray.700")}
      maxW="md"
      mx="auto"
      mt="10"
    >
      <form onSubmit={handleLogin}>
        <Stack spacing={6}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email" {...email} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Password" {...password} />
          </FormControl>
          <Button
            type="submit"
            backgroundColor="#3498DB"
            color="white"
            size="lg"
            fontSize="md"
          >
            Login
          </Button>
          <Button
            type="button"
            color="gray"
            size="xs"
            fontSize="md"
            variant="ghost"
            as={Link}
            to="/"
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
