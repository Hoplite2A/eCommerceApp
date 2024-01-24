//! Imported Libraries --------------------------
import { useState } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { userDetails } from "../../UniversalFeatures/Login";
import { BASE_URL } from "../../../App";
import { token } from "../../UniversalFeatures/Login";
//! ---------------------------------------------

export default function ViewUsersRow({ user }) {
  console.log(userDetails.value.id);
  let {
    id,
    username,
    first_name,
    last_name,
    preferred_name,
    address,
    apartment,
    city,
    state,
    zip,
    phone,
    email,
    admin,
  } = user;

  const [adminValue, setAdminValue] = useState(admin);
  const [submitVisible, setSubmitVisible] = useState(false);

  async function handleAdminChange(e) {
    setAdminValue(e.target.value);
    setSubmitVisible(true);
  }

  async function submitAdminChange() {
    try {
      const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          admin: adminValue,
        }),
      });
      const json = await res.json();
      console.log(json);
      const info = await json;
      console.log(info);
      setSubmitVisible(false);
    } catch (error) {
      console.log(
        `An error occurrsed with the handleAdminChange function on the ViewUsersRow. Error: ${error}`
      );
    }
  }

  return (
    <tr>
      <td>{id}</td>
      <td>{username}</td>
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{preferred_name}</td>
      <td>{address}</td>
      <td>{apartment}</td>
      <td>{city}</td>
      <td>{state}</td>
      <td>{zip}</td>
      <td>{phone}</td>
      <td>{email}</td>

      {userDetails.value.id !== id ? (
        <td>
          <select value={adminValue.toString()} onChange={handleAdminChange}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </td>
      ) : (
        <td>{adminValue.toString()}</td>
      )}

      {submitVisible && (
        <td>
          <button onClick={submitAdminChange}>Submit Changes</button>
        </td>
      )}
    </tr>
  );
}
