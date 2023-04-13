<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class App extends Model
{
    use HasFactory;
    
    protected $fillable = [
        "name",
        "description",
        "user_id",
        "category_id"
    ];
    
    public function users(){
        return $this->belongsToMany(User::class);
    }
    
    public function category(){
        return $this->belongsTo(Category::class);
    }
    
}
