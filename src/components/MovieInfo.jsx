import { LeftOutlined } from '@ant-design/icons';
import { Button, Flex, Image, Skeleton, Space, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const api = 'https://dummyjson.com/products/';


export default function MovieInfo() {


    const { id } = useParams();

    const navigate = useNavigate();

    const [item, setItem] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(api + id).then(res => res.json()).then(data => setItem(data));
        }, 5000)
    }, []);



    return (
        <>
        <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}></Button>
        {item
            ?
            <div>
                <h2>{item.title}</h2>
                <p>{item.category}</p>
                <hr />               
                <p>Price: {item.price}$</p>
                <p>Discount: {item.discountPercentage}%</p>
                <p>Availability: {item.stock > 0 ?
                    <Tag color="green">{item.stock}</Tag>
                    :
                    <Tag color="volcano">Out of Stock</Tag>}</p>
                <p>{item.description}</p>
            </div>
            :
            <Flex gap="middle" vertical>
            <Space>
                <Skeleton.Input active />
                <Skeleton.Input active />
            </Space>
            <Skeleton
                paragraph={{
                    rows: 0,
                }}
            />
            <Skeleton active />
        </Flex>
        }
    </>


    )
}
