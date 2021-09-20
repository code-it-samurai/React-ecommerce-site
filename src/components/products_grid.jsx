import React, { useState } from "react";
import '../App.css';
import JSONDATA from "../PRODUCTS_DATA.json";
import { useEffect } from "react";

function ProductGrid(props){
    var img = '../media/hello.jpg'
    var address = "../media/hello.jpg"
    const [checkedBrandState, setCheckedBrandState] = useState(
        new Array(get_all_brands().length).fill(false)
    );
    function get_checked_brands(){
        var brands = get_all_brands()
        var checkedBrands = []
        for(let i = 0 ; i < checkedBrandState; i++){
            if(checkedBrandState[i]){
                console.log(brands[i])
                checkedBrands.push(brands[i]);
            }
        }
        return checkedBrands
    }
    function get_filtered_products(){
        return JSONDATA.filter((product)=>{
            var checkedBrands = get_checked_brands();
            if(props.searchword != ""){
                if(props.selectedCategory != "Category"){
                    if(product.category == props.selectedCategory && product.product_name.toLowerCase().includes(props.searchword.toLowerCase())){
                        if(checkedBrands != null && checkedBrands.includes(product.brand)){
                            return product;
                        }else{
                            return product;
                        }
                    }
                }else{
                    if(product.product_name.toLowerCase().includes(props.searchword.toLowerCase())){
                        return product;
                    }
                }
            }
        })
    }
    function get_all_brands(){
        var brands = []
        JSONDATA.filter((product)=>{
            if(!brands.includes(product.brand)){
                brands.push(product.brand)
            }
        })
        return brands;
    }
	function handle_add_to_cart_click(){
        if(!props.authenticated){
            props.setsignupmodal(true)
        }
    }
    function handle_add_to_wishlist_click(){
        if(!props.authenticated){
            props.setsignupmodal(true)
        }
    }
    function handle_on_change(position){
        const updatedCheckedState = checkedBrandState.map((item, index) =>
        index === position ? !item : item
        );

        setCheckedBrandState(updatedCheckedState);
    }
    useEffect(()=>{
        console.log(checkedBrandState);
    })
    return<div class="search-page">
        {props.selectedCategory != "Category" &&
        <div class="filter-section">
            <div class="filters-title">Filters for {props.selectedCategory}</div>
            <div>
                <div>Select Brand</div>
                <div>
				{get_all_brands().map((brand, index)=>{
                    return<span>
                        <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={brand}
                        value={brand}
                        checked={checkedBrandState[index]}
                        onChange={() => handle_on_change(index)}
                        class="brand-checkboxes"
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>{brand}</label>
                  </span>
                })}
                </div>
                
            </div>
        </div>}
        <div class={`grid-holder ${props.selectedCategory != "Category"? "width-80": null}`}>
            <div class="products-holder">
                {JSONDATA.filter((product)=>{
                        
                        if(props.searchword != ""){
                            if(props.selectedCategory != "Category"){
                                if(product.category == props.selectedCategory && product.product_name.toLowerCase().includes(props.searchword.toLowerCase())){
                                    if(get_checked_brands() != null && get_checked_brands().includes(product.brand)){
                                        return product;
                                    }else{
                                        return product;
                                    }
                                }
                            }else{
                                if(product.product_name.toLowerCase().includes(props.searchword.toLowerCase())){
                                    return product;
                                }
                            }
                        }
                    }).map((product)=>{
                    return <div class={`col-sm-12 ${props.selectedCategory != "Category"? "col-lg-4": "col-lg-3"}`} >
                        <div class="product-tile">
                            <div class="product-photo" onClick={()=>{props.setdisplayproduct(product); props.setproductdisplaymodal(true);}}>
                                <img src={require('../media/macbook-air.jpg').default} class="product-image" />
                            </div>
                            <div class="product-info">
                                <div class="product-name-price">
                                    <div class="product-name-price-left">
                                        <h4>{product.product_name.substring(0,15)}</h4>
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

export default ProductGrid;