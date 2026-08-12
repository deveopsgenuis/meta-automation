import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\DiscordController::channels
* @see app/Http/Controllers/App/DiscordController.php:20
* @route '/discord/accounts/{account}/channels'
*/
export const channels = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: channels.url(args, options),
    method: 'get',
})

channels.definition = {
    methods: ["get","head"],
    url: '/discord/accounts/{account}/channels',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\DiscordController::channels
* @see app/Http/Controllers/App/DiscordController.php:20
* @route '/discord/accounts/{account}/channels'
*/
channels.url = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return channels.definition.url
            .replace('{account}', parsedArgs.account.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\DiscordController::channels
* @see app/Http/Controllers/App/DiscordController.php:20
* @route '/discord/accounts/{account}/channels'
*/
channels.get = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: channels.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\DiscordController::channels
* @see app/Http/Controllers/App/DiscordController.php:20
* @route '/discord/accounts/{account}/channels'
*/
channels.head = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: channels.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\DiscordController::mentions
* @see app/Http/Controllers/App/DiscordController.php:36
* @route '/discord/accounts/{account}/mentions'
*/
export const mentions = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mentions.url(args, options),
    method: 'get',
})

mentions.definition = {
    methods: ["get","head"],
    url: '/discord/accounts/{account}/mentions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\DiscordController::mentions
* @see app/Http/Controllers/App/DiscordController.php:36
* @route '/discord/accounts/{account}/mentions'
*/
mentions.url = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return mentions.definition.url
            .replace('{account}', parsedArgs.account.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\DiscordController::mentions
* @see app/Http/Controllers/App/DiscordController.php:36
* @route '/discord/accounts/{account}/mentions'
*/
mentions.get = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mentions.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\DiscordController::mentions
* @see app/Http/Controllers/App/DiscordController.php:36
* @route '/discord/accounts/{account}/mentions'
*/
mentions.head = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: mentions.url(args, options),
    method: 'head',
})

const DiscordController = { channels, mentions }

export default DiscordController