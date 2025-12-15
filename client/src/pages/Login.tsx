import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../features/auth/graphql";
import { Lock, User, ArrowRight, Loader2 } from "lucide-react";

interface Props {
  onLoginSuccess: () => void;
}

export function Login({ onLoginSuccess }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      // 1. Save Token to LocalStorage
      localStorage.setItem("token", data.login.access_token);
      localStorage.setItem("role", data.login.user.role);

      // 2. Notify App component
      onLoginSuccess();
    },
    onError: (err) => {
      setErrorMsg(err.message || "Invalid credentials");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col md:flex-row">
        {/* Login Form */}
        <div className="w-full p-8 md:p-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tighter">
              ULTRASHIP
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Sign in to your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                {errorMsg}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="admin"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-gray-400">
            <p>Demo Credentials:</p>
            <p>
              Admin:{" "}
              <span className="font-mono text-gray-600">admin / admin123</span>
            </p>
            <p>
              Employee:{" "}
              <span className="font-mono text-gray-600">staff / staff123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
