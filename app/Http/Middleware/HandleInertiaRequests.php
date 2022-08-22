<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */

    private function activePlan() {
        $activePlan = Auth::user() ? Auth::user()->LastActiveUserSubscription : null;


        if (!$activePlan) {
            return null;
        }

        //cek hari terakhir subscription
        //ambil data dari lastactiveusersubscription dari update_at , dari update_at tambahin bulan berdasarkan subscription_plan yang dipilih
        //yang diambil dari active_period_in_month di tabel subscription_plan
        $lastDay = Carbon::parse($activePlan->updated_at)->addMonths($activePlan->subscriptionPlan->active_period_in_month);

        //cek dari aktif sampai lastday
        //ambil dari activeplan updated_at, cek berapa hari beda dengan lastday
        $activeDays = Carbon::parse($activePlan->updated_at)->diffInDays($lastDay);

        //cek hari tersisa
        //dari active days dikurangi dengan hari yang sudah expired
        $remainingActiveDays = Carbon::parse($activePlan->expired_date)->diffInDays(Carbon::now());






        return [
            'name' => $activePlan->subscriptionPlan->name,
            'is_premium' => $activePlan->subscriptionPlan->is_premium,
            'remainingActiveDays' => $remainingActiveDays,
            'activeDays' => $activeDays,
        ];


    }

    private function whatRole() {

        //check role user
        $role = Auth::user() ? Auth::user()->roles->first() : null;
        return $role ? $role->name : null;

    }

    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'activePlan' => $this->activePlan(),
                'whatRole' => $this->whatRole(),
            ],
            'flashMessage' => [
                'type' => Session::get('type'),
                'message' => Session::get('message'),
            ],
            'env' => [
                'MIDTRANS_CLIENTKEY' => env('MIDTRANS_CLIENTKEY'),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
