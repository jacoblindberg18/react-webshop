import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


interface IProductId {
    id: string;
}

interface IMovie {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
}

export default function ProductDetails() {
    const [movie, setMovie] = useState<IMovie>();
    const [pageNotFound, setPageNotFound] = useState("");
    let { id } = useParams<IProductId>();

    useEffect(() => {
        axios.get(`http://medieinstitutet-wie-products.azurewebsites.net/api/products/${id}`).then((movie) => setMovie(movie.data))
        .catch((e) => setPageNotFound("Page not found"));
    }, []);
    console.log("movies in useEffect", movie);
    console.log(id);

    // let moviesHtml = movies.map((item: IMovie) => (
    //     <li key={item.name}>
    //         <img src={item.imageUrl} alt="" />
    //         <h3>
    //             <span>{item.name}</span>- {item.price}kr
    //         </h3>
    //     </li>
    // ));

    if(pageNotFound){
        return (
        <p>{pageNotFound}</p>
        )
    }

    if(!movie){
        return null;
    }
    const {name: movieName, imageUrl} = movie;
    return (
        <div>
            <p>Productdetails work: {id}</p>
            <li key={movieName} className="col-4 mb-5 text-center">
                <img src={imageUrl} alt="" />
                <h6>{movieName}</h6>
            </li>
            <i className="far fa-plus-square"></i>
        </div>
    );
}
