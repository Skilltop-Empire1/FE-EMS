import React, { useState } from "react";
import forgot from "../../components/forgot2.png";
import { useForgotPasswordMutation } from "@src/redux/api/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      setError("Email is required");
      setIsLoading(false);
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      setMessage("Check your email for a reset link.");
      setError("");
    } catch (err) {
      setError(
        err.data?.message || "Failed to send reset link. Please try again."
      );
      setMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`forgot-password flex h-screen items-center`}>
      <div className="w-1/2 flex justify-center items-center">
        <img src={forgot} alt="" />
      </div>
      <div className="w-1/2 flex justify-center items-center flex-col h-full gap-10 bg-[#E0F7F7B2]">
        <h2 className="text-6xl text-[#333333]">Forgot Password?</h2>
        <p className="text-xl text-[#333333]">
          Enter your email to set a new password.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-4/5">
          <div className="w-full">
            <label className="text-lg text-[#333333]">Email</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter email"
              className="w-full h-12 rounded-md border-2 text-[#333333] bg-[#E0F7F7B2] border-[#33333380] p-4"
            />
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
          </div>
          <button
            type="submit"
            className="mt-10 py-2 bg-blue-600 w-full rounded-md text-white"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
