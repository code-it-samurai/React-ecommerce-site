import React, { useEffect, useState } from "react";
import JSONDATA from "../PRODUCTS_DATA.json";
import CartProductTile from "./cart-product-tile";


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
        let current_user = props.currentuser
        current_user.cart = []
        props.setcurrentuser(current_user)
    }

    function handle_product_removal(productId){
        let current_user = props.currentuser
        let cartarray = current_user.cart
        let index = cartarray.indexOf(productId)
        cartarray.splice(index, 1)
        current_user.cart = cartarray
        props.setcurrentuser(current_user)
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
                        return <CartProductTile
                            product = {product}
                            currentuser={props.currentuser}
                            handleproductremoval = {handle_product_removal}
                        />
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