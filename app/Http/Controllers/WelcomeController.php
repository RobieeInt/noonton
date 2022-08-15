<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\User;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function index()
    {
        $featuredMovies = Movie::whereIsFeatured(true)->get();
        $movies = Movie::all();
        $user = User::first();

        return Inertia('Welcome', [
            'featuredMovies' => $featuredMovies,
            'movies' => $movies,
            'user' => $user,
        ]);
    }
}
