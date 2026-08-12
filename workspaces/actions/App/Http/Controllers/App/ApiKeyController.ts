import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\ApiKeyController::index
* @see app/Http/Controllers/App/ApiKeyController.php:15
* @route '/settings/workspace/api-keys'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/settings/workspace/api-keys',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\ApiKeyController::index
* @see app/Http/Controllers/App/ApiKeyController.php:15
* @route '/settings/workspace/api-keys'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\ApiKeyController::index
* @see app/Http/Controllers/App/ApiKeyController.php:15
* @route '/settings/workspace/api-keys'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\ApiKeyController::index
* @see app/Http/Controllers/App/ApiKeyController.php:15
* @route '/settings/workspace/api-keys'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\ApiKeyController::store
* @see app/Http/Controllers/App/ApiKeyController.php:44
* @route '/settings/workspace/api-keys'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/settings/workspace/api-keys',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\ApiKeyController::store
* @see app/Http/Controllers/App/ApiKeyController.php:44
* @route '/settings/workspace/api-keys'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\ApiKeyController::store
* @see app/Http/Controllers/App/ApiKeyController.php:44
* @route '/settings/workspace/api-keys'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\ApiKeyController::destroy
* @see app/Http/Controllers/App/ApiKeyController.php:71
* @route '/settings/workspace/api-keys/{tokenId}'
*/
export const destroy = (args: { tokenId: string | number } | [tokenId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/settings/workspace/api-keys/{tokenId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\App\ApiKeyController::destroy
* @see app/Http/Controllers/App/ApiKeyController.php:71
* @route '/settings/workspace/api-keys/{tokenId}'
*/
destroy.url = (args: { tokenId: string | number } | [tokenId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tokenId: args }
    }

    if (Array.isArray(args)) {
        args = {
            tokenId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tokenId: args.tokenId,
    }

    return destroy.definition.url
            .replace('{tokenId}', parsedArgs.tokenId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\ApiKeyController::destroy
* @see app/Http/Controllers/App/ApiKeyController.php:71
* @route '/settings/workspace/api-keys/{tokenId}'
*/
destroy.delete = (args: { tokenId: string | number } | [tokenId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const ApiKeyController = { index, store, destroy }

export default ApiKeyController