import { useState } from "react";
import { useAuth } from "../context/Auth";
import router from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const logIn = () => {
    login(email, password)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="h-full">
      <div className="flex flex-col text-gray-800 flex items-start w-96 mx-auto my-28">
        <h1 className="text-4xl font-bold mb-10">Log in</h1>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
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
              name="password"
              id="password"
              className="border outline-none h-8"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {error &&
        <label htmlFor="" className="text-red-600 py-4">
          {`⛔ ${error}`}
        </label>
        }
        <button
          disabled={email == "" || password == ""}
          type="submit"
          className="bg-red-500 px-4 py-2 text-md text-white rounded-lg self-end mt-8"
          onClick={() => {
            logIn();
          }}
        >
          Log in
        </button>
      </div>
    </div>
  );
}
