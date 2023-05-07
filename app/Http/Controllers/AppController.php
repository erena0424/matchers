<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\App;
use App\Models\Category;
use App\Models\Review;
use App\Http\Requests\PostRequest;
use Auth;
use Gate;
use Illuminate\Support\Facades\DB;

class AppController extends Controller
{   
    public function index(App $app, Category $category)
    {
        $favorites = DB::table("app_user")->where("user_id","=",Auth::id())->get();
        return Inertia::render("App/Index",["user"=>Auth::user(),"favorites"=>$favorites,"apps"=> App::with("category")->get(),"categories"=>$category->get()]);
    }
    public function like(Request $request, App $app){
        $user=Auth::user();
        $like_app->$request['app_id'];
        $f_app->$request->all();
        $user->fill($like_app)->save();
        $user->apps()->attach($f_app);
        return redirect ("/apps");
    }
    public function show(App $app, Review $review){
        return Inertia::render("App/Show",["user"=>Auth::user(),"app"=>$app->load('category'), "reviews"=>$review->get()]);
    }
    public function create(Category $category){
        return Inertia::render("App/Create",["user"=>Auth::user(),"categories"=>$category->get()]);
    }
    public function store(PostRequest $request, App $app)
    {
        $input = $request ->all();
        $input += array("user_id"=>Auth::id());
        $app->fill($input)->save();
        return redirect("/apps/" . $app->id);
    }
    public function send_review(Request $postrequest, App $app, Review $review)
    {
        $input = $postrequest->all();
        $input += array("app_id"=>$app->id);
        $input += array("user_id"=>Auth::id());
        $review->fill($input)->save();
        return redirect("/apps/". $app->id);
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
   public function editorregister(){
       return Inertia::render("Auth/EditorRegister");
   }
   public function favorite(App $app)
   {
       $favorites = DB::table("app_user")->where("user_id","=",Auth::id())->get();
       return Inertia::render("App/Favorite",["user"=>Auth::user(),"favorites"=>$favorites,"apps"=> App::with("category")->get()]);
   }
}
