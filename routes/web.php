<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\MovieController;
use App\Http\Controllers\User\SubscriptionPlanController;
use App\Http\Controllers\Admin\MovieController as AdminMovieController;
use App\Http\Controllers\Admin\FeaturedController;
use App\Http\Controllers\Admin\SubscriptionPlanController as AdminSubscriptionPlanController;


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

///////////////////////////// MIDDLEWARE USER ////////////////////////////////////////////////
Route::middleware(['auth', 'role:user'])->prefix('dashboard')->name('user.dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');

    Route::get('movie/{movie:slug}', [MovieController::class, 'show'])->name('movie.show')->middleware('checkUserSubscription:true');

    Route::get('subscription-plan', [SubscriptionPlanController::class, 'index'])->name('subscriptionPlan.index')->middleware('checkUserSubscription:false');
    Route::post('subscription-plan/{subscriptionPlan}/user-subscribe', [SubscriptionPlanController::class, 'userSubscribe'])->name('subscriptionPlan.userSubscribe')->middleware('checkUserSubscription:false');

    });

////////////////////////////// MIDDLEWARE ADMIN ////////////////////////////////////////////////////////////////
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.dashboard.')->group(function () {
    // Route::put('movie/{movie]/restore', [AdminMovieController::class, 'restore'])->name('movie.restore');
    Route::put('movie/{movie}/restore', [AdminMovieController::class, 'restore'])->name('movie.restore');
    Route::resource('movie', AdminMovieController::class);
    Route::resource('subscriptionPlan', AdminSubscriptionPlanController::class);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('User/Dashboard/Index');
// })->middleware(['auth', 'verified'])->name('dashboard');

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



require __DIR__.'/auth.php';
