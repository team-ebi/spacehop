import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import personImg from "../../img/personal-2.jpg";
import data from "../../data/users.json";

function Profile() {
  //state of data of a person
  const [profile, setProfile] = useState("");

  //get data from some api, set it in profile
  async function manageProfile() {
    // let req = axios.get(some api by id)
    // let res = await req;
    console.log(typeof data);
    console.log(data[0]["first_name:"]);
    return setProfile(
      <ul
        style={{
          listStyle: "none",
          margin: "10px 10px",
          padding: "10px 10px",
          fontSize: "xx-large",
        }}
      >
        <li>{data[3]["first_name:"]}</li>
        <li>{data[3]["last_name"]}</li>
        <li>{data[3]["email"]}</li>
        <li>{data[3]["phone"]}</li>
      </ul>
    );
  }
  useEffect(() => manageProfile(), []);

  return (
    <div className="Profile">
      <h2
        style={{
          padding: "20px 10px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Profile
      </h2>
      <Container>
        <Row>
          <Image
            src={personImg}
            style={{ width: "250px", height: "auto", margin: "0 auto" }}
            rounded
          />
        </Row>
        <Row>{profile}</Row>
        <div className="button_layout" style={{ margin: "0 auto " }}>
          <Button
            variant="success"
            type="submit"
            size="lg"
            block
            // onClick={submitData}
          >
            main page
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
