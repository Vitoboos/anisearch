import React, { Fragment } from 'react'
import {useState, useEffect } from 'react';
import Navigation from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import { useNavigate } from 'react-router-dom';

import styles from './Genres.module.css'

export default function Genres() {
    
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null)

    function Results(e){
        let name = e.currentTarget.getAttribute("data-name")
        let id = e.currentTarget.getAttribute("data-id")
        navigate("/tags/results", {state: {id: id, name: name}});
    }
    
    useEffect(() => {
    
        async function getGenres(){
    
            const searchData = []
    
                await fetch("https://api.jikan.moe/v4/genres/anime")
                .then(response => response.json())  
                .then(data => {
                    searchData.push(data.data)
                });
            
            // Removes NSFW tags from array

            await searchData[0].splice(19, 2)

            setData(searchData[0])
            
            // Search Data Printing...

            setIsLoading(false)
            
            return
        }
    
        getGenres()
    
    }, [])

return (

    <div>

        {isLoading ? (
        <p>Loading...</p>
        ) : (
            <Fragment>

            <Navigation/>

            <div style={{backgroundColor: '#F44336'}}> 

                <ListGroup style={{marginLeft: '2vw', marginRight: '2vw' , paddingTop: '3vh' , marginBottom: '2vw'}}> 

                    <Row lg={4} md={3} xs={1}>
                        {data.map((item, index) => <Col key={index} data-name={item.name} data-id={item.mal_id} onClick={Results}> <ListGroupItem className={styles.tab}> {item.name} </ListGroupItem> </Col>)} 
                    </Row>

                </ListGroup>

                <Footer/>

            </div>
            </Fragment>

        )}

    </div>

)}
