import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\AutomationController::retry
* @see app/Http/Controllers/App/AutomationController.php:200
* @route '/automations/{automation}/runs/{run}/retry'
*/
export const retry = (args: { automation: string | { id: string }, run: string | { id: string } } | [automation: string | { id: string }, run: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retry.url(args, options),
    method: 'post',
})

retry.definition = {
    methods: ["post"],
    url: '/automations/{automation}/runs/{run}/retry',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\AutomationController::retry
* @see app/Http/Controllers/App/AutomationController.php:200
* @route '/automations/{automation}/runs/{run}/retry'
*/
retry.url = (args: { automation: string | { id: string }, run: string | { id: string } } | [automation: string | { id: string }, run: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            automation: args[0],
            run: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automation: typeof args.automation === 'object'
        ? args.automation.id
        : args.automation,
        run: typeof args.run === 'object'
        ? args.run.id
        : args.run,
    }

    return retry.definition.url
            .replace('{automation}', parsedArgs.automation.toString())
            .replace('{run}', parsedArgs.run.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::retry
* @see app/Http/Controllers/App/AutomationController.php:200
* @route '/automations/{automation}/runs/{run}/retry'
*/
retry.post = (args: { automation: string | { id: string }, run: string | { id: string } } | [automation: string | { id: string }, run: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retry.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\AutomationController::show
* @see app/Http/Controllers/App/AutomationController.php:256
* @route '/automations/{automation}/runs/{run}'
*/
export const show = (args: { automation: string | { id: string }, run: string | { id: string } } | [automation: string | { id: string }, run: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/automations/{automation}/runs/{run}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\AutomationController::show
* @see app/Http/Controllers/App/AutomationController.php:256
* @route '/automations/{automation}/runs/{run}'
*/
show.url = (args: { automation: string | { id: string }, run: string | { id: string } } | [automation: string | { id: string }, run: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            automation: args[0],
            run: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automation: typeof args.automation === 'object'
        ? args.automation.id
        : args.automation,
        run: typeof args.run === 'object'
        ? args.run.id
        : args.run,
    }

    return show.definition.url
            .replace('{automation}', parsedArgs.automation.toString())
            .replace('{run}', parsedArgs.run.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::show
* @see app/Http/Controllers/App/AutomationController.php:256
* @route '/automations/{automation}/runs/{run}'
*/
show.get = (args: { automation: string | { id: string }, run: string | { id: string } } | [automation: string | { id: string }, run: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\AutomationController::show
* @see app/Http/Controllers/App/AutomationController.php:256
* @route '/automations/{automation}/runs/{run}'
*/
show.head = (args: { automation: string | { id: string }, run: string | { id: string } } | [automation: string | { id: string }, run: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const runs = {
    retry: Object.assign(retry, retry),
    show: Object.assign(show, show),
}

export default runs