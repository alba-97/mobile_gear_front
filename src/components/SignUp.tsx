import { useNavigate } from "react-router-dom";

import { registerUser } from "../state/user/userActions";
import { Link } from "react-router-dom";

import {
  Box,
  Stack,
  Button,
  useColorModeValue,
  ButtonGroup,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Form, Formik, FormikHelpers } from "formik";
import Field from "./Input/Field";
import { RegisterForm } from "@/interfaces/User";
import RegisterSchema from "@/schemas/RegisterSchema";

export const SignUp = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleRegister = async (
    values: RegisterForm,
    { setSubmitting }: FormikHelpers<RegisterForm>
  ) => {
    await registerUser(
      values.username,
      values.email,
      values.password
    )(dispatch);
    navigate("/login");
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        username: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={handleRegister}
    >
      <Form>
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
          <Stack spacing={6}>
            <Field value="username" label="Username" type="text" isRequired />
            <Field value="email" label="Email" type="text" isRequired />
            <Field
              value="password"
              label="Password"
              type="password"
              isRequired
            />

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
        </Box>
      </Form>
    </Formik>
  );
};
