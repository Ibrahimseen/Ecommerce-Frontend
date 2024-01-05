import { useState } from "react";
import {FcGoogle} from "react-icons/fc"

const Login = () => {
  const [Gender, setGender] = useState("");
  const [date, setdate] = useState("");

  return (
    <div className="login">
      <main>
        <h1 className="heading"> LOGIN</h1>
        <div>
          <label> Gender</label>
          <select value={Gender} onChange={(e) => setGender(e.target.value)}> 
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          </select>
        </div>
        <div>
    <label > Date Of Birth</label>
    <input type="date" value={date } onChange={(e) => setdate(e.target.value)}/>
        </div>

        <div>
             <p>Already Have signup Account</p>
             <button>
                <FcGoogle/>
                <span>sign in with google Account</span>
             </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
