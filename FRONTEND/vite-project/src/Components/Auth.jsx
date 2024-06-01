import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { Button, Checkbox, Form, Input } from 'antd';

const handleOut = async (logInValue) => {
    console.log(logInValue);
    try {
        const response = await axios.post("http://localhost:3344/api/auth/logout");
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