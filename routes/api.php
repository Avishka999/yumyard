<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\FoodController;
use App\Http\Controllers\Api\OrderController;
use Illuminate\Support\Facades\Route;

// Customers can browse the menu without signing in.
Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);
Route::apiResource('foods', FoodController::class)->only(['index', 'show']);
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function (): void {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::apiResource('orders', OrderController::class)->only(['index', 'store', 'show']);

    // Menu changes are restricted to administrator accounts.
    Route::middleware('admin')->group(function (): void {
        Route::apiResource('categories', CategoryController::class)->only(['store', 'update', 'destroy']);
        Route::apiResource('foods', FoodController::class)->only(['store', 'update', 'destroy']);
    });

    // Admin reporting and order management share the same authorization boundary.
    Route::middleware('admin')->prefix('admin')->group(function (): void {
        Route::get('dashboard', [AdminController::class, 'dashboard']);
        Route::get('orders', [AdminController::class, 'orders']);
        Route::patch('orders/{id}/status', [AdminController::class, 'updateOrderStatus']);
    });
});
