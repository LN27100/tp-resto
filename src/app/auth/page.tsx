"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.error) {
      setError("Identifiants invalides");
    } else {
      router.push("/recipes");
    }
  };

  return (
    <section className="py-8">
      <div className="flex justify-center">
        <div className="border-emerald-600 border rounded-lg p-8 shadow-md w-96 text-left">
          <h2 className="flex justify-center text-2xl font-semibold mb-4">Connexion</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Mot de passe"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-500 text-white px-6 py-2 rounded"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
