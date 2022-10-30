import { useState } from "react";
import store from "../store";

function fetch_price(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:8000/price", true);
    xhttp.send();
    return xhttp;
}

var xhttp = fetch_price();

function Tform(){
    const [price, update_price] = useState(store.getState().marketprice);
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(xhttp.responseText);
            store.dispatch({type: "updatePrice", payload: data});
            update_price(store.getState().marketprice);
        }
    };

    const [users, update_users] = useState(store.getState().users);
    const [type,update_type] = useState("limit");

    const changeType = (e) => {
        update_type(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let buy = e.target[0].value;
        let user = e.target[1].value;
        let type = e.target[2].value;
        let amount = parseInt(e.target[3].value);
        let price = parseFloat(e.target[4].value);
        console.log(buy, user,type, amount, price);

        let current_user = users.filter((u)=>{return u.name === user })[0];

        console.log(current_user);

        if(buy === "buy"){
            if(price*amount > current_user.fiat){
                alert("Not enough money");
                return;
            }
        }else{
            if(amount > current_user.stocks){
                alert("Not enough stocks");
                return;
            }
        }
        let xhttp = new XMLHttpRequest();

        let data = {
            "buy_or_sell": buy,
            "user": user,
            "order_type": type,
            "stock_amount": amount,
            "price": price
        }

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
              let data = JSON.parse(xhttp.responseText);
              console.log(data);
              data.forEach(element => {
                store.dispatch(element);
              });
        }};

        xhttp.open("POST", "http://127.0.0.1:8000/order", true);
        // xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(data));
    }

    store.subscribe(() => {update_users(store.getState().users);});

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <select name="buyORsell" id = "buyOsell" class="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                </select><br />
                <select name="user" id="user" class="form-select form-select-sm" aria-label=".form-select-sm example">
                    {
                        users.map((user) => {
                            return <option key={user.id} value={user.name}>{user.name}</option>
                        })
                    }
                </select><br />
                <select style={{ marginBottom: "1.5em",  }} onChange={changeType} name="orderType" id = "orderType" class="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="limit">Limit</option>
                    <option value="market">Market</option>
                </select>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Stock Amount</span>
                    <input type="number" name="stock_amount" id="stock_amount" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div class="input-group mb-3">
                    
                    {
                        type === "limit" ?<><span class="input-group-text" id="inputGroup-sizing-default">Price</span><input type="number" name="stock_amount" id="stock_amount" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" /></>
                        : <input type="number" name="price" id="price" value={price} hidden />
                    }
                </div>
                <button class="btn btn-primary" type="submit">Place Order</button>
            </form>
        </div>
    );

}

export default Tform;