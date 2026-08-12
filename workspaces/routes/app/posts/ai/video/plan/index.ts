import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
import batch0b45e0 from './batch'
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
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::batch
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:164
* @route '/posts/ai/video/plan/batch/{videoBatch}'
*/
export const batch = (args: { videoBatch: string | { id: string } } | [videoBatch: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: batch.url(args, options),
    method: 'get',
})

batch.definition = {
    methods: ["get","head"],
    url: '/posts/ai/video/plan/batch/{videoBatch}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::batch
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:164
* @route '/posts/ai/video/plan/batch/{videoBatch}'
*/
batch.url = (args: { videoBatch: string | { id: string } } | [videoBatch: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return batch.definition.url
            .replace('{videoBatch}', parsedArgs.videoBatch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::batch
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:164
* @route '/posts/ai/video/plan/batch/{videoBatch}'
*/
batch.get = (args: { videoBatch: string | { id: string } } | [videoBatch: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: batch.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::batch
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:164
* @route '/posts/ai/video/plan/batch/{videoBatch}'
*/
batch.head = (args: { videoBatch: string | { id: string } } | [videoBatch: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: batch.url(args, options),
    method: 'head',
})

const plan = {
    generate: Object.assign(generate, generate),
    execute: Object.assign(execute, execute),
    batch: Object.assign(batch, batch0b45e0),
}

export default plan