import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\WorkspaceLabelController::index
* @see app/Http/Controllers/App/WorkspaceLabelController.php:18
* @route '/labels'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/labels',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\WorkspaceLabelController::index
* @see app/Http/Controllers/App/WorkspaceLabelController.php:18
* @route '/labels'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceLabelController::index
* @see app/Http/Controllers/App/WorkspaceLabelController.php:18
* @route '/labels'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\WorkspaceLabelController::index
* @see app/Http/Controllers/App/WorkspaceLabelController.php:18
* @route '/labels'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\WorkspaceLabelController::store
* @see app/Http/Controllers/App/WorkspaceLabelController.php:42
* @route '/labels'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/labels',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\WorkspaceLabelController::store
* @see app/Http/Controllers/App/WorkspaceLabelController.php:42
* @route '/labels'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceLabelController::store
* @see app/Http/Controllers/App/WorkspaceLabelController.php:42
* @route '/labels'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\WorkspaceLabelController::update
* @see app/Http/Controllers/App/WorkspaceLabelController.php:65
* @route '/labels/{label}'
*/
export const update = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/labels/{label}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\App\WorkspaceLabelController::update
* @see app/Http/Controllers/App/WorkspaceLabelController.php:65
* @route '/labels/{label}'
*/
update.url = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { label: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { label: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            label: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        label: typeof args.label === 'object'
        ? args.label.id
        : args.label,
    }

    return update.definition.url
            .replace('{label}', parsedArgs.label.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceLabelController::update
* @see app/Http/Controllers/App/WorkspaceLabelController.php:65
* @route '/labels/{label}'
*/
update.put = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\App\WorkspaceLabelController::destroy
* @see app/Http/Controllers/App/WorkspaceLabelController.php:92
* @route '/labels/{label}'
*/
export const destroy = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/labels/{label}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\App\WorkspaceLabelController::destroy
* @see app/Http/Controllers/App/WorkspaceLabelController.php:92
* @route '/labels/{label}'
*/
destroy.url = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { label: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { label: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            label: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        label: typeof args.label === 'object'
        ? args.label.id
        : args.label,
    }

    return destroy.definition.url
            .replace('{label}', parsedArgs.label.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceLabelController::destroy
* @see app/Http/Controllers/App/WorkspaceLabelController.php:92
* @route '/labels/{label}'
*/
destroy.delete = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const WorkspaceLabelController = { index, store, update, destroy }

export default WorkspaceLabelController