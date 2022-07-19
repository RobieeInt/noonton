<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckUserSubscription
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $status)
    {
        //kalo user punya subscription aktif tapi ga punya package aktif direct ke payment
        if ($status  == 'true' && !Auth::user()->isActive) {
            return redirect(route('user.dashboard.subscriptionPlan.index'));
        }
        //kalo user punya package aktif gaboleh ke payment bakal direct ke dashboard terus
        if ($status  == 'false' && Auth::user()->isActive) {
            return redirect(route('user.dashboard.index'));
        }

        return $next($request);
    }
}
