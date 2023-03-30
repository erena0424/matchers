import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Link } from '@inertiajs/react';

const Show = (props) => {
    const { app } = props;
    
    return (
        <Authenticated auth={props.auth} header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Index
            </h2>
        }>
        
            <div className="p-12">
                <h1>{ app.name }</h1>    
        
                <h3>本文</h3>
                <p>{ app.description }</p>
            </div>
            
            <div>
                <Link href="/apps">戻る</Link>
            </div>
        
        </Authenticated>
        );
}

export default Show;