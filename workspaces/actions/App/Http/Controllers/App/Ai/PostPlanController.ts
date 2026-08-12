import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::generate
* @see app/Http/Controllers/App/Ai/PostPlanController.php:27
* @route '/posts/ai/plan/generate'
*/
export const generate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

generate.definition = {
    methods: ["post"],
    url: '/posts/ai/plan/generate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::generate
* @see app/Http/Controllers/App/Ai/PostPlanController.php:27
* @route '/posts/ai/plan/generate'
*/
generate.url = (options?: RouteQueryOptions) => {
    return generate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::generate
* @see app/Http/Controllers/App/Ai/PostPlanController.php:27
* @route '/posts/ai/plan/generate'
*/
generate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::execute
* @see app/Http/Controllers/App/Ai/PostPlanController.php:100
* @route '/posts/ai/plan/execute'
*/
export const execute = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: execute.url(options),
    method: 'post',
})

execute.definition = {
    methods: ["post"],
    url: '/posts/ai/plan/execute',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::execute
* @see app/Http/Controllers/App/Ai/PostPlanController.php:100
* @route '/posts/ai/plan/execute'
*/
execute.url = (options?: RouteQueryOptions) => {
    return execute.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::execute
* @see app/Http/Controllers/App/Ai/PostPlanController.php:100
* @route '/posts/ai/plan/execute'
*/
execute.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: execute.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::show
* @see app/Http/Controllers/App/Ai/PostPlanController.php:157
* @route '/posts/ai/plan/batch/{posterBatch}'
*/
export const show = (args: { posterBatch: string | { id: string } } | [posterBatch: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/posts/ai/plan/batch/{posterBatch}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::show
* @see app/Http/Controllers/App/Ai/PostPlanController.php:157
* @route '/posts/ai/plan/batch/{posterBatch}'
*/
show.url = (args: { posterBatch: string | { id: string } } | [posterBatch: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { posterBatch: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { posterBatch: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            posterBatch: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        posterBatch: typeof args.posterBatch === 'object'
        ? args.posterBatch.id
        : args.posterBatch,
    }

    return show.definition.url
            .replace('{posterBatch}', parsedArgs.posterBatch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::show
* @see app/Http/Controllers/App/Ai/PostPlanController.php:157
* @route '/posts/ai/plan/batch/{posterBatch}'
*/
show.get = (args: { posterBatch: string | { id: string } } | [posterBatch: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::show
* @see app/Http/Controllers/App/Ai/PostPlanController.php:157
* @route '/posts/ai/plan/batch/{posterBatch}'
*/
show.head = (args: { posterBatch: string | { id: string } } | [posterBatch: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::retryItem
* @see app/Http/Controllers/App/Ai/PostPlanController.php:186
* @route '/posts/ai/plan/batch/{posterBatchItem}/retry'
*/
export const retryItem = (args: { posterBatchItem: string | { id: string } } | [posterBatchItem: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retryItem.url(args, options),
    method: 'post',
})

retryItem.definition = {
    methods: ["post"],
    url: '/posts/ai/plan/batch/{posterBatchItem}/retry',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::retryItem
* @see app/Http/Controllers/App/Ai/PostPlanController.php:186
* @route '/posts/ai/plan/batch/{posterBatchItem}/retry'
*/
retryItem.url = (args: { posterBatchItem: string | { id: string } } | [posterBatchItem: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { posterBatchItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { posterBatchItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            posterBatchItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        posterBatchItem: typeof args.posterBatchItem === 'object'
        ? args.posterBatchItem.id
        : args.posterBatchItem,
    }

    return retryItem.definition.url
            .replace('{posterBatchItem}', parsedArgs.posterBatchItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::retryItem
* @see app/Http/Controllers/App/Ai/PostPlanController.php:186
* @route '/posts/ai/plan/batch/{posterBatchItem}/retry'
*/
retryItem.post = (args: { posterBatchItem: string | { id: string } } | [posterBatchItem: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retryItem.url(args, options),
    method: 'post',
})

const PostPlanController = { generate, execute, show, retryItem }

export default PostPlanController