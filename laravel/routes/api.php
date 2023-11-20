<?php

use App\Http\Controllers\Collaborador;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/cadastro', [Collaborador::class, 'cadastro']);
Route::get('/collaborators', [Collaborador::class, 'collaborators']);
Route::get('/collaborador/{nome}', [Collaborador::class, 'collaborador']);
Route::patch('/collaborador/{cpf}/{status}', [Collaborador::class, 'collaboradorStatus']);