import React, { useState } from "react";
import JSONDATA from "../PRODUCTS_DATA.json"
import Product_tile from "./product_tile";

function Welcome_display(props){
    const [activeIndex, setActiveIndex] = useState(0)    
    var slides = [
        {
            content:"slide no. 1",
            description: "this is first slide"
        },
        {
            content:"slide no. 2",
            description: "this is second slide"
        },
        {
            content:"slide no. 3",
            description: "this is third slide"
        }
    ]
    var count = 0
    var filteredProducts = JSONDATA.filter((product)=>{
        if(count < 4){
            if(product.category == "Electronics" ){
                count +=1;
                return product;
            }
        }
    })

    const nextSlide = ()=>{
        if(activeIndex == slides.length-1){
            setActiveIndex(0)
        }else{
            setActiveIndex(activeIndex + 1)
        }
        console.log(activeIndex)
    }

    const previousSlide = ()=>{
        if(activeIndex == 0){
            setActiveIndex(slides.length-1)
        }else{
            setActiveIndex(activeIndex - 1)
        }
        console.log(activeIndex)
    }

    return <div class="home-grid-holder">
        {props.authenticated?
        <div class="welcome-note">Welcome back, {props.currentuser.username}</div>:null
        }
        <div class="suggest-carousel">
            {/* {slides.map((slide)=>{
                return <div>
                    <h3>{slide.content}</h3>
                    <p>{slide.description}</p>
                </div>
            })} */}
            <div class="prev-slide-btn" onClick={()=>{previousSlide(); console.log("clicked")}}>
                <span>prev</span>
            </div>
            <div class="suggest-carousel-active-slide">
                <img src={require(`../media/slide${activeIndex+1}.jpg`).default} class="home-carousel-image"/>
                <h3>{slides[activeIndex].content}</h3>
                <p>{slides[activeIndex].description}</p>
            </div>
            <div class="next-slide-btn" onClick={()=>{nextSlide(); console.log("clicked")}}>
                <span>next</span>
            </div>
        </div>
        <div class="home-suggest">
            <h3 class="home-suggest-title">Brand New Electronics</h3>
            <div class="home-suggest-products">
                {filteredProducts.map((product)=>{
                    return <div>
                        <Product_tile
                            selectedCategory={props.selectedCategory}
                            setdisplayproduct={props.setdisplayproduct}
                            setproductdisplaymodal={props.setproductdisplaymodal} 
                            product={product}
                            setsignupmodal = {props.setsignupmodal}
                            authenticated = {props.authenticated}
                            currentuser = {props.currentuser}
                            setcurrentuser = {props.setcurrentuser}
                            noticemodal={props.noticemodal}
                            setnoticemessage={props.setnoticemessage}
                            setnoticemodal={props.setnoticemodal}
                        />
                    </div>
                })}
            </div>
        </div>
    </div>
}

export default Welcome_display;