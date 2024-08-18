"use client";
import { Button } from "@/components/ui/button";
import Input from "@/components/common/input";
import { Message, Lock } from "react-iconly";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Spinner from "@/components/common/spinner";
import { useRouter } from "next/navigation";
import useLogin from "@/queries/auth/useLogin";
import useSignUp from "@/queries/auth/useSignUp";

const LoginPage = () => {
  const router = useRouter();
  const { mutate: login, isPending: loadingLogin } = useLogin({
    onSuccess: () => {
      router.replace("/home");
    },
  });
  const { mutate: signUp, isPending: loadingSignUp } = useSignUp({
    onSuccess: () => setShowLogin(true),
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [showLogin, setShowLogin] = useState(true);

  const isLoading = loadingSignUp || loadingLogin;

  const handleSubmit = () => {
    // Handle form submission
    if (showLogin) {
      login({
        email: loginForm.email,
        password: loginForm.password,
      });
      return;
    }
    // Signup
    signUp(loginForm);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col h-dvh gap-10 p-6 justify-center relative">
      <header className="flex flex-col gap-4">
        <h1 className="text-5xl font-bold text-slate-700">
          {showLogin && (
            <>
              Welcome
              <br /> Back!
            </>
          )}
          {!showLogin && (
            <>
              Create
              <br /> Account
            </>
          )}
        </h1>
        <h2 className="text-slate-500">
          {showLogin && "Login to start using Finance Manager"}
          {!showLogin && "Sign up to start using Finance Manager"}
        </h2>
      </header>
      <div className="flex flex-col gap-5">
        {!showLogin && (
          <Input
            label="Username"
            placeholder="Enter your username"
            iconStart={<Message />}
            name="username"
            value={loginForm.username}
            onChange={handleChange}
          />
        )}
        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          iconStart={<Message />}
          name="email"
          value={loginForm.email}
          onChange={handleChange}
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          iconStart={<Lock />}
          type="password"
          name="password"
          value={loginForm.password}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading && <Spinner />}
          {showLogin && "Login"}
          {!showLogin && "Sign up"}
        </Button>
        {showLogin && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-full h-0.5 bg-slate-200" />
              <p className="text-slate-400">or</p>
              <div className="w-full h-0.5 bg-slate-200" />
            </div>
            <Button
              variant="outline"
              className="text-slate-600 border-slate-200 active:bg-slate-50"
            >
              <FcGoogle className="size-6" />
              Google
            </Button>
          </>
        )}
      </div>
      <p className="text-center text-slate-700 absolute bottom-10 left-0 w-screen">
        Don&apos;t have an account?{" "}
        <button
          className="text-blue-500 font-semibold focus:underline"
          onClick={() => setShowLogin(!showLogin)}
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
