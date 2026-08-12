import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
import batch0b45e0 from './batch'
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
* @see \App\Http\Controllers\App\Ai\PostPlanController::batch
* @see app/Http/Controllers/App/Ai/PostPlanController.php:157
* @route '/posts/ai/plan/batch/{posterBatch}'
*/
export const batch = (args: { posterBatch: string | { id: string } } | [posterBatch: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: batch.url(args, options),
    method: 'get',
})

batch.definition = {
    methods: ["get","head"],
    url: '/posts/ai/plan/batch/{posterBatch}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::batch
* @see app/Http/Controllers/App/Ai/PostPlanController.php:157
* @route '/posts/ai/plan/batch/{posterBatch}'
*/
batch.url = (args: { posterBatch: string | { id: string } } | [posterBatch: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return batch.definition.url
            .replace('{posterBatch}', parsedArgs.posterBatch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::batch
* @see app/Http/Controllers/App/Ai/PostPlanController.php:157
* @route '/posts/ai/plan/batch/{posterBatch}'
*/
batch.get = (args: { posterBatch: string | { id: string } } | [posterBatch: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: batch.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::batch
* @see app/Http/Controllers/App/Ai/PostPlanController.php:157
* @route '/posts/ai/plan/batch/{posterBatch}'
*/
batch.head = (args: { posterBatch: string | { id: string } } | [posterBatch: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: batch.url(args, options),
    method: 'head',
})

const plan = {
    generate: Object.assign(generate, generate),
    execute: Object.assign(execute, execute),
    batch: Object.assign(batch, batch0b45e0),
}

export default plan