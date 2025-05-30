import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import register_bg from '../../assets/register-bg.avif'
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Login = () => {
    const { userLogin, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        userLogin(email, password)
            .then(() => {
                toast.success("User login successfully");
                navigate(from, { replace: true });
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then((result) => {



                const userInfo = {
                    email: result?.user?.email,
                    name: result?.user?.displayName,
                    role: 'user',
                    isSubscribed: false,

                    createdAt: new Date(),
                    subscriptionDate: null,
                    paymentVerified: false,
                    status: 'pending'
                };
                axiosPublic.post(`/user/${result?.user?.email}`, userInfo);
                navigate(from, { replace: true });
                toast.success("Login successfully");
            })

    };
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center py-8 md:px-0 px-2"
            style={{
                backgroundImage: `linear-gradient(to right, rgba(15, 12, 41, 0.7), rgba(48, 43, 99, 0.7), rgba(36, 36, 62, 0.7)), url(${register_bg})`,
            }}
        >
            <div className="bg-white/20 backdrop-blur-sm rounded-lg shadow-xl p-8 max-w-lg w-full text-white">
                <h2 className="text-3xl font-semibold text-center mb-6">
                    Please <span className="text-orange-500">Login</span>
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">



                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Email"
                        className="input input-bordered w-full bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />

                    {/* Password */}
                    <input
                        type="password"
                        name="password"
                        required
                        minLength={8}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        placeholder="Password"
                        title="Must be 8+ chars, with number, uppercase & lowercase"
                        className="input input-bordered w-full bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />

                    <button
                        type="submit"
                        className="btn btn-outline w-full border-white text-white hover:bg-blue-200 hover:text-black transition"
                    >
                        Login
                    </button>
                </form>

                <div className="divider my-6 text-white">OR</div>

                {/* Google Login */}
                <button
                    onClick={handleGoogleLogin}
                    className="btn w-full flex justify-center items-center gap-2 bg-white text-black hover:bg-blue-200 hover:text-white transition"
                >
                    <img
                        src="https://img.icons8.com/?size=96&id=17949&format=png"
                        alt="Google icon"
                        className="w-6"
                    />
                    Sign in with Google
                </button>

                {/* Already have account */}
                <p className="text-white">
                    New here?{" "}
                    <Link to="/register" className="text-orange-400 font-semibold">
                        Create an Account
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login
