import React from 'react'
import { Fragment } from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navigation from '../navbar/Navbar'
import Render from '../home/rendercards/Render'
import RenderStudio from '../home/rendercards/RenderStudios'

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Footer from '../footer/Footer'

export default function Searchbar() {

const location = useLocation();
const userInput = location.state && location.state.input

const [isLoading, setIsLoading] = useState(true);
const [studio, setStudio] = useState(null)
const [anime, setAnime] = useState(null)

useEffect(() => {

    async function getAnimeStudios(){
        const searchData = []
            await fetch("https://api.jikan.moe/v4/producers?q="+userInput)
            .then(response => response.json())  
            .then(data => { 
                console.log(data.data)
                searchData.push(data.data)
            });
        
        // Set Pages

        setStudio(searchData[0])

        // Search Data Printing...
        return
    }
    
    getAnimeStudios()

    async function getAnimeNames(){
        const searchData = []
            await fetch("https://api.jikan.moe/v4/anime?q="+userInput)
            .then(response => response.json())  
            .then(data => { 
                console.log(data.data)
                searchData.push(data.data)
            });
        
        // Set Pages

        setAnime(searchData[0])

        // Search Data Printing...
        setIsLoading(false)
        return
    }

    getAnimeNames()

}, [userInput])

return (
    <Fragment>        
        <div>
    
            {isLoading ? (
            <p>Loading...</p>
            ) : (

                <Fragment>
                    <Navigation/>
                    {/* Background */}

                    <div  style={{backgroundColor: '#F44336', paddingTop: '2vh'}}> 

                        <Card className={'bg-dark text-white'} style={{marginLeft: '1vw', marginRight: '1vw', padding: '1vh'}}> 
                            <Card.Title>  Anime Results </Card.Title>
                        </Card>

                            <Row sm={1} md={3} lg={5} xxl={7} className="overflow-auto g-1" style={{marginRight: '1vw', marginLeft: '1vw', paddingTop: '2vh', paddingBottom: '2vh'}}>
                                {anime.map((item, index) => 
                                    <Col key={index}> <Render id={item.mal_id} name={item.title} text={item.synopsis} img={item.images.jpg.image_url}/> </Col>
                                )}
                            </Row>  
                    </div>

                    <div  style={{backgroundColor: '#F44336' , paddingTop: '2vh'}}>
                        <Card className={'bg-dark text-white'} style={{marginLeft: '1vw', marginRight: '1vw', padding: '1vh'}}> 
                            <Card.Title>  Studio Results </Card.Title>
                        </Card>

                            <Row sm={1} md={3} lg={5} xxl={7} className="overflow-auto g-1" style={{ marginRight: '1vw', marginLeft: '1vw', paddingTop: '2vh', paddingBottom: '2vh'}}>
                                {studio.map((item, index) => 
                                    <Col key={index}> <RenderStudio id={item.mal_id} name={item.titles[0].title} text={item.about} img={item.images.jpg.image_url}/> 
                                    </Col>
                                )}
                            </Row>

                    </div>

                    <Footer/>

                </Fragment>            
            )}



        </div>


    </Fragment>
)}
