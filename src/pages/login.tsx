import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-type";

const Login = () => {
  const [gender, setgender] = useState("");
  const [date, setdate] = useState("");

  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const res = await login({
        name: user.displayName!,
        email: user.email!,
        _id: user.uid,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
      });

      if ("data" in res) {
        toast.success(res.data.message);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
      console.log(user);
    } catch (error) {
      toast.error("Sign in Fail");
      console.log(error);
    }
  };

  return (
    <div className="login">
      <main>
        <h1 className="heading"> LOGIN</h1>
        <div>
          <label> gender</label>
          <select value={gender} onChange={(e) => setgender(e.target.value)}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label> Date Of Birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
        </div>

        <div>
          <p>Already Have signup Account</p>
          <button onClick={loginHandler}>
            <FcGoogle />
            <span>sign in with google Account</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
