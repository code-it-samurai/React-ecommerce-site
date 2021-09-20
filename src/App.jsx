import React, { useState } from "react";
import Navbar from "./components/navbar";
import ProductGrid from "./components/products_grid";
import Login_modal from "./components/login_modal";
import Signup_modal from "./components/signup_modal";
import Welcome_display from "./components/welcome_display";
import Product_display_screen from "./components/product_display";

function App(){
	const [searchword, setSearchword] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("Category");
	const [authenticated, setAuthenticated] = useState(false);
	const [suggestions, setSuggestions] = useState(false);
	const [searchPage, setSearchPage] = useState(false);
	const [currentUser, setCurrentUser] = useState({username:"testuser", email:"testuser@email.com", password:"password"})
	const [productDisplayModal, setProductDisplayModal] = useState(false);
	const [displayProduct, setDisplayProduct] = useState({})
	const [signupModal, setSignupModal] = useState(false);
	const [loginModal, setLoginModal] = useState(false);

	return<div>
		<Navbar setdisplayproduct={setDisplayProduct} suggestions={suggestions} setSearchPage={setSearchPage} setSuggestions={setSuggestions} searchword={searchword} authenticated={authenticated} setsearchword={setSearchword} selectedCategory = {selectedCategory} setSelectedCategory={setSelectedCategory} signupmodal={signupModal} setsignupmodal={setSignupModal} loginmodal={loginModal} setloginmodal={setLoginModal}/>
		{loginModal && <Login_modal currentuser={currentUser} setcurrentuser={setCurrentUser} authenticated={authenticated} loginmodal={loginModal} setloginmodal={setLoginModal} />}
		{signupModal && <Signup_modal setauthenticated={setAuthenticated} currentuser={currentUser} setcurrentuser={setCurrentUser} authenticated={authenticated} signupmodal={signupModal} setsignupmodal={setSignupModal} />}
		{productDisplayModal && <Product_display_screen product={displayProduct} authenticated={authenticated} setsignupmodal={setSignupModal} productdisplaymodal={productDisplayModal} setproductdisplaymodal={setProductDisplayModal}/>}
		{searchPage ?
			<ProductGrid searchword={searchword} selectedCategory = {selectedCategory} setdisplayproduct={setDisplayProduct} setproductdisplaymodal={setProductDisplayModal} setsignupmodal={setSignupModal}/>
		:
			<Welcome_display currentuser={currentUser} setdisplayproduct={setDisplayProduct} setsignupmodal={setSignupModal} authenticated={authenticated} productdisplaymodal={productDisplayModal} setproductdisplaymodal={setProductDisplayModal}/>
		}
	</div>
}

export default App