import { Link } from "react-router-dom";
import { loginUser } from "../state/user/userActions";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { Box, Stack, Button, useColorModeValue } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Form, Formik, FormikHelpers } from "formik";
import LoginSchema from "@/schemas/LoginSchema";
import { LoginForm } from "@/interfaces/User";
import Field from "./Input/Field";
import { AxiosError } from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (
    values: LoginForm,
    { setSubmitting }: FormikHelpers<LoginForm>
  ) => {
    try {
      await loginUser(values.email, values.password)(dispatch);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      <Form>
        <Toaster position="top-center" />
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
            <Field value="email" label="Email" type="text" isRequired />
            <Field
              value="password"
              label="Password"
              type="password"
              isRequired
            />

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
        </Box>
      </Form>
    </Formik>
  );
};
