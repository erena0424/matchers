<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use DateTime;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name'=>'Erena',
            'email'=>'er24en3a6@gmail.com',
            'role'=>'administrator',
            'password'=>Hash::make('abcd1234'),
            'created_at'=> new DateTime(),
            'updated_at'=> new DateTime(),
            ]);
    }
}
