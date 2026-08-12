import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\WorkspaceController::show
* @see app/Http/Controllers/Api/WorkspaceController.php:12
* @route '/api/workspace'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/workspace',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\WorkspaceController::show
* @see app/Http/Controllers/Api/WorkspaceController.php:12
* @route '/api/workspace'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WorkspaceController::show
* @see app/Http/Controllers/Api/WorkspaceController.php:12
* @route '/api/workspace'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\WorkspaceController::show
* @see app/Http/Controllers/Api/WorkspaceController.php:12
* @route '/api/workspace'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

const workspace = {
    show: Object.assign(show, show),
}

export default workspace