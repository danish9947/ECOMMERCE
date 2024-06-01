import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AdminPage = () => {
  const [productData, setProductData] = useState()
  const [updateData, setUpdateData] = useState()
  const [deleteData, setDeleteData] = useState()
  const [image, setImage] = useState();





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (values) => {
    const access = Cookies.get('access')
    const prod = { values, image }
    console.log(prod);
    try {
      const response = await axios.post("http://localhost:3344/api/products", prod, {
        headers: {
          token: `Bearer ${access}`
        }
      });
      console.log(response.data); // Log the response data
      // Redirect user if a URL is returned from the server
      if (response.data) {
        window.location.href = "/product"
      }
    } catch (error) {
      console.error(error);
    }
  };



  const handleImageUpload = async (e) => {
    console.log(e.file);
    // const formData = new FormData();
    // formData.append

    const res = await axios.post("http://localhost:3344/api/image/upload", { image: e.file },
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    // console.log("data:", res.data);
    setImage(res.data)

  };




  return (
    <>
      <section className='text-center'>

        <div>
          <img src="Adding-Products_Cropped.png" alt="" />
        </div>

        <div className='bg-gray-200 pb-10'>
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
              label="Title"
              name="title"
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
              label="Description"
              name="desc"
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
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input type='number' />
            </Form.Item>

            <Form.Item>
              <Upload
                listType="picture"
                className="upload-list-inline "
                beforeUpload={() => false}
                onChange={handleImageUpload}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" className='bg-blue-400'>
                SUBMIT
              </Button>
            </Form.Item>
          </Form>
        </div>


      </section>


    </>

  );
};


export default AdminPage;