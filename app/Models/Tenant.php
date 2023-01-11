<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\DB;
use Spatie\Multitenancy\Models\Tenant as SpatieTenant;

class Tenant extends SpatieTenant
{

    protected $fillable = [
        'name',
        'domain',
        'database',
        'logo',
        'configs'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'configs' => 'json'
    ];

    protected static function booted()
    {
        static::creating(fn(Tenant $model) => $model->createDatabase());
    }

    protected function createDatabase()
    {
        DB::statement('CREATE DATABASE '.config('multitenancy.tenat_prefix').$this->database);
    }

    protected function database(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => 'kyo_tenant_'.config('multitenancy.tenat_prefix').strtolower($value)
        );
    }

}
