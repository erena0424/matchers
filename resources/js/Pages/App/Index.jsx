import {Link,useForm,router} from '@inertiajs/react';
import React, {useState,useRef } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {FaHeart} from 'react-icons/fa';


const Index = (props) => {
    const {apps,user,categories,favorites}=props;
    const [searchedApps,setSearchedApps] = useState(apps);
    const {data, setData, post} = useForm({
        app_id:""
    });
    const [keyword, setKeyWord] = useState("");
    const [key_id,setKey_id] = useState("all");
    const inputRef=useRef(null);
    const selectedRef=useRef(null);
    const Createbutton=()=>{
        if (user.role=='editor'||user.role=='administrator'){
            return <Link href="/apps/create">Create</Link>
        }
    }
    const isFavorite = ({id}) => {
        for (var i=0;i<favorites.length;i++){
            if (favorites[i].app_id==id){
                return true;
            }
        }
        return false;
    };
    
    function handleKeywordChange(e){
      setKeyWord(e.target.value);
    }
    function handleKey_idChange(e){
        setKey_id(e.target.value);
    }
    function search(){
        const filteredApps = apps.filter((app)=>{
            const name=app.name;
            const description=app.description;
            const category_id=app.category_id;
            if (keyword, key_id=="all"){
                return (name.includes(keyword)||description.includes(keyword));
            }else if(key_id=="all"){
                return;
            }else if(keyword, key_id){
                return ((name.includes(keyword)||description.includes(keyword))&&(category_id==key_id));
            }else if(key_id){
                return (category_id==key_id);
            }
        });
        setSearchedApps(filteredApps);
    }
    async function clear(){
        inputRef.current.value="";
        selectedRef.current.value="all";
        setSearchedApps(apps);
        setKeyWord("");
        setKey_id("all");
    }
    
    async function changefavorite(app,e){
        e.preventDefault();
        console.log(e);
        if (isFavorite(app)){
            console.log("いいね済み");
            router.delete(`/apps/fev/${app.id}`);
        }else{
            console.log("未いいね");
            router.post(`/apps/fev/${app.id}`);
        }
    }
    

    return (
        <Authenticated auth={props.auth} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>
            <div className="p-2 grid place-items-center">
                <input ref = {inputRef} className="w-64 px-18" type='text' value={keyword} onChange={handleKeywordChange}/><br/>
                <select ref = {selectedRef} onChange={handleKey_idChange} className="w-64 px-18">
                    <option value="all">すべて選択</option>
                {categories?.map((category)=>
                    <option value={category.id}>{category.category_name}</option>
                )}
                </select><br/>
                <button onClick={search} className="rounded border-2 border-color:#bfdbfe w-32 px-34">検索</button><br/>
                <button onClick={clear} className="rounded border-2 border-color:#bfdbfe w-32 px-34">クリア</button>
            </div>
            <div className="p-12">
                <h1>App Name</h1>
            
                {searchedApps.map((app) => (
                    <div key = {app.id}>
                        <h2>
                            <Link href={`/apps/${app.id}`}>{ app.name }</Link>
                            <img src={app.image} style={{width:200,height:200, borderRadius: 200}}/>
                        </h2>
                        
                        <li>{ app.description }</li>
                        <li>{ app.category.category_name }</li>
        
                        <FaHeart className="faheart" id="faheart" onClick={(e) => changefavorite(app,e)} style={{color: isFavorite(app) ? "#E0306C"  : "white"}}/>
                       
                    </div>
                )) }
            </div>
            
        </Authenticated>
        );
}

export default Index;