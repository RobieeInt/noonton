<?php

namespace App\Http\Requests\Admin\SubscriptionPlan;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class Update extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
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
            'name' => 'nullable|unique:subscription_plans,name,'.$this->subscriptionPlan->id, //unique di table subscription_plans dan paramter name, jadi namanya ga boleh sama || biar ga dianggap duplikat
            'price' => 'nullable|numeric|min:0',
            'active_period_in_month' => 'nullable|numeric|min:1',
            'is_premium' => 'nullable|boolean',
            //feature json
            'features' => 'nullable',
        ];
    }
}
