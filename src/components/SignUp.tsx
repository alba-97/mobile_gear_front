import { useNavigate } from "react-router-dom";

import useInput from "../hooks/useInput";
import { registerUser } from "../state/user/userActions";
import { Link } from "react-router-dom";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  ButtonGroup,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";

export const SignUp = () => {
  const navigate = useNavigate();
  const username = useInput();
  const email = useInput();
  const password = useInput();

  const dispatch = useDispatch();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser(username.value, email.value, password.value)(dispatch);
    navigate("/login");
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
      <form onSubmit={handleRegister}>
        <Stack spacing={6}>
          <FormControl isRequired>
            <FormLabel>UserName</FormLabel>
            <Input {...username} placeholder="UserName" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input {...email} placeholder="Email" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input {...password} type="password" placeholder="Password" />
          </FormControl>
          <ButtonGroup gap="2">
            <Button
              type="submit"
              backgroundColor="#3498DB"
              size="lg"
              fontSize="md"
              color="white"
            >
              Sign Up
            </Button>
            <Button
              type="button"
              color="gray"
              size="lg"
              fontSize="md"
              variant="ghost"
              as={Link}
              to="/"
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Stack>
      </form>
    </Box>
  );
};
