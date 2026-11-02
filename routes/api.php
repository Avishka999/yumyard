<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\FoodController;

Route::apiResource('categories', CategoryController::class);
Route::apiResource('foods', FoodController::class);