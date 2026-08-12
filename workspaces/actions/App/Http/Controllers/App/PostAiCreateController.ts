import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\PostAiCreateController::start
* @see app/Http/Controllers/App/PostAiCreateController.php:21
* @route '/posts/ai/create'
*/
export const start = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(options),
    method: 'post',
})

start.definition = {
    methods: ["post"],
    url: '/posts/ai/create',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\PostAiCreateController::start
* @see app/Http/Controllers/App/PostAiCreateController.php:21
* @route '/posts/ai/create'
*/
start.url = (options?: RouteQueryOptions) => {
    return start.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostAiCreateController::start
* @see app/Http/Controllers/App/PostAiCreateController.php:21
* @route '/posts/ai/create'
*/
start.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\PostAiCreateController::loading
* @see app/Http/Controllers/App/PostAiCreateController.php:76
* @route '/posts/ai/{creationId}/loading'
*/
export const loading = (args: { creationId: string | number } | [creationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loading.url(args, options),
    method: 'get',
})

loading.definition = {
    methods: ["get","head"],
    url: '/posts/ai/{creationId}/loading',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\PostAiCreateController::loading
* @see app/Http/Controllers/App/PostAiCreateController.php:76
* @route '/posts/ai/{creationId}/loading'
*/
loading.url = (args: { creationId: string | number } | [creationId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { creationId: args }
    }

    if (Array.isArray(args)) {
        args = {
            creationId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        creationId: args.creationId,
    }

    return loading.definition.url
            .replace('{creationId}', parsedArgs.creationId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostAiCreateController::loading
* @see app/Http/Controllers/App/PostAiCreateController.php:76
* @route '/posts/ai/{creationId}/loading'
*/
loading.get = (args: { creationId: string | number } | [creationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loading.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\PostAiCreateController::loading
* @see app/Http/Controllers/App/PostAiCreateController.php:76
* @route '/posts/ai/{creationId}/loading'
*/
loading.head = (args: { creationId: string | number } | [creationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: loading.url(args, options),
    method: 'head',
})

const PostAiCreateController = { start, loading }

export default PostAiCreateController