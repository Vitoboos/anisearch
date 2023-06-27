import React from 'react'
import {Fragment, useState, useEffect } from 'react';
import Render from '../home/rendercards/RenderStudios'
import Navigation from '../navbar/Navbar';
import Footer from '../footer/Footer'

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';

export default function Studios() {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null)
    const [currentPage, setCurrent] = useState(1)
    const [lastPage, setPage] = useState(null)

    useEffect(() => {
        async function getStudios(pagination){
            const searchData = []

                await fetch("https://api.jikan.moe/v4/producers?page="+pagination)
                .then(response => response.json())  
                .then(data => {
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
        getStudios(currentPage)
    }, [currentPage])
    

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

        <div >
            {isLoading ? (
            <p>Loading...</p>
            ) : (
                <div style={{background:'#F44336' , backgroundColor:'#F44336'}}> 
                <Navigation/>

                <div style={{background:'#F44336' , backgroundColor:'#F44336'}}>

                <Card className={'bg-dark text-white'} style={{margin: '5px'}}>
                    <Card.Body>
                        <Card.Title> Producers </Card.Title>
                        <Card.Text> Search for your favorite studios! </Card.Text>
                    </Card.Body>
                </Card>

                <Row  sm={1} md={3} lg={5} xxl={7} className="overflow-auto g-1" style={{marginRight: '1vw', marginLeft: '1vw'}}>
                    {data.map((item, index) => (
                        <Col key={index}> <Render id={item.mal_id} name={item.titles[0].title} text={item.about} img={item.images.jpg.image_url}/> </Col>
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
