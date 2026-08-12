import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::index
* @see app/Http/Controllers/App/WorkspaceInviteController.php:21
* @route '/settings/workspace/members'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/settings/workspace/members',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::index
* @see app/Http/Controllers/App/WorkspaceInviteController.php:21
* @route '/settings/workspace/members'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::index
* @see app/Http/Controllers/App/WorkspaceInviteController.php:21
* @route '/settings/workspace/members'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::index
* @see app/Http/Controllers/App/WorkspaceInviteController.php:21
* @route '/settings/workspace/members'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::store
* @see app/Http/Controllers/App/WorkspaceInviteController.php:57
* @route '/settings/workspace/members/invites'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/settings/workspace/members/invites',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::store
* @see app/Http/Controllers/App/WorkspaceInviteController.php:57
* @route '/settings/workspace/members/invites'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::store
* @see app/Http/Controllers/App/WorkspaceInviteController.php:57
* @route '/settings/workspace/members/invites'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::destroy
* @see app/Http/Controllers/App/WorkspaceInviteController.php:91
* @route '/settings/workspace/members/invites/{invite}'
*/
export const destroy = (args: { invite: string | { id: string } } | [invite: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/settings/workspace/members/invites/{invite}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::destroy
* @see app/Http/Controllers/App/WorkspaceInviteController.php:91
* @route '/settings/workspace/members/invites/{invite}'
*/
destroy.url = (args: { invite: string | { id: string } } | [invite: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invite: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { invite: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            invite: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        invite: typeof args.invite === 'object'
        ? args.invite.id
        : args.invite,
    }

    return destroy.definition.url
            .replace('{invite}', parsedArgs.invite.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::destroy
* @see app/Http/Controllers/App/WorkspaceInviteController.php:91
* @route '/settings/workspace/members/invites/{invite}'
*/
destroy.delete = (args: { invite: string | { id: string } } | [invite: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::removeMember
* @see app/Http/Controllers/App/WorkspaceInviteController.php:113
* @route '/settings/workspace/members/{user}'
*/
export const removeMember = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeMember.url(args, options),
    method: 'delete',
})

removeMember.definition = {
    methods: ["delete"],
    url: '/settings/workspace/members/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::removeMember
* @see app/Http/Controllers/App/WorkspaceInviteController.php:113
* @route '/settings/workspace/members/{user}'
*/
removeMember.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: args.user,
    }

    return removeMember.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::removeMember
* @see app/Http/Controllers/App/WorkspaceInviteController.php:113
* @route '/settings/workspace/members/{user}'
*/
removeMember.delete = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeMember.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::updateRole
* @see app/Http/Controllers/App/WorkspaceInviteController.php:141
* @route '/settings/workspace/members/{user}/role'
*/
export const updateRole = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRole.url(args, options),
    method: 'put',
})

updateRole.definition = {
    methods: ["put"],
    url: '/settings/workspace/members/{user}/role',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::updateRole
* @see app/Http/Controllers/App/WorkspaceInviteController.php:141
* @route '/settings/workspace/members/{user}/role'
*/
updateRole.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: args.user,
    }

    return updateRole.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::updateRole
* @see app/Http/Controllers/App/WorkspaceInviteController.php:141
* @route '/settings/workspace/members/{user}/role'
*/
updateRole.put = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRole.url(args, options),
    method: 'put',
})

const WorkspaceInviteController = { index, store, destroy, removeMember, updateRole }

export default WorkspaceInviteController