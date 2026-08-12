import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\PosterDesignController::store
* @see app/Http/Controllers/App/PosterDesignController.php:16
* @route '/posts/ai/poster-design'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/posts/ai/poster-design',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\PosterDesignController::store
* @see app/Http/Controllers/App/PosterDesignController.php:16
* @route '/posts/ai/poster-design'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PosterDesignController::store
* @see app/Http/Controllers/App/PosterDesignController.php:16
* @route '/posts/ai/poster-design'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const PosterDesignController = { store }

export default PosterDesignController