<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Breed;

class BreedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['name'=>'German Shepherd', 'type'=>'dog'],
            ['name'=>'Bulldog', 'type'=>'dog'],
            ['name'=>'Golden Retriever', 'type'=>'dog'],
            ['name'=>'Poodle', 'type'=>'dog'],
            ['name'=>'Dachshund', 'type'=>'dog'],
            ['name'=>'Gavanese', 'type'=>'dog'],
            ['name'=>'Shiba Inu', 'type'=>'dog'],
            ['name'=>'Dalmatian', 'type'=>'dog'],
            ['name'=>'Chihuahua', 'type'=>'dog'],
            ['name'=>'Beagle', 'type'=>'dog'],

            ['name'=>'British Shorthair', 'type'=>'cat'],
            ['name'=>'Birman', 'type'=>'cat'],
            ['name'=>'Chartreux', 'type'=>'cat'],
            ['name'=>'Foldex', 'type'=>'cat'],
            ['name'=>'Himalayan', 'type'=>'cat'],
            ['name'=>'Korat', 'type'=>'cat'],
            ['name'=>'Manx', 'type'=>'cat'],
            ['name'=>'Ragdoll', 'type'=>'cat'],
            ['name'=>'Savannah', 'type'=>'cat'],
            ['name'=>'Sphynx', 'type'=>'cat'],
        ];

        Breed::insert($data);
    }
}
