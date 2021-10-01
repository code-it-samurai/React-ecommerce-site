import React from "react";
import Product_display from "./product_display";

function Sidebar(props){
    return <div class="sidebar">
        <div>
            hello
            <div class="btn btn-danger" onClick={()=>{props.setsidebar(!props.sidebar)}}>close</div>
            <div class="sidebar-userprofile">
                username
            </div>
            <p>home</p>
            <div class="btn btn-danger" onClick={()=>{props.setsidebar(!props.sidebar)}}>close</div>
            <p>reservation history</p>
            <p>cyg</p>
            <p>mg</p>
            <p>eyp</p>
        </div>
        <div class="signout-btn-div">
            hello
        </div>
    </div>
}

export default Sidebar;