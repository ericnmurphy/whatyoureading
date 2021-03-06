import React, { useState, useContext } from "react";
import Router from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import app from "../components/firebase";
import { AuthContext } from "../components/auth";
import {
  Container,
  Form,
  Label,
  Input,
  Error,
  Button,
  Loading
} from "../components/design";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async ({ email, password }) => {
    setLoading(true);

    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      Router.push("/");
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const { user, userLoading } = useContext(AuthContext);

  if (user) {
    Router.push("/");
  }

  return user !== null ? (
    <Loading page />
  ) : (
    <Container>
      <h1>Log In</h1>
      <p>
        Welcome back! If you don't have an account yet, you can{" "}
        <Link href="/signup">
          <a>sign up</a>
        </Link>
        .
      </p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Email</Label>
        <Input
          name="email"
          type="email"
          ref={register({ required: true })}
          error={errors.email}
        />
        {errors.email && <Error>Email is required.</Error>}
        <Label>Password</Label>
        <Input
          name="password"
          type="password"
          ref={register({ required: true })}
          error={errors.password}
        />
        {errors.password && <Error>Password is required.</Error>}
        <Button type="submit" disabled={loading}>
          {!loading ? "Log In" : <Loading />}
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
