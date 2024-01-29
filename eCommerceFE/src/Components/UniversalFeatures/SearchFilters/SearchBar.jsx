//! Imported Libraries -------------------------
import { useContext, useEffect, useState } from "react";
//! --------------------------------------------

//! Imported Components/Variables---------------
import { token } from "../Login";
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

  const [searchedValue, setSearchedValue] = useState('');

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

    // console.log(searchFilteredArray);

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
          <div className={token.value ? "searchBarParentLoggedIn" : "searchBarParent"}>
        <div className="searchBarTextEntryField">
          <label className="textSearchLabel">
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
            <p
              className="AZFiltering filterButtons"
              onClick={() => AZFiltering()}
            >
              A-Z
            </p>
            <p
              className="ZAFiltering filterButtons"
              onClick={() => ZAFiltering()}
            >
              Z-A
            </p>
          </div>
          <div className="pricingButtons">
                <p
                    className="LHFiltering filterButtons"
                    onClick={() => HLPriceFiltering()}
                    >
                    Price: High-Low
                </p>
                <p
                    className="HLFiltering filterButtons"
                    onClick={() => LHPriceFiltering()}
                    >
                    Price: Low-High{" "}
                </p>
          </div>
          <div className="categoryyButtons">
            <p
              className="categoryFiltering filterButtons"
              onClick={() => CategoryFiltering()}
            >
              Category{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
