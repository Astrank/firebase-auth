import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth";
import { useRouter } from "next/router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { signup, user } = useAuth();

  const signUp = (email, password) => {
    signup(email, password)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="h-full">
      <div className="flex flex-col text-gray-800 flex items-start w-96 mx-auto my-28">
        <h1 className="text-4xl font-bold mb-10">Sign up to Firebase</h1>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              aria-label="Email"
              name="email"
              id="email"
              className="border outline-none h-8"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="">
              Password
            </label>
            <input
              type="password"
              aria-label="Password"
              name="password"
              id="password"
              className="border outline-none h-8"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {error && (
          <label htmlFor="" className="text-red-600 py-4">
            {`⛔ ${error}`}
          </label>
        )}
        <button
          disabled={email === "" || password === ""}
          className="bg-red-500 px-4 py-2 text-md text-white rounded-lg self-end mt-10"
          onClick={() => {
            signUp(email, password);
          }}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
