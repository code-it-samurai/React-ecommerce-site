import React from "react";
import JSONDATA from "../PRODUCTS_DATA.json"
import Product_tile from "./product_tile";

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

    return <div class="home-grid-holder animate-bottom">
        {props.authenticated?
        <div class="welcome-note">Welcome back, {props.currentuser.username}</div>:null
        }
        <div class="col-lg-12 home-suggest">
            <h3 class="home-suggest-title">Brand New Electronics</h3>
            <div class="home-suggest-products">
                {filteredProducts.map((product)=>{
                    return <div class="col-lg-3 col-sm-12">
                        <Product_tile
                            selectedCategory={props.selectedCategory}
                            setdisplayproduct={props.setdisplayproduct}
                            setproductdisplaymodal={props.setproductdisplaymodal} 
                            product={product}
                            setsignupmodal = {props.setsignupmodal}
                        />
                    </div>
                })}
            </div>
        </div>
    </div>
}

export default Welcome_display;