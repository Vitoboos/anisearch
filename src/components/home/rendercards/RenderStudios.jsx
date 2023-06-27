import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useNavigate } from 'react-router-dom';

function Render(props) {
    const navigate = useNavigate();

    function Details(){
        navigate("/studio", {state: {id: props.id, name: props.name}});
    }

return (

    <Card className="bg-dark text-white" style={{width: '15rem', height:'25rem', display: 'block', margin: 'auto'}}>
        <Card.Img  src={props.img} alt="Card image" style={{opacity: '0.5', height:'100%'}}/>
        <Card.ImgOverlay>
            <Card.Title style={{ width: '100%', height: '20%' , overflow: 'auto'}}> {props.name} </Card.Title>
            <Card.Text style={{ width: '100%', height: '60%' , overflow: 'auto'}}>
                {props.text}
            </Card.Text>
            <Button className='btn-primary' style={{color:'white'}} onClick={Details}> See More! </Button>
        </Card.ImgOverlay>
    </Card>

);}

export default Render;