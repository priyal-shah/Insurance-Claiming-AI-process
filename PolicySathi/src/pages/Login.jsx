import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white">

      <div className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl">

        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
          PolicySathi
        </h1>

        <p className="text-center text-slate-400 mb-8">
          Insurance Claims Compliance AI
        </p>

        <div className="mb-6 flex justify-center">
          <GoogleLogin
             onSuccess={(credentialResponse) => {
            localStorage.setItem("token", credentialResponse.credential);
            window.location.href = "/dashboard";
            }}
            onError={() => console.log("Failed")}
          />
        </div>

        <div className="text-center text-slate-400 mb-4">
          OR
        </div>

        <input
          placeholder="Email"
          className="w-full p-3 rounded-2xl bg-white/5 mb-4 border border-white/10"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-2xl bg-white/5 mb-4 border border-white/10"
        />

        <Link
          to="/dashboard"
          className="block text-center bg-cyan-500 text-black p-3 rounded-2xl font-bold"
        >
          Sign In
        </Link>

      </div>

    </div>
  );
}