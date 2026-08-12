import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\BlueskyController::connect
* @see app/Http/Controllers/Auth/BlueskyController.php:21
* @route '/connect/bluesky'
*/
export const connect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

connect.definition = {
    methods: ["get","head"],
    url: '/connect/bluesky',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\BlueskyController::connect
* @see app/Http/Controllers/Auth/BlueskyController.php:21
* @route '/connect/bluesky'
*/
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\BlueskyController::connect
* @see app/Http/Controllers/Auth/BlueskyController.php:21
* @route '/connect/bluesky'
*/
connect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\BlueskyController::connect
* @see app/Http/Controllers/Auth/BlueskyController.php:21
* @route '/connect/bluesky'
*/
connect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connect.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\BlueskyController::store
* @see app/Http/Controllers/Auth/BlueskyController.php:34
* @route '/connect/bluesky'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/connect/bluesky',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\BlueskyController::store
* @see app/Http/Controllers/Auth/BlueskyController.php:34
* @route '/connect/bluesky'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\BlueskyController::store
* @see app/Http/Controllers/Auth/BlueskyController.php:34
* @route '/connect/bluesky'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const BlueskyController = { connect, store }

export default BlueskyController