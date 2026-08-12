import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\InstagramController::connect
* @see app/Http/Controllers/Auth/InstagramController.php:30
* @route '/connect/instagram'
*/
export const connect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

connect.definition = {
    methods: ["get","head"],
    url: '/connect/instagram',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\InstagramController::connect
* @see app/Http/Controllers/Auth/InstagramController.php:30
* @route '/connect/instagram'
*/
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\InstagramController::connect
* @see app/Http/Controllers/Auth/InstagramController.php:30
* @route '/connect/instagram'
*/
connect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\InstagramController::connect
* @see app/Http/Controllers/Auth/InstagramController.php:30
* @route '/connect/instagram'
*/
connect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connect.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\InstagramController::callback
* @see app/Http/Controllers/Auth/InstagramController.php:51
* @route '/accounts/instagram/callback'
*/
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/accounts/instagram/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\InstagramController::callback
* @see app/Http/Controllers/Auth/InstagramController.php:51
* @route '/accounts/instagram/callback'
*/
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\InstagramController::callback
* @see app/Http/Controllers/Auth/InstagramController.php:51
* @route '/accounts/instagram/callback'
*/
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\InstagramController::callback
* @see app/Http/Controllers/Auth/InstagramController.php:51
* @route '/accounts/instagram/callback'
*/
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\InstagramController::selectAccount
* @see app/Http/Controllers/Auth/InstagramController.php:0
* @route '/accounts/instagram/select'
*/
export const selectAccount = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selectAccount.url(options),
    method: 'get',
})

selectAccount.definition = {
    methods: ["get","head"],
    url: '/accounts/instagram/select',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\InstagramController::selectAccount
* @see app/Http/Controllers/Auth/InstagramController.php:0
* @route '/accounts/instagram/select'
*/
selectAccount.url = (options?: RouteQueryOptions) => {
    return selectAccount.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\InstagramController::selectAccount
* @see app/Http/Controllers/Auth/InstagramController.php:0
* @route '/accounts/instagram/select'
*/
selectAccount.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selectAccount.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\InstagramController::selectAccount
* @see app/Http/Controllers/Auth/InstagramController.php:0
* @route '/accounts/instagram/select'
*/
selectAccount.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: selectAccount.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\InstagramController::select
* @see app/Http/Controllers/Auth/InstagramController.php:0
* @route '/accounts/instagram/select'
*/
export const select = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: select.url(options),
    method: 'post',
})

select.definition = {
    methods: ["post"],
    url: '/accounts/instagram/select',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\InstagramController::select
* @see app/Http/Controllers/Auth/InstagramController.php:0
* @route '/accounts/instagram/select'
*/
select.url = (options?: RouteQueryOptions) => {
    return select.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\InstagramController::select
* @see app/Http/Controllers/Auth/InstagramController.php:0
* @route '/accounts/instagram/select'
*/
select.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: select.url(options),
    method: 'post',
})

const instagram = {
    connect: Object.assign(connect, connect),
    callback: Object.assign(callback, callback),
    selectAccount: Object.assign(selectAccount, selectAccount),
    select: Object.assign(select, select),
}

export default instagram