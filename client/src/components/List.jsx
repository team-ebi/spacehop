import React, {useState} from 'react'
import Data from '../data/businesses'
export default function List() {
const [data, setData] = useState(Data);

    return (
        <div >
        <h1>List View</h1>
            <div id="location-container">
            {data.map((biz, index)=>( 
            <div id="location-cell">
            <img id="business-image" src="https://www.japan-guide.com/g9/2005_01b.jpg"/> <br/>
             <span id="location-name">{biz.name}</span> <br/>
             <img id="location-png" src="https://simpleicon.com/wp-content/uploads/building-3.png"/>
            {biz.address_city} <br/>
            <img id="location-png" src="https://img.pngio.com/address-logo-png-105-images-in-collection-page-2-address-logo-png-730_980.png"/>
             {biz.address_street} <br/>
             {biz.address_zip} <br/>
             <img id="location-png" src="https://icons-for-free.com/iconfiles/png/512/furniture+office+seat+icon+icon-1320196644527887723.png"/> {biz.business_type} <br/>
            <img id="location-png" src="https://static.thenounproject.com/png/780051-200.png"/>
            {biz.phone} <br/>
            Availability: 
            <select id="days">
                {biz.all_availabilities.map((avail, index)=>(
                    <option>{avail.day}</option>
                ))}
            </select> <br/>
            <img  id="location-png"src="https://www.pngrepo.com/download/100889/yen-currency-symbol.png"/> {biz.price} <br/>
            <input type="button" value="Book" id="book-button" ></input>
            </div>))}
        </div>
        </div>
    )
}

