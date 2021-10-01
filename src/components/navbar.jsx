import React, { useState } from "react";
import "../App.css";
import JSONDATA from "../PRODUCTS_DATA.json";
import Sidebar from "./sidebar";

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
			<p class="hamburger" onClick={()=>{props.setsidebar(!props.sidebar)}}>&#9776;</p>
			<p class="logo" onClick={(e)=>{e.preventDefault(); props.setSearchPage(false)}}>MAMNOZ</p>
			<form class="nav-search-form">
				<div class="dropdown show">
				<button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split category-button-lg" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    				<span class="category-button-text">{props.selectedCategory}</span>
  				</button>
				<button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split category-button-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    				<span class="category-button-text"></span>
  				</button>
					<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
						{categories.map((category_name)=>{
							if(category_name == "Category"){
								return <button class="dropdown-item" onClick={(e)=>{e.preventDefault(); props.setSelectedCategory(category_name); props.setfiltersidebar(false)}}>{category_name}</button>
							}else{
								return <button class="dropdown-item" onClick={(e)=>{e.preventDefault(); props.setSelectedCategory(category_name); props.setfiltersidebar(true)}}>{category_name}</button>
							}
						})}
					</div>
				</div>
				{/* <button class="btn btn-outline-light navbar-btn" type="submit" onClick={(e)=>{e.preventDefault(); setfilteroptions(!filteroptions)}}>Filters</button> */}
				<input value={searchBarContent} onChange={(event)=>{setSearchBarContent(event.target.value); props.setSuggestions(true)}} class="nav-search-bar" type="search" placeholder="Search" aria-label="Search" autoFocus/>
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
				<button type="button" class="btn btn-warning navbar-btn navbar-btn-cart" onClick={(e)=>{e.preventDefault(); props.setshoppingcartmodal(true);}}><img src={ require("../media/shopping-cart.png").default} class="cart-image"/></button>
				<button type="button" class="btn btn-danger navbar-btn navbar-btn-wishlist" onClick={(e)=>{e.preventDefault(); props.setwishlistmodal(true);}}><img src={ require("../media/emptyheart.png").default} class="cart-image"/></button>
				<button type="button" class="btn btn-light navbar-btn navbar-btn-checkout" onClick={(e)=>{e.preventDefault(); props.setshoppingcartmodal(true);}}>Checkout</button>
			</div>
			:
			<div class="navbar-btn-holder">
				<button type="button" class="btn btn-light navbar-login-btn" onClick={()=>{props.setloginmodal(true)}} >
					Login
				</button>
				<button type="button" class="btn btn-light navbar-signup-btn" onClick={()=>{props.setsignupmodal(true)}}>
					Signup
				</button>
			</div>
			}
		</nav>
}

export default Navbar;