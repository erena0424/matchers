import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Link, router } from '@inertiajs/react';

const Show = (props) => {
    const { app } = props;
    
    const handleDeleteApp = (id) =>{
        router.delete(`/apps/${id}`,{
            onBefore: () => confirm("本当に削除しますか？"),
        })
    }
    
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
                <p>{ app.category.name}</p>
            </div>
            
            <div>
                <Link href={`/apps/${app.id}/edit`}>編集</Link>
            </div>
            
            <div>
                <Link as="button" type="button" className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md" onClick={() =>handleDeleteApp(app.id)}>delete</Link>
            </div>
            
            <div>
                <Link href="/apps">戻る</Link>
            </div>
        
        </Authenticated>
        );
}

export default Show;