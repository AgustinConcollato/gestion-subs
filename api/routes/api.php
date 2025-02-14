<?php

use App\Http\Controllers\BusinessController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::post('/email/verify/send', [UserController::class, 'sendVerificationEmail']);
Route::get('/email/verify/{id}/{hash}', [UserController::class, 'verify'])->name('verification.verify')->middleware('signed');

Route::get('/mercadopago/callback', function (Request $request) {
    if ($request->has('code')) {
        $authorizationCode = $request->input('code');

        $response = Http::post('https://api.mercadopago.com/oauth/token', [
            'client_id' => env('MP_CLIENT_ID'),
            'client_secret' => env('MP_CLIENT_SECRET'),
            'grant_type' => 'authorization_code',
            'code' => $authorizationCode,
            'redirect_uri' => '' // env('MP_REDIRECT_URI'),
        ]);

        $data = $response->json();
        $userId = auth()->id();

        if (isset($data['access_token'])) {
            // Guardar los tokens en la base de datos
            DB::table('mercadopago_accounts')->insert([
                'user_id' => $userId,
                'access_token' => $data['access_token'],
                'refresh_token' => $data['refresh_token'],
                'public_key' => $data['public_key'],
                'live_mode' => $data['live_mode'],
                'expires_in' => now()->addSeconds($data['expires_in']),
            ]);

            $user = User::find($userId);

            $user->update(['steps' => 4]);

            return redirect('/dashboard')->with('success', 'Cuenta vinculada con Mercado Pago');
        }

        return redirect('/dashboard')->with('error', 'Error al conectar con Mercado Pago');
    }

    return redirect('/dashboard')->with('error', 'No se recibió el código de autorización');
});

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/user', [UserController::class, 'get']);
    Route::post('/logout', [UserController::class, 'logout']);

    Route::post('/next-step', [UserController::class, 'nextStep']);
});

Route::middleware(['auth:sanctum', 'verified'])->group(function () {

    Route::post('/business', [BusinessController::class, 'create']);

});