import React, { useState, useEffect, useContext, useRef } from "react";
import {
  listObjects,
  getSingleObject,
  saveObject,
  deleteObjects,
} from "../../utils/index";
import { UserContext } from "../useContext/UserContext";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import FutureBookings from "../BookingsAll/BookingsAll";
import cornerLogo from "../../images/spacehop-name.png";
import "./Profile.css";
import axios from "axios";
import LoadingSign from "../LoadingSign/LoadingSign";

function Profile() {
  const { user } = useContext(UserContext);
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [displayInputs, setDisplayInputs] = useState(false);
  const [image, setImage] = useState([]);

  // will connect to aws or default to loalhost
  const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  //handle loading sign
  const [loadingImg, setLoadingImg] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      if (user) {
        let req = axios.get(`${baseUrl}/api/users/${user.attributes.email}`);
        let res = await req;
        let data = res.data;
        setGivenName(data[0].first_name);
        setFamilyName(data[0].last_name);
        setEmail(data[0].email);
        setPhone(data[0].phone);

        const arrayOfPhotoObjects = await listObjects(user.attributes.email)
        .then(result => result.map(elem => getSingleObject(user.attributes.email, elem.Key)))
        .then(result => Promise.all(result));
        setImage(arrayOfPhotoObjects[0]);
      }
    }
    fetchUser();
  }, [user]);

  // this function should pull from component state and
  // post to db + update user pool
  async function updateProfile() {
    axios.patch(`${baseUrl}/api/users/`, {
      first_name: givenName,
      last_name: familyName,
      email: email,
      phone: phone,
    });

    setDisplayInputs(false);
  }

  // upload image
  async function uploadImage(event) {
    event.persist();
    
    // set loading sign
    setLoadingImg(true);

    const fileInfo = await listObjects(email);
    const imageKey = fileInfo.map(elem => ({ "Key": elem.Key }) );

    if (imageKey.length === 0) {
      await saveObject(email, event.target.files[0]);
      const newImg = await getSingleObject(
        email,
        `${email}/${event.target.files[0].name}`
      );
      setImage(newImg);
      setLoadingImg(false);
    }

    await deleteObjects(email, imageKey)
    await saveObject(email, event.target.files[0]);
    const newImg = await getSingleObject(
      email,
      `${email}/${event.target.files[0].name}`
    );
    setImage(newImg);
    setLoadingImg(false);
  }

  // create ref for input button
  const hiddenFileInput = useRef(null);

  // open file for image upload
  function openFile() {
    hiddenFileInput.current.click();
  }

  // initializing react router's useHistory hook
  const history = useHistory();
  function goBack() {
    return history.goBack();
  }

  return (
    <div id="user-profile-container">
      <div className="back-icon" onClick={goBack}>
        <FontAwesomeIcon
          icon={faArrowCircleLeft}
          size="lg"
          color="darkslategrey"
        />
        <span className="back-text">Back</span>
      </div>
      <div className="corner-logo-container">
        <img
          className="corner-logo web"
          alt="spacehop-logo"
          src={cornerLogo}
        ></img>
      </div>
      <h2
        style={{
          padding: "20px 10px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Profile
      </h2>
      <div id="section-container">
        <main id="main">
          <div id="profile-info">
            <div id="profile-img">
              <div className="user-img-preview">
                {!image && (
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    size="8x"
                    color="darkslategrey"
                  />
                )}
                {image && (
                  <img src={`data:image;base64,${image}`} id="img-circle" />
                )}
              </div>
              <div className="upload-btn-container">
                <button className="upload-img-button" onClick={openFile}>
                  Upload Photo
                </button>
                <input
                  name="user_photo"
                  ref={hiddenFileInput}
                  accept="image/*"
                  type="file"
                  id="user-photo-file"
                  onInput={uploadImage}
                  hidden=""
                ></input>
              </div>
              {loadingImg && (<div className="loadingSign" style = {{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <LoadingSign />
            </div>)}
            </div>
            <div id="profile-details">
              <div className="detail">
                <div id="profile-categories">First Name: </div>
                {!displayInputs && (
                  <div className="attribute">{user && givenName}</div>
                )}
                {displayInputs && (
                  <div className="attribute">
                    <input
                      className="profile-input"
                      value={givenName}
                      onChange={(e) => setGivenName(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="detail">
                <div id="profile-categories">Last Name: </div>
                {!displayInputs && (
                  <div className="attribute">{user && familyName}</div>
                )}
                {displayInputs && (
                  <div className="attribute">
                    <input
                      className="profile-input"
                      value={familyName}
                      onChange={(e) => setFamilyName(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="detail">
                <div id="profile-categories">Email: </div>
                {!displayInputs && (
                  <div className="attribute">{user && email}</div>
                )}
                {displayInputs && (
                  <div className="attribute">{user && email}</div>
                )}
              </div>
              <div className="detail">
                <div id="profile-categories">Phone Number: </div>
                {!displayInputs && (
                  <div className="attribute">{user && phone}</div>
                )}
                {displayInputs && (
                  <div className="attribute">
                    <input
                      className="profile-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div id="edit-button-container">
            {/* this button will display only if user is not in editing mode */}
            {!displayInputs && (
              <button
                id="edit-button"
                onClick={() => setDisplayInputs(!displayInputs)}
              >
                Edit
              </button>
            )}

            {/* this button will display only if user is editing details
        when clicked, it should post new details to user pool and db */}
            {displayInputs && (
              <button id="edit-button" onClick={updateProfile}>
                Save
              </button>
            )}
          </div>
          {displayInputs && (
            <div id="edit-button-container">
              <button id="cancel" onClick={() => setDisplayInputs(false)}>
                Cancel
              </button>
            </div>
          )}
        </main>
        <hr id="profile-divider"></hr>
        <section>
          <FutureBookings />
        </section>
      </div>
    </div>
  );
}

export default Profile;
