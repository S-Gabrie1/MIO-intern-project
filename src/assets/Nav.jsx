import {React, useEffect, useState} from "react"
import { useParams } from "react-router-dom";

export default function Nav() {
    const [products, setProducts] = useState({})
   
    const { id } = useParams();

    useEffect( () => {
        fetch("https://fluttering-heather-cayenne.glitch.me/products/" + id )
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch((err) => {
            console.log("error here", err);
            
          });
    }, [])

    if(products) {
        
        return (
                <div className="single-wrapper">

                    <div className="single-prod-img">
                        <img className="img-prod" src={`https://www.mcdn.net${products.productImage}`}  alt=""/>
                    </div>

                    <div className="single-prodinfo">
                        <h3> {products.name} </h3>
                        <p className="description-info"> {products.description} </p>
                        <p style={products.campaign ? {textDecoration: "line-through"} : {}}>{Number(products.price).toFixed()}:-</p>
                        <p className="discount"> {products.campaign ? (products.price - (products.price * products.campaign.discountPercent / 100)).toFixed() + ":-" : ""} </p>
                        <button className="köp-mig">Köp mig</button>
                    </div>

                </div>
            
        )
    }
}