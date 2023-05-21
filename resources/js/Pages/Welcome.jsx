import { Link, Head,useForm,router } from "@inertiajs/react";
import {useState,useRef} from "react";
import {FaHeart} from "react-icons/fa";
import Popup from "reactjs-popup";

import ApplicationLogo from '@/Components/ApplicationLogo';

const Welcome = (props)=> {
    const {apps,user,categories}=props;
    const [searchedApps,setSearchedApps] = useState(apps);
    const {data, setData, post} = useForm({
        app_id:""
    });
    const [keyword, setKeyWord] = useState("");
    const [key_id,setKey_id] = useState("all");
    const inputRef=useRef(null);
    const selectedRef=useRef(null);
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
        setKeyWord("");
        setKey_id("all");
    }
   
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:left-0">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    <h1 className="font-serif italic font-bold text-blue-300">Matchers</h1>
                </div>
                
                
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 sm:text-right">
                    {props.auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                ログイン
                            </Link>

                            <Link
                                href={route('register')}
                                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                新規登録
                            </Link>
                            <br/>
                            <Link href="/editorregister">
                                投稿者として登録する
                            </Link>
                        </>
                    )}
                </div>
                <div className="p-2 grid place-items-center absolute top-5">
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
                <div className="p-12 sm:fixed sm:top-40 sm:left-0">
                    <h1>App Name</h1>
                
                    {searchedApps.map((app) => (
                        <div key = {app.id}>
                            <h2>
                                <Link href={`/apps/${app.id}`}>{ app.name }</Link>
                                <img src={app.image} style={{width:200,height:200, borderRadius: 200}}/>
                            </h2>
                            
                            <li>{ app.description }</li>
                            <li>{ app.category.category_name }</li>
                            <Link href={route('register')}>
                                <FaHeart className="faheart" id="faheart" style={{color: "white"}} />
                            </Link>
                           
                        </div>
                    )) }
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
            
        </>
        
    );
};
export default Welcome;