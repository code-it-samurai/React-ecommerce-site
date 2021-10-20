import React from "react";
import Product_display from "./product_display";

function Sidebar(props){
    return <div class = {`sidebar ${props.sidebar ? "translate-sidebar-out" : "translate-sidebar-in"}`}>
        {/* <div class="btn btn-danger" onClick={()=>{props.setsidebar(!props.sidebar)}}>close</div> */}
        <div class="close-filters-sidebar-btn" onClick={()=>{props.setsidebar(!props.sidebar)}}>«</div>
        <div>
            <div class="sidebar-userprofile">
                <img src={require(`../media/default-user-image.png`).default} class="userprofile-image"/>
                <span class="userprofile-username">username</span>
            </div>
            <div class="sidebar-options-div">
                <div class="sidebar-option" onClick={(e)=>{e.preventDefault(); props.setsearchpage(false); props.setsidebar(!props.sidebar);}}>
                    <span>Home</span>
                </div>
                <div class="sidebar-option" onClick={(e)=>{e.preventDefault(); props.setsidebar(!props.sidebar); props.setwishlistmodal(true);}}>
                    <span>Wishlist</span>
                </div>
                <div class="sidebar-option" onClick={(e)=>{e.preventDefault(); props.setsidebar(!props.sidebar); props.setshoppingcartmodal(true);}}>
                    <span>Shopping Cart</span>
                </div>    
            </div>
            
        </div>
        <div class="btn btn-danger signout-btn-div">
            Sign out
        </div>
    </div>
}

export default Sidebar;