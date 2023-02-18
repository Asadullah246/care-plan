import { Alert, Button, Form, Input, message, Modal, notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  changePassword,
  getUserData,
  sendResetPassEmail,
  updateUser
} from "../../../api";
import { AppContext } from "../../../states/app.context";
import "./UserSettings.scss";

const UserSettings = () => {
  const { user, setUser } = useContext(AppContext);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) navigate("/login");
  }, [user]);

  const handlePassChange = async (value: any) => {
    if (value.newPassword === value.retypePass) {
      const msg = await changePassword(value);
      setIsError(false);
      if (msg === 200) {
        message.success("password updated");
      } else {
        setIsError(true);
        return;
      }
    } else {
      setIsError(true);
      return;
    }
  };
  const validateEmail = (email: any) => {
    const validEmail = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    return validEmail;
  };
  const handleUserUpdate = async (value: any) => {
    if (value.email) {
      const response = validateEmail(value.email);
      if (!response) {
        Modal.error({
          title: "There is an error!",
          content: "Please enter correct email",
        });
        return;
      }
    }
    const res = await updateUser(value);
    if (res === 200) {
      Modal.success({
        title: "Settings updated",
        content: "Your user data updated successfully",
      });
      const userData = await getUserData();
      setUser(userData.data.user);
    } else {
      Modal.error({
        title: "This is an error message",
        content: "Something wen wrong!",
      });
    }
  };

  const sendResetPassword = async () => {
    const res = await sendResetPassEmail({ email: user.email });
    if (res.status === 200) {
      notification["success"]({
        message: "Email sent",
        description: "An email sent to your inbox to reset password",
      });
      // navigate("/");
    } else {
      notification["error"]({
        message: "Email doesn't exist",
        description: "Please register first",
      });
    }
  };

  return (
    <div className="usersettings">
      <Form
        className="usersettings-basics"
        name="basic-user-settings"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleUserUpdate}
        autoComplete="off"
      >
        <Form.Item label="First Name" name="firstName">
          <Input
            placeholder="Update your first name"
            defaultValue={user.firstName}
          />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName">
          <Input
            placeholder="Update your last name"
            defaultValue={user.lastName}
          />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input readOnly defaultValue={user.email} type={"email"} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Update Name
          </Button>
        </Form.Item>
      </Form>
      <div className="usersettings-changepass">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={handlePassChange}
        >
          <Form.Item
            label="Current Password"
            name="currentPass"
            rules={[
              {
                required: true,
                message: "Please input your current password!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Re-Type Password"
            name="retypePass"
            rules={[
              {
                required: true,
                message: "Please input your new password again!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {isError ? (
            <Alert
              style={{ marginBottom: "15px" }}
              message="Please check your password or new password!"
              type="error"
              showIcon
            />
          ) : (
            ""
          )}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Update Password
            </Button>
          </Form.Item>
          <p className="muted">Can&apos;t remember your current password?</p>
          <p id="link" onClick={sendResetPassword}>
            Reset Password By Email
          </p>
        </Form>
      </div>
    </div>
  );
};

export default UserSettings;
