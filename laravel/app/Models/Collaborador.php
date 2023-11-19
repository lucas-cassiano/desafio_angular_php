<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collaborador extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'email',
        'cpf',
        'conhecimentos',
        'status'
    ];
}
