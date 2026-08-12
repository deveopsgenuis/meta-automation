import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::retry
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:193
* @route '/posts/ai/video/plan/batch/{videoBatchItem}/retry'
*/
export const retry = (args: { videoBatchItem: string | { id: string } } | [videoBatchItem: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retry.url(args, options),
    method: 'post',
})

retry.definition = {
    methods: ["post"],
    url: '/posts/ai/video/plan/batch/{videoBatchItem}/retry',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::retry
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:193
* @route '/posts/ai/video/plan/batch/{videoBatchItem}/retry'
*/
retry.url = (args: { videoBatchItem: string | { id: string } } | [videoBatchItem: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return retry.definition.url
            .replace('{videoBatchItem}', parsedArgs.videoBatchItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Ai\ShortVideoPlanController::retry
* @see app/Http/Controllers/App/Ai/ShortVideoPlanController.php:193
* @route '/posts/ai/video/plan/batch/{videoBatchItem}/retry'
*/
retry.post = (args: { videoBatchItem: string | { id: string } } | [videoBatchItem: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retry.url(args, options),
    method: 'post',
})

const batch = {
    retry: Object.assign(retry, retry),
}

export default batch