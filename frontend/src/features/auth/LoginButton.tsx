import { useAuth } from "./AuthContext";

export default function LoginButton() {
  const { accessToken, loginWithGoogle, logout } = useAuth();

  return accessToken ? (
    <button onClick={logout} className="px-4 py-2 rounded bg-zinc-700 text-white">
      Sign out
    </button>
  ) : (
    <button onClick={loginWithGoogle} className="px-4 py-2 rounded bg-blue-600 text-white">
      Login with Google
    </button>
  );
}
