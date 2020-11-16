import React from "react";
import { IMovies } from "../Products/Products";
import { Link } from "react-router-dom";
import CartStatus from "./Cartstatus";
import axios from "axios";

interface ICartStatus {
    cart: IMovies[];
    [index: number]: IMovies[];
    onAddClicked: (product: IMovies) => void;
    onEmptyCartClicked: () => void;
}

export default function Cart({ cart, onAddClicked, onEmptyCartClicked }: ICartStatus) {
    // console.log("cart status", cart);

    function pathLink(item: IMovies) {
        return `/products/${item.id}`;
    }

    function updateItemAmount(event: any, item: IMovies) {
        // console.log(event.target.className)
        if (event.target.className !== "add-item-btn") {
            item.amount = item.amount - 2;
        }
        onAddClicked(item);
    }

    function emptyItem(event: any, item: IMovies) {
        item.empty = true;
        onAddClicked(item);
    }

    function emptyCart() {
        onEmptyCartClicked();
    }

    
    function checkout() {
        const orderRows1 = cart.map(item => {
            return {productId: item.id, product: null, amount: item.amount, price: (item.price * item.amount)}
        })
        console.log(orderRows1);
        if (window.confirm("Would you like to checkout?")) {
            let totalPrice = 0;
    
            orderRows1.forEach(element => {
                totalPrice += element.price
            });
    
            const json = {
                companyId: 1818,
                created: new Date().toLocaleDateString("se"),
                createdBy: "test@1818.com / funkar",
                paymentMethod: "VISA / MasterCard",
                totalPrice,
                // orderRows.reduce((orderRow, currentValue): number => orderRow.price + currentValue, 0),
                status: 0,
                orderRows: orderRows1
            };
            
            axios.post("http://medieinstitutet-wie-products.azurewebsites.net/api/orders", json).then(response => {
                emptyCart();
                alert("Thanks for your order");
                console.log("cart payed");
            }).catch(error => {
                alert("Something went wrong. Try to checkout again shortly!")
                console.log(error)
            })
        } else {
            return
        }
    }

    let cartHtml = cart.map((item: IMovies, index) => {
        return (
            <li key={index} className="col-6 col-sm-4 col-lg-3 mb-5 mt-5 text-center">
                <div className="position-relative">
                    <Link to={pathLink(item)} className="d-flex justify-content-center mb-3">
                        <img src={item.imageUrl} alt="" />
                    </Link>
                </div>
                <h6>
                    <span>{item.name}</span> - {item.price}kr
                </h6>
                <button type="button" onClick={(event) => updateItemAmount(event, item)}>-</button>
                <span style={{ margin: "0px 10px" }}>{item.amount}</span>
                <button className="add-item-btn" onClick={(event) => updateItemAmount(event, item)}>
                    +
                </button>
                <button type="button" onClick={(event) => emptyItem(event, item)}>Clear item</button>
            </li>
        );
    });

    return (
        <React.Fragment>
            {cart.length === 0 ? (
                <CartStatus name="cart" title="empty"></CartStatus>
            ) : (
                <div>
                    <button type="button" onClick={emptyCart}>Empty cart</button>
                    <ul>{cartHtml}</ul>
                    <button type="button" onClick={checkout}>Checkout</button>
                </div>
            )}
        </React.Fragment>
    );
}
