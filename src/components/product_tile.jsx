import React from "react";
import '../App.css';


function Product_tile(props){

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

    function render_wishlist_button(product){
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
    
    function render_add_to_cart_button(product){
        if(props.authenticated){
            if(props.currentuser.cart != null && props.currentuser.cart.includes(product.id)){
                return <button class="add-2-cart-btn btn btn-secondary">Added to cart</button>                
            }else{
                return <button class="add-2-cart-btn btn btn-warning" onClick={()=>{handle_add_to_cart_click(product.id)}}>Add to cart</button>
            }
        }else{
            return <button class="add-2-cart-btn btn btn-warning" onClick={()=>{handle_add_to_cart_click(product.id)}}>Add to cart</button>
        }
    }

    return<div class="product-tile">
            <div class="product-photo" onClick={()=>{props.setdisplayproduct(props.product); props.setproductdisplaymodal(true);}}>
                <img src={require(`../media/${props.product.sub_category}.jpg`).default} class="product-image" />
            </div>
            <div class="product-info">
                <div class="product-name-price">
                    <div class="product-name-price-left">
                        {props.product.product_name.length > 18 ? <h5>{`${props.product.product_name.substring(0,15)}...`}</h5> : <h5>{props.product.product_name}</h5>}
                        <p>{props.product.brand}</p>
                        <p>{props.product.price}</p>
                        <p>{props.selectedCategory}</p>
                    </div>
                    <div class="product-name-price-right">
                        {render_wishlist_button(props.product)}
                        {/* <button class="add-2-wishlist-btn btn" onClick={handle_add_to_wishlist_click(props.product.id)}><img src={require("../media/emptyheart.png").default} class="heart-btn"/></button> */}
                    </div>
                </div>
                <div class="add-2-cart-btn-holder">
                    {render_add_to_cart_button(props.product)}
                </div>
            </div>
        </div>
}

export default Product_tile;