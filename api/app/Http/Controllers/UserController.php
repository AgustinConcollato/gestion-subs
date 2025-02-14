<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class UserController
{

    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function get(Request $request)
    {
        $user = $this->userService->get($request);

        if (!$user) {
            return response()->json(['message' => 'No se encontro ningún usuario'], 400);
        }

        return response()->json($user);
    }

    public function login(Request $request)
    {
        try {
            $validateUser = $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            $response = $this->userService->login($validateUser);

            return response()->json($response, 200);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors() // Devuelve un array con los errores por campo
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al iniciar sesión',
                'errors' => ['invalid' => $e->getMessage()]
            ], 500);
        }

    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sesión cerrada con éxito'], 200);
    }

    public function register(Request $request)
    {
        try {
            $validateUser = $request->validate([
                'name' => 'required|string',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => [
                    'required',
                    'confirmed',
                    Password::min(8)
                        ->letters()
                        ->mixedCase()
                        ->numbers()
                        ->symbols()
                ]
            ]);

            $response = $this->userService->register($validateUser);

            return response()->json($response, 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error en el registro',
                'errors' => $e->errors() // Devuelve un array con los errores por campo
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error en el registro',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function sendVerificationEmail(Request $request)
    {
        $response = $this->userService->sendVerificationEmail($request);

        if ($response) {
            return response()->json(...$response);
        }

        return response()->json(['message' => 'Correo de verificación enviado']);
    }

    public function verify($id, $hash)
    {
        $this->userService->verify($id, $hash);

        return response()->view('emails.verified');
    }

    public function nextStep(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Error inseperado'], 400);
        }

        $user->update(['steps' => $request->input('step')]);

        return response()->json($user);
    }
}