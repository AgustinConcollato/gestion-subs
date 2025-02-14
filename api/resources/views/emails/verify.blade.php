@component('mail::message')
# ¡Hola {{ $user->name }}!

Por favor, haz clic en el botón de abajo para verificar tu dirección de correo electrónico.

@component('mail::button', ['url' => $verificationUrl])
Verificar Email
@endcomponent

Si no creaste una cuenta, no necesitas hacer nada.

{{ config('app.name') }}
@endcomponent