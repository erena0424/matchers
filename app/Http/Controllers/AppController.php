<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\App;
use Auth;
use App\Http\Requests\PostRequest;

class AppController extends Controller
{
    public function index(App $app){
        return Inertia::render("App/Index",["apps"=> $app->get()]);
    }
    public function show(App $app){
        return Inertia::render("App/Show",["app"=>$app]);
    }
    public function create(){
        return Inertia::render("App/Create");
    }
    public function store(PostRequest $request, App $app)
    {
        $input = $request ->all();
        $input += array("user_id"=>Auth::id());
        $app->fill($input)->save();
        return redirect("/apps/" . $app->id);
    }
}
