<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    // Store the food snapshot used to build an order line.
    protected $fillable = [
        'order_id',
        'food_id',
        'quantity',
        'unit_price',
    ];

    // Serialize the captured unit price as a decimal string.
    protected function casts(): array
    {
        return [
            'unit_price' => 'decimal:2',
        ];
    }

    // Link the line back to its parent order.
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    // Link the line to the food catalog record.
    public function food(): BelongsTo
    {
        return $this->belongsTo(Food::class);
    }
}
