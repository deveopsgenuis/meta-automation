import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\SocialAccountController::index
* @see app/Http/Controllers/Api/SocialAccountController.php:24
* @route '/api/social-accounts'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/social-accounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SocialAccountController::index
* @see app/Http/Controllers/Api/SocialAccountController.php:24
* @route '/api/social-accounts'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SocialAccountController::index
* @see app/Http/Controllers/Api/SocialAccountController.php:24
* @route '/api/social-accounts'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SocialAccountController::index
* @see app/Http/Controllers/Api/SocialAccountController.php:24
* @route '/api/social-accounts'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SocialAccountController::toggle
* @see app/Http/Controllers/Api/SocialAccountController.php:31
* @route '/api/social-accounts/{account}/toggle'
*/
export const toggle = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: toggle.url(args, options),
    method: 'put',
})

toggle.definition = {
    methods: ["put"],
    url: '/api/social-accounts/{account}/toggle',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\SocialAccountController::toggle
* @see app/Http/Controllers/Api/SocialAccountController.php:31
* @route '/api/social-accounts/{account}/toggle'
*/
toggle.url = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return toggle.definition.url
            .replace('{account}', parsedArgs.account.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SocialAccountController::toggle
* @see app/Http/Controllers/Api/SocialAccountController.php:31
* @route '/api/social-accounts/{account}/toggle'
*/
toggle.put = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: toggle.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\SocialAccountController::boards
* @see app/Http/Controllers/Api/SocialAccountController.php:40
* @route '/api/social-accounts/{account}/boards'
*/
export const boards = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: boards.url(args, options),
    method: 'get',
})

boards.definition = {
    methods: ["get","head"],
    url: '/api/social-accounts/{account}/boards',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SocialAccountController::boards
* @see app/Http/Controllers/Api/SocialAccountController.php:40
* @route '/api/social-accounts/{account}/boards'
*/
boards.url = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return boards.definition.url
            .replace('{account}', parsedArgs.account.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SocialAccountController::boards
* @see app/Http/Controllers/Api/SocialAccountController.php:40
* @route '/api/social-accounts/{account}/boards'
*/
boards.get = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: boards.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SocialAccountController::boards
* @see app/Http/Controllers/Api/SocialAccountController.php:40
* @route '/api/social-accounts/{account}/boards'
*/
boards.head = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: boards.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SocialAccountController::channels
* @see app/Http/Controllers/Api/SocialAccountController.php:66
* @route '/api/social-accounts/{account}/channels'
*/
export const channels = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: channels.url(args, options),
    method: 'get',
})

channels.definition = {
    methods: ["get","head"],
    url: '/api/social-accounts/{account}/channels',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SocialAccountController::channels
* @see app/Http/Controllers/Api/SocialAccountController.php:66
* @route '/api/social-accounts/{account}/channels'
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
* @see \App\Http\Controllers\Api\SocialAccountController::channels
* @see app/Http/Controllers/Api/SocialAccountController.php:66
* @route '/api/social-accounts/{account}/channels'
*/
channels.get = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: channels.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SocialAccountController::channels
* @see app/Http/Controllers/Api/SocialAccountController.php:66
* @route '/api/social-accounts/{account}/channels'
*/
channels.head = (args: { account: string | { id: string } } | [account: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: channels.url(args, options),
    method: 'head',
})

const socialAccounts = {
    index: Object.assign(index, index),
    toggle: Object.assign(toggle, toggle),
    boards: Object.assign(boards, boards),
    channels: Object.assign(channels, channels),
}

export default socialAccounts