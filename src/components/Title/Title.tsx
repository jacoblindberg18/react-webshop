import React from "react";

export interface IName {
    name: string;
    title: string;
}

export default function Title({ name, title}: IName) {
    return (
        <div className="row">
            <div className="col-10 mx-auto my-2 text-center text-title">
                <h1 className="text-capitalize font-wieght-bold">
                    {name} <strong className="text-primary">{title}</strong>
                </h1>
            </div>
        </div>
    );
}

