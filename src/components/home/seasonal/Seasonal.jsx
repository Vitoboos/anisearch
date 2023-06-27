import React, { Fragment } from 'react'
import { useEffect, useState } from 'react';

import Render from '../rendercards/Render'

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Seasonal(props) {

const [isLoading, setIsLoading] = useState(true);
const data = props.data

return (

    <Fragment>
        <Card className={'bg-dark text-white'} style={{margin: '10px'}}>
            <Card.Body>
                <Card.Title> Seasonal Anime </Card.Title>
                <Card.Text>
                    Catch up with the latest animes on air!
                </Card.Text>
            </Card.Body>
        </Card>

        <Row  sm={1} md={3} lg={5} xxl={7} className="overflow-auto g-1" style={{height: '25rem', marginRight: '1vw', marginLeft: '1vw'}}>
            {data.map((item, index) => 
                <Col key={index}> <Render id={item.mal_id} name={item.title} text={item.synopsis} img={item.images.jpg.image_url}/> </Col>
            )}
        </Row>
    </Fragment>

)}
