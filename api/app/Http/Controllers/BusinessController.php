<?php

namespace App\Http\Controllers;

use App\Services\BusinessService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class BusinessController
{
    public function __construct(BusinessService $businessService)
    {
        $this->businessService = $businessService;
    }

    public function create(Request $request)
    {
        try {
            $validateBusiness = $request->validate([
                'name' => 'string|required',
                'industry' => 'string|nullable',
                'logo' => 'image|mimes:jpeg,png,jpg,webp,svg|max:2048'
            ]);

            $buisness = $this->businessService->create($validateBusiness, $request);

            return response()->json($buisness, 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error en el registro',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error en el registro',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
