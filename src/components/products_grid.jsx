import React, { useState } from "react";
import '../App.css';
import JSONDATA from "../PRODUCTS_DATA.json";
import { useEffect } from "react";

function ProductGrid(props){
    //keeps track of which brand checkboxes are checked
    const [filtersQueue, setFiltersQueue]=useState([])

    const [checkedBrandState, setCheckedBrandState] = useState(
        new Array(get_all_brands().length).fill(false)
    );
    //derives which brands are selected based on checkedBrandState hook
    const [checkedBrands, setCheckedBrands] = useState([])

    const [checkedCameraResolutionState, setCheckedCameraResolutionState] = useState(
        new Array(get_all_camera_resolutions().length).fill(false)
    )
    const [checkedCameraResolutions, setCheckedCameraResolutions] = useState([])

    const [checkedPriceRangeState, setCheckedPriceRangeState] = useState(
        new Array(get_all_price_ranges().length).fill(false)
    )
    const [checkedPriceRanges, setCheckedPriceRanges] = useState()

    const [checkedDeviceTypeState, setCheckedDeviceTypeState] = useState(
        new Array(get_all_device_types().length).fill(false)
    )
    const [checkedDeviceTypes, setCheckedDeviceTypes] = useState([])

    //array of search results based on filter results is stored here
    const [results, setResults] = useState(JSONDATA.filter((product)=>{
        if(props.searchword != ""){
            if(props.selectedCategory != "Category"){
                if(product.category == props.selectedCategory && product.product_name.toLowerCase().includes(props.searchword.toLowerCase())){
                    if(filtersQueue.length != 0){ 
                        let eligible = true
                        filtersQueue.map((filter_function)=>{
                            if(!filter_function(product)){
                                eligible = false
                            }
                        })
                        if(eligible){
                            return product;
                        }
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
    }))

    function get_all_device_types(){
        // var device_types = []
        // JSONDATA.filter((product)=>{
        //     if(props.selectedCategory != "Category"){
        //         if(props.selectedCategory == product.category && !device_types.includes(product.sub_category)){
        //             device_types.push(product.sub_category)
        //         }
        //     }
        // })
        // return device_types;
        var device_types = []
        JSONDATA.filter((product)=>{
            if(!device_types.includes(product.sub_category)){
                device_types.push(product.sub_category)
            }
        })
        return device_types;
    }

    // get all the brands currently in PRODUCTS_DATA.json
    function get_all_brands(){
        // var brands = []
        // JSONDATA.filter((product)=>{
        //     if(props.selectedCategory != "Category"){
        //         if(props.selectedCategory == product.category && !brands.includes(product.brand)){
        //             brands.push(product.brand)
        //         }
        //     }
        // })
        // return brands;
        var brands = []
        JSONDATA.filter((product)=>{
            if(!brands.includes(product.brand)){
                brands.push(product.brand)
            }
        })
        return brands;
    }

    function onRadioSelect(event){
        console.log(event.target.value)
        setCheckedPriceRanges(event.target.value)
    }
    function get_all_price_ranges(maxprice = 50000){
        var ranges = []
        let twentypercent =  maxprice/5;
        for(let i = 1 ; i < 5 ; i++){
            ranges.push(`under ₹${twentypercent + 10000}`)
            twentypercent = twentypercent + 10000
        }
        return ranges;
    }

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
    function handle_add_to_wishlist_click(productId){
        if(props.authenticated){
            let cuser = props.currentuser
            if(cuser.wishlist == null){
                let updatedcart = []
                updatedcart.push(productId)
                cuser.wishlist = updatedcart
                props.setcurrentuser(cuser)
            }else{
                if(!cuser.wishlist.includes(productId)){
                    cuser.wishlist.push(productId)
                    props.setcurrentuser(cuser)
                }
            }
            props.setnoticemessage("Added to wishlist successfully!"); props.setnoticemodal(true)
        }
        else{
            props.setsignupmodal(true)
        }
    }


    //get all the resolutions
    function get_all_camera_resolutions(){
        var resolutions = []
        JSONDATA.filter((product)=>{
            if(!resolutions.includes(product.camera_resolution)){
                resolutions.push(product.camera_resolution)
            }
        })
        return resolutions;
    }



    const brand_check = (product)=>{
        if(checkedBrands.includes(product.brand)){
            return true;
        }
    }

    const camera_resolution_check = (product)=>{
        if(checkedCameraResolutions.includes(product.camera_resolution)){
            return true;
        }
    }

    const device_type_check = (product)=>{
        if(checkedDeviceTypes.includes(product.sub_category)){
            return true;
        }
    }

    const price_range_check = (product) => {
        let values = checkedPriceRanges.split('₹')
        let value = parseInt(values[1]);
        console.log(checkedPriceRanges)
        console.log(value)
        let product_price= parseInt(product.price.substring(1,product.price.length))
        if(value > product_price){
            return true;
        }
    }

    // update search results 
    function update_results(){
        var updated_results = JSONDATA.filter((product)=>{
            if(props.searchword != ""){
                if(props.selectedCategory != "Category"){
                    if(product.category == props.selectedCategory && product.product_name.toLowerCase().includes(props.searchword.toLowerCase())){
                        if(filtersQueue.length != 0){ 
                            let eligible = true
                            filtersQueue.map((filter_function)=>{
                                if(!filter_function(product)){
                                    eligible = false
                                }
                            })
                            if(eligible){
                                return product;
                            }
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
        setResults(updated_results)
    }

    // update the state which holds an array of which filters are currently active
    function update_filters_queue(){
        var updatedFiltersQueue = []
        if(checkedBrands.length != 0){
            updatedFiltersQueue.push(brand_check);
        }
        if(checkedCameraResolutions.length != 0){
            updatedFiltersQueue.push(camera_resolution_check);
        }
        if(checkedDeviceTypes.length != 0){
            updatedFiltersQueue.push(device_type_check);
        }
        if(checkedPriceRanges != null && checkedPriceRanges.length > 0){
            updatedFiltersQueue.push(price_range_check)
        }
        setFiltersQueue(updatedFiltersQueue);
    }

    // when a device type is checked
    function handle_on_device_type_check(position){
        const updatedCheckedDeviceTypeState = checkedDeviceTypeState.map((item, index) =>
        index === position ? !item : item
        );

        setCheckedDeviceTypeState(updatedCheckedDeviceTypeState);
    }

    function handle_on_device_type_change(){
        var device_types = get_all_device_types()
        var updatedDeviceTypes = []
        checkedDeviceTypeState.map((isChecked, index)=>{
            if(isChecked){
                updatedDeviceTypes.push(device_types[index])
            }
        })
        setCheckedDeviceTypes(updatedDeviceTypes);
        // var camera_resolutions = get_all_camera_resolutions();
        // var updatedCheckedCameraResolutions = []
        // checkedCameraResolutionState.map((isChecked, index)=>{
        //     if(isChecked){
        //         updatedCheckedCameraResolutions.push(camera_resolutions[index])
        //     }
        // })
        // setCheckedCameraResolutions(updatedCheckedCameraResolutions)
    }

    // when a checkbox is checked
    function handle_on_brand_check(position){
        const updatedCheckedBrandState = checkedBrandState.map((item, index) =>
        index === position ? !item : item
        );

        setCheckedBrandState(updatedCheckedBrandState);
    }

    // when checkboxes are checked checkedBrands is updated based on checkedBrandState
    function handle_on_brand_change(){
        var brands = get_all_brands();
        var updatedCheckedBrands = []
        checkedBrandState.map((isChecked, index)=>{
            if(isChecked){
                updatedCheckedBrands.push(brands[index])
            }
        })
        setCheckedBrands(updatedCheckedBrands)
        // var camera_resolutions = get_all_camera_resolutions();
        // var updatedCheckedCameraResolutions = []
        // checkedCameraResolutionState.map((isChecked, index)=>{
        //     if(isChecked){
        //         updatedCheckedCameraResolutions.push(camera_resolutions[index])
        //     }
        // })
        // setCheckedCameraResolutions(updatedCheckedCameraResolutions)
    }

    function handle_on_camera_resolution_check(position){
        const updatedCheckedCameraResolutionState = checkedCameraResolutionState.map((item, index) =>
        index === position ? !item : item
        );

        setCheckedCameraResolutionState(updatedCheckedCameraResolutionState);
    }

    function handle_on_camera_resolution_change(){
        var camera_resolutions = get_all_camera_resolutions();
        var updatedCheckedCameraResolutions = []
        checkedCameraResolutionState.map((isChecked, index)=>{
            if(isChecked){
                updatedCheckedCameraResolutions.push(camera_resolutions[index])
            }
        })
        setCheckedCameraResolutions(updatedCheckedCameraResolutions)
    }

    function handle_on_price_range_check(position){
        const updatedPriceRangeState = checkedPriceRangeState.map((item, index) =>
        index === position ? !item : item
        );

        setCheckedPriceRangeState(updatedPriceRangeState);
    }
    function handle_on_price_range_change(){
        var price_ranges = get_all_price_ranges();
        var updatedCheckedPriceRanges = []
        checkedPriceRangeState.map((isChecked, index)=>{
            if(isChecked){
                updatedCheckedPriceRanges.push(price_ranges[index])
            }
        })
        setCheckedPriceRanges(updatedCheckedPriceRanges)
    }

    function renderwishlistbutton(product){
        if(props.authenticated){
            if(props.currentuser.wishlist != null && props.currentuser.wishlist.includes(product.id)){
                return <button class="add-2-wishlist-btn btn" onClick={()=>{handle_add_to_wishlist_click(product.id)}}><img src={require("../media/fullheart.png").default} class="heart-btn"/></button>
            }else{
                return <button class="add-2-wishlist-btn btn" onClick={()=>{handle_add_to_wishlist_click(product.id)}}><img src={require("../media/emptyheart.png").default} class="heart-btn"/></button>
            }
        }else{
            return <button class="add-2-wishlist-btn btn" onClick={()=>{handle_add_to_wishlist_click(product.id)}}><img src={require("../media/emptyheart.png").default} class="heart-btn"/></button>
        }
    }

    function renderbutton(product){
        if(props.authenticated){
            if(props.currentuser.cart != null && props.currentuser.cart.includes(product.id)){
                return <button class="add-2-cart-btn btn btn-secondary">Added to cart</button>                
            }else{
                return <button class="add-2-cart-btn btn btn-warning" onClick={()=>{handle_add_to_cart_click(product.id)}}>Add to cart</button>
            }
        }else{
            return <button class="add-2-cart-btn btn btn-warning" onClick={()=>{handle_add_to_cart_click(product.id)}}>Add to cart</button>
        }
    }

    // USE EFFECT functions to run certain functions on specific STATE CHANGE COMPLETION
    useEffect(()=>{
        handle_on_brand_change();
        handle_on_device_type_change();
        handle_on_camera_resolution_change();
        handle_on_price_range_change();
    },[checkedBrandState, checkedCameraResolutionState, checkedDeviceTypeState, checkedPriceRangeState])
    useEffect(()=>{
        update_results();
    },[filtersQueue])
    useEffect(()=>{
        update_filters_queue();
    },[checkedBrands, checkedCameraResolutions, checkedDeviceTypes, checkedPriceRanges])
    useEffect(()=>{
        update_results();
    },[props.searchword])

    return<div class="search-page">
        {props.selectedCategory != "Category" &&
        <div class="filter-section">
            <div class="filters-section-title">Filters for {props.selectedCategory}</div>
            <div class="filters-holder">
                <div class="brand-filter">
                    <div class="filter-title">Select Brand</div>
                    <div>
                        {get_all_brands().map((brand, index)=>{
                            return<div class="filter-checkbox">
                                <input
                                type="checkbox"
                                id={`custom-checkbox-${index}`}
                                name={brand}
                                value={brand}
                                checked={checkedBrandState[index]}
                                onChange={() => {handle_on_brand_check(index);}}
                            />
                            <label class="filter-label" htmlFor={`custom-checkbox-${index}`}>{brand}</label>
                        </div>
                        })}
                    </div>
                </div>
                <div>
                    <div class="filter-title">Select Camera Resolution</div>
                    <div>
                        {get_all_camera_resolutions().map((resolution, index)=>{
                            return<div class="filter-checkbox">
                                <input
                                type="checkbox"
                                id={`custom-resolution-checkbox-${index}`}
                                name={resolution}
                                value={resolution}
                                checked={checkedCameraResolutionState[index]}
                                onChange={() => {handle_on_camera_resolution_check(index);}}
                            />
                            <label class="filter-label" htmlFor={`custom-resolution-checkbox-${index}`}>{resolution}</label>
                        </div>
                        })}
                    </div>
                </div>
                <div>
                    <div class="filter-title">Select Device Type</div>
                    <div>
                        {get_all_device_types().map((device_type, index)=>{
                            return<div class="filter-checkbox">
                                <input
                                type="checkbox"
                                id={`custom-device-type-checkbox-${index}`}
                                name={device_type}
                                value={device_type}
                                checked={checkedDeviceTypeState[index]}
                                onChange={() => {handle_on_device_type_check(index);}}
                            />
                            <label class="filter-label" htmlFor={`custom-device-type-checkbox-${index}`}>{device_type}</label>
                        </div>
                        })}
                    </div>
                </div>
                <div>
                    <div class="filter-title">Select Price Range</div>
                    <div onChange={onRadioSelect}>
                        {get_all_price_ranges().map((price_range, index)=>{
                            return<div class="filter-checkbox">
                                <input
                                type="radio"
                                id={`custom-price-range-checkbox-${index}`}
                                name={"price_range"}
                                value={price_range}
                                checked={checkedPriceRanges ==price_range}
                                // onChange={() => {handle_on_price_range_check(index);}}
                            />
                            <label class="filter-label" htmlFor={`custom-price-range-checkbox-${index}`}>{price_range}</label>
                        </div>
                        })}
                    </div>
                </div>
            </div>
        </div>}
        <div class={`grid-holder ${props.selectedCategory != "Category"? "width-80": null}`}>
            <div class="products-holder">
                {results.map((product)=>{
                    return <div class={`col-sm-12 ${props.selectedCategory != "Category"? "col-lg-4": "col-lg-3"}`} >
                        <div class="product-tile">
                            <div class="product-photo" onClick={()=>{props.setdisplayproduct(product); props.setproductdisplaymodal(true);}}>
                                <img src={require(`../media/${product.sub_category}.jpg`).default} class="product-image" />
                            </div>
                            <div class="product-info">
                                <div class="product-name-price">
                                    <div class="product-name-price-left">
                                        {product.product_name.length > 18 ? <h5>{`${product.product_name.substring(0,15)}...`}</h5> : <h5>{product.product_name}</h5>}
                                        <p>{product.brand}</p>
                                        <p>{product.price}</p>
                                    </div>
                                    <div class="product-name-price-right">
                                        {renderwishlistbutton(product)}
                                        {/* <button class="add-2-wishlist-btn btn" onClick={handle_add_to_wishlist_click(product.id)}><img src={require("../media/emptyheart.png").default} class="heart-btn"/></button> */}
                                    </div>
                                </div>
                                <div class="add-2-cart-btn-holder">
                                    {renderbutton(product)}
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