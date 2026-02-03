<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UsersController extends Controller
{
    public function index(Request $request): Response
    {
        $query = User::query()->orderByDesc('id');

        if ($search = (string) $request->query('q', '')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                    ->orWhere('email', 'like', "%$search%")
                    ->orWhere('phone', 'like', "%$search%");
            });
        }

        if ($request->filled('blocked')) {
            $blocked = $request->boolean('blocked');
            $query->where('is_blocked', $blocked);
        }

        $users = $query->paginate(20)->withQueryString();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => $request->only(['q','blocked']),
        ]);
    }

    public function toggleBlock(User $user): RedirectResponse
    {
        $user->is_blocked = ! $user->is_blocked;
        $user->save();
        return back()->with('success', $user->is_blocked ? 'User blocked' : 'User unblocked');
    }
}


