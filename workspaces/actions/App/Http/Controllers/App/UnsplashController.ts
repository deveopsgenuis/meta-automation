import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\UnsplashController::search
* @see app/Http/Controllers/App/UnsplashController.php:14
* @route '/assets/unsplash/search'
*/
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/assets/unsplash/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\UnsplashController::search
* @see app/Http/Controllers/App/UnsplashController.php:14
* @route '/assets/unsplash/search'
*/
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\UnsplashController::search
* @see app/Http/Controllers/App/UnsplashController.php:14
* @route '/assets/unsplash/search'
*/
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\UnsplashController::search
* @see app/Http/Controllers/App/UnsplashController.php:14
* @route '/assets/unsplash/search'
*/
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\UnsplashController::trending
* @see app/Http/Controllers/App/UnsplashController.php:30
* @route '/assets/unsplash/trending'
*/
export const trending = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trending.url(options),
    method: 'get',
})

trending.definition = {
    methods: ["get","head"],
    url: '/assets/unsplash/trending',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\UnsplashController::trending
* @see app/Http/Controllers/App/UnsplashController.php:30
* @route '/assets/unsplash/trending'
*/
trending.url = (options?: RouteQueryOptions) => {
    return trending.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\UnsplashController::trending
* @see app/Http/Controllers/App/UnsplashController.php:30
* @route '/assets/unsplash/trending'
*/
trending.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trending.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\UnsplashController::trending
* @see app/Http/Controllers/App/UnsplashController.php:30
* @route '/assets/unsplash/trending'
*/
trending.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: trending.url(options),
    method: 'head',
})

const UnsplashController = { search, trending }

export default UnsplashController