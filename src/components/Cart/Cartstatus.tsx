import React from 'react';

interface ICartStatus {
    name: string;
    title: string;
}

export default function CartStatus({name, title}: ICartStatus) {
    return(
        <div className="row">
            <div className="col-10 mx-auto my-2 text-center text-title">
                <h1 className="text-capitalize font-wieght-bold">
                    {name} <strong className="text-primary">{title}</strong>
                </h1>
            </div>
        </div>
    )
}