<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Keep local demo accounts available for testing customer and admin flows.
        User::updateOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User', 'password' => 'password', 'role' => 'customer'],
        );
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            ['name' => 'Yum Yard Admin', 'password' => 'password', 'role' => 'admin'],
        );

        // Seed the categories and menu items used by the customer UI.
        $this->call(MenuSeeder::class);
    }
}
