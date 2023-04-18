import React, {useState} from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from '@inertiajs/react';

const Index = (props) => {
    const {apps}=props;
    const [searchedApps,setSearchedApps] = useState(apps);
    const [keyword, setKeyWord] = useState();
    function handleKeywordChange(e){
      setKeyWord(e.target.value)
     
    }
    function search(){
        console.log(searchedApps);
        const filteredApps = apps.filter((app)=>{
            const name=app.name;
            const description=app.description;
            return name.includes(keyword)||description.includes(keyword);
        })
        setSearchedApps(filteredApps);
    }
    
    
 
    return (
        <Authenticated auth={props.auth} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Index
                </h2>
            }>
            <Link href="/apps/create">Create</Link>
            <input type='text' value={keyword} onChange={handleKeywordChange}/>
            <button onClick={search} >検索</button>
            <div className="p-12">
                <h1>App Name</h1>
            
                {searchedApps.map((app) => (
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