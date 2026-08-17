<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function welcome(): Response
    {
        return Inertia::render('landing/Welcome');
    }
}
