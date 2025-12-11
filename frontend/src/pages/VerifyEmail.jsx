import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [devCode, setDevCode] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const verificationCode = location.state?.verificationCode;

  useEffect(() => {
    if (!email) {
      navigate("/signup", { replace: true });
    }
    // If code passed from signup (email not configured), show it
    if (verificationCode) {
      setDevCode(verificationCode);
    } else {
      // Email service configured - show success message
      toast.success(
        `📧 Verification code sent to ${email}! Please check your inbox.`,
        { duration: 6000, icon: '📧' }
      );
    }
  }, [email, navigate, verificationCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/verify-email`, {
        email,
        code,
      });

      toast.success(response.data.message || "Email verified successfully!");
      navigate("/login", { replace: true });
    } catch (error) {
      const message = error.response?.data?.error || "Error verifying email";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/resend-code`, {
        email,
      });
      
      // If email not configured, show code
      if (response.data.emailNotConfigured && response.data.verificationCode) {
        setDevCode(response.data.verificationCode);
        toast.success(
          `Email not configured. Your code is: ${response.data.verificationCode}`,
          { duration: 10000 }
        );
      } else {
        // Email service configured - code sent successfully
        toast.success(
          `✅ Verification code sent to ${email}! Please check your inbox.`,
          { duration: 6000, icon: '📧' }
        );
      }
    } catch (error) {
      const message = error.response?.data?.error || "Error resending code";
      toast.error(message);
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-semibold flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Code sent to your email!
            </p>
          </div>
          <p className="text-gray-600">
            We've sent a verification code to
          </p>
          <p className="text-indigo-600 font-semibold mt-1">{email}</p>
          {devCode && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 font-semibold mb-2">⚠️ Email service not configured</p>
              <p className="text-xs text-yellow-700 mb-1">Your verification code is:</p>
              <p className="text-2xl font-mono font-bold text-yellow-900 tracking-widest">{devCode}</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              id="code"
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-center text-2xl font-mono tracking-widest"
              placeholder="000000"
              maxLength={6}
            />
            <p className="mt-2 text-sm text-gray-500">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline disabled:opacity-50"
          >
            {resending ? "Sending..." : "Resend Code"}
          </button>
          <p className="text-gray-600 text-sm">
            Didn't receive the code? Check your spam folder or{" "}
            <button
              onClick={handleResend}
              className="text-indigo-600 font-medium hover:underline"
            >
              resend
            </button>
          </p>
          <p className="text-gray-600 text-sm">
            Already verified?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

