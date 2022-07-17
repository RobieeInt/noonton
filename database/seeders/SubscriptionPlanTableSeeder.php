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
                'features' => json_encode(['Feature 1', 'Feature 2', 'Feature 3']),
            ],
            [
                'name' => 'Premium',
                'price' => 20000,
                'active_period_in_month' => 3,
                'features' => json_encode(['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5']),
            ],
            [
                'name' => 'Professional',
                'price' => 300000,
                'active_period_in_month' => 12,
                'features' => json_encode(['Feature 1', 'Feature 2', 'Feature 3','Feature 4', 'Feature 5', 'Feature 6', 'Feature 7', 'Feature 8', 'Feature 9', 'Feature 10']),
            ]
        ];

        SubscriptionPlan::insert($subscriptionPlans);
    }
}
