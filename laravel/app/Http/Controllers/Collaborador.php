<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Collaborador as model;

class Collaborador extends Controller
{
    public function cadastro(){
        return response()->json([]);
    }

    public function collaborators(){

        $infor = model::orderByNome()->get();
        $array = [];
        $count = 0;
        foreach($infor as $dados){
            $count++;
            array_push($array, [
                'n' => $count,
                'nome' => $dados['name'],
                'cpf' => $dados['cpf'],
                'email' => $dados['email'],
                'celular' => $dados['celular'] == null ? '' : $dados['celular'],
                'conhecimentos' => $dados['conhecimentos'] != '' ? explode(',', $dados['conhecimentos']) : [],
                'criacao' => date('d/m/Y H:i:s', strtotime($dados['created_at']))
            ]);
        }

        return response()->json($array);
    }

    public function collaboradorStatus(){
        return response()->json([]);
    }
}
