import React from 'react'
import { Fragment } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';


import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../footer/Footer';

export default function Animelist() { 

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)
  const [watchList, setList] = useState(null)

  useEffect(() => {

    function getAnimeList(){

      let items = [];
      let itemCount = localStorage.length;
      for (var i = 0; i < itemCount; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        items.push({ key: key, value: value });
      }
      setList(items)
  }

    getAnimeList()
    setIsLoading(false)

}, [])


function RemoveAnime(e){
  let animeID =  e.target.getAttribute('anime-id')
  localStorage.removeItem(animeID)

  let items = []
  let itemCount = localStorage.length

  for (var i = 0; i < itemCount; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    items.push({ key: key, value: value });
  }
  
  setList(items)
}

function AnimeDetails(e){

  let animeID =  e.target.getAttribute('anime-id')
  console.log(animeID)
  navigate("/anime", {state: {data: animeID}});
}

function exportTextFile() {
  let text = '';

  watchList.map((item, index) =>
    text = text + "" + item.value + "\n" 
  )
  console.log(text)

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, 'animelist.txt');

};

  return (

    <Fragment>

    <div> 

      {isLoading ? (

        <p> Loading... </p>

      ): (

        <div style={{backgroundColor: '#F44336', minHeight: '75vh'}}>  

          <ListGroup style={{marginLeft: '2vw', marginRight: '2vw', paddingTop: '2vh', paddingBottom: '2vh'}}>
          {watchList.map((item, index) => 

            <Fragment key={index}>

              <ListGroup.Item > 
                <Row>
                    <Col>  {item.value} </Col>
                    <Button anime-id={item.key} variant={"danger"} style={{display: 'block', margin: 'auto', width: '5rem'}} onClick={RemoveAnime}> Remove </Button>   
                    <Button anime-id={item.key} variant={"info"} style={{display: 'block', margin: 'auto', color: 'white', width: '5rem'}} onClick={AnimeDetails}> Details </Button>   
                </Row>
              </ListGroup.Item>
        
            </Fragment>

          )}
          </ListGroup>
            <Button  onClick={exportTextFile} style={{display: 'block', margin: 'auto'}}> Export List as Text File </Button>
        </div>

      )}
      <Footer/>
    </div>

    </Fragment>
  )

}
