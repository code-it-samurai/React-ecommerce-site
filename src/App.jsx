import React, { useState } from "react";
import Navbar from "./components/navbar";
import ProductGrid from "./components/products_grid";
import Login_modal from "./components/login_modal";
import Signup_modal from "./components/signup_modal";
import Welcome_display from "./components/welcome_display";
import Product_display_screen from "./components/product_display";
import Shopping_cart from "./components/shopping_cart";
import Wishlist from "./components/wishlist";
import Notice_modal from "./components/notice_modal";
import Sidebar from "./components/sidebar";

function App(){
	const [searchword, setSearchword] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("Category");
	const [authenticated, setAuthenticated] = useState(false);
	const [suggestions, setSuggestions] = useState(false);
	const [searchPage, setSearchPage] = useState(false);
	const [currentUser, setCurrentUser] = useState({username:"testuser", email:"testuser@email.com", password:"password", wishlist:[], cart:[]})
	const [productDisplayModal, setProductDisplayModal] = useState(false);
	const [displayProduct, setDisplayProduct] = useState({})
	const [signupModal, setSignupModal] = useState(false);
	const [loginModal, setLoginModal] = useState(false);
	const [shoppingCartModal, setShoppingCartModal] = useState(false);
	const [wishlistModal, setWishlistModal] = useState(false);
	const [noticeModal, setNoticeModal] = useState(false);
	const [noticeMessage, setNoticeMessage] = useState("");
	const [sidebar, setSidebar] = useState(false);
    const [ filterSidebar, setFilterSidebar] = useState(selectedCategory != "Category")


	return<div>
		<Navbar 
			setdisplayproduct={setDisplayProduct} 
			suggestions={suggestions} setSearchPage={setSearchPage} 
			setSuggestions={setSuggestions} 
			searchword={searchword} 
			authenticated={authenticated} 
			setsearchword={setSearchword} 
			selectedCategory = {selectedCategory} 
			setSelectedCategory={setSelectedCategory} 
			signupmodal={signupModal} 
			setsignupmodal={setSignupModal} 
			loginmodal={loginModal} 
			setloginmodal={setLoginModal} 
			shoppingcartmodal={shoppingCartModal} 
			setshoppingcartmodal={setShoppingCartModal} 
			setwishlistmodal={setWishlistModal} 
			sidebar={sidebar} 
			setsidebar={setSidebar} 
			filtersidebar={filterSidebar}
			setfiltersidebar={setFilterSidebar}
		/>
		{loginModal && 
		<Login_modal 
			currentuser={currentUser} 
			setcurrentuser={setCurrentUser} 
			authenticated={authenticated} 
			loginmodal={loginModal} 
			setloginmodal={setLoginModal} 
			noticemodal={noticeModal} 
			setnoticemessage={setNoticeMessage} 
			noticemessage={noticeMessage} 
			setnoticemodal={setNoticeModal} 
			setauthenticated={setAuthenticated} 
			noticemodal={noticeModal} 
			setnoticemessage={setNoticeMessage} 
			noticemessage={noticeMessage} 
			setnoticemodal={setNoticeModal}/>
		}
		{signupModal && <Signup_modal setauthenticated={setAuthenticated} currentuser={currentUser} setcurrentuser={setCurrentUser} authenticated={authenticated} signupmodal={signupModal} setsignupmodal={setSignupModal} noticemodal={noticeModal} setnoticemessage={setNoticeMessage} noticemessage={noticeMessage} setnoticemodal={setNoticeModal}/>}
		{productDisplayModal && <Product_display_screen product={displayProduct} authenticated={authenticated} setsignupmodal={setSignupModal} productdisplaymodal={productDisplayModal} setproductdisplaymodal={setProductDisplayModal} currentuser={currentUser} setcurrentuser={setCurrentUser} shoppingcartmodal={shoppingCartModal} setshoppingcartmodal={setShoppingCartModal} noticemodal={noticeModal} setnoticemessage={setNoticeMessage} noticemessage={noticeMessage} setnoticemodal={setNoticeModal}/>}
		{shoppingCartModal && <Shopping_cart shoppingcartmodal={shoppingCartModal} setshoppingcartmodal={setShoppingCartModal} currentuser={currentUser} setcurrentuser={setCurrentUser} />}
		{wishlistModal && <Wishlist wishlistmodal={wishlistModal} setwishlistmodal={setWishlistModal} currentuser={currentUser} setcurrentuser={setCurrentUser} />}
		{noticeModal && <Notice_modal noticemodal={noticeModal} setnoticemessage={setNoticeMessage} noticemessage={noticeMessage} setnoticemodal={setNoticeModal}/>}
		<div class="main-components-holder">
			{sidebar &&  
				<Sidebar 
					sidebar={sidebar} 
					setsidebar={setSidebar}
				/>
			}
			{searchPage ?
				<ProductGrid 
					searchword={searchword} 
					selectedCategory = {selectedCategory} 
					setdisplayproduct={setDisplayProduct} 
					setproductdisplaymodal={setProductDisplayModal} 
					setsignupmodal={setSignupModal} 
					currentuser={currentUser}
					setcurrentuser={setCurrentUser} 
					authenticated={authenticated} 
					noticemodal={noticeModal} 
					setnoticemessage={setNoticeMessage} 
					noticemessage={noticeMessage} 
					setnoticemodal={setNoticeModal} 
					sidebar={sidebar} 
					setsidebar={setSidebar}
					filtersidebar={filterSidebar}
					setfiltersidebar={setFilterSidebar}
				/>
			:
				<Welcome_display 
					currentuser={currentUser} 
					setdisplayproduct={setDisplayProduct} 
					setsignupmodal={setSignupModal} 
					authenticated={authenticated} 
					productdisplaymodal={productDisplayModal} 
					setproductdisplaymodal={setProductDisplayModal} 
					setcurrentuser={setCurrentUser} 
					noticemodal={noticeModal} 
					setnoticemessage={setNoticeMessage} 
					noticemessage={noticeMessage} 
					setnoticemodal={setNoticeModal}
				/>
			}
		</div>
	</div>
}

export default App