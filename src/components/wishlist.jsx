import React, { useEffect, useState } from "react";
import JSONDATA from "../PRODUCTS_DATA.json"
import CartProductTile from "./cart-product-tile";


function Wishlist(props){

    const [results, setResults] = useState(JSONDATA.filter((product)=>{
        if(props.currentuser.wishlist != null && props.currentuser.wishlist.includes(product.id)){
            return product;
        }
    }));
    const [grandTotal, setGrandTotal] = useState(0)

    function update_results(){
        var updated_results = JSONDATA.filter((product)=>{
            if(props.currentuser.wishlist != null && props.currentuser.wishlist.includes(product.id)){
                return product;
            }
        })
        setResults(updated_results)
    }


    function handle_product_removal(productId){
        let cuser = props.currentuser
        let cartarray = cuser.wishlist
        let index = cartarray.indexOf(productId)
        cartarray.splice(index, 1)
        cuser.wishlist = cartarray
        props.setcurrentuser(cuser)
        update_results();
    }

    useEffect(()=>{
        update_results();
    },[props.currentuser])
    return <div className="modal__backdrop">
        <div className="shopping-cart-display-modal animate-top">
            <div class="modal-header">
                <h5 class="modal-title" id="signup-modal">Wishlist</h5>
                <button type="button" class="close" onClick={()=>{props.setwishlistmodal(false)}}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="scroll-div">
                <div class="wishlist-modal-body">
                    {results.map((product)=>{
                        return<CartProductTile
                            product = {product}
                            currentuser={props.currentuser}
                            handleproductremoval = {handle_product_removal}
                        />
                    })}
                </div>
            </div>
        </div>
    </div>
}

export default Wishlist;