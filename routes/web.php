<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

//test middleware spatie
Route::get('admin', function () {
    return 'ini admin';
})->middleware('role:admin');

Route::get('user', function () {
    return 'ini user';
})->middleware('role:user');

//////////////////////////////////////////////////////////////////////////////////////////////

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::redirect('/', '/login');

Route::prefix('type')->name('type.')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Type/Login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('Type/Register');
        // return 'udah registrasi';
    })->name('register');

    Route::get('/dashboard', function () {
        return Inertia::render('Type/Dashboard');
    })->name('dashboard');

    Route::get('/subscriberPlan', function () {
        return Inertia::render('Type/SubscriberPlan');
    })->name('subscriberPlan');

    Route::get('/movie/{slug}', function () {
        return Inertia::render('Type/Movie/Show');
    })->name('movie.show');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
