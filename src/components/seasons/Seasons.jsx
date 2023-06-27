import React from 'react'
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react'
import Form from 'react-bootstrap/Form';  
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Footer from '../footer/Footer';

export default function Seasons() {

  const navigate = useNavigate()
  const year  = useRef()
  const season = useRef()

  function searchAnime(){

    let yearValue = year.current.value
    let seasonValue = season.current.value

    if(year.current.value < 1917){
      return
    }

    navigate("/seasons/results", {state: {yearValue: yearValue, seasonValue: seasonValue}});

  }

return (

    <Fragment>

        <div style={{backgroundColor: '#F44336', height: '75vh'}}>
        <Row style={{paddingTop:'2.5vh', paddingBottom: '2.5vh' , marginLeft:'2.5vw', marginRight:'2.5vw'}}>

          <Col>
            <Form.Group>
              <Form.Control placeholder="Year" style={{textAlign: 'center'}} ref={year}/>
                <Form.Text style={{color: 'white'}} >
                  From 1917 onwards, consider that most pre-1970 seasons are lacking in content.
              </Form.Text>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Select ref={season}>
                <option> Spring </option>
                <option> Summer </option>
                <option> Fall</option>
                <option> Winter </option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Container>
            <Row className="justify-content-center">
              <Col xs="auto">
                <Button variant={'dark'} style={{width: '80vw'}} onClick={searchAnime}> Search </Button>
              </Col>
            </Row>
          </Container>

        </Row>
        </div>
        <Footer/>

    </Fragment>

)}
