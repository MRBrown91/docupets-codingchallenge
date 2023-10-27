<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePetRequest;
use App\Http\Resources\PetCollection;
use App\Http\Resources\PetResource;
use App\Models\Pet;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Response;

class PetController extends Controller
{

    /**
     * Pulls full list of pets
     *
     * @return JsonResponse
     *
     * @todo Add pagination
     */
    public function index(): JsonResponse
    {
        $pets = Pet::all();
        return (new PetCollection($pets))->response();
    }

    /**
     * Stores new pet in provided id
     *
     * @param StorePetRequest $request Pre validated request
     *
     * @return JsonResponse
     */
    public function store(StorePetRequest $request): JsonResponse
    {
        $pet = new Pet();
        $this->populatePetData($pet, $request);
        $pet->save();

        Log::info("Pet ID {$pet->id} created successfully.");

        return (new PetResource($pet))->response()->setStatusCode(201);
    }

    /**
     * Pulls pet based off provided id
     *
     * @param Pet $pet
     *
     * @return JsonResponse
     */
    public function show(Pet $pet): JsonResponse
    {
        return (new PetResource($pet))->response();
    }


    /**
     * Updates pet based off provided id
     *
     * @param StorePetRequest $request Pre validated request
     * @param Pet $pet
     *
     * @return JsonResponse
     */
    public function update(StorePetRequest $request, Pet $pet): JsonResponse
    {
        $this->populatePetData($pet, $request);
        $pet->save();

        Log::info("Pet ID {$pet->id} updated successfully.");

        return (new PetResource($pet))->response()->setStatusCode(200);
    }


    /**
     * Soft deletes pet based off provided id
     *
     * @param Pet $pet
     *
     * @return Response
     */
    public function destroy(Pet $pet): Response
    {
        $pet->delete();

        Log::info("Pet ID {$pet->id} deleted successfully.");

        return Response(null, 204);
    }

    /**
     * @param Pet $pet
     * @param StorePetRequest $request Pre validated request
     *
     * @return Pet
     */
    protected function populatePetData(Pet $pet, StorePetRequest $request): Pet
    {
        $pet->name = $request->input('name');
        $pet->type = $request->input('type');
        if($request->has('breed')){
            $pet->breed = $request->input('breed');
        }
        if($request->has('nobreedReason')){
            $pet->nobreedReason = $request->input('nobreedReason');
        }
        if($request->has('mixbreed')){
            $pet->mixbreed = $request->input('mixbreed');
        }
        $pet->gender = $request->input('gender');
        return $pet;
    }
}
