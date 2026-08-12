import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AcceptInviteController::show
* @see app/Http/Controllers/Auth/AcceptInviteController.php:20
* @route '/invites/{invite}'
*/
export const show = (args: { invite: string | { id: string } } | [invite: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/invites/{invite}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AcceptInviteController::show
* @see app/Http/Controllers/Auth/AcceptInviteController.php:20
* @route '/invites/{invite}'
*/
show.url = (args: { invite: string | { id: string } } | [invite: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{invite}', parsedArgs.invite.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AcceptInviteController::show
* @see app/Http/Controllers/Auth/AcceptInviteController.php:20
* @route '/invites/{invite}'
*/
show.get = (args: { invite: string | { id: string } } | [invite: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AcceptInviteController::show
* @see app/Http/Controllers/Auth/AcceptInviteController.php:20
* @route '/invites/{invite}'
*/
show.head = (args: { invite: string | { id: string } } | [invite: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AcceptInviteController::accept
* @see app/Http/Controllers/Auth/AcceptInviteController.php:52
* @route '/invites/{invite}/accept'
*/
export const accept = (args: { invite: string | { id: string } } | [invite: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accept.url(args, options),
    method: 'post',
})

accept.definition = {
    methods: ["post"],
    url: '/invites/{invite}/accept',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AcceptInviteController::accept
* @see app/Http/Controllers/Auth/AcceptInviteController.php:52
* @route '/invites/{invite}/accept'
*/
accept.url = (args: { invite: string | { id: string } } | [invite: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return accept.definition.url
            .replace('{invite}', parsedArgs.invite.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AcceptInviteController::accept
* @see app/Http/Controllers/Auth/AcceptInviteController.php:52
* @route '/invites/{invite}/accept'
*/
accept.post = (args: { invite: string | { id: string } } | [invite: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accept.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AcceptInviteController::decline
* @see app/Http/Controllers/Auth/AcceptInviteController.php:106
* @route '/invites/{invite}/decline'
*/
export const decline = (args: { invite: string | { id: string } } | [invite: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: decline.url(args, options),
    method: 'post',
})

decline.definition = {
    methods: ["post"],
    url: '/invites/{invite}/decline',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AcceptInviteController::decline
* @see app/Http/Controllers/Auth/AcceptInviteController.php:106
* @route '/invites/{invite}/decline'
*/
decline.url = (args: { invite: string | { id: string } } | [invite: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return decline.definition.url
            .replace('{invite}', parsedArgs.invite.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AcceptInviteController::decline
* @see app/Http/Controllers/Auth/AcceptInviteController.php:106
* @route '/invites/{invite}/decline'
*/
decline.post = (args: { invite: string | { id: string } } | [invite: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: decline.url(args, options),
    method: 'post',
})

const AcceptInviteController = { show, accept, decline }

export default AcceptInviteController