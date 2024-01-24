// Conditional rendering for admin features in header
// Admin features on their own page
// Add product, edit product, view list of all products
// View a list of all users,
// UseContext for allItems
// Will need all users API
// Get all users needs require Admin

//! Imported Libraries --------------------------
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import Header from "../UniversalFeatures/Navigation/Header";
import Footer from "../UniversalFeatures/Footer";
import { token } from "../UniversalFeatures/Login";
import { userDetails } from "../UniversalFeatures/Login";
import { BASE_URL } from "../../App";
import AddProductAdmin from "./AddProductAdmin";
import ViewUsersAdmin from "./ViewAllUsers/ViewUsersAdmin";
import ViewAllProductsAdmin from "./ViewAllProducts/ViewAllProductsAdmin";
//! ---------------------------------------------

export default function AdminFeaturesPage() {
  console.log("iN ADMIN FEATURES PAGE");
  const [adminPrivileges, setAdminPrivileges] = useState(false);
  const [viewProductForm, setViewProductForm] = useState(false);
  const [viewProductsTable, setViewProductTable] = useState(false);
  const [viewUsersTable, setViewUsersTable] = useState(false);
  const [hideButton, setHideButton] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const details = userDetails.value;
    if (details && details.admin === true) {
      setAdminPrivileges(true);
    }
  }, []);

  function showViewClick(e) {
    setViewProductForm(false);
    setViewProductTable(false);
    setViewUsersTable(false);
    const view = e.target.className;
    view === "viewProductForm"
      ? setViewProductForm(true)
      : view === "viewProductsTable"
      ? setViewProductTable(true)
      : view === "viewUsersTable"
      ? setViewUsersTable(true)
      : console.log("An error occurred in showViewClick: Invalid View Class");
    setHideButton(true);
  }

  function hideViewClick() {
    setViewProductForm(false);
    setViewProductTable(false);
    setViewUsersTable(false);
    setHideButton(false);
  }

  return (
    <>
      {token.value && adminPrivileges ? (
        <>
          <Header />
          <div className="adminPanel">
            <button
              className="viewProductForm"
              onClick={(e) => {
                showViewClick(e);
              }}
            >
              Add Product Form
            </button>
            <button
              className="viewProductsTable"
              onClick={(e) => {
                showViewClick(e);
              }}
            >
              View All Products
            </button>
            <button
              className="viewUsersTable"
              onClick={(e) => {
                showViewClick(e);
              }}
            >
              View All Users
            </button>
            {hideButton && (
              <button
                className="hideButton"
                onClick={() => {
                  hideViewClick();
                }}
              >
                Hide Info
              </button>
            )}
          </div>
          {viewProductForm && <AddProductAdmin />}
          {viewProductsTable && <ViewAllProductsAdmin />}
          {viewUsersTable && <ViewUsersAdmin />}
          <Footer />
        </>
      ) : (
        <button className="goHome" onClick={() => navigate("/")}>
          Nothing to see here.
        </button>
      )}
    </>
  );
}
