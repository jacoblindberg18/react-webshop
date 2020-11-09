import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import Productdetails from "./components/Productdetails/Productdetails";
import Products from "./components/Products/Products";
import CartStatus from "./components/Cart/Cartstatus";
import { IMovies } from "./components/Products/Products";
import Cart from "./components/Cart/Cart";

function App() {
    const [cart, setCart] = useState<IMovies[]>([]);

    function updateCart(product: IMovies) {
        const foundProduct = cart.find((productExistingInCart, index) => {
            return product.id === productExistingInCart.id;
        });


        if (!foundProduct) {
            setCart([...cart, product]);
        } else if(foundProduct && product.empty === true) {
            let foundProductIndex = cart.indexOf(foundProduct);
            cart.splice(foundProductIndex, 1);
            setCart([...cart])
        }else {
            if(foundProduct.amount >= 0) {
                foundProduct.amount += 1;
                setCart([...cart])
            } else {
                foundProduct.amount = 1;
            }
            console.log(cart, foundProduct.amount);
        }

    }

    function emptyCart() {
        setCart([]);
    }
    // console.log(cart, "carthejhejhej");

    return (
        <Router>
            <Navbar cartCount={cart.length}></Navbar>
            <Switch>
                <Route path="/products/:id">
                    <Productdetails></Productdetails>
                </Route>
                <Route path="/" exact={true}>
                    <Products onAddToCartButtonClicked={updateCart}></Products>
                </Route>
                <Route path="/cart">
                    <Cart cart={cart} onAddClicked={updateCart} onEmptyCartClicked={emptyCart}></Cart>
                </Route>
                <Route path="/about">About</Route>
                <Route path="*">Page not found</Route>
            </Switch>
        </Router>
    );
}

export default App;
