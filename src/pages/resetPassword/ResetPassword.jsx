import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import forgot from 'src/components/reset.png'

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Here you would typically handle the reset password logic, like calling an API
    console.log("Reset password for:", email);
    console.log("New password:", newPassword);

    // Simulate successful submission
    setSuccess(true);
    setError("");
  };

  return (
    <div className={styles.container}>
       <div className={`forgot-password flex h-screen items-center`}>

<div className="w-1/2 flex justify-center items-center">
  <img src={forgot} alt="" />
</div>


<div className="w-1/2 flex justify-center items-center flex-col h-full gap-10 bg-[#E0F7F7B2]">
  <h2 className="text-6xl text-[#333333]">Reset your password</h2>
  <p className="text-xl text-[#333333]">Enter your email address below to create a new password.</p>
  <form onSubmit={handleSubmit} className=' flex flex-col gap-3 w-4/5'>
    <div className="w-full">
     <div className={styles.formGroup}>
      <label className="text-lg text-[#333333]">Email</label>
        <br />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter email"
          className="w-full h-12 rounded-md border-2 text-[#333333] border-[#33333380] bg-[#E0F7F7B2] p-4"
        /> 
     </div>
      <div className={styles.formGroup}>
          <label className="text-lg text-[#333333]">Password</label>
          <br />
          <input
             type="password"
             id="newPassword"
             value={newPassword}
             onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Enter email"
            className="w-full h-12 text-[#333333] rounded-md border-2 border-[#33333380] bg-[#E0F7F7B2] p-4"
          />
      </div >
       <div className={styles.formGroup}>
          <label className="text-lg text-[#333333]">Confirm password</label>
          <br />
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Enter email"
            className="w-full h-12 text-[#333333] rounded-md border-2 border-[#33333380] bg-[#E0F7F7B2] p-4"
          />
       </div>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p>Password has been reset successfully!</p>}
    </div>
    <button type="submit" className="mt-10 py-2 bg-blue-600 w-full rounded-md text-white">Reset password</button>
  </form>
</div>


</div>
      {/* <h2>Reset Password</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p>Password has been reset successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="newPassword" className={styles.label}>
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Reset Password
        </button>
      </form> */}
    </div>
  );
}

export default ResetPassword;
