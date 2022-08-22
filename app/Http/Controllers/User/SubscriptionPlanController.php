<?php

namespace App\Http\Controllers\User;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use App\Http\Controllers\Controller;
use Midtrans;

class SubscriptionPlanController extends Controller
{

    public function __construct()
    {
         // Set your Merchant Server Key
        \Midtrans\Config::$serverKey = env('MIDTRANS_SERVERKEY');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = false;
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = false;
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = false;
    }

    public function index() {
        //order by price
        $subscriptionPlan = SubscriptionPlan::orderBy('price')->get();
        // $subscriptionPlan = SubscriptionPlan::all();
        // return $subscriptionPlan;
        return Inertia('User/Dashboard/SubscriptionPlan/Index', [
            'subscriptionPlans' => $subscriptionPlan,
            'userSubscription' => null,
        ]);
    }

    public function userSubscribe(Request $request, SubscriptionPlan $subscriptionPlan) {


        $data = [
            'user_id' => auth()->id(),
            'subscription_plan_id' => $subscriptionPlan->id,
            'price' => $subscriptionPlan->price,
            // 'expired_date' => Carbon::now()->addMonths($subscriptionPlan->active_period_in_month),
            'payment_status' => 'pending',

        ];

        $userSubscription = UserSubscription::create($data);

        $params = [
            'transaction_details' => [
                'order_id' => $userSubscription->id.'-'.Str::random(5),
                'gross_amount' => $subscriptionPlan->price,
            ],
            'customer_details' => [
                'first_name' => auth()->user()->name,
                'email' => auth()->user()->email,
            ],
            'item_details' => [
                [
                    'id' => $userSubscription->id,
                    'price' => $subscriptionPlan->price,
                    'quantity' => 1,
                    'name' => $subscriptionPlan->name,
                ],
            ],
        ];

        $snapToken = \Midtrans\Snap::getSnapToken($params);

        $userSubscription->update([
            'snap_token' => $snapToken,
        ]);

        return inertia('User/Dashboard/SubscriptionPlan/Index', [
            'userSubscription' => $userSubscription,
        ]);
        // return redirect()->route('user.dashboard.index');
        // $subscriptionPlan->userSubscribe($request->user());
        // return redirect()->route('user.dashboard.index');


    }

    public function midtransCallback(Request $request)
    {
        $notif = new Midtrans\Notification();

        $transaction_status = $notif->transaction_status;
        $fraud = $notif->fraud_status;

        $transaction_id = explode('-', $notif->order_id)[0];
        $userSubscription = UserSubscription::find($transaction_id);

        if ($transaction_status == 'capture') {
            if ($fraud == 'challenge') {
                // TODO Set payment status in merchant's database to 'challenge'
                $userSubscription->payment_status = 'pending';
            }
            else if ($fraud == 'accept') {
                // TODO Set payment status in merchant's database to 'success'
                $userSubscription->payment_status = 'paid';
                $userSubscription->expired_date = Carbon::now()->addMonths((int) $userSubscription->subscriptionPlan->active_period_in_months);
            }
        }
        else if ($transaction_status == 'cancel') {
            if ($fraud == 'challenge') {
                // TODO Set payment status in merchant's database to 'failure'
                $userSubscription->payment_status = 'failed';
            }
            else if ($fraud == 'accept') {
                // TODO Set payment status in merchant's database to 'failure'
                $userSubscription->payment_status = 'failed';
            }
        }
        else if ($transaction_status == 'deny') {
            // TODO Set payment status in merchant's database to 'failure'
            $userSubscription->payment_status = 'failed';
        }
        else if ($transaction_status == 'settlement') {
            // TODO set payment status in merchant's database to 'Settlement'
            $userSubscription->payment_status = 'paid';
            $userSubscription->expired_date = Carbon::now()->addMonths((int) $userSubscription->subscriptionPlan->active_period_in_months);
        }
        else if ($transaction_status == 'pending') {
            // TODO set payment status in merchant's database to 'Pending'
            $userSubscription->payment_status = 'pending';
        }
        else if ($transaction_status == 'expire') {
            // TODO set payment status in merchant's database to 'expire'
            $userSubscription->payment_status = 'failed';
        }

        $userSubscription->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Payment success'
        ]);
    }

}
