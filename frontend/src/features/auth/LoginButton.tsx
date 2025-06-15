import { useAuth } from "@/features/auth/AuthContext";

import { FcGoogle } from "react-icons/fc"; // Google logo icon



export default function LoginButton() {
  const { accessToken, loginWithGoogle, logout } = useAuth();

 return accessToken ? (
    <button
      onClick={logout}
      className="px-4 py-2 bg-zinc-800 text-white font-medium rounded-md hover:bg-zinc-700 transition"
    >
      Sign out
    </button>
  ) : (
    <button
      onClick={loginWithGoogle}
      className="flex items-center gap-3 px-4 py-2 border border-zinc-300 rounded-md shadow-sm bg-white text-sm font-medium hover:bg-zinc-50 transition"
    >
      <FcGoogle className="text-xl" />
      <span>Sign in with Google</span>
    </button>
  );
}
