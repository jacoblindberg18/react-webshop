import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./Admin.css";

interface IOrderRows {
    [index: number]: number;
    amount: number;
    id: number;
    orderId: number;
    productId: number;
}

interface IOrders {
    companyId: number;
    id: number;
    orderRows: IOrderRows[];
    paymentMethod: string;
    totalPrice: number;
    [index: number]: number;
}

export default function Admin() {
    const [loginStatus, setLoginStatus] = useState<boolean>();
    const [orders, setOrders] = useState<IOrders[]>([]);

    useEffect(() => {
        function handleLogin() {
            let valuePrompt = prompt("Enter password:");
            if (valuePrompt !== "admin" && valuePrompt !== null) {
                alert("💡HINT💡  Password is 'admin'");
                handleLogin();
            } else if (valuePrompt === null && valuePrompt !== "") {
                setLoginStatus(false);
            } else {
                setLoginStatus(true);
                getOrders();
            }
            function getOrders() {
                Axios.get(`http://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyid=1818`).then((orders) => setOrders(orders.data));
            }
            // console.log(valuePrompt);
        }
        handleLogin();
    }, []);
    // console.log(orders, "ordersssss");

    function deleteOrder(event: React.MouseEvent<HTMLButtonElement>, item: IOrders) {
        if (window.confirm("Would you like to cancel this order?")) {
            Axios.delete(`http://medieinstitutet-wie-products.azurewebsites.net/api/orders/${item.id}`);
            const newOrders = orders.filter((order) => order.id !== item.id);
            setOrders([...newOrders]);
        } else {
            return;
        }
    }

    let adminCartHtml = orders.map((item: IOrders, index) => {
        // console.log("orderrowssssss", index, item.orderRows);
        console.log(item)
        return (
            <React.Fragment key={item.id}>
                <tr>
                    <td>{item.id}</td>
                    <td>
                        {item.orderRows.map((row: IOrderRows, index) => {
                            return (
                                <div key={index}>
                                    {row.productId} x{row.amount}
                                </div>
                            );
                        })}
                    </td>
                    <td>{item.totalPrice}kr</td>
                    <td>
                        <button onClick={(event) => deleteOrder(event, item)}>Cancel order</button>
                    </td>
                </tr>
            </React.Fragment>
        );
    });
    console.log(window.location.pathname);
    // console.log(loginStatus, "login status");
    return (
        <div>
            {loginStatus ? (
                <div>
                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Order Id:</th>
                                <th>Products:</th>
                                <th>Total:</th>
                            </tr>
                        </thead>
                        <tbody>{adminCartHtml}</tbody>
                    </table>
                </div>
            ) : (
                <h3>Login to see and manage orders!</h3>
            )}
        </div>
    );
}
