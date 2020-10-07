import React, {useState} from 'react'
import Data from '../data/businesses'



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
        <div >
            
            {bizData.map((biz, index)=>( <ul id="location-cell">
            <img id="business-image" src="https://www.japan-guide.com/g9/2005_01b.jpg"/> <br/>
             {biz.Name} <br/>
            <img id="location-png" src="https://img.pngio.com/address-logo-png-105-images-in-collection-page-2-address-logo-png-730_980.png"/> {biz.Address}  <br/>
            <img id="location-png" src="https://simpleicon.com/wp-content/uploads/building-3.png"/> {biz.Type} <br/>
            Availability: 
            <select id="days">
                {/* loop through fetched data */}
                <option value="item">Monday</option>
            </select> <br/>
            <img  id="location-png"src="https://www.pngrepo.com/download/100889/yen-currency-symbol.png"/> {biz.Price} <br/>
            <input type="button" value="Book"></input>
            </ul>))}
        </div>
        </div>
    )
}
