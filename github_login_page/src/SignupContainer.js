import { useState } from "react";
import FirstWarning from "./FirstWarning.js";
import SecondWarning from "./SecondWarning.js";

const SignUpContainer = () => {
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeUserName = (event) => {
    setInputValues({ ...inputValues, username: event.target.value });
  };
  const changeEmail = (event) => {
    setInputValues({ ...inputValues, email: event.target.value });
  };
  const changePassword = (event) => {
    setInputValues({ ...inputValues, password: event.target.value });
  };

  const printTheInput = () => {
    console.log(inputValues);
  };

  return (
    <div>
      <div className="secondBox">
        <div className="inputFromUser">
          <label className="labels">Username</label>
          <input className="textBox" type="text" onChange={changeUserName} />
          <label className="labels">Email</label>
          <input className="textBox" type="text" onChange={changeEmail} />
          <label className="labels">Password</label>
          <input className="textBox" type="text" onChange={changePassword} />
        </div>
        <FirstWarning />
        <div className="signUpContainer">
          <button className="signupButton" onClick={printTheInput}>
            <strong>Sign up for GitHub</strong>
          </button>
        </div>
        <SecondWarning />
      </div>
    </div>
  );
};

export default SignUpContainer;
