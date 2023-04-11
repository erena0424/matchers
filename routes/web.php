<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AppController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::group(["middleware" => ["auth"]], function() {
    
   //Route::get("/apps", function() {
   //    return Inertia::render("App/Index");
   //}) ;
   //追加
    Route::get("/apps", [AppController::class, "index"])
        ->name('app.index');
    Route::get("/apps/create", [AppController::class,"create"]);
    Route::get("/apps/{app}/edit",[AppController::class,"edit"]);
    Route::get("/apps/{app}", [AppController::class,"show"]);
    Route::post("/apps",[AppController::class,"store"]);
    Route::put("/apps/{app}",[AppController::class,"update"]);
    Route::delete("/apps/{app}",[AppController::class,"delete"]);
   
  
});
    
require __DIR__.'/auth.php';
