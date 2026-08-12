import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\DiscordController::connect
* @see app/Http/Controllers/Auth/DiscordController.php:18
* @route '/connect/discord'
*/
export const connect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

connect.definition = {
    methods: ["get","head"],
    url: '/connect/discord',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\DiscordController::connect
* @see app/Http/Controllers/Auth/DiscordController.php:18
* @route '/connect/discord'
*/
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\DiscordController::connect
* @see app/Http/Controllers/Auth/DiscordController.php:18
* @route '/connect/discord'
*/
connect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\DiscordController::connect
* @see app/Http/Controllers/Auth/DiscordController.php:18
* @route '/connect/discord'
*/
connect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connect.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\DiscordController::callback
* @see app/Http/Controllers/Auth/DiscordController.php:29
* @route '/accounts/discord/callback'
*/
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/accounts/discord/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\DiscordController::callback
* @see app/Http/Controllers/Auth/DiscordController.php:29
* @route '/accounts/discord/callback'
*/
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\DiscordController::callback
* @see app/Http/Controllers/Auth/DiscordController.php:29
* @route '/accounts/discord/callback'
*/
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\DiscordController::callback
* @see app/Http/Controllers/Auth/DiscordController.php:29
* @route '/accounts/discord/callback'
*/
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

const DiscordController = { connect, callback }

export default DiscordController