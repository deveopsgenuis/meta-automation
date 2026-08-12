import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\XController::connect
* @see app/Http/Controllers/Auth/XController.php:26
* @route '/connect/x'
*/
export const connect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

connect.definition = {
    methods: ["get","head"],
    url: '/connect/x',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\XController::connect
* @see app/Http/Controllers/Auth/XController.php:26
* @route '/connect/x'
*/
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\XController::connect
* @see app/Http/Controllers/Auth/XController.php:26
* @route '/connect/x'
*/
connect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\XController::connect
* @see app/Http/Controllers/Auth/XController.php:26
* @route '/connect/x'
*/
connect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connect.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\XController::callback
* @see app/Http/Controllers/Auth/XController.php:37
* @route '/accounts/x/callback'
*/
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/accounts/x/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\XController::callback
* @see app/Http/Controllers/Auth/XController.php:37
* @route '/accounts/x/callback'
*/
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\XController::callback
* @see app/Http/Controllers/Auth/XController.php:37
* @route '/accounts/x/callback'
*/
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\XController::callback
* @see app/Http/Controllers/Auth/XController.php:37
* @route '/accounts/x/callback'
*/
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

const x = {
    connect: Object.assign(connect, connect),
    callback: Object.assign(callback, callback),
}

export default x