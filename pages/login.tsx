import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Input } from "semantic-ui-react";
import Swal from "sweetalert2";
import { LoginWrapper, LoginForm } from "../presentationals/login";
import { useAuth } from "../context/AuthContext";
import Head from "next/head";

const Login: NextPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    setLoading(true);
    //@ts-ignore
    const email = event.target.email.value;
    //@ts-ignore
    const password = event.target.password.value;
    setTimeout(async () => {
      try {
        await login(email, password);
        router.push("/");
      } catch (error) {
        Swal.fire(
          "Invalid email / password",
          "Please check your email/password entered.",
          "error"
        );
      }
      setLoading(false);
    }, 1000);
  };
  return (
    <>
      <Head>
        <title>Test - Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <LoginWrapper>
        <h2>Test Project Login</h2>
        <LoginForm autoComplete="off" onSubmit={handleLogin}>
          <Input placeholder="Email" type="email" name="email" required />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            required
          />
          <Button primary loading={loading} type="submit" disabled={loading}>
            Login
          </Button>
        </LoginForm>
        <span>
          No account yet? Click <Link href="/register">here</Link> to register
        </span>
      </LoginWrapper>
    </>
  );
};

export default Login;
