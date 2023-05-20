<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\App;
use App\Models\Category;
use App\Models\Review;
use App\Http\Requests\PostRequest;
use App\Http\Requests\ReviewRequest;
use Auth;
use Gate;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

class AppController extends Controller
{   
    public function welcome(App $app, Category $category)
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            "user"=>Auth::user(),"apps"=> App::with("category")->get(),"categories"=>$category->get()
        ]);
    }
    public function index(App $app, Category $category)
    {
        $favorites = DB::table("app_user")->where("user_id","=",Auth::id())->get();
        return Inertia::render("App/Index",["user"=>Auth::user(),"favorites"=>$favorites,"apps"=> App::with("category")->get(),"categories"=>$category->get()]);
    }
    public function like(Request $request, App $app){
        $user=Auth::user();
        $input = $request ->all();
        $input += array("app_id"=>$app->id);
        $user->apps()->attach($input);
        return false;
    }
    public function dislike(App $app){
        $user=Auth::user();
        $user->apps()->detach($app);
        // return redirect ("/apps");
    }
    public function show(App $app, Review $review){
        $favorites = DB::table("app_user")->where("user_id","=",Auth::id())->get();
        return Inertia::render("App/Show",["user"=>Auth::user(),"app"=>$app->load('category'), "reviews"=>$review->get(),"favorites"=>$favorites]);
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
    public function send_review(ReviewRequest $reviewrequest, App $app, Review $review)
    {
        $input = $reviewrequest->all();
        $input += array("app_id"=>$app->id);
        $input += array("user_id"=>Auth::id());
        $review->fill($input)->save();
        return redirect("/apps/". $app->id);
    }
    public function edit(App $app)
    {
        return Inertia::render("App/Edit",["user"=>Auth::user(),"app"=>$app]);
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
   public function favorite(App $app, Category $category)
   {
       $favorites = DB::table("app_user")->where("user_id","=",Auth::id())->get();
       return Inertia::render("App/Favorite",["user"=>Auth::user(),"favorites"=>$favorites,"apps"=> App::with("category")->get()]);
   }
}
