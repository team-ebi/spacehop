import React from "react";
import imgPic from "../../images/file-20200624-132988-168jsqs (2).jpg"; 
import "./OurProduct.css"; 
import frogPic from "../../images/s512_choju45_0009_0.png";

export default function OurProduct() {
  return (
    <div id="OurProduct-container">
        <header>
            <h1>about</h1>
        </header>
        <h2>
            Tired of working <br/>remotely in your <br/>tiny Tokyo apartment? 
        </h2>
        <img  id="cafe" src={imgPic} alt="image of cafe" />
        <div className="textField">
            <h3>
                Or perhaps you're a small business owner looking for creative ways to keep the lights on?
                Spacehop is our team's vision for a mobile-friendly web app that seeks to help two types of users in today's pandemic-impacted society:
            </h3>
            <h3>
                1. Small businesses that have suffered a loss in business due to the pandemic and have under-utilized spaces that can be rented out for alternative use.
            </h3>
            <h3>
                2. Workers who are now required to work remotely but want to get out of their house from time to time
                </h3>

            <h3>
                With Spacehop, remote workers can conveniently search for places to work from for the day. These spaces can range from izakayas, concert venues, exercise studios, and more!
            </h3>
            <h3>
                The pandemic may not last forever, but remote work will be here to stay. 
            </h3>
            <div className="lastLine-container">
                <h3 id="lastLine">
                    Spacehop can help!
                </h3>
                <img  id="frog" src={frogPic} alt="image of frog" />
            </div>


        </div>
    </div>
  );
}
