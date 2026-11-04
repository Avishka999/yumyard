<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Food extends Model
{
    // The legacy schema uses the plural foods table explicitly.
    protected $table = 'foods';

    // Attributes accepted from validated menu requests.
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'price',
        'image',
        'is_available',
    ];

    // Convert database values to the types used by the API and UI.
    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'is_available' => 'boolean',
        ];
    }

    // Each food belongs to one menu category.
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
