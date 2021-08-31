import Link from "next/link";
import { useAuth } from "../context/Auth";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-full px-16 py-4 flex flex-row items-center justify-between text-md shadow-sm">
      <Link href="/">
        <a className="text-2xl font-bold text-red-500">⛔ Firebase Auth</a>
      </Link>
      {user && (
        <div>
          <button className="text-red-500" onClick={() => logout()}>
            Log out
          </button>
        </div>
      )}
      {!user && (
        <div className="flex flex-row gap-5">
          <Link href="/login">
            <button className="text-red-500">Log in</button>
          </Link>
          <Link href="/signup">
            <button className="bg-red-500 text-white rounded-lg px-3 py-2">
              Sign up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
