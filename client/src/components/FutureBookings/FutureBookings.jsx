import React,{useEffect, useState} from "react";
import { Button, Container, Row, Col, Image, Card } from "react-bootstrap";
import axios from "axios";

export default function FutureBookings() {

    // manage state of information about future bookings 
    const [futureBookingInfo, setFutureBookings] = useState("")

        //get information about future bookings from endpoints 
    async function manageFutureBookings(){
        // let req = axios.get("some_api")
        // let res = await req;
        // maybe some process here 
        // let info = res;  
        // put the data into an array [{...},{...}]
        // ie ↓　
        let info = [{date:"2020/10/10", place:"Izakaya,Tokyo", time:"10:00~12:00"},{date:"2020/10/30", place:"Cafe,Tokyo", time:"17:00~20:00"}]
        console.log(info)
        return setFutureBookings(info.map((el)=>{
          return (
            <div>
            <Container>
            <Card style={{ width: "auto",margin:"15px" }}>
              <Card.Body>
                <Card.Title style={{fontSize:"30px" ,textAlign:"center"}}>{el.date}</Card.Title>
                <Card.Text style={{fontSize:"25px" ,textAlign:"center"}}>
                  {el.time}
                </Card.Text>
                <Card.Text style={{fontSize:"25px" ,textAlign:"center"}}>
                  {el.place}
                </Card.Text>
              </Card.Body>
            </Card>
          </Container>
    </div>

          )
        }))
      }
    
    useEffect(()=>manageFutureBookings(), [])

  return (
    <div className="futureBookings" style={{borderStyle:"dotted"}}>
      <h3
        style={{
          padding: "20px 10px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Future bookings
      </h3>
      {futureBookingInfo}
    </div>
  );
}

