import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::remove
* @see app/Http/Controllers/App/WorkspaceInviteController.php:113
* @route '/settings/workspace/members/{user}'
*/
export const remove = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: remove.url(args, options),
    method: 'delete',
})

remove.definition = {
    methods: ["delete"],
    url: '/settings/workspace/members/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::remove
* @see app/Http/Controllers/App/WorkspaceInviteController.php:113
* @route '/settings/workspace/members/{user}'
*/
remove.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return remove.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::remove
* @see app/Http/Controllers/App/WorkspaceInviteController.php:113
* @route '/settings/workspace/members/{user}'
*/
remove.delete = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: remove.url(args, options),
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

const members = {
    remove: Object.assign(remove, remove),
    updateRole: Object.assign(updateRole, updateRole),
}

export default members