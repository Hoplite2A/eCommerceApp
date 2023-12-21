//! Imported Libraries --------------------------
import { Link } from "react-router-dom";
//! --------------------------------------------

//! Imported Components/Variables---------------
// None to add as this is a simple logo component.
//! ---------------------------------------------

//? The AI Generated CSS Code for dynamic Logo:
// .body {
//     background-color: #1a1a1a;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 100vh;
//     margin: 0;
//   }
//   .logo {
//     width: 200px;
//     height: 200px;
//     border-radius: 50%;
//     background: conic-gradient(from 180deg at 50% 50%, #704214, #d0864e);
//     position: relative;
//     overflow: hidden;
//   }
//   .coffee-cup {
//     width: 80px;
//     height: 80px;
//     background-color: #704214;
//     border-radius: 50%;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     z-index: 1;
//   }
//   .ring {
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     border: 4px solid #d0864e;
//     border-radius: 50%;
//     animation: rotate 6s linear infinite;
//   }
//   @keyframes rotate {
//     from { transform: rotate(0deg);}
//     to {transform: rotate(360deg);}
//   }

export const companyName = "QuantumShop";
// export const companyName = 'JavaJunction';
// export const companyName = 'BinaryBizaar';
// export const companyName = 'CartHub';

export default function Logo() {

  return (
    <>
      <div className="logo">
        <div className="logoBody">
            <Link to='/'>
              <div className="logo">
                <div className="ring"></div>
                <div className="coffee-cup"></div>
              </div>
            </Link>
        </div>
        <Link to="/">
          <h1 className="siteNameText">{companyName}</h1>
        </Link>
      </div>
    </>
  );
}
