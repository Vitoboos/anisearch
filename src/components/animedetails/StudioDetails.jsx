import React from 'react'
import { useState, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './AnimeDetails.module.css'

import Navigation from '../navbar/Navbar';
import Render from '../../components/home/rendercards/Render'

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';

import Footer from '../footer/Footer'

export default function AnimeDetails() {

const location = useLocation();
const studioID = location.state && location.state.id;
const studioName = location.state && location.state.name
const [isLoading, setIsLoading] = useState(true);
const [data, setData] = useState(null)
const [currentPage, setCurrent] = useState(1)
const [lastPage, setPage] = useState(null)

useEffect(() => {

    async function getAnimeStudios(pagination){
        const searchData = []
            await fetch("https://api.jikan.moe/v4/anime?producers="+studioID+"&page="+pagination)
            .then(response => response.json(
                console.log(response)
            ))  
            .then(data => { 
                console.log(data)
                setPage(data.pagination.last_visible_page) 
                searchData.push(data.data)
            }).catch((error) => {
                console.log('Error:', error);
            }).finally(() =>{
                // Set Pages    
                setData(searchData[0])
                // Search Data Printing...
                setIsLoading(false)
            });

        return
    }

    getAnimeStudios(currentPage)

}, [studioID, currentPage])

function prevPage(){
    if(currentPage === 1){
        return
    }
    setIsLoading(true)
    setCurrent(currentPage - 1)    
}

function nextPage(){
    if(currentPage === lastPage){
        return
    }
    setIsLoading(true)
    setCurrent(currentPage + 1)
}

function toFirst(){
    setIsLoading(true)
    setCurrent(1)
}

function toLast(){
    setIsLoading(true)
    setCurrent(lastPage)
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

                <Card className={'bg-dark text-white'} style={{marginTop: '2vh' , marginLeft:'2.5vw' , marginRight: '2.5vw', paddingTop: '1vh'}}>
                    <Card.Body>
                        <Card.Title> {studioName} </Card.Title>

                    </Card.Body>
                </Card>

                <Row  sm={1} md={3} lg={5} xxl={7} style={{marginLeft:'1vw' , marginRight: '1vw', paddingTop: '1vh', backgroundColor: '#F44336'}}>
                        {data.map((item, index) => (
                            <Col key={index}> <Render id={item.mal_id} name={item.title} text={item.synopsis} img={item.images.jpg.image_url}/> </Col>
                        ))}
                </Row>  

                <Pagination style={{ marginTop: '2vh', display: "flex", justifyContent: "center" }}>
                    <Pagination.First onClick={toFirst}/>
                    <Pagination.Prev onClick={prevPage}/>

                        <Pagination.Item active> {currentPage} </Pagination.Item>
                        <Pagination.Item disabled> of </Pagination.Item>
                        <Pagination.Item disabled> {lastPage} </Pagination.Item>

                    <Pagination.Next onClick={nextPage}/>
                    <Pagination.Last onClick={toLast}/>
                </Pagination>
            
            <Footer/>
            </div>

            </Fragment>

        )}

    </div>

)}
