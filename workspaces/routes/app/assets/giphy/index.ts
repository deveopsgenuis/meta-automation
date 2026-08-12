import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\GiphyController::search
* @see app/Http/Controllers/App/GiphyController.php:14
* @route '/assets/giphy/search'
*/
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/assets/giphy/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\GiphyController::search
* @see app/Http/Controllers/App/GiphyController.php:14
* @route '/assets/giphy/search'
*/
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\GiphyController::search
* @see app/Http/Controllers/App/GiphyController.php:14
* @route '/assets/giphy/search'
*/
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\GiphyController::search
* @see app/Http/Controllers/App/GiphyController.php:14
* @route '/assets/giphy/search'
*/
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\GiphyController::trending
* @see app/Http/Controllers/App/GiphyController.php:30
* @route '/assets/giphy/trending'
*/
export const trending = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trending.url(options),
    method: 'get',
})

trending.definition = {
    methods: ["get","head"],
    url: '/assets/giphy/trending',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\GiphyController::trending
* @see app/Http/Controllers/App/GiphyController.php:30
* @route '/assets/giphy/trending'
*/
trending.url = (options?: RouteQueryOptions) => {
    return trending.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\GiphyController::trending
* @see app/Http/Controllers/App/GiphyController.php:30
* @route '/assets/giphy/trending'
*/
trending.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trending.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\GiphyController::trending
* @see app/Http/Controllers/App/GiphyController.php:30
* @route '/assets/giphy/trending'
*/
trending.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: trending.url(options),
    method: 'head',
})

const giphy = {
    search: Object.assign(search, search),
    trending: Object.assign(trending, trending),
}

export default giphy