import React, { useState } from "react";
import "../App.css";
import JSONDATA from "../PRODUCTS_DATA.json";

function Navbar(props){
	const [searchBarContent, setSearchBarContent] = useState("")
    let categories = ["Category", "Clothing", "Stationary", "Electronics", "Accessories", "Furniture", "Tools"]
	var filteredProducts = JSONDATA.filter((product)=>{
		if(props.selectedCategory != "Category"){
			if(product.category == props.selectedCategory && product.product_name.toLowerCase().includes(searchBarContent.toLowerCase())){
				return product;
			}
		}else{
			if(product.product_name.toLowerCase().includes(searchBarContent.toLowerCase())){
				return product;
			}
		}
	})
    return <nav class="navbar-main">
			<div class="logo" onClick={(e)=>{e.preventDefault(); props.setSearchPage(false)}}>MAMNOZ</div>
			<form class="form-inline my-lg-0 nav-search-form">
				<div class="dropdown show">
				<button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split category-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    				<span class="category-button-text">{props.selectedCategory}</span>
  				</button>
					<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
						{categories.map((category_name)=>{
							return <button class="dropdown-item" onClick={(e)=>{e.preventDefault(); props.setSelectedCategory(category_name) }}>{category_name}</button>
						})}
					</div>
				</div>
				{/* <button class="btn btn-outline-light navbar-btn" type="submit" onClick={(e)=>{e.preventDefault(); setfilteroptions(!filteroptions)}}>Filters</button> */}
				<input value={searchBarContent} onChange={(event)=>{setSearchBarContent(event.target.value); props.setSuggestions(true)}} class="nav-search-bar" type="search" placeholder="Search" aria-label="Search"/>
				<button onClick={(e)=>{e.preventDefault(); props.setsearchword(searchBarContent); setSearchBarContent(searchBarContent); props.setSuggestions(false); props.setSearchPage(true)}} class="btn btn-outline-light navbar-search-btn" type="submit">Search</button>
				{searchBarContent != "" && filteredProducts.length != 0 && props.suggestions ? 
				<div class="suggestions-div">
					{filteredProducts.map((product)=>{
						return <div class="suggestion-div">
							<p class="suggestion" onClick={()=>{props.setsearchword(product.product_name); setSearchBarContent(product.product_name); props.setSuggestions(false); props.setSearchPage(true)}}>{product.product_name}</p>
						</div>
					})}
				</div>
				:
				null}
			</form>
			{props.authenticated
			?
			<div class="navbar-btn-holder">
				<button type="button" class="btn btn-warning navbar-btn"><img src={ require("../media/shopping-cart.png").default} class="cart-image"/></button>
				<button type="button" class="btn btn-danger navbar-btn"><img src={ require("../media/emptyheart.png").default} class="cart-image"/></button>
				<button type="button" class="btn btn-light navbar-btn">Checkout</button>
			</div>
			:
			<div class="navbar-btn-holder">
				<button type="button" class="btn btn-light navbar-btn" onClick={()=>{props.setloginmodal(true)}} >
					Login
				</button>
				<button type="button" class="btn btn-light navbar-btn" onClick={()=>{props.setsignupmodal(true)}}>
					Signup
				</button>
			</div>
			}
		</nav>
}

export default Navbar;