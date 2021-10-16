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
        <div className="site-card-wrapper">
            <Row>
                {
                    object.map(item => {
                        return <Col xs={24} xl={6} key={ item.id }>
                                    <Product alt={ item.name } src={ item.image } name={ item.name } price={ item.price } />
                                </Col>
                    })
                }
            </Row>
        </div>
    )
}