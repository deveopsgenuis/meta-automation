import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\AnalyticsController::index
* @see app/Http/Controllers/App/AnalyticsController.php:41
* @route '/analytics'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\AnalyticsController::index
* @see app/Http/Controllers/App/AnalyticsController.php:41
* @route '/analytics'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AnalyticsController::index
* @see app/Http/Controllers/App/AnalyticsController.php:41
* @route '/analytics'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\AnalyticsController::index
* @see app/Http/Controllers/App/AnalyticsController.php:41
* @route '/analytics'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\AnalyticsController::show
* @see app/Http/Controllers/App/AnalyticsController.php:64
* @route '/analytics/{account}'
*/
export const show = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/analytics/{account}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\AnalyticsController::show
* @see app/Http/Controllers/App/AnalyticsController.php:64
* @route '/analytics/{account}'
*/
show.url = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { account: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { account: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            account: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        account: typeof args.account === 'object'
        ? args.account.id
        : args.account,
    }

    return show.definition.url
            .replace('{account}', parsedArgs.account.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AnalyticsController::show
* @see app/Http/Controllers/App/AnalyticsController.php:64
* @route '/analytics/{account}'
*/
show.get = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\AnalyticsController::show
* @see app/Http/Controllers/App/AnalyticsController.php:64
* @route '/analytics/{account}'
*/
show.head = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const AnalyticsController = { index, show }

export default AnalyticsController