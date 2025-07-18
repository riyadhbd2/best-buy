import Navbar from "@/components/Navbar";
import Link from "next/link";

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Welcome back
          </h2>
          <form>
            <input
              id="email"
              className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
              type="email"
              placeholder="Enter your email"
              required
            />
            <input
              id="password"
              className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
              type="password"
              placeholder="Enter your password"
              required
            />
            <div className="text-right py-4">
              <Link className="text-blue-600 underline" href="#">
                Forgot Password
              </Link>
            </div>
            <button
              type="submit"
              name="action"
              value="email"
              className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white"
            >
              Log in
            </button>

            <p className="text-center mt-4">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-blue-500 underline">
                Signup
              </Link>
            </p>
          </form>
          <button className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800">
            <img
              className="h-4 w-4"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
              alt="googleFavicon"
            />
            Log in with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
