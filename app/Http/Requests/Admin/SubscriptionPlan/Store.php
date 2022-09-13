<?php

namespace App\Http\Requests\Admin\SubscriptionPlan;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class Store extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // return false;
        return Auth::user()->hasRole('admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|unique:subscription_plans,name', //unique di table subscription_plans dan paramter name, jadi namanya ga boleh sama
            'price' => 'required|numeric|min:0',
            'active_period_in_month' => 'required|numeric|min:1',
            'is_premium' => 'required|boolean',
            //feature json
            'features' => 'required',
        ];
    }
}
