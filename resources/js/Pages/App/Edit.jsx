import React from "react";
import { Link, useForm } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";

const Edit = (props) => {
    const {app} = props;
    const {data, setData, put} = useForm({
        name: app.name,
        description: app.description
    })
    
    const handleSendPosts = (e) => {
        e.preventDefault();
        put(`/apps/${app.id}`);
    }

    console.log(data); // 確認用に追加

    return (
            <Authenticated auth={props.auth} header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Edit
                    </h2>
                }>

                <div className="p-12">

                    <form onSubmit={handleSendPosts}>
                        <div>
                            <h2>Name</h2>
                            <input type="text" placeholder="名前を入力してください" value={data.name} onChange={(e) => setData("name", e.target.value)}/>
                            <span className="text-red-600">{props.errors.name}</span>
                        </div>                    

                        <div>
                            <h2>Description</h2>
                            <textarea placeholder="詳細を入力してください" value={data.description} onChange={(e) => setData("description", e.target.value)}></textarea>
                            <span className="text-red-600">{props.errors.description}</span>
                        </div>
        
                        <button type="submit" className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">send</button>
                    </form>

                    <Link href="/apps">戻る</Link>
                </div>

            </Authenticated>
            );
    }

export default Edit;