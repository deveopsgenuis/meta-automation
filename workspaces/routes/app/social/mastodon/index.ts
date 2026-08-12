import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\MastodonController::connect
* @see app/Http/Controllers/Auth/MastodonController.php:26
* @route '/connect/mastodon'
*/
export const connect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

connect.definition = {
    methods: ["get","head"],
    url: '/connect/mastodon',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\MastodonController::connect
* @see app/Http/Controllers/Auth/MastodonController.php:26
* @route '/connect/mastodon'
*/
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\MastodonController::connect
* @see app/Http/Controllers/Auth/MastodonController.php:26
* @route '/connect/mastodon'
*/
connect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\MastodonController::connect
* @see app/Http/Controllers/Auth/MastodonController.php:26
* @route '/connect/mastodon'
*/
connect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connect.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\MastodonController::authorize
* @see app/Http/Controllers/Auth/MastodonController.php:42
* @route '/connect/mastodon'
*/
export const authorize = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: authorize.url(options),
    method: 'post',
})

authorize.definition = {
    methods: ["post"],
    url: '/connect/mastodon',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\MastodonController::authorize
* @see app/Http/Controllers/Auth/MastodonController.php:42
* @route '/connect/mastodon'
*/
authorize.url = (options?: RouteQueryOptions) => {
    return authorize.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\MastodonController::authorize
* @see app/Http/Controllers/Auth/MastodonController.php:42
* @route '/connect/mastodon'
*/
authorize.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: authorize.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\MastodonController::callback
* @see app/Http/Controllers/Auth/MastodonController.php:110
* @route '/accounts/mastodon/callback'
*/
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/accounts/mastodon/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\MastodonController::callback
* @see app/Http/Controllers/Auth/MastodonController.php:110
* @route '/accounts/mastodon/callback'
*/
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\MastodonController::callback
* @see app/Http/Controllers/Auth/MastodonController.php:110
* @route '/accounts/mastodon/callback'
*/
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\MastodonController::callback
* @see app/Http/Controllers/Auth/MastodonController.php:110
* @route '/accounts/mastodon/callback'
*/
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

const mastodon = {
    connect: Object.assign(connect, connect),
    authorize: Object.assign(authorize, authorize),
    callback: Object.assign(callback, callback),
}

export default mastodon