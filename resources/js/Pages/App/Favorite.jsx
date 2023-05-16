import React,{useState} from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router, useForm } from '@inertiajs/react';
import { FaStar } from "react-icons/fa";

const Favorite = (props) => {
    const apps= props.apps;
    const favorites= props.favorites;
    const user= props.user;
    const isFavorite = ({id}) => {
        for (var i=0;i<favorites.length;i++){
            if (favorites[i].app_id==id){
                return true;
            }
        }
        return false;
    };
    
    const favoriteApps =(apps,f_apps)=> {
        apps.forEach((app)=>{
            if(isFavorite(app)){
                f_apps.push(app);
        }
    })};
    
    const f_apps = [];
    {
        apps.forEach((app)=>{
            if(isFavorite(app)){
                f_apps.push(app);
        }
    })}
    console.log("apps",apps);
    console.log("favorites",favorites);
    console.log("f_apps",f_apps);
    
    return (
        <Authenticated auth={props.auth} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    お気に入りのアプリ
                </h2>
            }>
            <div className="p-12">
                <h1>App Name</h1>
            
                {f_apps.map((app)=>(
                    <div key = {app.id}>
                        <h2>
                            <Link href={`/apps/${app.id}`}>{ app.name }</Link>
                        </h2>
                        <img src={app.image} style={{width:200,height:200, borderRadius: 200}}/>
                        <li>{ app.description }</li>
                        <li>{ app.category.category_name }</li>
                    </div>
                ))}
            </div>
            
        </Authenticated>
    );
};

export default Favorite;