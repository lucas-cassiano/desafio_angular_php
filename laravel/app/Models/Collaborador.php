<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collaborador extends Model
{
    use HasFactory;
    protected $table = 'collaborador';

    protected $fillable = [
        'nome',
        'email',
        'cpf',
        'conhecimentos',
        'status'
    ];

    public function scopeOrderByNome($query)
    {
        return $query->orderBy('nome');
    }
}
