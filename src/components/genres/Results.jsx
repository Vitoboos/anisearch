import React from 'react'
import { useLocation } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';

import Navigation from '../../components/navbar/Navbar'
import Render from '../home/rendercards/Render'
import Footer from '../footer/Footer'

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';

export default function Results() {

const location = useLocation();
const genreID = location.state && location.state.id;
const genreName = location.state && location.state.name;
const [isLoading, setIsLoading] = useState(true);
const [data, setData] = useState(null)

const [currentPage, setCurrent] = useState(1)
const [lastPage, setPage] = useState(null)

useEffect(() => {
    async function getGenres(pagination){
        const searchData = []
            await fetch("https://api.jikan.moe/v4/anime?page="+pagination+"&genres="+genreID)
            .then(response => response.json())  
            .then(data => {
                setPage(data.pagination.last_visible_page) 
                searchData.push(data.data)
            });
        
        // Set Pages

        setData(searchData[0])

        // Search Data Printing...
        setIsLoading(false)
        return
    }
    getGenres(currentPage)
}, [genreID, currentPage])

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
    <Fragment>
    <Navigation/>
        <div style={{backgroundColor: 'white'}}>
            {isLoading ? (
            <p>Loading...</p>
            ) : (
                <div style={{backgroundColor: '#F44336'}}> 

                <div style={{backgroundColor: '#F44336'}}>

                <Card className={'bg-dark text-white'} style={{margin: '5px'}}>
                    <Card.Body>
                        <Card.Title> {genreName} Anime </Card.Title>
                    </Card.Body>
                </Card>

                <Row  sm={1} md={3} lg={5} xxl={7} className="overflow-auto g-1" style={{marginRight: '1vw', marginLeft: '1vw'}}>
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

                </div>
                <Footer/>
                </div>
            )}
        </div>

    </Fragment>
)}
