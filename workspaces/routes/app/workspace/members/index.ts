import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\WorkspaceController::search
* @see app/Http/Controllers/App/WorkspaceController.php:32
* @route '/workspace/members/search'
*/
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/workspace/members/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\WorkspaceController::search
* @see app/Http/Controllers/App/WorkspaceController.php:32
* @route '/workspace/members/search'
*/
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceController::search
* @see app/Http/Controllers/App/WorkspaceController.php:32
* @route '/workspace/members/search'
*/
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\WorkspaceController::search
* @see app/Http/Controllers/App/WorkspaceController.php:32
* @route '/workspace/members/search'
*/
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

const members = {
    search: Object.assign(search, search),
}

export default members