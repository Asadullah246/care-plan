import { Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import { LoadingScreen } from "../components/LoadingScreen";
import { AppContext } from "../states/app.context";
import styles from "./Login.module.scss";

type Data = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  permissions: string[];
};

type Error = {
  pass: boolean;
  email: boolean;
};

export const Register = () => {
  const { user, setUser, loading } = useContext(AppContext);
  const navigate = useNavigate();
  const [data, setData] = useState<Data>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "patient",
    phone: "",
    permissions: [],
  });
  const [pass2, setPass2] = useState("");
  const [process, setProcess] = useState(false);
  const [error, setError] = useState<Error>({ pass: false, email: false });
  const handleRegister = async (e: any) => {
    e.preventDefault();
    setProcess(true);
    const userRes = await registerUser(data);
    setProcess(false);
    if (userRes) setUser(userRes);
  };
  const handleInput = (e: { target: { name: any; value: any } }) => {
    const newData = { ...data, [e.target.name]: e.target.value };
    setData(newData);
  };

  const handlePass2 = (e: { target: { value: any } }) => {
    const pass = e.target.value;
    setPass2(pass);
    if (!data.password.includes(pass)) setError({ ...error, pass: true });
    else setError({ ...error, pass: false });
  };

  const validateEmail = () => {
    const validEmail = String(data.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (validEmail) setError({ ...error, email: false });
    else setError({ ...error, email: true });
  };

  const validForm = () => {
    if (error.pass || error.email) return false;
    if (!data.firstName || !data.lastName || !data.password || !pass2)
      return false;
    else return true;
  };

  useEffect(() => {
    if (data.email) {
      validateEmail();
    }
  }, [data.email]);

  useEffect(() => {
    if (user?.email) navigate("/");
  }, [user]);
  if (loading) return <LoadingScreen />;
  return (
    <div className={styles.register}>
      <Spin spinning={process}>
        <h2>Register here</h2>
        <form onSubmit={handleRegister}>
          <div>
            <input
              type="text"
              name="firstName"
              onChange={handleInput}
              placeholder="First name"
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              onChange={handleInput}
              placeholder="Last name"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              onChange={handleInput}
              placeholder="Email"
              onBlur={validateEmail}
            />
          </div>
          {error.email && <p className="error">Email is not valid.</p>}
          <div>
            <input
              type="text"
              name="phone"
              onChange={handleInput}
              placeholder="Phone"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              onChange={handleInput}
              placeholder="Password"
            />
          </div>
          <div>
            <input
              type="password"
              name="password2"
              onChange={handlePass2}
              placeholder="Retype Password"
            />
          </div>
          {error.pass && <p className="error">Password didn&#39;t match.</p>}
          <button type="submit" disabled={!validForm()}>
            Register
          </button>
        </form>
        <p>
          Already have a account?
          <Link to={"/login"}>Login now</Link>
        </p>
      </Spin>
    </div>
  );
};
