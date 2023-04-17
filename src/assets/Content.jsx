import { React, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import "./Content.css"

export default function Content() {
    const [searchTerm, setSearchTerm] = useState("")
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch("https://fluttering-heather-cayenne.glitch.me/products")
        .then(res => res.json())
        .then(data => setProducts(data))
        
    }, [])
    
    const filteredAPI = products.filter((product) => product.id !== null)
    const navigate = useNavigate();
    const navigateToProduct = (id) => {
        navigate(`/Nav/${id}`)
    }


    return (
        
        <div className="wrapper-main">
            <input className="search-bar" type="text" placeholder="Search for product..." onChange={(event) => setSearchTerm(event.target.value)} />
            
            <div className="card-wrapper">
            {
                filteredAPI.filter((val) => {
                    const hasValidImage =
                        val.productImage &&
                        val.productImage.endsWith(".jpg") &&
                        !val.productImage.endsWith(".png") && 
                        val.productImage.includes("/products/");
                        
                    if (searchTerm === "" && hasValidImage) {
                        return val;
                    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && hasValidImage) {
                        return val;
                    }

                }).map(product => {

                    const hasValidPercent = product.campaign && product.campaign.discountPercent < 100;
                    if( product.price > 0 &&
                        product.productImage && 
                        product.productImage.includes("/products/") &&
                        product.productImage.endsWith(".jpg") &&
                        (hasValidPercent || !product.campaign) ) {

                        return ( 
                            <div className="wrapper-product" key={product.id || product.name}>

                                <div className="box-img">
                                    {product.campaign && product.campaign.name && (
                                        <div className="Rea">{product.campaign.name}</div>
                                        )}
                                        <img onClick={() => navigateToProduct(product.id) } className="img-prod"
                                        src={`https://www.mcdn.net${product.productImage}`} alt=""/>
                                </div>

                                <div className="prod-info">
                                    <h3 onClick={() => navigateToProduct(product.id)}>{product.name}</h3>
                                    <p style={product.campaign ? {textDecoration: "line-through"} : {}}>{product.price.toFixed()}:-</p>
                                    <p className="discount">{product.campaign &&  (product.price - (product.price * product.campaign.discountPercent / 100)).toFixed() + ":-"}</p>
                                </div>

                            </div>
                        )
                    }
                })
            }
            </div>
        </div>
    )
}
