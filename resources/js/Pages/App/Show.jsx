import React,{useState} from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router, useForm } from '@inertiajs/react';
import { FaStar } from "react-icons/fa";

const Show = (props) => {
    const app= props.app;
    const user= props.user;
    const reviews = props.reviews;
    const app_reviews = [];
    {   reviews.forEach((review)=>{
            if(review.app_id==app.id){
                app_reviews.push(review);
        }
    })}
    const handleDeleteApp = (id) =>{
        router.delete(`/apps/${id}`,{
            onBefore: () => confirm("本当に削除しますか？"),
        });
    };
    const {data, setData, post}= useForm ({
            title:"",
            text:"",
            stars:0
    });
    
    const [preStars, setPreStars] = useState(0);
    
    const handleSendPosts = (e) => {
        e.preventDefault();
        console.log("pushed");
        setData("stars",Number(selectedStars));
        post(`/apps/${app.id}`);
    };
    function Edit(){
        if (app.user_id==user.id){
            return  (
                    <div>
                        <Link as="button" type="button" className="p-1 bg-blue-300 hover:bg-purple-400 rounded-md"  href={`/apps/${app.id}/edit`}>編集</Link>
                        <Link as="button" type="button" className="p-1 bg-blue-300 hover:bg-purple-400 rounded-md" onClick={() =>handleDeleteApp(app.id)}>delete</Link>
                    </div>
                    );
                
        }
    }
    
    
    const [selectedStars,setSelectedStars] = useState(0);
    
    return (
        <Authenticated auth={props.auth} header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Index
            </h2>
        }>
            <div className="p-12">
                <h1>{ app.name }</h1><img src={app.image} style={{width:200,height:200, borderRadius: 200}}/>
                <p>{ app.description }</p>
                <p>{ app.category.category_name }</p>
            </div>
            <div className="p-12">
                <h2>Review</h2>
                {app_reviews.map((review)=>
                    <div key= {review.id}>
                        <h3>{ review.title }</h3>
                        <p>{ review.text }</p>
                        {[...Array(review.stars)].map((n,i)=>(
                        <FaStar key={i} 
                        selected = {selectedStars>i}
                        color={data.stars>=i||preStars>=i ? "red": "grey"} style={{display: 'inline-block'}}
                        onSelected = {()=>setSelectedStars(i+1)}/>))}
                    </div>
                )}
            </div>
            <div>
                <h3>レビューを投稿</h3>
                <form onSubmit={handleSendPosts}>
                    <div>
                        <h4>Title</h4>
                        <input type="text" placeholder="タイトルを入力してください" onChange={(e)=>setData("title",e.target.value)}/>
                        <span className="text-red-600">{props.errors.title}</span>
                    </div>
                    <div>
                        <h4>Text</h4>
                        <input type = "text" placeholder="本文を入力してください" onChange={(e)=>setData("text",e.target.value)}/>
                        <span className="text-red-600">{props.errors.text}</span>
                    </div>
                    <div>
                        <h4>Rating</h4>
                        {(()=>{
                            const items=[];
                            for(let i=1;i<=5;i++){
                                items.push(<FaStar color={data.stars>=i||preStars>=i ? "red": "grey"} style={{display: 'inline-block'}} onMouseEnter={()=>setPreStars(i)} onMouseLeave={()=>setPreStars(0)} onClick={(e)=>setData("stars",i)}/>);
                            }
                            return items;
                        })()}<br/>
                    </div>
                    <button type="submit" className="p-1 bg-purple-300 hover:bg-purple-400 round-md">send</button>
                </form>
            </div>
            
            <Edit/>
            
            <div>
                <Link href="/apps" className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">戻る</Link>
            </div>
        
        </Authenticated>
        );
};

export default Show;