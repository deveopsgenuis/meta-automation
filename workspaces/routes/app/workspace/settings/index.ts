import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\WorkspaceController::update
* @see app/Http/Controllers/App/WorkspaceController.php:209
* @route '/settings/workspace'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/settings/workspace',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\App\WorkspaceController::update
* @see app/Http/Controllers/App/WorkspaceController.php:209
* @route '/settings/workspace'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceController::update
* @see app/Http/Controllers/App/WorkspaceController.php:209
* @route '/settings/workspace'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const settings = {
    update: Object.assign(update, update),
}

export default settings