<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Collaborador as model;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;

class Collaborador extends Controller
{
    public function cadastro(Request $request){
        try{

            $regras = [
                'nome' => 'required|string|max:100',
                'email' => 'required|string|email|max:100',
                'cpf' => 'required|string|max:15|unique:collaborador,cpf',
                'celular' => 'string|max:15',
                'conhecimentos' => 'required|array|min:1|max:3',
            ];

            $mensagens = [
                'nome.required' => 'O campo nome é obrigatório.',
                'nome.string' => 'O campo nome deve ser uma string.',
                'nome.max' => 'O campo nome deve ter no máximo 100 caracteres.',
                'email.required' => 'O campo email é obrigatório.',
                'email.string' => 'O campo email deve ser uma string.',
                'email.email' => 'O campo email é inválido.',
                'email.max' => 'O campo email deve ter no máximo 100 caracteres.',
                'cpf.required' => 'O campo cpf é obrigatório.',
                'cpf.unique' => 'Já existe um registro com este cpf.',
                'cpf.string' => 'O campo cpf deve ser uma string.',
                'cpf.max' => 'O campo cpf deve ter no máximo 15 caracteres.',
                'celular.string' => 'O campo celular deve ser uma string.',
                'celular.max' => 'O campo celular deve ter no máximo 15 caracteres.',
                'conhecimentos.required' => 'O campo conhecimentos é obrigatório.',
                'conhecimentos.array' => 'O campo conhecimentos deve ser um array.',
                'conhecimentos.min' => 'O campo conhecimentos deve ter no mínimo 1 item.',
                'conhecimentos.max' => 'O campo conhecimentos deve ter no máximo 3 itens.',
            ];

            $validator = Validator::make($request->all(), $regras, $mensagens);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }else if($this->validarCPF($request->input('cpf'))==false){
                return response()->json(['errors' => [
                    'cpf' => ['O campo cpf é inválido.']
                ]], 422);
            }

            $collaborador = [
                'nome' => $request->input('nome'),
                'email' => $request->input('email'),
                'cpf' => $request->input('cpf'),
                'celular' => $request->input('celular'),
                'conhecimentos' => implode(',', $request->input('conhecimentos'))
            ];
            
            $resultado = model::create($collaborador);

            if($resultado){
                return response()->json([
                    'success' => true,
                    'message' => 'Successfully created'
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Error creating'
            ], 400);
        }catch(QueryException $e){
            return response()->json([
                'success' => false,
                'message' => 'Error creating'
            ], 400);
        }
    }

    public function collaborators(){

        $infor = model::orderByNome()->get();
        $array = [];
        $count = 0;
        foreach($infor as $dados){
            $count++;
            array_push($array, [
                'n' => $count,
                'nome' => $dados['nome'],
                'cpf' => $dados['cpf'],
                'email' => $dados['email'],
                'celular' => $dados['celular'] == null ? '' : $dados['celular'],
                'conhecimentos' => $dados['conhecimentos'] != '' ? explode(',', $dados['conhecimentos']) : [],
                'status' => $dados['status'] == 1 ? 'VALIDADO': 'NÃO VALIDADO',
                'criacao' => date('d/m/Y H:i:s', strtotime($dados['created_at']))
            ]);
        }

        return response()->json($array);
    }

    public function collaboradorStatus($cpf){
        try{

            $cpf = preg_replace('/[^0-9]/', '', $cpf);

            $collaborador = model::where('cpf', $cpf)->first();

            if($collaborador){

                $collaborador->status = true;
                $collaborador->save();

                return response()->json([
                    'success' => true,
                    'message' => 'Updated contributor'
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 400);
            
        }catch(QueryException $e){
            return response()->json([
                'success' => false,
                'message' => 'Error when validating'
            ], 400);
        }
    }

    private function validarCPF($cpf) {
        $cpf = preg_replace('/[^0-9]/', '', $cpf);

        if (strlen($cpf) != 11) {
            return false;
        }

        if (preg_match('/(\d)\1{10}/', $cpf)) {
            return false;
        }

        for ($i = 9, $j = 0, $soma1 = 0, $soma2 = 0; $i > 0; $i--, $j++) {
            $soma1 += $cpf[$j] * $i;
            $soma2 += $cpf[$j] * ($i + 1);
        }

        $digito1 = (($soma1 % 11) < 2) ? 0 : 11 - ($soma1 % 11);
        $digito2 = (($soma2 % 11) < 2) ? 0 : 11 - ($soma2 % 11);

        if ($digito1 == $cpf[9] && $digito2 == $cpf[10]) {
            return true;
        }

        return false;
    }
}
