import React from "react";
import store from "../store";
import Userrow from "./Userrow";

function fetch_data(url){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:8000/"+url, true);
    xhttp.send();
    return xhttp;
}

var xhttp = fetch_data("all");


function Portfolio() {

    const [users, update_users] = React.useState(store.getState().users);

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            // Typical action to be performed when the document is ready:
            let data = JSON.parse(xhttp.responseText);
            store.dispatch({type: "userAdded", payload: data});
        }
    };

    store.subscribe(() => {update_users(store.getState().users);});

    return (
    <div>
      <table className="table">
        <thead>
            <tr>
            <th scope="col">Username</th>
            <th scope="col">Stock</th>
            <th scope="col">Fiat</th>
            </tr>
        </thead>
        <tbody>
            {
                users.map((user) => {
                    return <Userrow key={user.id} name={user.name} stocks={user.stocks} fiat={user.fiat} />
                })
            }
        </tbody>
        </table>
    </div>
  );
}

export default Portfolio;