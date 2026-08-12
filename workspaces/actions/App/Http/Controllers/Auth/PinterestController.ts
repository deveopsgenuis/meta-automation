import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\PinterestController::connect
* @see app/Http/Controllers/Auth/PinterestController.php:30
* @route '/connect/pinterest'
*/
export const connect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

connect.definition = {
    methods: ["get","head"],
    url: '/connect/pinterest',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\PinterestController::connect
* @see app/Http/Controllers/Auth/PinterestController.php:30
* @route '/connect/pinterest'
*/
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PinterestController::connect
* @see app/Http/Controllers/Auth/PinterestController.php:30
* @route '/connect/pinterest'
*/
connect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PinterestController::connect
* @see app/Http/Controllers/Auth/PinterestController.php:30
* @route '/connect/pinterest'
*/
connect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connect.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\PinterestController::callback
* @see app/Http/Controllers/Auth/PinterestController.php:41
* @route '/accounts/pinterest/callback'
*/
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/accounts/pinterest/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\PinterestController::callback
* @see app/Http/Controllers/Auth/PinterestController.php:41
* @route '/accounts/pinterest/callback'
*/
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PinterestController::callback
* @see app/Http/Controllers/Auth/PinterestController.php:41
* @route '/accounts/pinterest/callback'
*/
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PinterestController::callback
* @see app/Http/Controllers/Auth/PinterestController.php:41
* @route '/accounts/pinterest/callback'
*/
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

const PinterestController = { connect, callback }

export default PinterestController