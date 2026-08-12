import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\FacebookController::connect
* @see app/Http/Controllers/Auth/FacebookController.php:35
* @route '/connect/facebook'
*/
export const connect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

connect.definition = {
    methods: ["get","head"],
    url: '/connect/facebook',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\FacebookController::connect
* @see app/Http/Controllers/Auth/FacebookController.php:35
* @route '/connect/facebook'
*/
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\FacebookController::connect
* @see app/Http/Controllers/Auth/FacebookController.php:35
* @route '/connect/facebook'
*/
connect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\FacebookController::connect
* @see app/Http/Controllers/Auth/FacebookController.php:35
* @route '/connect/facebook'
*/
connect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connect.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\FacebookController::callback
* @see app/Http/Controllers/Auth/FacebookController.php:57
* @route '/accounts/facebook/callback'
*/
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/accounts/facebook/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\FacebookController::callback
* @see app/Http/Controllers/Auth/FacebookController.php:57
* @route '/accounts/facebook/callback'
*/
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\FacebookController::callback
* @see app/Http/Controllers/Auth/FacebookController.php:57
* @route '/accounts/facebook/callback'
*/
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\FacebookController::callback
* @see app/Http/Controllers/Auth/FacebookController.php:57
* @route '/accounts/facebook/callback'
*/
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\FacebookController::selectPage
* @see app/Http/Controllers/Auth/FacebookController.php:142
* @route '/accounts/facebook/select'
*/
export const selectPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selectPage.url(options),
    method: 'get',
})

selectPage.definition = {
    methods: ["get","head"],
    url: '/accounts/facebook/select',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\FacebookController::selectPage
* @see app/Http/Controllers/Auth/FacebookController.php:142
* @route '/accounts/facebook/select'
*/
selectPage.url = (options?: RouteQueryOptions) => {
    return selectPage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\FacebookController::selectPage
* @see app/Http/Controllers/Auth/FacebookController.php:142
* @route '/accounts/facebook/select'
*/
selectPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selectPage.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\FacebookController::selectPage
* @see app/Http/Controllers/Auth/FacebookController.php:142
* @route '/accounts/facebook/select'
*/
selectPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: selectPage.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\FacebookController::select
* @see app/Http/Controllers/Auth/FacebookController.php:173
* @route '/accounts/facebook/select'
*/
export const select = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: select.url(options),
    method: 'post',
})

select.definition = {
    methods: ["post"],
    url: '/accounts/facebook/select',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\FacebookController::select
* @see app/Http/Controllers/Auth/FacebookController.php:173
* @route '/accounts/facebook/select'
*/
select.url = (options?: RouteQueryOptions) => {
    return select.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\FacebookController::select
* @see app/Http/Controllers/Auth/FacebookController.php:173
* @route '/accounts/facebook/select'
*/
select.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: select.url(options),
    method: 'post',
})

const facebook = {
    connect: Object.assign(connect, connect),
    callback: Object.assign(callback, callback),
    selectPage: Object.assign(selectPage, selectPage),
    select: Object.assign(select, select),
}

export default facebook