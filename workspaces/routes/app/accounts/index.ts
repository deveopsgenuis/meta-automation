import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\SocialController::disconnect
* @see app/Http/Controllers/Auth/SocialController.php:59
* @route '/accounts/{account}'
*/
export const disconnect = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: disconnect.url(args, options),
    method: 'delete',
})

disconnect.definition = {
    methods: ["delete"],
    url: '/accounts/{account}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Auth\SocialController::disconnect
* @see app/Http/Controllers/Auth/SocialController.php:59
* @route '/accounts/{account}'
*/
disconnect.url = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { account: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { account: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            account: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        account: typeof args.account === 'object'
        ? args.account.id
        : args.account,
    }

    return disconnect.definition.url
            .replace('{account}', parsedArgs.account.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\SocialController::disconnect
* @see app/Http/Controllers/Auth/SocialController.php:59
* @route '/accounts/{account}'
*/
disconnect.delete = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: disconnect.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Auth\SocialController::toggle
* @see app/Http/Controllers/Auth/SocialController.php:84
* @route '/accounts/{account}/toggle'
*/
export const toggle = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: toggle.url(args, options),
    method: 'put',
})

toggle.definition = {
    methods: ["put"],
    url: '/accounts/{account}/toggle',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Auth\SocialController::toggle
* @see app/Http/Controllers/Auth/SocialController.php:84
* @route '/accounts/{account}/toggle'
*/
toggle.url = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { account: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { account: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            account: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        account: typeof args.account === 'object'
        ? args.account.id
        : args.account,
    }

    return toggle.definition.url
            .replace('{account}', parsedArgs.account.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\SocialController::toggle
* @see app/Http/Controllers/Auth/SocialController.php:84
* @route '/accounts/{account}/toggle'
*/
toggle.put = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: toggle.url(args, options),
    method: 'put',
})

const accounts = {
    toggle: Object.assign(toggle, toggle),
}

export default accounts