<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class Collaborador extends Controller
{
    public function cadastro(){
        return response()->json([]);
    }

    public function collaborators(){
        return response()->json([]);
    }

    public function collaboradorStatus(){
        return response()->json([]);
    }
}
