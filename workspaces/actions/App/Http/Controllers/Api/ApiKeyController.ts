import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ApiKeyController::index
* @see app/Http/Controllers/Api/ApiKeyController.php:17
* @route '/api/api-keys'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/api-keys',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ApiKeyController::index
* @see app/Http/Controllers/Api/ApiKeyController.php:17
* @route '/api/api-keys'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ApiKeyController::index
* @see app/Http/Controllers/Api/ApiKeyController.php:17
* @route '/api/api-keys'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ApiKeyController::index
* @see app/Http/Controllers/Api/ApiKeyController.php:17
* @route '/api/api-keys'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\ApiKeyController::store
* @see app/Http/Controllers/Api/ApiKeyController.php:28
* @route '/api/api-keys'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/api-keys',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ApiKeyController::store
* @see app/Http/Controllers/Api/ApiKeyController.php:28
* @route '/api/api-keys'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ApiKeyController::store
* @see app/Http/Controllers/Api/ApiKeyController.php:28
* @route '/api/api-keys'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ApiKeyController::destroy
* @see app/Http/Controllers/Api/ApiKeyController.php:47
* @route '/api/api-keys/{apiToken}'
*/
export const destroy = (args: { apiToken: string | number } | [apiToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/api-keys/{apiToken}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\ApiKeyController::destroy
* @see app/Http/Controllers/Api/ApiKeyController.php:47
* @route '/api/api-keys/{apiToken}'
*/
destroy.url = (args: { apiToken: string | number } | [apiToken: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { apiToken: args }
    }

    if (Array.isArray(args)) {
        args = {
            apiToken: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        apiToken: args.apiToken,
    }

    return destroy.definition.url
            .replace('{apiToken}', parsedArgs.apiToken.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ApiKeyController::destroy
* @see app/Http/Controllers/Api/ApiKeyController.php:47
* @route '/api/api-keys/{apiToken}'
*/
destroy.delete = (args: { apiToken: string | number } | [apiToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const ApiKeyController = { index, store, destroy }

export default ApiKeyController