import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { type RegisterData } from "@/apis/auth";
import { useAuthStore } from "@/stores/authStore";

import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { useMessage } from "../../hooks/useMessage";

function Register() {
  const { register } = useAuthStore();
  const navigate = useNavigate();
  const { success, error } = useMessage();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data: RegisterData = {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      try {
        await register(data);
        success("Registration successful!");
        navigate("/login");
      } catch (err) {
        error(err instanceof Error ? err.message : "Registration failed");
      }
    },
    [success, error, navigate],
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Username"
          name="username"
          required
          placeholder="Enter your username"
        />

        <Input
          label="Email"
          name="email"
          type="email"
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

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          required
          placeholder="Confirm your password"
        />

        <Button type="submit" variant="primary" fullWidth>
          Register
        </Button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </Card>
  );
}

export default Register;
