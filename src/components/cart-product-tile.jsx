import React from "react";

function CartProductTile(props){

    return <div class="cart-product">
        <div class="shopping-cart-image">
            <img src={require(`../media/${props.product.sub_category}.jpg`).default} class="shopping-cart-product-image" />
        </div>
        <div class="cart-product-info">
            <div class="shopping-cart-product-name">{props.product.product_name}</div>
            <div class="shopping-cart-product-brand">by {props.product.brand}</div>
            <div class="shopping-cart-product-price">{props.product.price}</div>
        </div>
        <div class="cart-product-btn-holder">
            <div class="btn btn-danger remove-item-btn" onClick={()=>{props.handleproductremoval(props.product.id)}}>Remove Item</div>
        </div>
    </div>
}

export default CartProductTile;