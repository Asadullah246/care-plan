import { Button, Form, Input, notification } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    if (values.password === values.confirm_password) {
      const response = await resetPassword(token, values.password);
      if (response.status === 404) {
        notification["error"]({
          message: "Invalid token!",
          description: "Please try again or try forgot password",
        });
        return;
      }
      notification["success"]({
        message: "Password reset successful!",
        description: "Your password updated!",
      });
      navigate("/");
    } else {
      notification["warn"]({
        message: "Not Matched!",
        description: "Please check again to confirm new password.",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    notification["error"]({
      message: "Something went wrong!",
      description: "Please try again.",
    });
  };

  return (
    <div
      style={{
        margin: "auto",
        marginTop: "20vh",
        width: "50%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Reset password</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ margin: "auto" }}
      >
        <Form.Item
          label="New Password"
          name="password"
          rules={[{ required: true, message: "Please input your paswword!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm_password"
          rules={[{ required: true, message: "Please check your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
