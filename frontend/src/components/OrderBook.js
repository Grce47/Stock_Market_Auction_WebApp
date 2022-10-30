import { useState } from 'react';
import store from '../store';
import "../App.css";

function OrderBook(){
    const [buyP, update_buyP] = useState([]);
    const [sellP, update_sellP] = useState([]);

    
    store.subscribe(() => {

        let buy_arr = store.getState().buyPending;
        buy_arr = buy_arr.sort((a,b)=>{return a.price-b.price;});
        let price = -1;
        let temp = [];
        buy_arr.forEach((u)=>{
            if(u.price !== price){
                temp.push({id:u.id,price:u.price,quantity:u.quantity});
                price = u.price;
            }else{
                temp[temp.length - 1].quantity += u.quantity;
            }
        });

        update_buyP(temp);

        let sell_arr = store.getState().sellPending;
        sell_arr.sort((a,b)=>{return a.price-b.price;});
        price = -1;
        temp = [];
        sell_arr.forEach((u)=>{
            if(u.price !== price){
                temp.push({id:u.id,price:u.price,quantity:u.quantity});
                price = u.price;
            }else{
                temp[temp.length - 1].quantity += u.quantity;
            }
        });

        update_sellP(temp);
    });
    return(
        <div className='row'>
            <div className='col-4 card1 card-body'>
                <h5 class="card-title">Buy</h5>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            buyP.map((order) => {
                                return <tr key={order.id}><td>{order.price}</td><td>{order.quantity}</td></tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='col-4 card1 card-body'>
                <h5 class="card-title">Sell</h5>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            sellP.map((order) => {
                                return <tr key={order.id}><td>{order.price}</td><td>{order.quantity}</td></tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>        
    );
}


export default OrderBook;