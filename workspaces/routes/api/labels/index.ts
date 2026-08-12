import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\LabelController::index
* @see app/Http/Controllers/Api/LabelController.php:21
* @route '/api/labels'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/labels',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\LabelController::index
* @see app/Http/Controllers/Api/LabelController.php:21
* @route '/api/labels'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\LabelController::index
* @see app/Http/Controllers/Api/LabelController.php:21
* @route '/api/labels'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\LabelController::index
* @see app/Http/Controllers/Api/LabelController.php:21
* @route '/api/labels'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\LabelController::store
* @see app/Http/Controllers/Api/LabelController.php:28
* @route '/api/labels'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/labels',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\LabelController::store
* @see app/Http/Controllers/Api/LabelController.php:28
* @route '/api/labels'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\LabelController::store
* @see app/Http/Controllers/Api/LabelController.php:28
* @route '/api/labels'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\LabelController::update
* @see app/Http/Controllers/Api/LabelController.php:37
* @route '/api/labels/{label}'
*/
export const update = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/labels/{label}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\LabelController::update
* @see app/Http/Controllers/Api/LabelController.php:37
* @route '/api/labels/{label}'
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
* @see \App\Http\Controllers\Api\LabelController::update
* @see app/Http/Controllers/Api/LabelController.php:37
* @route '/api/labels/{label}'
*/
update.put = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\LabelController::destroy
* @see app/Http/Controllers/Api/LabelController.php:48
* @route '/api/labels/{label}'
*/
export const destroy = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/labels/{label}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\LabelController::destroy
* @see app/Http/Controllers/Api/LabelController.php:48
* @route '/api/labels/{label}'
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
* @see \App\Http\Controllers\Api\LabelController::destroy
* @see app/Http/Controllers/Api/LabelController.php:48
* @route '/api/labels/{label}'
*/
destroy.delete = (args: { label: string | { id: string } } | [label: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const labels = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default labels