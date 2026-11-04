<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json(
            $request->user()->orders()->with('items.food')->latest()->get(),
        );
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'delivery_address' => ['required', 'string', 'max:1000'],
            'phone' => ['required', 'string', 'max:30'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.food_id' => ['required', 'integer', 'exists:foods,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1', 'max:50'],
        ]);

        $order = DB::transaction(function () use ($request, $validated): Order {
            $foods = Food::whereIn('id', collect($validated['items'])->pluck('food_id'))
                ->where('is_available', true)
                ->get()
                ->keyBy('id');
            $subtotal = 0;

            $lineItems = collect($validated['items'])->map(function (array $item) use ($foods, &$subtotal): array {
                $food = $foods->get($item['food_id']);

                abort_if(! $food, 422, 'One or more selected foods are unavailable.');

                $subtotal += $food->price * $item['quantity'];

                return [
                    'food_id' => $food->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $food->price,
                ];
            });
            $deliveryFee = 400;
            $order = $request->user()->orders()->create([
                'subtotal' => $subtotal,
                'delivery_fee' => $deliveryFee,
                'total' => $subtotal + $deliveryFee,
                'delivery_address' => $validated['delivery_address'],
                'phone' => $validated['phone'],
            ]);
            $order->items()->createMany($lineItems->all());

            return $order->refresh()->load('items.food');
        });

        return response()->json($order, 201);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        return response()->json(
            $request->user()->orders()->with('items.food')->findOrFail($id),
        );
    }
}
