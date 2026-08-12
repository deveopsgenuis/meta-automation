import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\Settings\UsageController::index
* @see app/Http/Controllers/App/Settings/UsageController.php:17
* @route '/settings/account/usage'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/settings/account/usage',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\Settings\UsageController::index
* @see app/Http/Controllers/App/Settings/UsageController.php:17
* @route '/settings/account/usage'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Settings\UsageController::index
* @see app/Http/Controllers/App/Settings/UsageController.php:17
* @route '/settings/account/usage'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\Settings\UsageController::index
* @see app/Http/Controllers/App/Settings/UsageController.php:17
* @route '/settings/account/usage'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const UsageController = { index }

export default UsageController