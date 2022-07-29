<?php

namespace App\Http\Requests\Admin\Movie;

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
            'title' => 'nullable|unique:movies,title,'.$this->movie->id, //unique di table movies dan paramter title, jadi titlenya ga boleh sama || biar ga dianggap duplikat
            'description' => 'nullable',
            'category' => 'nullable',
            'video_url' => 'nullable|url',
            'thumbnail' => 'nullable|image',
            'rating' => 'nullable|numeric|min:0|max:10',
            'year' => 'nullable|numeric|min:1900|max:2099',
            'is_featured' => 'nullable|boolean',

        ];
    }
}
