import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\PlatformController::contentTypes
* @see app/Http/Controllers/Api/PlatformController.php:18
* @route '/api/content-types'
*/
export const contentTypes = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contentTypes.url(options),
    method: 'get',
})

contentTypes.definition = {
    methods: ["get","head"],
    url: '/api/content-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\PlatformController::contentTypes
* @see app/Http/Controllers/Api/PlatformController.php:18
* @route '/api/content-types'
*/
contentTypes.url = (options?: RouteQueryOptions) => {
    return contentTypes.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PlatformController::contentTypes
* @see app/Http/Controllers/Api/PlatformController.php:18
* @route '/api/content-types'
*/
contentTypes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contentTypes.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\PlatformController::contentTypes
* @see app/Http/Controllers/Api/PlatformController.php:18
* @route '/api/content-types'
*/
contentTypes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contentTypes.url(options),
    method: 'head',
})

const PlatformController = { contentTypes }

export default PlatformController