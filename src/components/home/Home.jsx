import React, { Fragment } from 'react'
import { useState, useEffect } from 'react'


import Navigation from '../navbar/Navbar'
import Seasonal from './seasonal/Seasonal'
import Upcoming from './upcoming/Upcoming'
import Top from './toprated/Top'
import Footer from '../footer/Footer'

export default function Home() {

    const [isLoading, setIsLoading] = useState(true);
    const [seasonData, setSeason] = useState(null)
    const [upcomingData, setUpcoming] = useState(null)
    const [topData, setTop] = useState(null)

    useEffect(() => {

        async function getAnimeTitles(){
            let seasonArray = []
                await fetch("https://api.jikan.moe/v4/seasons/now")
                .then(response => response.json())  
                .then(data => {
                    seasonArray.push(data.data)
                }).catch((error) => {
                    console.log('Error:', error);
                }).finally(() =>{
                    setSeason(seasonArray[0])
                });

            let upcomingArray = []
                await fetch("https://api.jikan.moe/v4/seasons/upcoming")
                .then(response => response.json())  
                .then(data => {
                    upcomingArray.push(data.data)
                }).catch((error) => {
                    console.log('Error:', error);
                }).finally(() =>{
                    setUpcoming(upcomingArray[0])
                });

            let topArray = []
                await fetch("https://api.jikan.moe/v4/top/anime")
                .then(response => response.json())  
                .then(data => {
                    topArray.push(data.data)
                }).catch((error) => {
                    console.log('Error:', error);
                }).finally(() =>{
                    setTop(topArray[0])
                    setIsLoading(false)
                });;
            
            return
        }
        getAnimeTitles()
        console.log('Delayed code');

    }, [])
    
return (

    <div style={{background: 'white'}}>

    {isLoading ? (
    <p>Loading...</p>
    ) : (
        
    <Fragment>
        <div style={{background: '#F44336'}}>
            <Navigation/>
            <Seasonal data={seasonData}/>
            <Upcoming data={upcomingData}/>
            <Top data={topData}/>
            <Footer/>
        </div>

    </Fragment>

    )}

</div>


)}
