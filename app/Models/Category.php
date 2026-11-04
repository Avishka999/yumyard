<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    // Attributes accepted when categories are created or updated.
    protected $fillable = [
        'name',
        'description',
        'image',
        'is_active',
    ];

    // A category owns many menu foods.
    public function foods(): HasMany
    {
        return $this->hasMany(Food::class);
    }
}
