import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\Auth\SocialController::index
* @see app/Http/Controllers/Auth/SocialController.php:35
* @route '/accounts'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/accounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\SocialController::index
* @see app/Http/Controllers/Auth/SocialController.php:35
* @route '/accounts'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\SocialController::index
* @see app/Http/Controllers/Auth/SocialController.php:35
* @route '/accounts'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\SocialController::index
* @see app/Http/Controllers/Auth/SocialController.php:35
* @route '/accounts'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\SocialController::toggleActive
* @see app/Http/Controllers/Auth/SocialController.php:84
* @route '/accounts/{account}/toggle'
*/
export const toggleActive = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: toggleActive.url(args, options),
    method: 'put',
})

toggleActive.definition = {
    methods: ["put"],
    url: '/accounts/{account}/toggle',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Auth\SocialController::toggleActive
* @see app/Http/Controllers/Auth/SocialController.php:84
* @route '/accounts/{account}/toggle'
*/
toggleActive.url = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return toggleActive.definition.url
            .replace('{account}', parsedArgs.account.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\SocialController::toggleActive
* @see app/Http/Controllers/Auth/SocialController.php:84
* @route '/accounts/{account}/toggle'
*/
toggleActive.put = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: toggleActive.url(args, options),
    method: 'put',
})

const SocialController = { disconnect, index, toggleActive }

export default SocialController