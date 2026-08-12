import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::retry
* @see app/Http/Controllers/App/Ai/PostPlanController.php:186
* @route '/posts/ai/plan/batch/{posterBatchItem}/retry'
*/
export const retry = (args: { posterBatchItem: string | { id: string } } | [posterBatchItem: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retry.url(args, options),
    method: 'post',
})

retry.definition = {
    methods: ["post"],
    url: '/posts/ai/plan/batch/{posterBatchItem}/retry',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::retry
* @see app/Http/Controllers/App/Ai/PostPlanController.php:186
* @route '/posts/ai/plan/batch/{posterBatchItem}/retry'
*/
retry.url = (args: { posterBatchItem: string | { id: string } } | [posterBatchItem: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return retry.definition.url
            .replace('{posterBatchItem}', parsedArgs.posterBatchItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Ai\PostPlanController::retry
* @see app/Http/Controllers/App/Ai/PostPlanController.php:186
* @route '/posts/ai/plan/batch/{posterBatchItem}/retry'
*/
retry.post = (args: { posterBatchItem: string | { id: string } } | [posterBatchItem: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retry.url(args, options),
    method: 'post',
})

const batch = {
    retry: Object.assign(retry, retry),
}

export default batch