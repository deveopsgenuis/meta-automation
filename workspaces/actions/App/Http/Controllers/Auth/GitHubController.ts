import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\GitHubController::redirect
* @see app/Http/Controllers/Auth/GitHubController.php:21
* @route '/auth/github/redirect'
*/
export const redirect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(options),
    method: 'get',
})

redirect.definition = {
    methods: ["get","head"],
    url: '/auth/github/redirect',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\GitHubController::redirect
* @see app/Http/Controllers/Auth/GitHubController.php:21
* @route '/auth/github/redirect'
*/
redirect.url = (options?: RouteQueryOptions) => {
    return redirect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\GitHubController::redirect
* @see app/Http/Controllers/Auth/GitHubController.php:21
* @route '/auth/github/redirect'
*/
redirect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\GitHubController::redirect
* @see app/Http/Controllers/Auth/GitHubController.php:21
* @route '/auth/github/redirect'
*/
redirect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: redirect.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\GitHubController::callback
* @see app/Http/Controllers/Auth/GitHubController.php:30
* @route '/auth/github/callback'
*/
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/auth/github/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\GitHubController::callback
* @see app/Http/Controllers/Auth/GitHubController.php:30
* @route '/auth/github/callback'
*/
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\GitHubController::callback
* @see app/Http/Controllers/Auth/GitHubController.php:30
* @route '/auth/github/callback'
*/
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\GitHubController::callback
* @see app/Http/Controllers/Auth/GitHubController.php:30
* @route '/auth/github/callback'
*/
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

const GitHubController = { redirect, callback }

export default GitHubController