import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\InstagramFacebookController::connect
* @see app/Http/Controllers/Auth/InstagramFacebookController.php:37
* @route '/connect/instagram-facebook'
*/
export const connect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

connect.definition = {
    methods: ["get","head"],
    url: '/connect/instagram-facebook',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\InstagramFacebookController::connect
* @see app/Http/Controllers/Auth/InstagramFacebookController.php:37
* @route '/connect/instagram-facebook'
*/
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\InstagramFacebookController::connect
* @see app/Http/Controllers/Auth/InstagramFacebookController.php:37
* @route '/connect/instagram-facebook'
*/
connect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\InstagramFacebookController::connect
* @see app/Http/Controllers/Auth/InstagramFacebookController.php:37
* @route '/connect/instagram-facebook'
*/
connect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connect.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\InstagramFacebookController::callback
* @see app/Http/Controllers/Auth/InstagramFacebookController.php:60
* @route '/accounts/instagram-facebook/callback'
*/
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/accounts/instagram-facebook/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\InstagramFacebookController::callback
* @see app/Http/Controllers/Auth/InstagramFacebookController.php:60
* @route '/accounts/instagram-facebook/callback'
*/
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\InstagramFacebookController::callback
* @see app/Http/Controllers/Auth/InstagramFacebookController.php:60
* @route '/accounts/instagram-facebook/callback'
*/
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\InstagramFacebookController::callback
* @see app/Http/Controllers/Auth/InstagramFacebookController.php:60
* @route '/accounts/instagram-facebook/callback'
*/
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\InstagramFacebookController::selectPage
* @see app/Http/Controllers/Auth/InstagramFacebookController.php:121
* @route '/accounts/instagram-facebook/select-page'
*/
export const selectPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selectPage.url(options),
    method: 'get',
})

selectPage.definition = {
    methods: ["get","head"],
    url: '/accounts/instagram-facebook/select-page',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\InstagramFacebookController::selectPage
* @see app/Http/Controllers/Auth/InstagramFacebookController.php:121
* @route '/accounts/instagram-facebook/select-page'
*/
selectPage.url = (options?: RouteQueryOptions) => {
    return selectPage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\InstagramFacebookController::selectPage
* @see app/Http/Controllers/Auth/InstagramFacebookController.php:121
* @route '/accounts/instagram-facebook/select-page'
*/
selectPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selectPage.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\InstagramFacebookController::selectPage
* @see app/Http/Controllers/Auth/InstagramFacebookController.php:121
* @route '/accounts/instagram-facebook/select-page'
*/
selectPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: selectPage.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\InstagramFacebookController::select
* @see app/Http/Controllers/Auth/InstagramFacebookController.php:149
* @route '/accounts/instagram-facebook/select'
*/
export const select = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: select.url(options),
    method: 'post',
})

select.definition = {
    methods: ["post"],
    url: '/accounts/instagram-facebook/select',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\InstagramFacebookController::select
* @see app/Http/Controllers/Auth/InstagramFacebookController.php:149
* @route '/accounts/instagram-facebook/select'
*/
select.url = (options?: RouteQueryOptions) => {
    return select.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\InstagramFacebookController::select
* @see app/Http/Controllers/Auth/InstagramFacebookController.php:149
* @route '/accounts/instagram-facebook/select'
*/
select.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: select.url(options),
    method: 'post',
})

const instagramFacebook = {
    connect: Object.assign(connect, connect),
    callback: Object.assign(callback, callback),
    selectPage: Object.assign(selectPage, selectPage),
    select: Object.assign(select, select),
}

export default instagramFacebook