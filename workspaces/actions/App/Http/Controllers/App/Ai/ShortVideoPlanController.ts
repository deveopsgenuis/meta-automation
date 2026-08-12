import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::generate
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:27
* @route '/posts/ai/video/plan/generate'
*/
export const generate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

generate.definition = {
    methods: ["post"],
    url: '/posts/ai/video/plan/generate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::generate
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:27
* @route '/posts/ai/video/plan/generate'
*/
generate.url = (options?: RouteQueryOptions) => {
    return generate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::generate
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:27
* @route '/posts/ai/video/plan/generate'
*/
generate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::execute
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:93
* @route '/posts/ai/video/plan/execute'
*/
export const execute = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: execute.url(options),
    method: 'post',
})

execute.definition = {
    methods: ["post"],
    url: '/posts/ai/video/plan/execute',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::execute
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:93
* @route '/posts/ai/video/plan/execute'
*/
execute.url = (options?: RouteQueryOptions) => {
    return execute.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::execute
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:93
* @route '/posts/ai/video/plan/execute'
*/
execute.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: execute.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::show
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:164
* @route '/posts/ai/video/plan/batch/{videoBatch}'
*/
export const show = (args: { videoBatch: string | { id: string } } | [videoBatch: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/posts/ai/video/plan/batch/{videoBatch}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::show
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:164
* @route '/posts/ai/video/plan/batch/{videoBatch}'
*/
show.url = (args: { videoBatch: string | { id: string } } | [videoBatch: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { videoBatch: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { videoBatch: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            videoBatch: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        videoBatch: typeof args.videoBatch === 'object'
        ? args.videoBatch.id
        : args.videoBatch,
    }

    return show.definition.url
            .replace('{videoBatch}', parsedArgs.videoBatch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::show
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:164
* @route '/posts/ai/video/plan/batch/{videoBatch}'
*/
show.get = (args: { videoBatch: string | { id: string } } | [videoBatch: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::show
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:164
* @route '/posts/ai/video/plan/batch/{videoBatch}'
*/
show.head = (args: { videoBatch: string | { id: string } } | [videoBatch: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::retryItem
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:193
* @route '/posts/ai/video/plan/batch/{videoBatchItem}/retry'
*/
export const retryItem = (args: { videoBatchItem: string | { id: string } } | [videoBatchItem: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retryItem.url(args, options),
    method: 'post',
})

retryItem.definition = {
    methods: ["post"],
    url: '/posts/ai/video/plan/batch/{videoBatchItem}/retry',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::retryItem
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:193
* @route '/posts/ai/video/plan/batch/{videoBatchItem}/retry'
*/
retryItem.url = (args: { videoBatchItem: string | { id: string } } | [videoBatchItem: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { videoBatchItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { videoBatchItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            videoBatchItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        videoBatchItem: typeof args.videoBatchItem === 'object'
        ? args.videoBatchItem.id
        : args.videoBatchItem,
    }

    return retryItem.definition.url
            .replace('{videoBatchItem}', parsedArgs.videoBatchItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::retryItem
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:193
* @route '/posts/ai/video/plan/batch/{videoBatchItem}/retry'
*/
retryItem.post = (args: { videoBatchItem: string | { id: string } } | [videoBatchItem: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retryItem.url(args, options),
    method: 'post',
})

const ShortVideoPlanController = { generate, execute, show, retryItem }

export default ShortVideoPlanController