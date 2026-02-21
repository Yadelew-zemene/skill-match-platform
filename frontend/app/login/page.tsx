"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { loginUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";



export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    const { token, user } = await loginUser(email, password);
    login(token, user);

    toast.success("Login successful");

    // Role-based redirect
    if (user.role === "candidate") {
      router.push("/candidate/dashboard");
    } else if (user.role === "employer") {
      router.push("/employer/dashboard");
    } else {
      toast.error("Unknown role");
    }
  } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
