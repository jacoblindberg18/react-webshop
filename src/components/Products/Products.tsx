import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Title from "../Title/Title";
import "./Products.css";

export interface IMovies {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    amount: number;
    empty: boolean;
}

interface IUseTool {
    onAddToCartButtonClicked: (product: IMovies) => void;
}

export default function Products({ onAddToCartButtonClicked }: IUseTool) {
    const [movies, setMovies] = useState([]);
    const [pageNotFound, setPageNotFound] = useState("");
    let cart: IMovies[] = [];

    useEffect(() => {
        axios
            .get(`http://medieinstitutet-wie-products.azurewebsites.net/api/products`)
            .then((movies) => setMovies(movies.data))
            .catch((e) => setPageNotFound("Oops, something went wrong. Please try again!"));
    }, []);

    if (!movies) {
        return null;
    }

    function pathLink(item: IMovies) {
        return `/products/${item.id}`;
    }

    function addToCart(event: React.MouseEvent<HTMLButtonElement>, item: IMovies, index: number) {
        item.amount = 1;
        item.empty = false;
        const newObject = { ...item };
        // console.log("hej", newObject);

        cart.push(newObject);
        onAddToCartButtonClicked(newObject);
    }

    let moviesHtml = movies.map((item: IMovies, index) => (
        <li key={index} className="col-6 col-sm-4 col-lg-3 mb-5 text-center">
            <div className="position-relative">
                <Link to={pathLink(item)} className="d-flex justify-content-center mb-3">
                    <img src={item.imageUrl} alt="" />
                </Link>
                <button type="button" className="position-absolute add-to-cart" onClick={(event) => addToCart(event, item, index)}>
                    Add to cart <i className="fas fa-cart-plus"></i>
                </button>
            </div>
            <h6>
                <span>{item.name}</span> - {item.price}kr
            </h6>
        </li>
    ));

    return (
        <div>
            <Title name="our" title="products" />
            <div className="container">
                {pageNotFound ? (
                    <div>
                        <h3 style={{textAlign: "center"}}>{pageNotFound}</h3>
                    </div>
                ) : (
                    <ul className="row">{moviesHtml}</ul>
                )}
            </div>
        </div>
    );
}
