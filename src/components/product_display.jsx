import React, { useState } from "react";

function Product_display(props){
    const COMMONFIELDS = ["brand", "sub_category", "product_name", "category", "price", "id"]
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

    // special fields are the fields of information in product object which are different than the common ones
    //special fields are required to conditionally render product information
    //for example a "camera_resolution" field should not be displayed when displaying info of a book
    function get_category_special_fields(product){
        var special_fields = []
        Object.keys(product).forEach((key)=>{
            if(!COMMONFIELDS.includes(key)){
                special_fields.push(key)
            }
        })
        console.log("specialfields " + special_fields)
        return special_fields;
    }

    function render_add_to_cart_button(product){
        if(props.authenticated){
            if(props.currentuser.cart != null && props.currentuser.cart.includes(product.id)){
                return <button class="btn btn-secondary modal-body-btn" onClick={()=>{handle_add_to_cart_click(product.id)}}>Added to cart</button>                
            }else{
                return <button class="btn btn-warning modal-body-btn" onClick={()=>{handle_add_to_cart_click(product.id); }}>Add to cart</button>
            }
        }else{
            return <button class="btn btn-warning modal-body-btn" onClick={()=>{handle_add_to_cart_click(product.id)}}>Add to cart</button>
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
                    <img src={require(`../media/${props.product.sub_category}.jpg`).default} class="product-modal-image"/>
                    <div class="modal-body-btn-holder">
                        {render_add_to_cart_button(props.product)}
                        <div class="btn btn-warning modal-body-btn" onClick={()=>{handle_add_to_cart_click(props.product.id); props.setshoppingcartmodal(true)}}>buy now</div>
                    </div>
                </div>
                <div class="modal-body-info">
                    <div>
                        <p><h3>{props.product.product_name}</h3></p>
                    </div>
                    <div>
                        <div class="modal-info-title">Price</div>
                        <p>{props.product.price}</p>
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
                    {get_category_special_fields(props.product).map((key)=>{
                        return <div>
                            <div class="modal-info-title">{key}</div>
                            <p>{props.product[key]}</p>
                        </div>
                    })}
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