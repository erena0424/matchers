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
                'name'=>'テスト',
                'description'=>'テスト投稿です',
                'created_at'=> now(),
                'updated_at'=>now(),
            ]);
    }
}
