import { Button, Form, Input, Modal, notification, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { loginUser, sendResetPassEmail } from "../api";
import { LoadingScreen } from "../components/LoadingScreen";
import { AppContext } from "../states/app.context";
import { RootState } from "../store/rootReducer";
import { setUser } from "../store/User/user.action";
import styles from "./Login.module.scss";

 const Login = () => {
  const { loading, setUser: setContextUser } = useContext(AppContext);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [process, setProcess] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [visible, setVisible] = useState(false);
  const handleChange = (e: any) => {
    const update = { ...data, [e.target.name]: e.target.value };
    setData(update);
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setProcess(true);
    const userRes = await loginUser(data);
    console.log(userRes, 'userRes');
    if (userRes) {
      setContextUser({ email: userRes.user.email, firstName: userRes.user.firstName, lastName: userRes.user.lastName, permissions: userRes.user.permissions, role: userRes.user.role });
      dispatch(setUser({ email: userRes.user.email, firstName: userRes.user.firstName, lastName: userRes.user.lastName, permissions: userRes.user.permissions, role: userRes.user.role }));
    } else {
      setProcess(false);
      alert("User not found, please register first.");
    }
  };

  // reset password
  const onFinish = async (values: any) => {
    console.log(values);
    const res = await sendResetPassEmail(values);
    if (res.status === 200) {
      notification["success"]({
        message: "Email sent",
        description: "An email sent to your inbox to reset password",
      });
      navigate("/");
    } else {
      notification["error"]({
        message: "Email doesn't exist",
        description: "Please register first",
      });
    }
  };

  const onFinishFailed = () => {
    notification["error"]({
      message: "Something went wrong!",
      description: "Please try again.",
    });
  };

  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [user]);
  if (loading) return <LoadingScreen />;
  return (
    <div className={styles.login}>
      <Spin spinning={process}>
        <h2>Login</h2>
        {user?.email}
        <div>
          <form onSubmit={handleLogin}>
            <p>
              <input
                type="email"
                placeholder="email"
                onChange={handleChange}
                name="email"
              />{" "}
            </p>
            <p>
              <input
                type="password"
                placeholder="password"
                onChange={handleChange}
                name="password"
              />{" "}
            </p>
            <button type="submit" disabled={!data.password}>
              Login
            </button>
            <span
              style={{ textDecoration: "underline", color: "blue" }}
              onClick={() => setVisible(true)}
            >
              Forgot password?
            </span>
          </form>
        </div>
      </Spin>
      <Modal
        title="Reset password"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Enter your email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Login ;
