import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\AssetController::index
* @see app/Http/Controllers/App/AssetController.php:28
* @route '/assets'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/assets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\AssetController::index
* @see app/Http/Controllers/App/AssetController.php:28
* @route '/assets'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AssetController::index
* @see app/Http/Controllers/App/AssetController.php:28
* @route '/assets'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\AssetController::index
* @see app/Http/Controllers/App/AssetController.php:28
* @route '/assets'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\AssetController::search
* @see app/Http/Controllers/App/AssetController.php:41
* @route '/assets/search'
*/
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/assets/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\AssetController::search
* @see app/Http/Controllers/App/AssetController.php:41
* @route '/assets/search'
*/
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AssetController::search
* @see app/Http/Controllers/App/AssetController.php:41
* @route '/assets/search'
*/
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\AssetController::search
* @see app/Http/Controllers/App/AssetController.php:41
* @route '/assets/search'
*/
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\AssetController::store
* @see app/Http/Controllers/App/AssetController.php:59
* @route '/assets'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/assets',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\AssetController::store
* @see app/Http/Controllers/App/AssetController.php:59
* @route '/assets'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AssetController::store
* @see app/Http/Controllers/App/AssetController.php:59
* @route '/assets'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\AssetController::storeChunked
* @see app/Http/Controllers/App/AssetController.php:72
* @route '/assets/chunked'
*/
export const storeChunked = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeChunked.url(options),
    method: 'post',
})

storeChunked.definition = {
    methods: ["post"],
    url: '/assets/chunked',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\AssetController::storeChunked
* @see app/Http/Controllers/App/AssetController.php:72
* @route '/assets/chunked'
*/
storeChunked.url = (options?: RouteQueryOptions) => {
    return storeChunked.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AssetController::storeChunked
* @see app/Http/Controllers/App/AssetController.php:72
* @route '/assets/chunked'
*/
storeChunked.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeChunked.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\AssetController::storeFromUrl
* @see app/Http/Controllers/App/AssetController.php:89
* @route '/assets/from-url'
*/
export const storeFromUrl = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeFromUrl.url(options),
    method: 'post',
})

storeFromUrl.definition = {
    methods: ["post"],
    url: '/assets/from-url',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\AssetController::storeFromUrl
* @see app/Http/Controllers/App/AssetController.php:89
* @route '/assets/from-url'
*/
storeFromUrl.url = (options?: RouteQueryOptions) => {
    return storeFromUrl.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AssetController::storeFromUrl
* @see app/Http/Controllers/App/AssetController.php:89
* @route '/assets/from-url'
*/
storeFromUrl.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeFromUrl.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\AssetController::destroy
* @see app/Http/Controllers/App/AssetController.php:152
* @route '/assets/{media}'
*/
export const destroy = (args: { media: string | { id: string } } | [media: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/assets/{media}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\App\AssetController::destroy
* @see app/Http/Controllers/App/AssetController.php:152
* @route '/assets/{media}'
*/
destroy.url = (args: { media: string | { id: string } } | [media: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { media: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { media: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            media: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        media: typeof args.media === 'object'
        ? args.media.id
        : args.media,
    }

    return destroy.definition.url
            .replace('{media}', parsedArgs.media.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AssetController::destroy
* @see app/Http/Controllers/App/AssetController.php:152
* @route '/assets/{media}'
*/
destroy.delete = (args: { media: string | { id: string } } | [media: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const AssetController = { index, search, store, storeChunked, storeFromUrl, destroy }

export default AssetController