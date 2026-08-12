import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\TikTokController::connect
* @see app/Http/Controllers/Auth/TikTokController.php:31
* @route '/connect/tiktok'
*/
export const connect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

connect.definition = {
    methods: ["get","head"],
    url: '/connect/tiktok',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\TikTokController::connect
* @see app/Http/Controllers/Auth/TikTokController.php:31
* @route '/connect/tiktok'
*/
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\TikTokController::connect
* @see app/Http/Controllers/Auth/TikTokController.php:31
* @route '/connect/tiktok'
*/
connect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\TikTokController::connect
* @see app/Http/Controllers/Auth/TikTokController.php:31
* @route '/connect/tiktok'
*/
connect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connect.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\TikTokController::callback
* @see app/Http/Controllers/Auth/TikTokController.php:44
* @route '/accounts/tiktok/callback'
*/
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/accounts/tiktok/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\TikTokController::callback
* @see app/Http/Controllers/Auth/TikTokController.php:44
* @route '/accounts/tiktok/callback'
*/
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\TikTokController::callback
* @see app/Http/Controllers/Auth/TikTokController.php:44
* @route '/accounts/tiktok/callback'
*/
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\TikTokController::callback
* @see app/Http/Controllers/Auth/TikTokController.php:44
* @route '/accounts/tiktok/callback'
*/
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

const tiktok = {
    connect: Object.assign(connect, connect),
    callback: Object.assign(callback, callback),
}

export default tiktok