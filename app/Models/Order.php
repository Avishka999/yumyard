<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    // Order totals, delivery data, and workflow status are mass assignable.
    protected $fillable = [
        'user_id',
        'subtotal',
        'delivery_fee',
        'total',
        'status',
        'delivery_status',
        'delivery_address',
        'phone',
    ];

    // Keep monetary values consistent when serialized.
    protected function casts(): array
    {
        return [
            'subtotal' => 'decimal:2',
            'delivery_fee' => 'decimal:2',
            'total' => 'decimal:2',
        ];
    }

    // Link the order to the customer who placed it.
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // An order contains one or more purchased food lines.
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
