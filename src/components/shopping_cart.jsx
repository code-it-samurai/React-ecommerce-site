import React, { useEffect, useState } from "react";
import JSONDATA from "../PRODUCTS_DATA.json"


function Shopping_cart(props){

    const [results, setResults] = useState(JSONDATA.filter((product)=>{
        if(props.currentuser.cart != null && props.currentuser.cart.includes(product.id)){
            return product;
        }
    }));
    const [grandTotal, setGrandTotal] = useState(0)

    function update_results(){
        var updated_results = JSONDATA.filter((product)=>{
            if(props.currentuser.cart != null && props.currentuser.cart.includes(product.id)){
                return product;
            }
        })
        setResults(updated_results)
    }

    function update_grand_total(){
        var total = 0
        results.map((product)=>{
            let price = product.price
            price= parseInt(price.substring(1, price.length))
            total = total + price
        })
        setGrandTotal(total)
    }

    function handle_checked_out(){
        let cuser = props.currentuser
        cuser.cart = []
        props.setcurrentuser(cuser)
    }

    function handle_product_removal(productId){
        let cuser = props.currentuser
        let cartarray = cuser.cart
        let index = cartarray.indexOf(productId)
        cartarray.splice(index, 1)
        cuser.cart = cartarray
        props.setcurrentuser(cuser)
        update_results();
    }

    useEffect(()=>{
        update_results();
    },[props.currentuser])
    useEffect(()=>{
        update_grand_total();
    },[results])
    return <div className="modal__backdrop">
        <div className="shopping-cart-display-modal animate-top">
            <div class="modal-header">
                <h5 class="modal-title" id="signup-modal">Shopping Cart</h5>
                <button type="button" class="close" onClick={()=>{props.setshoppingcartmodal(false)}}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="scroll-div">
                <div class="shopping-cart-modal-body">
                    {results.map((product)=>{
                        return<div class="cart-product">
                            <div class="shopping-cart-image">
                                <img src={require(`../media/${product.sub_category}.jpg`).default} class="shopping-cart-product-image" />
                            </div>
                            <div class="cart-product-info">
                                <div class="shopping-cart-product-name">{product.product_name}</div>
                                <div class="shopping-cart-product-brand">by {product.brand}</div>
                                <div class="shopping-cart-product-price">{product.price}</div>
                            </div>
                            <div class="cart-product-btn-holder">
                                <div class="btn btn-danger remove-item-btn" onClick={()=>{handle_product_removal(product.id)}}>Remove Item</div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div class="modal-footer">
                <div>GRAND TOTAL: ₹{grandTotal}</div>
            </div>
            <div class="modal-footer">
                <button type="submit" onClick={(e)=>{e.preventDefault(); props.setshoppingcartmodal(false); handle_checked_out();}} class="btn cart-checkout-btn" >Checkout</button>
            </div>
        </div>
    </div>
}

export default Shopping_cart