import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\PostController::metrics
* @see app/Http/Controllers/App/PostController.php:216
* @route '/posts/{post}/platforms/{postPlatform}/metrics'
*/
export const metrics = (args: { post: string | { id: string }, postPlatform: string | { id: string } } | [post: string | { id: string }, postPlatform: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: metrics.url(args, options),
    method: 'get',
})

metrics.definition = {
    methods: ["get","head"],
    url: '/posts/{post}/platforms/{postPlatform}/metrics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\PostController::metrics
* @see app/Http/Controllers/App/PostController.php:216
* @route '/posts/{post}/platforms/{postPlatform}/metrics'
*/
metrics.url = (args: { post: string | { id: string }, postPlatform: string | { id: string } } | [post: string | { id: string }, postPlatform: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            post: args[0],
            postPlatform: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
        postPlatform: typeof args.postPlatform === 'object'
        ? args.postPlatform.id
        : args.postPlatform,
    }

    return metrics.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace('{postPlatform}', parsedArgs.postPlatform.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostController::metrics
* @see app/Http/Controllers/App/PostController.php:216
* @route '/posts/{post}/platforms/{postPlatform}/metrics'
*/
metrics.get = (args: { post: string | { id: string }, postPlatform: string | { id: string } } | [post: string | { id: string }, postPlatform: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: metrics.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\PostController::metrics
* @see app/Http/Controllers/App/PostController.php:216
* @route '/posts/{post}/platforms/{postPlatform}/metrics'
*/
metrics.head = (args: { post: string | { id: string }, postPlatform: string | { id: string } } | [post: string | { id: string }, postPlatform: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: metrics.url(args, options),
    method: 'head',
})

const platforms = {
    metrics: Object.assign(metrics, metrics),
}

export default platforms