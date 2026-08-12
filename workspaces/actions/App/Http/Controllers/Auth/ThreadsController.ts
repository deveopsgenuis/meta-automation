import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\ThreadsController::connect
* @see app/Http/Controllers/Auth/ThreadsController.php:29
* @route '/connect/threads'
*/
export const connect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

connect.definition = {
    methods: ["get","head"],
    url: '/connect/threads',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\ThreadsController::connect
* @see app/Http/Controllers/Auth/ThreadsController.php:29
* @route '/connect/threads'
*/
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\ThreadsController::connect
* @see app/Http/Controllers/Auth/ThreadsController.php:29
* @route '/connect/threads'
*/
connect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\ThreadsController::connect
* @see app/Http/Controllers/Auth/ThreadsController.php:29
* @route '/connect/threads'
*/
connect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connect.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\ThreadsController::callback
* @see app/Http/Controllers/Auth/ThreadsController.php:56
* @route '/accounts/threads/callback'
*/
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/accounts/threads/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\ThreadsController::callback
* @see app/Http/Controllers/Auth/ThreadsController.php:56
* @route '/accounts/threads/callback'
*/
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\ThreadsController::callback
* @see app/Http/Controllers/Auth/ThreadsController.php:56
* @route '/accounts/threads/callback'
*/
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\ThreadsController::callback
* @see app/Http/Controllers/Auth/ThreadsController.php:56
* @route '/accounts/threads/callback'
*/
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

const ThreadsController = { connect, callback }

export default ThreadsController