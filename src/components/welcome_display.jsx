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
    function handle_add_to_cart_click(productId){
        if(props.authenticated){
            let cuser = props.currentuser
            if(cuser.cart == null){
                let updatedcart = []
                updatedcart.push(productId)
                cuser.cart = updatedcart
                props.setcurrentuser(cuser)
            }else{
                if(!cuser.cart.includes(productId)){
                    cuser.cart.push(productId)
                    props.setcurrentuser(cuser)
                }
            }
            console.log(props.currentuser.cart)
            props.setnoticemessage("Added to cart successfully!"); props.setnoticemodal(true)
        }
        else{
            props.setsignupmodal(true)
        }
    }
    function handle_add_to_wishlist_click(productId){
        if(props.authenticated){
            let cuser = props.currentuser
            if(cuser.wishlist == null){
                let updatedcart = []
                updatedcart.push(productId)
                cuser.wishlist = updatedcart
                props.setcurrentuser(cuser)
            }else{
                if(!cuser.wishlist.includes(productId)){
                    cuser.wishlist.push(productId)
                    props.setcurrentuser(cuser)
                }
            }
            props.setnoticemessage("Added to wishlist successfully!"); props.setnoticemodal(true)
        }
        else{
            props.setsignupmodal(true)
        }
    }

    function renderwishlistbutton(product){
        if(props.authenticated){
            if(props.currentuser.wishlist != null && props.currentuser.wishlist.includes(product.id)){
                return <button class="add-2-wishlist-btn btn" onClick={()=>{handle_add_to_wishlist_click(product.id)}}><img src={require("../media/fullheart.png").default} class="heart-btn"/></button>
            }else{
                return <button class="add-2-wishlist-btn btn" onClick={()=>{handle_add_to_wishlist_click(product.id)}}><img src={require("../media/emptyheart.png").default} class="heart-btn"/></button>
            }
        }else{
            return <button class="add-2-wishlist-btn btn" onClick={()=>{handle_add_to_wishlist_click(product.id)}}><img src={require("../media/emptyheart.png").default} class="heart-btn"/></button>
        }
    }
    function renderbutton(product){
        if(props.authenticated){
            if(props.currentuser.cart != null && props.currentuser.cart.includes(product.id)){
                return <button class="add-2-cart-btn btn btn-secondary" onClick={()=>{handle_add_to_cart_click(product.id)}}>Added to cart</button>                
            }else{
                return <button class="add-2-cart-btn btn btn-warning" onClick={()=>{handle_add_to_cart_click(product.id); }}>Add to cart</button>
            }
        }else{
            return <button class="add-2-cart-btn btn btn-warning" onClick={()=>{handle_add_to_cart_click(product.id)}}>Add to cart</button>
        }
    }
    return <div class="home-grid-holder animate-bottom">
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
                                <img src={require(`../media/${product.sub_category}.jpg`).default} class="product-image" />
                            </div>
                            <div class="product-info">
                                <div class="product-name-price">
                                    <div class="product-name-price-left">
                                        <h4>{product.product_name.substring(0,15)}</h4>
                                        <h5>{product.brand}</h5>
                                        <p>{product.price}</p>
                                    </div>
                                    <div class="product-name-price-right">
                                        {renderwishlistbutton(product)}
                                        {/* <button class="add-2-wishlist-btn btn" onClick={handle_add_to_wishlist_click}><img src={require("../media/emptyheart.png").default} class="heart-btn"/></button> */}
                                    </div>
                                </div>
                                <div class="add-2-cart-btn-holder">
                                    {renderbutton(product)}
                                    {/* {props.authenticated)

                                    if(props.currentuser.cart != null && props.currentuser.cart.includes(product.id)){
                                        return <button class="add-2-cart-btn btn btn-warning" onClick={()=>{handle_add_to_cart_click(product.id)}}>Add to cart</button>
                                    }
                                        <button class="add-2-cart-btn btn btn-warning" onClick={()=>{handle_add_to_cart_click(product.id)}}>Add to cart</button>:
                                        <button class="add-2-cart-btn btn btn-secondary" onClick={()=>{handle_add_to_cart_click(product.id)}}>Added to cart</button>
                                    :<button class="add-2-cart-btn btn btn-warning" onClick={()=>{handle_add_to_cart_click(product.id)}}>Add to cart</button>                                    
                                    } */}
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