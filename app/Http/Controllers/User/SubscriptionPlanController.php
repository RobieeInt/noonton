<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SubscriptionPlanController extends Controller
{
    public function index() {
        $subscriptionPlan = SubscriptionPlan::all();
        // return $subscriptionPlan;
        return Inertia('User/Dashboard/SubscriptionPlan/Index', [
            'subscriptionPlans' => $subscriptionPlan,
        ]);
    }

    public function userSubscribe(Request $request, SubscriptionPlan $subscriptionPlan) {


        $data = [
            'user_id' => auth()->id(),
            'subscription_plan_id' => $subscriptionPlan->id,
            'price' => $subscriptionPlan->price,
            'expired_date' => Carbon::now()->addMonths($subscriptionPlan->active_period_in_month),
            'payment_status' => 'paid',

        ];

        $userSubscription = UserSubscription::create($data);

        return redirect()->route('user.dashboard.index');
        // $subscriptionPlan->userSubscribe($request->user());
        // return redirect()->route('user.dashboard.index');


    }
}
