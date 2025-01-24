import { Button, Form, Input, InputNumber, message, Select, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const api = 'https://dummyjson.com/products/';

export default function CreateMovieComponent() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(api + "categories")
      .then(res => res.json())
      .then(data =>
        setCategories(data.map(x => {
          return { label: x.name, value: x.slug };
        })));
  }, []);

  const onSubmit = (item) => {
    console.log(item);
    
    fetch(api + "add",{
      method:"POST",
      body:JSON.stringify(item),
      headers:{
        "Content-type":"application/json; charset=UTF-8"
      }
    }).then(res =>{
      if(res.status === 200 )
      {
        message.success("Movie created succesfully!");
        navigate("/movies");
      }
      else
        message.error("Something went wrong!");
    })
    
  }

  return (
    <div>
      <h2>Create new Movie</h2>

      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 19,
        }}
        layout="horizontal"
        onFinish={onSubmit}
      >
        <Form.Item label="Title" name="title"
          rules={[
            {
              required: true,
              message: 'Please input!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Discount" name="discountPercentage">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Quantity" name="stock">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select options={categories}></Select>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Space>
            <Button type="default" htmlType="reset">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
