import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { Button, Checkbox, Form, Input } from 'antd';

const Login = () => {


    const handleSubmit = async (logInValue) => {
        console.log(logInValue);
        try {
            const response = await axios.post("http://localhost:3344/api/auth/login", logInValue);
            console.log(response.data); // Log the response data
            // Redirect user if a URL is returned from the server
            if (response.data.url) {
                window.location.href = response.data.url;
            }
            console.log(`${'user'}`);
            Cookies.set("access", response.data.accessToken)
            Cookies.set("user", response.data.setUser)
            return

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className='text-center flex justify-center py-40'>

            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;