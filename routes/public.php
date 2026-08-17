<?php

declare(strict_types=1);

use App\Http\Controllers\LandingController;
use App\Http\Controllers\LegalController;
use Illuminate\Support\Facades\Route;

Route::get('/welcome', [LandingController::class, 'welcome'])->name('welcome');
Route::get('/privacy', [LegalController::class, 'privacy'])->name('privacy');
Route::get('/terms', [LegalController::class, 'terms'])->name('terms');
