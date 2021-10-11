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
                setObject(object => [...object, [[result.results[i].name], [result.results[i].image], [result.results[i].price]]])
            }
        })
        .catch(error => console.log(error))
    }, [])

    return (
        <div className="site-card-wrapper">
            <Row>
                {
                    object.map(item => {
                        return <Col xs={24} xl={6}><Product alt={item[0]} src={ item[1] } name={ item[0] } price={ item[2] } /></Col>
                    })
                }
            </Row>
        </div>
    )
}