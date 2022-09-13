<?php

namespace App\Http\Requests\Admin\Movie;

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
            'title' => 'required|unique:movies,title', //unique di table movies dan paramter title, jadi titlenya ga boleh sama
            'description' => 'required',
            'category' => 'required',
            'video_url' => 'required|url',
            'thumbnail' => 'required|image',
            'rating' => 'required|numeric|min:0|max:10',
            'year' => 'required|numeric|min:1900|max:2099',
            'is_featured' => 'nullable|boolean',

        ];
    }
}
