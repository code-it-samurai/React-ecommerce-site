import React, { useState } from "react";

function Product_display(props){
    function handle_add_to_cart_click(){
        if(!props.authenticated){
            props.setproductdisplaymodal(false)
            props.setsignupmodal(true)
        }
        // props.authenticated ? null : props.setsignupmodal(true)
    }
    function handle_add_to_wishlist_click(){
        if(!props.authenticated){
            props.setsignupmodal(true)
        }
    }
    return <div className="modal__backdrop">
        <div className="product-display-modal animate-top">
            <div class="modal-header">
                <h5 class="modal-title" id="signup-modal">{props.product.product_name}</h5>
                <button type="button" class="close" onClick={()=>{props.setproductdisplaymodal(false)}}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="display-modal-body">
                <div class="modal-body-display">
                    <img src={require('../media/macbook-air.jpg').default} class="product-modal-image"/>
                    <div class="modal-body-btn-holder">
                        <div class="btn btn-warning modal-body-btn" onClick={handle_add_to_cart_click}>add to cart</div>
                        <div class="btn btn-warning modal-body-btn">buy now</div>
                    </div>
                </div>
                <div class="modal-body-info">
                    <div>
                        <p><h3>{props.product.product_name}</h3></p>
                    </div>
                    <div>
                        <div class="modal-info-title">Category</div>
                        <p>{props.product.category}</p>
                    </div>
                    <div>
                        <div class="modal-info-title">Product Type</div>
                        <p>{props.product.sub_category}</p>
                    </div>
                    <div>
                        <div class="modal-info-title">Brand</div>
                        <p>{props.product.brand}</p>
                    </div>
                    <div>
                        <div class="modal-info-title">Description</div>
                        <p>
                            is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Product_display;