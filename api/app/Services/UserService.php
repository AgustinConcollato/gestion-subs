<?php

namespace App\Services;

use App\Notifications\VerifyEmail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\URL;

class UserService
{

    public function Register(array $validateUser)
    {
        $newUser = User::create([
            'name' => $validateUser['name'],
            'email' => $validateUser['email'],
            'password' => Hash::make($validateUser['password']),
            'steps' => 1
        ]);

        if ($newUser) {
            if (Auth::attempt(['email' => $validateUser['email'], 'password' => $validateUser['password']])) {
                $user = Auth::user();

                $token = $user->createToken('token_name')->plainTextToken;

                return [
                    'message' => 'Usuario registrado con éxito',
                    'token' => $token,
                    'user' => $user
                ];
            }
        }
    }

    public function get($request)
    {
        $user = $request->user();

        $user->currentAccessToken()->delete();

        $token = $user->createToken('token_name')->plainTextToken;

        return [
            'token' => $token,
            'user' => $user
        ];
    }

    public function login($validateUser)
    {
        if (Auth::attempt(['email' => $validateUser['email'], 'password' => $validateUser['password']])) {
            $user = Auth::user();

            $token = $user->createToken('token_name')->plainTextToken;

            return [
                'message' => 'Inicio de sesión con exitoso',
                'token' => $token,
                'user' => $user
            ];
        }

        throw new \Exception("Correo electrónico o contraseña son incorrectos", 1);
    }

    public function sendVerificationEmail($request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return [['message' => 'Usuario no encontrado'], 400];
        }

        if ($user->hasVerifiedEmail()) {

            return [['message' => 'El email ya está verificado']];
        }

        // Genera un enlace de verificación firmado
        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60), // El enlace expira en 60 minutos
            ['id' => $user->id, 'hash' => sha1($user->getEmailForVerification())]
        );

        // Envía el email
        $user->notify(new VerifyEmail($verificationUrl));

    }
    public function verify($id, $hash)
    {
        $user = User::findOrFail($id);

        if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return response()->json(['message' => 'Enlace de verificación inválido'], 403);
        }

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            $user->update(['steps' => 2]);
            $user->save();
        }
    }
}