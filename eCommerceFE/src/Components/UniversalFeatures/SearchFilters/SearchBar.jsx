//! Imported Libraries -------------------------
import { useContext, useEffect, useState } from "react";
//! --------------------------------------------

//! Imported Components/Variables---------------
import { CartWishlistContext } from "../../../Contexts/CartWishlistContextProvider";
//! --------------------------------------------

export default function SearchBar() {
  const {
    allItems,
    searchFilteredArray,
    setSearchFilteredArray,
    changeFilter,
    setChangeFilter,
  } = useContext(CartWishlistContext);

  const [searchedValue, setSearchedValue] = useState("");

    useEffect(() => {
        const textFilteredItems = allItems.filter((cartItem) => {
            if (searchedValue === '') {
                return cartItem;
            } else if (cartItem.title.toLowerCase().includes(searchedValue.toLowerCase())) {
                return cartItem;
            } else if (cartItem.description.toLowerCase().includes(searchedValue.toLowerCase())) {
                return cartItem;
            } else if (cartItem.price.toLowerCase().includes(searchedValue.toLowerCase())) {
                return cartItem;
            }
        })
        setChangeFilter(!changeFilter);
        setSearchFilteredArray(textFilteredItems);
    }, [searchedValue]);

    console.log(searchFilteredArray);

  //*Alphabetical Order - Ascending Order
  const AZFiltering = () => {
    const sortByAZAllItems = allItems.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    setChangeFilter(!changeFilter);
    setSearchFilteredArray(sortByAZAllItems);
  };
  //*Alphabetical Order - Descending Order
  const ZAFiltering = () => {
    const sortByZAAllItems = allItems.sort((a, b) => {
      return b.title.localeCompare(a.title);
    });
    setChangeFilter(!changeFilter);
    setSearchFilteredArray(sortByZAAllItems);
  };
  //* Lowest to Highest Price
  const LHPriceFiltering = () => {
    const sortByLHAllItems = allItems.sort((a, b) => {
      return Number(a.price) > Number(b.price) ? 1 : -1;
    });
    setChangeFilter(!changeFilter);
    setSearchFilteredArray(sortByLHAllItems);
  };
  //*Highest to Lowest Price
  const HLPriceFiltering = () => {
    const sortByHLAllItems = allItems.sort((a, b) => {
      return Number(a.price) > Number(b.price) ? -1 : 1;
    });
    setChangeFilter(!changeFilter);
    setSearchFilteredArray(sortByHLAllItems);
  };
  //*Category Filtering
  const CategoryFiltering = () => {
    const sortByAvailabilityAllItems = allItems.sort((a, b) => {
      return a.category > b.category ? 1 : -1;
    });
    setChangeFilter(!changeFilter);
    setSearchFilteredArray(sortByAvailabilityAllItems);
  };

  return (
    <>
      <div className="searchBarParent">
        <div className="searchBarTextEntryField">
          <label>
            Search Bar:
            <input
              className="textSearch"
              type="text"
              placeholder="Enter search parameters"
              onChange={(e) => setSearchedValue(e.target.value)}
            />
          </label>
        </div>
        <div className="filterPresetButtons">
          <div className="alphabeticalButtons">
            <button
              className="AZFiltering filterButtons"
              onClick={() => AZFiltering()}
            >
              A-Z
            </button>
            <button
              className="ZAFiltering filterButtons"
              onClick={() => ZAFiltering()}
            >
              Z-A
            </button>
          </div>
          <div className="pricingButtons">
            <button
              className="LHFiltering filterButtons"
              onClick={() => HLPriceFiltering()}
            >
              Price: High-Low
            </button>
            <button
              className="HLFiltering filterButtons"
              onClick={() => LHPriceFiltering()}
            >
              Price: Low-High{" "}
            </button>
          </div>
          <div className="categoryyButtons">
            <button
              className="categoryFiltering filterButtons"
              onClick={() => CategoryFiltering()}
            >
              Category{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
