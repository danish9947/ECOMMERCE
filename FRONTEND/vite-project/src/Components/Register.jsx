import React, { useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, Form, Input } from 'antd';
const Register = () => {

    const handleSubmit = async (values) => {
        console.log(values);
        try {
            const response = await axios.post("http://localhost:3344/api/auth/register", values);
            console.log(response.data); // Log the response data
            // Redirect user if a URL is returned from the server
            if (response.data.url) {
                window.location.href = response.data.url;
            }
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
                    label="Email"
                    name="email"
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

export default Register;

