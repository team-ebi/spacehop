import React, {useState} from 'react'
import Data from '../../data/businesses'
import './BizCard.css'



export default function BizCard() {
const [bizData, setBizData] = useState([{
    Name: "Ebi-Chan",
    Address: "3 Chome-12-1 Amanuma Suginami City, Tokyo 167-0032",
    Type: "Izakaya",
    Availability: "Monday",
    Price: 5000
}])



    return (
        <div id="location-container">
            {bizData.map((biz, index)=>( <div id="location-cell">
            <img id="business-image" src="https://www.japan-guide.com/g9/2005_01b.jpg"/> <br/>
             {biz.Name} <br/>
            <img id="location-png" /> {biz.Address}  <br/>
            <img id="location-png" /> {biz.Type} <br/>
            Availability: 
            <select id="days">
                {/* loop through fetched data */}
                <option value="item">Monday</option>
            </select> <br/>
            <img  id="location-png"/> {biz.Price} <br/>
            <input type="button" value="Book"></input>
            </div>))}
        </div>
    )
}
