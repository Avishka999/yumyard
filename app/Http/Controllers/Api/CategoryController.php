<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Return categories for the public browse page.
    public function index(): JsonResponse
    {
        return response()->json(Category::all(), 200);
    }

    // Add a category from the protected admin interface.
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'is_active' => 'sometimes|boolean',
        ]);

        $category = Category::create($validated);

        return response()->json($category, 201);
    }

    // Return one category for detail or admin views.
    public function show(string $id): JsonResponse
    {
        $category = Category::findOrFail($id);

        return response()->json($category, 200);
    }

    // Update validated category fields.
    public function update(Request $request, string $id): JsonResponse
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'image' => 'sometimes|nullable|string',
            'is_active' => 'sometimes|boolean',
        ]);

        $category->update($validated);

        return response()->json($category, 200);
    }

    // Delete a category selected by an administrator.
    public function destroy(string $id): JsonResponse
    {
        $category = Category::findOrFail($id);

        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully',
        ], 200);
    }
}
