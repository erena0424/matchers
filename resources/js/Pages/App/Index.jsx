import React, {useState,useRef} from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link,useForm} from '@inertiajs/react';
import {FaHeart} from 'react-icons/fa';

const Index = (props) => {
    const {apps,user,categories,favorites}=props;
    const [like,setLike] = useState();
    const [dislike,setDislike]= useState();
    const [searchedApps,setSearchedApps] = useState(apps);
    console.log(searchedApps);
    const {favoriteApp, setFavoriteApp,post}= useForm({
        user_id:"",
        app_id:"",
    });
    const [keyword, setKeyWord] = useState("");
    const [key_id,setKey_id] = useState(1);
    const inputRef=useRef(null);
    const selectedRef=useRef(null);
    const Createbutton=()=>{
        if (user.role=='editor'||user.role=='administrator'){
            return <Link href="/apps/create">Create</Link>
        }
    }
    const handleSendFavorite = (e)=>{
        e.preventDefault();
        // post("/apps/fav");
    };
    const Savefavoritebutton= (props)=>{
        // console.log("f_app",props.f_app);
        if(isFavorite(props.f_app)){
            return(
            <form>
                <button onClick={setDislike(props.f_app)} className="p-1 bg-purple-400 rounded-md">♥お気に入り</button>
            </form>);
        }else{
            return (
            <form onSubmit={handleSendFavorite}>
                <button onClick={setLike(props.f_app)} className="p-1 bg-purple-200 rounded-md">♥お気に入り</button>
            </form>
            );
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
    function clear(){
        inputRef.current.value="";
        selectedRef.current.value="all";
        setSearchedApps(apps);
    }
    
    function changefavorite(app){
        if (isFavorite(app)){
            console.log("changefavorite, favorite",isFavorite(app));
            setFavoriteApp(favoriteApp.filter(item => item.app_id !== app.id)); //ここ直す
        }else{
            // setFavoriteApp("user_id",user.id);
            // setFavoriteApp("app_id",app.id); この書き方がnot function と言われたので直す。postも上手くいっていない
            post("/apps/fav");
        }
        
        
    }
    

    return (
        <Authenticated auth={props.auth} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Index
                </h2>
            }>
            <Createbutton/><br/>
            <input ref = {inputRef} type='text' value={keyword} onChange={handleKeywordChange}/><br/>
            <select ref={selectedRef} onChange={handleKey_idChange}>
            {categories?.map((category)=>
                <option value={category.id}>{category.category_name}</option>
            )}
                <option　value="all">すべて選択</option>
            </select><br/>
            <button onClick={search} className="p-1 bg-rightblue-200 rounded-md">検索</button><br/>
            <button onClick={clear} className="p-1 bg-purple-400 rounded-md">クリア</button>
            <div className="p-12">
                <h1>App Name</h1>
            
                {searchedApps.map((app) => (
                    <div key = {app.id}>
                        <h2>
                            <Link href={`/apps/${app.id}`}>{ app.name }</Link>
                        </h2>
                        <img src={app.image} style={{width:200,height:200, borderRadius: 200}}/>
                        <li>{ app.description }</li>
                        <li>{ app.category.category_name }</li>
                        
                        <Savefavoritebutton f_app={app}/>
                        <FaHeart className="faheart" id="faheart" onClick={() => changefavorite(app)} style={{color: isFavorite(app) ?　"#E0306C"  : "white"}}/>
                       
                    </div>
                )) }
            </div>
            
        </Authenticated>
        );
};

export default Index;