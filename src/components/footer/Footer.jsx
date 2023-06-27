import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './Footer.module.css'

export default function Footer() {


    function gotoInsta(){
        window.open('https://ig.me/m/_azath_')
    }
    
    
    function gotoGithub(){
        window.open('https://github.com/Vitoboos')
    }
    
    
    function gotoLinkedIn(){
        window.open('https://www.linkedin.com/in/victor-antonio-guaipo-mendoza-727016272/')
    }


return (

    <Card className={'bg-dark text-white'} style={{borderRadius: '0px'}}>
        
        <Card.Body style={{display:'flex', flexDirection: 'column' , alignContent: 'center', alignSelf: 'center'}}>
            <Card.Title style={{marginBottom: '2vh', textAlign: 'center'}}> Contact</Card.Title>

            <ListGroup horizontal={true}>
                <ListGroup.Item className={styles.tab} onClick={gotoInsta}> Instagram </ListGroup.Item>
                <ListGroup.Item className={styles.tab} onClick={gotoGithub}> Github </ListGroup.Item>
                <ListGroup.Item className={styles.tab} onClick={gotoLinkedIn}> LinkedIn </ListGroup.Item>
            </ListGroup>
        </Card.Body>


    </Card>

)}
