import Actions from "./Actions";
import store from "../store";

import { useState } from "react";

export default function Navbar(props) {
  const [prices, update_prices] = useState(store.getState().marketPrices);

  store.subscribe(() => {
    update_prices(store.getState().marketPrices);
  });
  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      >
        <div className="container-fluid">
          <div className="navbar-brand" href="#">
            Current Market Price:&nbsp;
            {prices.length > 0 ? prices[prices.length - 1].price : "NA"}
          </div>
          {/* //dark mode */}
          <a className="navbar-brand" href="/">
            {props.title}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div
              className={`form-check form-switch text-${
                props.mode === "light" ? "dark" : "light"
              }`}
            >
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
                onClick={props.togglemode}
              />
              <label
                className="form-check-label"
                htmlfor="flexSwitchCheckChecked"
              >
                Dark Mode
              </label>
            </div>
          </div>

          {/* Notofication */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Notifications
          </button>
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Actions
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <Actions />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

//     return (
//         <div>
//             <nav className="navbar navbar-dark bg-dark">
//                 <div className="container-fluid">
//                     <div className="navbar-brand" href="#">
//                     Current Market Price:&nbsp;
//                     {
//                         prices.length > 0 ? prices[prices.length-1].price:"NA"
//                     }
//                     </div>
//                     <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
//                         Notifications
//                     </button>
//                     <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//                         <div className="modal-dialog">
//                             <div className="modal-content">
//                             <div className="modal-header">
//                                 <h1 className="modal-title fs-5" id="staticBackdropLabel">Actions</h1>
//                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                             </div>
//                             <div className="modal-body">
//                                 <Actions />
//                             </div>
//                             <div className="modal-footer">
//                                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                             </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     );
// }