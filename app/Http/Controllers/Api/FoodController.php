<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    // Return foods with categories so the frontend can filter and label them.
    public function index(): JsonResponse
    {
        return response()->json(Food::with('category')->get());
    }

    // Create a validated menu item for administrators.
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'image' => ['nullable', 'string'],
            'is_available' => ['sometimes', 'boolean'],
        ]);

        return response()->json(Food::create($validated), 201);
    }

    // Return one menu item with its category.
    public function show(string $id): JsonResponse
    {
        return response()->json(Food::with('category')->findOrFail($id));
    }

    // Update only the menu fields supplied by the administrator.
    public function update(Request $request, string $id): JsonResponse
    {
        $food = Food::findOrFail($id);
        $validated = $request->validate([
            'category_id' => ['sometimes', 'required', 'exists:categories,id'],
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'price' => ['sometimes', 'required', 'numeric', 'min:0'],
            'image' => ['sometimes', 'nullable', 'string'],
            'is_available' => ['sometimes', 'boolean'],
        ]);
        $food->update($validated);

        return response()->json($food);
    }

    // Remove a menu item from the catalog.
    public function destroy(string $id): JsonResponse
    {
        Food::findOrFail($id)->delete();

        return response()->json(['message' => 'Food deleted successfully']);
    }
}
