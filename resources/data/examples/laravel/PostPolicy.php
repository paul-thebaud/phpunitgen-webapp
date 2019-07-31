<?php

namespace App\Policies;

use App\Post;
use App\User;

/**
 * Class PostPolicy.
 *
 * @author  John Doe <john.doe@example.com>
 * @version 1.0.0
 */
class PostPolicy
{
    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Post $post): bool
    {
        return $user->is($post->user);
    }

    public function delete(User $user, Post $post): bool
    {
        return $user->is($post->user);
    }
}
