<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\App;
use Auth;
use App\Http\Requests\PostRequest;
use App\Models\Category;

class AppController extends Controller
{
    public function index(App $app){
        return Inertia::render("App/Index",["apps"=> App::with("category")->get()]);
    }
    public function show(App $app){
        return Inertia::render("App/Show",["app"=>$app->load('category')]);
    }
    public function create(Category $category){
        return Inertia::render("App/Create",["categories"=>$category->get()]);
    }
    public function store(PostRequest $request, App $app)
    {
        $input = $request ->all();
        $input += array("user_id"=>Auth::id());
        $app->fill($input)->save();
        return redirect("/apps/" . $app->id);
    }
    public function edit(App $app)
    {
        return Inertia::render("App/Edit",["app"=>$app]);
    }
    public function update(PostRequest $postrequest, App $app)
    {
        $input = $postrequest ->all();
        $app -> fill($input) -> save();
        return redirect("/apps/".$app->id);
    }
   public function delete(App $app)
   {
       $app->delete();
       return redirect("/apps");
   }
}
