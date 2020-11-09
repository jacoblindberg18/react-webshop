import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";

interface ICartCount {
    cartCount: number;
}

export default function Navbar({ cartCount }: ICartCount) {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark px-sm-5 bg-primary">
            <Link to="/">
                <img src={logo} alt="store" className="navbar-brand" />
            </Link>
            <ul className="navbar-nav align-items-center">
                <li className="nav-item ml-5">
                    <Link to="/" className="nav-link">
                        Products
                    </Link>
                </li>
            </ul>
            <Link to="/cart" className="ml-auto">
                <button type="button" className="cart-button position-relative">
                    <span className="mr-2">
                        <i className="fas fa-cart-plus"></i>
                    </span>
                    my cart
                    <span className="badge btn-badge bg-success rounded-circle text-white border border-white position-absolute">{cartCount}</span>
                </button>
            </Link>
        </nav>
    );
}
