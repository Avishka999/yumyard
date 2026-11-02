<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    // Get all foods
    public function index()
    {
        $foods = Food::with('category')->get();
        return response()->json($foods,200);
    }

    // Create new food
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name'=> 'required|string|max:255',
            'desccription'=>'nullable|string',
            'price'=>'required|numeric|min:0',
            'image'=>'nullable|string',
            'is_available'=>'sometimes|boolean',
        ]);
        $food=Food::create($validated);
        return response()->jsoon($food,201);


        }

    // Get one food
    public function show(string $id)
    {
        $food=Food::with('category')->findorFail($id);
        return response()->json($food,200);
    }

    // Update a food
    public function update(Request $request, string $id)
    {
        $food=Food::findorFail($id);
        $validated=$request->validate([
            'category_id'=>'sometimes|required|exists:categories,id',
            'name'=>'sometimes|required|string|max:255',
            'description'=>'sometimes|nullable|string',
            'price'=>'sometimes|required|numeric|min:0',
            'image'=>'sometimes|nullable|string',
            'is_available'=>'sometimes|boolean',
        ]);
        $food->update($validated);
        return response()->json($food,200);
    }

    // Delete a food
    public function destroy(string $id)
    {
       $food=Food::findorFail($id);
       $food->delete();
       return reponse()->json([
        'message'=>'Food deleted successfully',
       ],200);
    }
}