import React from 'react'
import { useState, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './AnimeDetails.module.css'

import Navigation from '../navbar/Navbar';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Footer from '../footer/Footer'

export default function AnimeDetails() {

const location = useLocation();
const animeID = location.state && location.state.data;
const [isLoading, setIsLoading] = useState(true);
const [data, setData] = useState(null)
const [status, setStatus] = useState('Add to watchlist')
const [btnStatus, setBtn] = useState('primary')

useEffect(() => {

    async function getRandomTitles(){

        const searchData = []

            await fetch("https://api.jikan.moe/v4/anime/"+animeID+"/full")
            .then(response => response.json())  
            .then(data => {
                searchData.push(data.data)
            });
        
        setData(searchData[0])

        // Search Data Printing...

        setIsLoading(false)
        
        return
    }

    getRandomTitles()

}, [animeID])


function addToWatchlist(){

    let key = animeID
    let value = data.title

    localStorage.setItem(key , value)

    setStatus('In Watchlist')
    setBtn('success')

}

return (

    <div>

        {isLoading ? (
        <p>Loading...</p>
        ) : (
            
            <Fragment>

            <div className={styles.background}> 
            <Navigation/>

            {/* Main Data */}
            
                <Row xs={1} md={2} style={{marginLeft:'2.5vw' , marginRight: '2.5vw', paddingTop: '1vh'}}> 

                    <Col> 
                        {/* Images, Trailer, Media */}
                        <Image fluid={true} src={data.images.jpg.large_image_url} style={{display:'block' , margin: 'auto'}}/>
                    </Col>

                    <Col> 
                        <Card>
                            <Card.Body>
                                <Card.Title> {data.title}  </Card.Title>
                                <Card.Text>
                                    {data.synopsis}
                                </Card.Text>
                            </Card.Body>

                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>
                                    {data.genres.map((item, index) =>
                                        <Badge key={index} className="m-1 p-2" bg="secondary"> {item.name} </Badge> 
                                    )}

                                    {data.themes.map((item, index) =>
                                        <Badge key={index} className="m-1 p-2" bg="secondary"> {item.name} </Badge> 
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>

                </Row>
                    
                <Row style={{marginLeft:'1vw' , marginRight: '1vw', paddingTop: '1vh', backgroundColor: '#F44336'}}>

                        <Col>
                            {/* Lesser Data */}
                            <Card>
                                <Card.Body>

                                    <Card.Title> Producer: {data.studios[0].name}  </Card.Title>
                                    <Badge className="m-1 p-2" bg="info" style={{width: '50px'}}> {data.type} </Badge> 
                                    <Badge className="m-1 p-2" bg="info" > {data.status} </Badge> 

                                    <ListGroup horizontal={false}>
                                        <ListGroup.Item> Episodes: {data.episodes} </ListGroup.Item>
                                        <ListGroup.Item> Duration: {data.duration} </ListGroup.Item>
                                        <ListGroup.Item> Score: {data.score} </ListGroup.Item>
                                    </ListGroup>

                                </Card.Body>
                                <Button variant={btnStatus} onClick={addToWatchlist}> {status} </Button>
                            </Card>
                        </Col>

                </Row>
            
            <Footer/>
            </div>

            </Fragment>

        )}

    </div>

)}
