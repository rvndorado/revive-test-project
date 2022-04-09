import React, { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Input } from "semantic-ui-react";
import Swal from "sweetalert2";
import axios from "axios";
import { RegisterWrapper, RegisterForm } from "../presentationals/register";
import { validateRegistration } from "../common/validate";

const Register: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    //@ts-ignore
    const email = event.target.email.value;
    //@ts-ignore
    const password = event.target.password.value;
    //@ts-ignore
    const confirmPassword = event.target.confirmPassword.value;

    const { error } = validateRegistration(email, password, confirmPassword);
    if (error) {
      let errorMessage: string[] = [];
      error.details.forEach((details) => {
        errorMessage.push(details.message);
      });
      Swal.fire("Validation Error", errorMessage.join("\n"), "error");
    } else {
      setLoading(true);
      setTimeout(async () => {
        try {
          await axios.post("/api/access/register", {
            email,
            password,
            confirmPassword,
          });
          Swal.fire(
            "Success",
            "You are now registered, you may now login.",
            "success"
          );
        } catch (error: any) {
          Swal.fire(
            "Something went wrong",
            error.response.data.message,
            "error"
          );
        }
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <RegisterWrapper>
        <h2>Test Project Register</h2>
        <RegisterForm autoComplete="off" onSubmit={handleSubmit}>
          <Input placeholder="Email" type="email" name="email" required />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            required
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            required
          />
          <Button primary type="submit" loading={loading} disabled={loading}>
            Register
          </Button>
        </RegisterForm>
        <span>
          Already have an account? Click <Link href="/login">here</Link> to login
        </span>
      </RegisterWrapper>
    </>
  );
};

export default Register;
