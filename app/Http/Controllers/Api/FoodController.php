<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Food::with('category')->get());
    }

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

    public function show(string $id): JsonResponse
    {
        return response()->json(Food::with('category')->findOrFail($id));
    }

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

    public function destroy(string $id): JsonResponse
    {
        Food::findOrFail($id)->delete();

        return response()->json(['message' => 'Food deleted successfully']);
    }
}
