<?php

namespace Database\Seeders;

use App\Models\SubscriptionPlan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class SubscriptionPlanTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subscriptionPlans = [
            [
                'name' => 'Basic',
                'price' => 2000,
                'active_period_in_month' => 1,
                'features' => json_encode(['Nonton Sepuasnya', 'Ga Diomein', 'Sampe Batas Waktu Paket']),
                'is_premium' => false,
            ],
            [
                'name' => 'Premium',
                'price' => 20000,
                'active_period_in_month' => 3,
                'features' => json_encode(['Nonton Sepuasnya', 'Ga Diomein','Video apa aja','Kaga disediain Snack', 'Sampe Batas Waktu Paket']),
                'is_premium' => true,
            ]
        ];

        SubscriptionPlan::insert($subscriptionPlans);
    }
}
