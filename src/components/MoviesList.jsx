import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd';
import { DeleteFilled, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const api = 'https://dummyjson.com/products';

const MoviesList = () =>{
    
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(api).then(res => res.json()).then(data => setMovies(data.products));
    }, []);


    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Category',
          dataIndex: 'category',
          key: 'category',
        },
        {
            title: 'Stock',
            key: 'stock',
            dataIndex: 'stock',
            render: (_, record) => (
                record.stock > 0 ?
                    <Tag color="green">Available {record.stock}</Tag>
                    :
                    <Tag color="volcano">Out of Stock</Tag>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
          title: 'Action',
          key: 'action',
            render: (_, record) => (
                <Space size="middle">

                    <Link to={`/details/${record.id}`}>
                        <Button color='primary' icon={<InfoCircleOutlined />} />
                    </Link>

                    <Popconfirm
                        title="Delete the movie"
                        description={`Are you sure to delete this ${record.title}?`}
                        onConfirm={() => onDelete(record.id)}
                        okText="Yes"
                      cancelText="No"
                  >
                      <Button danger icon={<DeleteOutlined />} />
                  </Popconfirm>
                  
            </Space>
          ),
        },
      ];

    const onDelete = (id) => {
        const index = movies.findIndex(x => x,id = id);
        if(index !== -1)
        {
            setMovies(movies.filter((_, i) => i !== index));
            message.success('Movie deleted successfully');
        }
        else
            message.error("Movie does not found");
    }


    return <Table columns={columns} dataSource={movies} />;


}

export default MoviesList;