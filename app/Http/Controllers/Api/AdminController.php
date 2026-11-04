<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Food;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard(): JsonResponse
    {
        return response()->json([
            'total_orders' => Order::count(),
            'total_foods' => Food::count(),
            'total_categories' => Category::count(),
            'total_customers' => User::where('role', 'customer')->count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'sales_total' => Order::where('status', '!=', 'cancelled')->sum('total'),
        ]);
    }

    public function orders(): JsonResponse
    {
        return response()->json(Order::with('user', 'items.food')->latest()->get());
    }

    public function updateOrderStatus(Request $request, string $id): JsonResponse
    {
        $order = Order::findOrFail($id);
        $validated = $request->validate([
            'status' => ['required', 'in:pending,confirmed,preparing,completed,cancelled'],
            'delivery_status' => ['required', 'in:pending,preparing,out_for_delivery,delivered'],
        ]);
        $order->update($validated);

        return response()->json($order->fresh('user', 'items.food'));
    }
}
