//! Imported Libraries --------------------------
import { useState, useEffect, useContext } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { BASE_URL } from "../../../App";
import { token } from "../../UniversalFeatures/Login";
import ViewUsersRow from "./ViewUsersRow";
import { CartWishlistContext } from "../../../Contexts/CartWishlistContextProvider";
//! ---------------------------------------------

export default function ViewUsersAdmin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const res = await fetch(`${BASE_URL}/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`,
          },
        });
        const json = await res.json();

        if (json.users && Array.isArray(json.users)) {
          const sortedUsers = json.users.sort((a, b) => a.id - b.id);

          setUsers(sortedUsers);
        } else {
          console.log("Invalid response format. Expected 'users' array.");
        }
      } catch (error) {
        console.log(
          `An error occurred within the ViewUsersAdmin function: ${error}`
        );
      }
    }
    fetchAllUsers();
  }, []);

  useEffect(() => {
    users && console.log("Users Rendered");
  }, [users]);

  return (
    <>
      <table className="styled-table">
        <thead>
          <tr>
            <th colSpan="13">All Users</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>User ID</td>
            <td>Username</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Preferred Name</td>
            <td>Address</td>
            <td>Apartment</td>
            <td>City</td>
            <td>State</td>
            <td>Zip</td>
            <td>Phone</td>
            <td>Email</td>
            <td>Admin</td>
          </tr>
          {users ? (
            users.map((userObject) => (
              <ViewUsersRow key={userObject.id} user={userObject} />
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </>
  );
}
