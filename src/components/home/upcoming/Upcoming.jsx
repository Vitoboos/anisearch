import React, { Fragment } from 'react'
import { useEffect, useState } from 'react';

import Render from '../rendercards/Render'

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Seasonal(props) {

const data = props.data

return (

    <div>
            <Fragment>
                <Card className={'bg-dark text-white'} style={{margin: '10px'}}>
                    <Card.Body>
                        <Card.Title> Upcoming Anime </Card.Title>
                        <Card.Text>
                            Coming soon...
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Row  sm={1} md={3} lg={5} className="overflow-auto g-1" style={{height: '25rem', marginRight: '1vw', marginLeft: '1vw'}}>
                    {data.map((item, index) => (
                        <Col key={index}> <Render id={item.mal_id} name={item.title} text={item.synopsis} img={item.images.jpg.image_url}/> </Col>
                    ))}
                </Row>
            </Fragment>
    </div>

)}
