<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Food;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Burgers' => 'Handcrafted burgers made with fresh ingredients.',
            'Drinks' => 'Refreshing drinks and creamy favourites.',
            'Salads' => 'Fresh, colourful salads for a lighter meal.',
        ];

        foreach ($categories as $name => $description) {
            Category::updateOrCreate(
                ['name' => $name],
                ['description' => $description, 'is_active' => true],
            );
        }

        $categoryIds = Category::whereIn('name', array_keys($categories))
            ->pluck('id', 'name');

        $foods = [
            [
                'category_id' => $categoryIds['Burgers'],
                'name' => 'Crispy Chicken Burger',
                'description' => 'Golden crispy chicken with lettuce, cheese, and a creamy house sauce.',
                'price' => 680,
                'image' => '/menu/crispy-chicken-burger.png',
            ],
            [
                'category_id' => $categoryIds['Burgers'],
                'name' => 'Royal Cheese & Grill Burger',
                'description' => 'A flame-grilled beef patty with melted cheese, tomato, and crisp lettuce.',
                'price' => 800,
                'image' => '/menu/royal-cheese-burger.png',
            ],
            [
                'category_id' => $categoryIds['Burgers'],
                'name' => 'Spicy Jalapeño Burger',
                'description' => 'A bold burger with jalapeños, pepper jack cheese, and smoky chipotle sauce.',
                'price' => 850,
                'image' => '/menu/spicy-jalapeno-burger.png',
            ],
            [
                'category_id' => $categoryIds['Burgers'],
                'name' => 'Veggie Deluxe Burger',
                'description' => 'A hearty vegetable patty with black beans, corn, avocado, and fresh salad.',
                'price' => 500,
                'image' => '/menu/veggie-deluxe-burger.png',
            ],
            [
                'category_id' => $categoryIds['Drinks'],
                'name' => 'Bubble Tea',
                'description' => 'Creamy milk tea with chewy tapioca pearls and a smooth finish.',
                'price' => 380,
                'image' => '/menu/bubble-tea.png',
            ],
            [
                'category_id' => $categoryIds['Drinks'],
                'name' => 'Milk Ice Coffee',
                'description' => 'Cold, creamy coffee blended with ice for a refreshing pick-me-up.',
                'price' => 280,
                'image' => '/menu/milk-ice-coffee.png',
            ],
            [
                'category_id' => $categoryIds['Drinks'],
                'name' => 'Watermelon',
                'description' => 'Fresh watermelon juice served chilled with a bright, naturally sweet taste.',
                'price' => 200,
                'image' => '/menu/watermelon.png',
            ],
            [
                'category_id' => $categoryIds['Drinks'],
                'name' => 'Velvet Shake Collection',
                'description' => 'Rich chocolate, sweet strawberry, and smooth vanilla shakes.',
                'price' => 450,
                'image' => '/menu/velvet-shake.png',
            ],
            [
                'category_id' => $categoryIds['Salads'],
                'name' => 'Summer Harvest Salad',
                'description' => 'Seasonal greens, cherry tomatoes, and crisp garden vegetables.',
                'price' => 780,
                'image' => '/menu/summer-harvest-salad.png',
            ],
            [
                'category_id' => $categoryIds['Salads'],
                'name' => 'Chicken Salad',
                'description' => 'Flame-grilled chicken with crisp lettuce, cucumber, and juicy tomatoes.',
                'price' => 890,
                'image' => '/menu/chicken-salad.png',
            ],
            [
                'category_id' => $categoryIds['Salads'],
                'name' => 'Coleslaw Salad',
                'description' => 'Creamy coleslaw with crisp cabbage, carrots, and a tangy dressing.',
                'price' => 600,
                'image' => '/menu/coleslaw-salad.png',
            ],
            [
                'category_id' => $categoryIds['Salads'],
                'name' => 'Fruit Salad',
                'description' => 'A colourful bowl of fresh seasonal fruits served chilled.',
                'price' => 550,
                'image' => '/menu/fruit-salad.png',
            ],
        ];

        foreach ($foods as $food) {
            Food::updateOrCreate(
                ['name' => $food['name']],
                [...$food, 'is_available' => true],
            );
        }
    }
}
