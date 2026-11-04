<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\FoodController;
use App\Http\Controllers\Api\OrderController;
use Illuminate\Support\Facades\Route;

Route::apiResource('categories', CategoryController::class);
Route::apiResource('foods', FoodController::class);
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function (): void {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::apiResource('orders', OrderController::class)->only(['index', 'store', 'show']);
    Route::middleware('admin')->prefix('admin')->group(function (): void {
        Route::get('dashboard', [AdminController::class, 'dashboard']);
        Route::get('orders', [AdminController::class, 'orders']);
        Route::patch('orders/{id}/status', [AdminController::class, 'updateOrderStatus']);
    });
});
