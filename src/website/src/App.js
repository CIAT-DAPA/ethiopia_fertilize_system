import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Map from './components/Map';
import InputForm from './components/InputForm';
import {Header} from './components/common';
import {Container, Card, Row, Col} from "react-bootstrap";

function App() {
  return (
  <>
    <Header/>
    <Container>
      <InputForm/>

      <Map
      center={{lat: 8.36399064480884, lng: 39.40866527188474}}
      zoom={7}
      />

{/* <Row className="mt-4"> */}
        
      {/* </Row> */}
      
    </Container>

    <Card
          className="mt-2"
          bg={'Dark'.toLowerCase()}
          text={'white'}
        >
          <Card.Header><h6>In collaboration with</h6></Card.Header>
            <Card.Body>
              <Row className="justify-content-md-center">
                <Col xs lg="2">
                  {/* <img src={require('./images/fenalce.png')} height={80} width={211}/> */}
                </Col>
                <Col md="auto">
                  {/* <img src={require('./images/cimmyt.png')} height={100} width={250}/> */}
                </Col>
                <Col xs lg="2">
                  {/* <img src={require('./images/alliance.png')} height={101} width={212.8}/> */}
                </Col>
              </Row>
            </Card.Body>
      </Card>
  
  </>
  );
}

export default App;
