import React, {useState,useEffect} from "react";
import { Link, useForm } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {MuiFileInput} from 'mui-file-input';

const Create = (props) => {
    const categories = props.categories;
    const user = props.user;
    const {data, setData, post} = useForm({
        name: "",
        description: "",
        image: "",
        category_id: categories[0].id
    });
    const [preview, setPreview] = useState();
    const handleSendPosts = (e) => {
        e.preventDefault();
        post("/apps/");
    };
    const handleChangeFile=(file)=>{
        setData("image",URL.createObjectURL(file));
    };
    const handleChangeImg=(file)=>{
        const fileURL=URL.createObjectURL(file);
        setData("image",fileURL);
    };
    
    if (user.role=='editor'||user.role=='administrator'){
        return (
                <Authenticated auth={props.auth} header={
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            新規投稿
                        </h2>
                    }>
    
                    <div className="p-12">
    
                        <form onSubmit={handleSendPosts}>
                            <div>
                                <h2 className="text-blue-600">Name</h2>
                                <input type="text" placeholder="名前を入力してください" onChange={(e) => setData("name", e.target.value)}/>
                                <span className="text-red-600">{props.errors.name}</span>
                            </div>                    
    
                            <div>
                                <h2>Description</h2>
                                <textarea placeholder="詳細を入力してください" onChange={(e) => setData("description", e.target.value)}></textarea>
                                <span className="text-red-600">{props.errors.description}</span>
                            </div>
                            
                            <div>
                                <h2>Category</h2>
                                <select onChange={(e)=>setData("category_id", e.target.value)}>
                                    {categories.map((category)=>(
                                        <option value={category.id}>{category.category_name}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <h2>Image</h2>
                                <input type="file" accept="image/*" onChange={handleChangeImg}/>
                                <img id="preview" src={data.image} className="previewing"/>
                                
                                <span className="text-red-600">{props.errors.image}</span>
                            </div>
            
                            <button type="submit" className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">send</button>
                        </form>
    
                        <Link href="/apps">戻る</Link>
                    </div>
    
                </Authenticated>
                );
    }};

export default Create;