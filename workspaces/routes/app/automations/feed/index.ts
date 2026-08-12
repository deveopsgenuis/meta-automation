import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\AutomationController::inspect
* @see app/Http/Controllers/App/AutomationController.php:224
* @route '/automations/{automation}/feed/inspect'
*/
export const inspect = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: inspect.url(args, options),
    method: 'post',
})

inspect.definition = {
    methods: ["post"],
    url: '/automations/{automation}/feed/inspect',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\AutomationController::inspect
* @see app/Http/Controllers/App/AutomationController.php:224
* @route '/automations/{automation}/feed/inspect'
*/
inspect.url = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { automation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { automation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            automation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automation: typeof args.automation === 'object'
        ? args.automation.id
        : args.automation,
    }

    return inspect.definition.url
            .replace('{automation}', parsedArgs.automation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::inspect
* @see app/Http/Controllers/App/AutomationController.php:224
* @route '/automations/{automation}/feed/inspect'
*/
inspect.post = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: inspect.url(args, options),
    method: 'post',
})

const feed = {
    inspect: Object.assign(inspect, inspect),
}

export default feed