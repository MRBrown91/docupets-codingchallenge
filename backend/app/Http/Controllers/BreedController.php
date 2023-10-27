<?php

namespace App\Http\Controllers;

use App\Http\Resources\BreedCollection;
use App\Models\Breed;

class BreedController extends Controller
{
    /**
     * Display a listing of breeds
     */
    public function index()
    {
        $breeds = Breed::all();
        return (new BreedCollection($breeds))->response();
    }
}
