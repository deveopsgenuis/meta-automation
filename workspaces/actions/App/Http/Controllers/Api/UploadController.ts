import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\UploadController::store
* @see app/Http/Controllers/Api/UploadController.php:28
* @route '/api/uploads/{token}'
*/
export const store = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/uploads/{token}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\UploadController::store
* @see app/Http/Controllers/Api/UploadController.php:28
* @route '/api/uploads/{token}'
*/
store.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    if (Array.isArray(args)) {
        args = {
            token: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        token: args.token,
    }

    return store.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\UploadController::store
* @see app/Http/Controllers/Api/UploadController.php:28
* @route '/api/uploads/{token}'
*/
store.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

const UploadController = { store }

export default UploadController