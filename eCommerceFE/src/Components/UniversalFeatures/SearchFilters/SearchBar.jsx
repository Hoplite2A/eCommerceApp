//! Imported Libraries -------------------------
import { useContext, useState } from "react";
//! --------------------------------------------

//! Imported Components/Variables---------------
import { CartWishlistContext } from "../../../Contexts/CartWishlistContextProvider";
//! --------------------------------------------

export default function SearchBar() {

    const { allItems, setSearchFilteredArray } = useContext(CartWishlistContext);
    // const [searchedValue, setSearchedValue] = useState("");

    // const handleTextSearch = (e) => {
    //     e.preventDefault();
    //     setSearchedValue(e.targe.tvalue);
    // }    

    // if (searchedValue.length > 0) {
    //     allItems.filter((cartItem) => {
    //         return allItems.title.match(searchedValue)
    //             || allItems.description.match(searchedValue)
    //             || allItems.price.match(searchedValue)
    //             || allItems.category.match(searchedValue);
    //     });

    // }
    //*Alphabetical Order - Ascending Order 
    const AZFiltering = () => {
        const sortByAZAllItems = allItems.sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
        setSearchFilteredArray(sortByAZAllItems);
    }
    //*Alphabetical Order - Descending Order 
    const ZAFiltering = () => {
        const sortByZAAllItems = allItems.sort((a, b) => {
            return b.title.localeCompare(a.title);
        });
        setSearchFilteredArray(sortByZAAllItems);
    }
    //* Lowest to Highest Price
    const LHPriceFiltering = () => {
        const sortByLHAllItems = allItems.sort((a, b) => {
            return Number(a.price) > Number(b.price) ? 1 : -1;
        });
        setSearchFilteredArray(sortByLHAllItems);
    }
    //*Highest to Lowest Price
    const HLPriceFiltering = () => {
        const sortByHLAllItems = allItems.sort((a, b) => {
            return Number(a.price) > Number(b.price) ? -1 : 1;
        });
        setSearchFilteredArray(sortByHLAllItems);
    }
    //*Category Filtering
    const CategoryFiltering = () => {
        const sortByAvailabilityAllItems = allItems.sort((a,b) => {
            return a.category > b.category ? 1 : -1;
        });
        setSearchFilteredArray(sortByAvailabilityAllItems);
    }

    return (<>
        <div className="searchBarParent">
            <div className="searchBarTextEntryField">
                <label> Search Bar: 
                    <input type="text" placeholder="Enter search parameters"/>
                </label>
            </div>
            <div className="filterPresetButtons">
                <div className="alphabeticalButtons">
                    <button className="AZFiltering filterButtons" onClick={() => AZFiltering()}>A-Z</button>
                    <button className="ZAFiltering filterButtons" onClick={() => ZAFiltering()}>Z-A</button>
                </div>
                <div className="pricingButtons">
                    <button className="LHFiltering filterButtons" onClick={() => HLPriceFiltering()}>Price: High-Low</button>
                    <button className="HLFiltering filterButtons" onClick={() => LHPriceFiltering()}>Price: Low-High </button>
                </div>
                <div className="categoryyButtons">
                    <button className="categoryFiltering filterButtons" onClick={() => CategoryFiltering()}>Category </button>
                </div>
            </div>
        </div>
    </>)
}