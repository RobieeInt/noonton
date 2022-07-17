<?php

namespace Database\Seeders;

use App\Models\Movie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MovieTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $movie = [
            [
                'title' => 'The Shawshank Redemption',
                'description' => 'Two imprisoned',
                'slug' => 'the-shawshank-redemption',
                'category' => 'Drama',
                'video_url' => 'https://www.youtube.com/watch?v=6hB3S9bIaco',
                'thumbnail' => 'https://m.media-amazon.com/images/M/MV5BODQwMjI5Nzg4Nl5BMl5BanBnXkFtZTgwMDU2MjEyMTE@._V1_.jpg',
                'rating' => 9.3,
                'is_featured' => true,

            ],
            [
                'title' => 'The Godfather',
                'description' => 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
                'slug' => 'the-godfather',
                'category' => 'Drama',
                'video_url' => 'https://www.youtube.com/watch?v=sY1S34973zA',
                'thumbnail' => 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
                'rating' => 9.2,
                'is_featured' => true,
            ],
            [
                'title' => 'The Godfather: Part II',
                'description' => 'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
                'slug' => 'the-godfather-part-ii',
                'category' => 'Drama',
                'video_url' => 'https://www.youtube.com/watch?v=sY1S34973zA',
                'thumbnail' => 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
                'rating' => 9.0,
                'is_featured' => false,
            ],
            [
                'title' => 'The Dark Knight',
                'description' => 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.',
                'slug' => 'the-dark-knight',
                'category' => 'Drama',
                'video_url' => 'https://www.youtube.com/watch?v=EXeTw3wC0cI',
                'thumbnail' => 'https://m.media-amazon.com/images/M/MV5BMTMxNTIwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
                'rating' => 9.0,
                'is_featured' => false,

            ],
            [
                'title' => '12 Angry Monkeys',
                'description' => 'A group of monkeys is forced to work together to save a town from a mysterious threat.',
                'slug' => '12-angry-monkeys',
                'category' => 'Drama',
                'video_url' => 'https://www.youtube.com/watch?v=_sEKDZJIq8E',
                'thumbnail' => 'https://m.media-amazon.com/images/M/MV5BMjA5NzA5NjMwNl5BMl5BanBnXkFtZTgwNTM2NTYxMTE@._V1_.jpg',
                'rating' => 8.9,
                'is_featured' => false,

            ]
        ];

        Movie::insert($movie);
    }
}
