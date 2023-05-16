<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use DateTime;

class AppSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('apps')->insert([
                'user_id'=> 1,
                'category_id'=> 1,
                'name'=>'birdlovers',
                'description'=>'鳥好きのためのSNS',
                'image'=>'https://cdn.pixabay.com/photo/2017/05/08/13/15/bird-2295431__480.jpg',
                'created_at'=> now(),
                'updated_at'=>now(),
            ]);
        DB::table('apps')->insert([
                'user_id'=> 2,
                'category_id'=> 2,
                'name'=>'LearnJapanese',
                'description'=>'日本語学習者とその他の言語を学びたい日本人を繋げるアプリです',
                'image'=>'https://cdn.pixabay.com/photo/2011/12/13/14/31/earth-11015__480.jpg',
                'created_at'=> now(),
                'updated_at'=>now(),
            ]);
    }
}
