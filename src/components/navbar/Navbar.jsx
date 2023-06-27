import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useNavigate } from 'react-router-dom';

function Navigation() {

    const navigate = useNavigate();
    const input = useRef()

    function toHome(){
        navigate("anisearch/")
    }

    function toTags(){
        navigate("/tags")
    }

    function toProducers(){
        navigate("/studios")
    }

    function toSeasons(){
        navigate("/seasons")
    }

    function toWatchlist(){
        navigate("/watchlist")
    }

    function searchBar(){
        navigate("/search", {state: {input: input.current.value}});
    }

return (
    <Navbar bg="light" expand="lg">
        <Container fluid>
            <Navbar.Brand onClick={toHome} style={{cursor: 'pointer'}}> AniSearch </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">

        <Nav
            className="me-auto"
            style={{ maxHeight: '100px'}}
            navbarScroll
        >

            <Nav.Link onClick={toHome}> Home</Nav.Link>
            <Nav.Link onClick={toTags}> Tags </Nav.Link>
            <Nav.Link onClick={toProducers}> Studios </Nav.Link>
            <Nav.Link onClick={toSeasons}> Seasons </Nav.Link>
            <Nav.Link onClick={toWatchlist}> Watchlist </Nav.Link>

        </Nav>

        <Form className="d-flex">
            <Form.Control ref={input}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
            />
            <Button variant="outline-success" onClick={searchBar}> Search </Button>
        </Form>

        </Navbar.Collapse>
        </Container>
    </Navbar>
    
);}

export default Navigation;