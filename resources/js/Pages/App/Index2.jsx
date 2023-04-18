{/*
import React, {useState} from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from '@inertiajs/react';

const Index = (props) => {
    const { apps } = props;
 
    return (
        <Authenticated auth={props.auth} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Index
                </h2>
            }>
            <Link href="/apps/create">Create</Link>
            <div className="p-12">
                <h1>App Name</h1>
            
                {apps.map((app) => (
                    <div key = {app.id}>
                        <h2>
                            <Link href={`/apps/${app.id}`}>{ app.name }</Link>
                        </h2>
                        
                        <p>{ app.description }</p>
                        <p>{ app.category.name }</p>
                    </div>
                )) }
            </div>
            
        </Authenticated>
        );
}

export default Index;

*/}