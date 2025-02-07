import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { useMessage } from "../../hooks/useMessage";
import { useAuthStore } from "../../stores/authStore";
import type { LoginCredentials } from "../../types";

function Login() {
  const { login } = useAuthStore();
  const { success, error } = useMessage();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const credentials: LoginCredentials = {
        username: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      try {
        await login(credentials);
        success("Login successful!");
      } catch (err) {
        error(err instanceof Error ? err.message : "Login failed");
      }
    },
    [login, success, error],
  );

  return (
    <Card className="w-full max-w-md mx-auto my-40">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          name="email"
          required
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          name="password"
          type="password"
          required
          placeholder="Enter your password"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="primary" fullWidth>
          Log in
        </Button>

        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register now
          </Link>
        </div>
      </form>
    </Card>
  );
}

export default Login;
