import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\LinkedInController::connect
* @see app/Http/Controllers/Auth/LinkedInController.php:41
* @route '/connect/linkedin'
*/
export const connect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

connect.definition = {
    methods: ["get","head"],
    url: '/connect/linkedin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\LinkedInController::connect
* @see app/Http/Controllers/Auth/LinkedInController.php:41
* @route '/connect/linkedin'
*/
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\LinkedInController::connect
* @see app/Http/Controllers/Auth/LinkedInController.php:41
* @route '/connect/linkedin'
*/
connect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\LinkedInController::connect
* @see app/Http/Controllers/Auth/LinkedInController.php:41
* @route '/connect/linkedin'
*/
connect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connect.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\LinkedInController::callback
* @see app/Http/Controllers/Auth/LinkedInController.php:59
* @route '/accounts/linkedin/callback'
*/
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/accounts/linkedin/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\LinkedInController::callback
* @see app/Http/Controllers/Auth/LinkedInController.php:59
* @route '/accounts/linkedin/callback'
*/
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\LinkedInController::callback
* @see app/Http/Controllers/Auth/LinkedInController.php:59
* @route '/accounts/linkedin/callback'
*/
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\LinkedInController::callback
* @see app/Http/Controllers/Auth/LinkedInController.php:59
* @route '/accounts/linkedin/callback'
*/
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\LinkedInController::selectIdentity
* @see app/Http/Controllers/Auth/LinkedInController.php:103
* @route '/accounts/linkedin/select'
*/
export const selectIdentity = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selectIdentity.url(options),
    method: 'get',
})

selectIdentity.definition = {
    methods: ["get","head"],
    url: '/accounts/linkedin/select',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\LinkedInController::selectIdentity
* @see app/Http/Controllers/Auth/LinkedInController.php:103
* @route '/accounts/linkedin/select'
*/
selectIdentity.url = (options?: RouteQueryOptions) => {
    return selectIdentity.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\LinkedInController::selectIdentity
* @see app/Http/Controllers/Auth/LinkedInController.php:103
* @route '/accounts/linkedin/select'
*/
selectIdentity.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selectIdentity.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\LinkedInController::selectIdentity
* @see app/Http/Controllers/Auth/LinkedInController.php:103
* @route '/accounts/linkedin/select'
*/
selectIdentity.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: selectIdentity.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\LinkedInController::select
* @see app/Http/Controllers/Auth/LinkedInController.php:123
* @route '/accounts/linkedin/select'
*/
export const select = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: select.url(options),
    method: 'post',
})

select.definition = {
    methods: ["post"],
    url: '/accounts/linkedin/select',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\LinkedInController::select
* @see app/Http/Controllers/Auth/LinkedInController.php:123
* @route '/accounts/linkedin/select'
*/
select.url = (options?: RouteQueryOptions) => {
    return select.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\LinkedInController::select
* @see app/Http/Controllers/Auth/LinkedInController.php:123
* @route '/accounts/linkedin/select'
*/
select.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: select.url(options),
    method: 'post',
})

const LinkedInController = { connect, callback, selectIdentity, select }

export default LinkedInController