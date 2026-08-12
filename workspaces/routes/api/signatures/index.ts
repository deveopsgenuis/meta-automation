import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\SignatureController::index
* @see app/Http/Controllers/Api/SignatureController.php:21
* @route '/api/signatures'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/signatures',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SignatureController::index
* @see app/Http/Controllers/Api/SignatureController.php:21
* @route '/api/signatures'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SignatureController::index
* @see app/Http/Controllers/Api/SignatureController.php:21
* @route '/api/signatures'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SignatureController::index
* @see app/Http/Controllers/Api/SignatureController.php:21
* @route '/api/signatures'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SignatureController::store
* @see app/Http/Controllers/Api/SignatureController.php:28
* @route '/api/signatures'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/signatures',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SignatureController::store
* @see app/Http/Controllers/Api/SignatureController.php:28
* @route '/api/signatures'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SignatureController::store
* @see app/Http/Controllers/Api/SignatureController.php:28
* @route '/api/signatures'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SignatureController::update
* @see app/Http/Controllers/Api/SignatureController.php:37
* @route '/api/signatures/{signature}'
*/
export const update = (args: { signature: string | { id: string } } | [signature: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/signatures/{signature}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\SignatureController::update
* @see app/Http/Controllers/Api/SignatureController.php:37
* @route '/api/signatures/{signature}'
*/
update.url = (args: { signature: string | { id: string } } | [signature: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { signature: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { signature: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            signature: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        signature: typeof args.signature === 'object'
        ? args.signature.id
        : args.signature,
    }

    return update.definition.url
            .replace('{signature}', parsedArgs.signature.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SignatureController::update
* @see app/Http/Controllers/Api/SignatureController.php:37
* @route '/api/signatures/{signature}'
*/
update.put = (args: { signature: string | { id: string } } | [signature: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\SignatureController::destroy
* @see app/Http/Controllers/Api/SignatureController.php:48
* @route '/api/signatures/{signature}'
*/
export const destroy = (args: { signature: string | { id: string } } | [signature: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/signatures/{signature}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\SignatureController::destroy
* @see app/Http/Controllers/Api/SignatureController.php:48
* @route '/api/signatures/{signature}'
*/
destroy.url = (args: { signature: string | { id: string } } | [signature: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { signature: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { signature: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            signature: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        signature: typeof args.signature === 'object'
        ? args.signature.id
        : args.signature,
    }

    return destroy.definition.url
            .replace('{signature}', parsedArgs.signature.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SignatureController::destroy
* @see app/Http/Controllers/Api/SignatureController.php:48
* @route '/api/signatures/{signature}'
*/
destroy.delete = (args: { signature: string | { id: string } } | [signature: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const signatures = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default signatures