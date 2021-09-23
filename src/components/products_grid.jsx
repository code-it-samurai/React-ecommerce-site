import React, { useState } from "react";
import '../App.css';
import JSONDATA from "../PRODUCTS_DATA.json";
import { useEffect } from "react";
import Product_tile from "./product_tile";

function ProductGrid(props){
    //keeps track of which brand checkboxes are checked
    const [filtersQueue, setFiltersQueue]=useState([])

    // Boolean states are used to track checkbox selections
    const [electronicsFilterBooleanStates, setElectronicsFilterBooleanStates] = useState({
        checkedBrandState:new Array(get_a_field("brand", JSONDATA).length).fill(false),
        checkedCameraResolutionState: new Array(get_a_field("camera_resolution", JSONDATA).length).fill(false),
        checkedDeviceTypeState: new Array(get_a_field("sub_category", JSONDATA).length).fill(false),
    })

    // string states are used to store data interpreted from boolean states
    const [electronicsFilterStringStates, setElectronicsFilterStringStates] = useState({
        checkedBrands: [],
        checkedCameraResolutions: [],
        checkedDeviceTypes: [],
        CheckedPriceRange:[]
    })

    //array of search results based on filter results is stored here
    const [results, setResults] = useState(JSONDATA.filter((product)=>{
        if(props.searchword != ""){
            if(props.selectedCategory != "Category"){
                if(product.category == props.selectedCategory && product.product_name.toLowerCase().includes(props.searchword.toLowerCase())){
                    if(filtersQueue.length != 0){ 
                        let eligible = true
                        filtersQueue.map((filter_object)=>{
                            if(!filter_object.filter_function(filter_object.field_name, product, filter_object.state_array)){
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

    function get_a_field(field_name, data_array){
        var all_field_values = []
        data_array.filter((value)=>{
            if(!all_field_values.includes(value[field_name])){
                all_field_values.push(value[field_name])
            }
        })
        return all_field_values;
    }

    function onRadioSelect(event){
        console.log(event.target.value)
        // setCheckedPriceRange(event.target.value)
        let value = event.target.value
        setElectronicsFilterStringStates(previousValues => {
            return {
              ...previousValues,
              CheckedPriceRange: value
            }
        })
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

    function filter_out(field_name, product, state_array){
        if(state_array.includes(product[field_name])){
            return true;
        }
    }

    const price_range_check = (product) => {
        let values = electronicsFilterStringStates.CheckedPriceRange.split('₹')
        let value = parseInt(values[1]);
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
                            filtersQueue.map((filter_object)=>{
                                if(!filter_object.filter_function(filter_object.field_name, product, filter_object.state_array)){
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
        if(electronicsFilterStringStates.checkedBrands.length != 0){
            updatedFiltersQueue.push({field_name:"brand", state_array:electronicsFilterStringStates.checkedBrands, filter_function: filter_out});
        }
        if(electronicsFilterStringStates.checkedCameraResolutions.length != 0){
            updatedFiltersQueue.push({field_name:"camera_resolution", state_array:electronicsFilterStringStates.checkedCameraResolutions, filter_function: filter_out});
        }
        if(electronicsFilterStringStates.checkedDeviceTypes.length != 0){
            updatedFiltersQueue.push({field_name:"sub_category", state_array:electronicsFilterStringStates.checkedDeviceTypes, filter_function: filter_out});
        }
        if(electronicsFilterStringStates.CheckedPriceRange != null && electronicsFilterStringStates.CheckedPriceRange.length > 0){
            updatedFiltersQueue.push(price_range_check)
        }
        setFiltersQueue(updatedFiltersQueue);
    }

    // updates boolean state when device type filter is selected
    function handle_on_device_type_check(position){
        const updatedCheckedDeviceTypeState = electronicsFilterBooleanStates.checkedDeviceTypeState.map((item, index) =>
        index === position ? !item : item
        );
        setElectronicsFilterBooleanStates(previousValues => {
            return {
              ...previousValues,
              checkedDeviceTypeState: updatedCheckedDeviceTypeState 
            }
        })
    }

    // save text values of selected values from their boolean state
    function handle_on_device_type_change(){
        var device_types = get_a_field("sub_category", JSONDATA)
        var updatedDeviceTypes = []
        electronicsFilterBooleanStates.checkedDeviceTypeState.map((isChecked, index)=>{
            if(isChecked){
                updatedDeviceTypes.push(device_types[index])
            }
        })
        setElectronicsFilterStringStates(previousValues => {
            return {
              ...previousValues,
              checkedDeviceTypes: updatedDeviceTypes
            }
        })
    }

    // updates boolean state when brand filter is selected
    function handle_on_brand_check(position){
        const updatedCheckedBrandState = electronicsFilterBooleanStates.checkedBrandState.map((item, index) =>
        index === position ? !item : item
        );
        setElectronicsFilterBooleanStates(previousValues => {
            return {
              ...previousValues,
              checkedBrandState: updatedCheckedBrandState
            }
        })
        // handle_on_brand_change();
    }

    // save text values of selected values from their boolean state
    function handle_on_brand_change(){
        var brands =get_a_field("brand", JSONDATA)
        var updatedCheckedBrands = []
        electronicsFilterBooleanStates.checkedBrandState.map((isChecked, index)=>{
            if(isChecked){
                updatedCheckedBrands.push(brands[index])
            }
        })
        setElectronicsFilterStringStates(previousValues => {
            return {
              ...previousValues,
              checkedBrands: updatedCheckedBrands
            }
        })
    }

    // updates boolean state when camera resolutions filter is selected
    function handle_on_camera_resolution_check(position){
        const updatedCheckedCameraResolutionState = electronicsFilterBooleanStates.checkedCameraResolutionState.map((item, index) =>
        index === position ? !item : item
        );

        setElectronicsFilterBooleanStates(previousValues => {
            return {
              ...previousValues,
              checkedCameraResolutionState: updatedCheckedCameraResolutionState
            }
        })
        // handle_on_camera_resolution_change();
    }

    // save text values of selected values from their boolean state
    function handle_on_camera_resolution_change(){
        var camera_resolutions = get_a_field("camera_resolution", JSONDATA)
        var updatedCheckedCameraResolutions = []
        electronicsFilterBooleanStates.checkedCameraResolutionState.map((isChecked, index)=>{
            if(isChecked){
                updatedCheckedCameraResolutions.push(camera_resolutions[index])
            }
        })
        setElectronicsFilterStringStates(previousValues => {
            return {
              ...previousValues,
              checkedCameraResolutions: updatedCheckedCameraResolutions
            }
        })
        console.log(camera_resolutions)
        console.log(electronicsFilterStringStates.checkedCameraResolutions)
    }

    function renderCheckBoxSet(get_array, on_change_function, checked_hook){
        return  <div>
            {get_array.map((value, index)=>{
                return<div class="filter-checkbox">
                    <input
                    type="checkbox"
                    id={`custom-${value}-${index}`}
                    name={value}
                    value={value}
                    checked={checked_hook[index]}
                    onChange={() => {on_change_function(index);}}
                />
                <label class="filter-label" htmlFor={`custom-${value}-${index}`}>{value}</label>
            </div>
            })}
        </div>
    }

    function renderRadioButtonSet(get_array, on_change_function, selected_hook){
        return  <div onChange={on_change_function}>
            {get_array().map((value, index)=>{
                return<div class="filter-checkbox">
                    <input
                    type="radio"
                    id={`custom-${value}-${index}`}
                    name={get_array()[0]}
                    value={value}
                    checked={selected_hook == value}
                />
                <label class="filter-label" htmlFor={`custom-${value}-${index}`}>{value}</label>
            </div>
            })}
        </div>
    }

    // USE EFFECT to run certain functions on specific STATE CHANGE COMPLETION to render elements on state update completion
    useEffect(()=>{
        handle_on_brand_change();
        handle_on_camera_resolution_change();
        handle_on_device_type_change();
    },[electronicsFilterBooleanStates])
    useEffect(()=>{
        update_results();
    },[filtersQueue])
    useEffect(()=>{
        update_filters_queue();
        console.log("fq updated")
    },[electronicsFilterBooleanStates, electronicsFilterStringStates])
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
                    {renderCheckBoxSet(get_a_field("brand", JSONDATA), handle_on_brand_check, electronicsFilterBooleanStates.checkedBrandState)}
                </div>
                <div>
                    <div class="filter-title">Select Camera Resolution</div>
                    {renderCheckBoxSet(get_a_field("camera_resolution", JSONDATA), handle_on_camera_resolution_check,electronicsFilterBooleanStates.checkedCameraResolutionState)}
                </div>
                <div>
                    <div class="filter-title">Select Device Type</div>
                    {renderCheckBoxSet(get_a_field("sub_category", JSONDATA), handle_on_device_type_check, electronicsFilterBooleanStates.checkedDeviceTypeState)}
                </div>
                <div>
                    <div class="filter-title">Select Price Range</div>
                    {renderRadioButtonSet(get_all_price_ranges,onRadioSelect, electronicsFilterStringStates.CheckedPriceRange)}
                </div>
            </div>
        </div>}
        <div class={`grid-holder ${props.selectedCategory != "Category"? "width-80": null}`}>
            <div class="products-holder">
                {results.map((product)=>{
                    return  <div class={`col-sm-12 ${props.selectedCategory != "Category"? "col-lg-4": "col-lg-3"}`} >
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



export default ProductGrid;