import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\YouTubeController::connect
* @see app/Http/Controllers/Auth/YouTubeController.php:33
* @route '/connect/youtube'
*/
export const connect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

connect.definition = {
    methods: ["get","head"],
    url: '/connect/youtube',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\YouTubeController::connect
* @see app/Http/Controllers/Auth/YouTubeController.php:33
* @route '/connect/youtube'
*/
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\YouTubeController::connect
* @see app/Http/Controllers/Auth/YouTubeController.php:33
* @route '/connect/youtube'
*/
connect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\YouTubeController::connect
* @see app/Http/Controllers/Auth/YouTubeController.php:33
* @route '/connect/youtube'
*/
connect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connect.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\YouTubeController::callback
* @see app/Http/Controllers/Auth/YouTubeController.php:49
* @route '/accounts/youtube/callback'
*/
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/accounts/youtube/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\YouTubeController::callback
* @see app/Http/Controllers/Auth/YouTubeController.php:49
* @route '/accounts/youtube/callback'
*/
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\YouTubeController::callback
* @see app/Http/Controllers/Auth/YouTubeController.php:49
* @route '/accounts/youtube/callback'
*/
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\YouTubeController::callback
* @see app/Http/Controllers/Auth/YouTubeController.php:49
* @route '/accounts/youtube/callback'
*/
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\YouTubeController::selectChannel
* @see app/Http/Controllers/Auth/YouTubeController.php:127
* @route '/accounts/youtube/select'
*/
export const selectChannel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selectChannel.url(options),
    method: 'get',
})

selectChannel.definition = {
    methods: ["get","head"],
    url: '/accounts/youtube/select',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\YouTubeController::selectChannel
* @see app/Http/Controllers/Auth/YouTubeController.php:127
* @route '/accounts/youtube/select'
*/
selectChannel.url = (options?: RouteQueryOptions) => {
    return selectChannel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\YouTubeController::selectChannel
* @see app/Http/Controllers/Auth/YouTubeController.php:127
* @route '/accounts/youtube/select'
*/
selectChannel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selectChannel.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\YouTubeController::selectChannel
* @see app/Http/Controllers/Auth/YouTubeController.php:127
* @route '/accounts/youtube/select'
*/
selectChannel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: selectChannel.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\YouTubeController::select
* @see app/Http/Controllers/Auth/YouTubeController.php:167
* @route '/accounts/youtube/select'
*/
export const select = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: select.url(options),
    method: 'post',
})

select.definition = {
    methods: ["post"],
    url: '/accounts/youtube/select',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\YouTubeController::select
* @see app/Http/Controllers/Auth/YouTubeController.php:167
* @route '/accounts/youtube/select'
*/
select.url = (options?: RouteQueryOptions) => {
    return select.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\YouTubeController::select
* @see app/Http/Controllers/Auth/YouTubeController.php:167
* @route '/accounts/youtube/select'
*/
select.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: select.url(options),
    method: 'post',
})

const YouTubeController = { connect, callback, selectChannel, select }

export default YouTubeController