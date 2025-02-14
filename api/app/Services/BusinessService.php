<?php

namespace App\Services;

use App\Models\Business;

class BusinessService
{

    public function create($validateBusiness, $request)
    {

        $user = $request->user();
        $validateBusiness['user_id'] = $user->id;

        $imagePath = '';

        if ($request->hasFile('logo')) {
            $image = $request->file('logo');

            // Guardar la imagen original en almacenamiento temporal
            $tempPath = $image->getPathname();
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $destPath = storage_path("app/public/images/logo/{$filename}");

            // Redimensionar la imagen
            $this->resizeImage($tempPath, $destPath, 300, 300);

            // Guardar solo el path en la base de datos
            $imagePath = "images/logo/{$filename}";
        }

        $validateBusiness['logo'] = $imagePath;

        $buisness = Business::create([
            'name' => $validateBusiness['name'],
            'industry' => $validateBusiness['industry'],
            'user_id' => $validateBusiness['user_id'],
            'logo' => $validateBusiness['logo']
        ]);

        $user->update(['steps' => 3]);
        $user->save();

        return [
            'message' => 'Negocio creado con correctamente',
            'business' => $buisness,
        ];
    }

    private function resizeImage($sourcePath, $destPath, $maxWidth, $maxHeight)
    {
        // Cargar la imagen
        list($sourceWidth, $sourceHeight, $type) = getimagesize($sourcePath);

        // Crear la imagen según el tipo
        switch ($type) {
            case IMAGETYPE_JPEG:
                $sourceImage = imagecreatefromjpeg($sourcePath);
                break;
            case IMAGETYPE_PNG:
                $sourceImage = imagecreatefrompng($sourcePath);
                break;
            case IMAGETYPE_WEBP:
                $sourceImage = imagecreatefromwebp($sourcePath);
                break;
            default:
                break;
        }

        $aspectRatio = $sourceWidth / $sourceHeight;
        if ($maxWidth / $maxHeight > $aspectRatio) {
            $newWidth = (int) ($maxHeight * $aspectRatio);
            $newHeight = $maxHeight;
        } else {
            $newWidth = $maxWidth;
            $newHeight = (int) ($maxWidth / $aspectRatio);
        }

        // Crear una imagen en blanco para la miniatura
        $thumbnail = imagecreatetruecolor($newWidth, $newHeight);

        // Manejar transparencia para PNG
        if ($type == IMAGETYPE_PNG) {
            // Habilitar la mezcla alfa y configurar el fondo transparente
            imagealphablending($thumbnail, false);
            imagesavealpha($thumbnail, true);
            $transparentColor = imagecolorallocatealpha($thumbnail, 0, 0, 0, 127);
            imagefilledrectangle($thumbnail, 0, 0, $newWidth, $newHeight, $transparentColor);
        }

        // Copiar y redimensionar la imagen original en la miniatura
        imagecopyresampled($thumbnail, $sourceImage, 0, 0, 0, 0, $newWidth, $newHeight, $sourceWidth, $sourceHeight);

        // guardar segun el tipo
        switch ($type) {
            case IMAGETYPE_JPEG:
                imagejpeg($thumbnail, $destPath);
                break;
            case IMAGETYPE_PNG:
                imagepng($thumbnail, $destPath);
                break;
            case IMAGETYPE_WEBP:
                imagewebp($thumbnail, $destPath);
                break;
        }

        // Liberar memoria
        imagedestroy($sourceImage);
        imagedestroy($thumbnail);
    }

}