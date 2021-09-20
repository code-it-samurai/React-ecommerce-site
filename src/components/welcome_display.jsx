import React from "react";
import JSONDATA from "../PRODUCTS_DATA.json"
import Signup_modal from "./signup_modal";

function Welcome_display(props){
    var count = 0
    var filteredProducts = JSONDATA.filter((product)=>{
        if(count < 10){
            if(product.category == "Electronics" ){
                count +=1;
                return product;
            }
        }
    })
    function handle_add_to_cart_click(){
        if(!props.authenticated){
            props.setsignupmodal(true)
        }
        // props.authenticated ? null : props.setsignupmodal(true)
    }
    function handle_add_to_wishlist_click(){
        if(!props.authenticated){
            props.setsignupmodal(true)
        }
    }
    return <div class="grid-holder">
        {props.authenticated?
        <div class="welcome-note">Welcome back, {props.currentuser.username}</div>:null
        }
        <div class="col-lg-12 home-suggest">
            <h3 class="home-suggest-title">Brand New Electronics</h3>
            <div class="home-suggest-products">
                {filteredProducts.map((product)=>{
                    return <div class="col-lg-3 col-sm-12">
                        <div class="product-tile">
                            <div class="product-photo" onClick={()=>{props.setdisplayproduct(product); props.setproductdisplaymodal(true);}}>
                                <img src={require('../media/macbook-air.jpg').default} class="product-image" />
                            </div>
                            <div class="product-info">
                                <div class="product-name-price">
                                    <div class="product-name-price-left">
                                        <h4>{product.product_name.substring(0,15)}</h4>
                                        <h5>{product.brand}</h5>
                                        <p>{product.price}</p>
                                    </div>
                                    <div class="product-name-price-right">
                                        <button class="add-2-wishlist-btn btn" onClick={handle_add_to_wishlist_click}><img src={require("../media/emptyheart.png").default} class="heart-btn"/></button>
                                    </div>
                                </div>
                                <div class="add-2-cart-btn-holder">
                                    <button class="add-2-cart-btn btn btn-warning" onClick={handle_add_to_cart_click}>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
}

export default Welcome_display;