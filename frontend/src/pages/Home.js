import { React, useState, useEffect } from 'react';
import { Col, Row } from 'antd';

import { Product } from "../components/Product"

export const Home = () => {

    const [object, setObject] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/products/', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(result => {
            for (let i = 0; i < result.results.length; i++) {
                setObject(object => [...object, result.results[i]])
            }
        })
        .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <Row gutter={[12, 48]}>
                {
                    object.map(item => {
                        return (
                            <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={4} key={ item.id } style={{  }}>
                                <Product alt={ item.name } src={ item.image } name={ item.name } price={ item.price } />
                            </Col>
                        ) 
                    })
                }
            </Row>
        </div>
    )
}