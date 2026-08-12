import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\PostController::index
* @see app/Http/Controllers/Api/PostController.php:33
* @route '/api/posts'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/posts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\PostController::index
* @see app/Http/Controllers/Api/PostController.php:33
* @route '/api/posts'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PostController::index
* @see app/Http/Controllers/Api/PostController.php:33
* @route '/api/posts'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\PostController::index
* @see app/Http/Controllers/Api/PostController.php:33
* @route '/api/posts'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\PostController::store
* @see app/Http/Controllers/Api/PostController.php:52
* @route '/api/posts'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/posts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\PostController::store
* @see app/Http/Controllers/Api/PostController.php:52
* @route '/api/posts'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PostController::store
* @see app/Http/Controllers/Api/PostController.php:52
* @route '/api/posts'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\PostController::show
* @see app/Http/Controllers/Api/PostController.php:43
* @route '/api/posts/{post}'
*/
export const show = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/posts/{post}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\PostController::show
* @see app/Http/Controllers/Api/PostController.php:43
* @route '/api/posts/{post}'
*/
show.url = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { post: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
    }

    return show.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PostController::show
* @see app/Http/Controllers/Api/PostController.php:43
* @route '/api/posts/{post}'
*/
show.get = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\PostController::show
* @see app/Http/Controllers/Api/PostController.php:43
* @route '/api/posts/{post}'
*/
show.head = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\PostController::update
* @see app/Http/Controllers/Api/PostController.php:76
* @route '/api/posts/{post}'
*/
export const update = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/posts/{post}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\PostController::update
* @see app/Http/Controllers/Api/PostController.php:76
* @route '/api/posts/{post}'
*/
update.url = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { post: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
    }

    return update.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PostController::update
* @see app/Http/Controllers/Api/PostController.php:76
* @route '/api/posts/{post}'
*/
update.put = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\PostController::destroy
* @see app/Http/Controllers/Api/PostController.php:105
* @route '/api/posts/{post}'
*/
export const destroy = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/posts/{post}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\PostController::destroy
* @see app/Http/Controllers/Api/PostController.php:105
* @route '/api/posts/{post}'
*/
destroy.url = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { post: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
    }

    return destroy.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PostController::destroy
* @see app/Http/Controllers/Api/PostController.php:105
* @route '/api/posts/{post}'
*/
destroy.delete = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\PostController::storeMedia
* @see app/Http/Controllers/Api/PostController.php:114
* @route '/api/posts/{post}/media'
*/
export const storeMedia = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMedia.url(args, options),
    method: 'post',
})

storeMedia.definition = {
    methods: ["post"],
    url: '/api/posts/{post}/media',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\PostController::storeMedia
* @see app/Http/Controllers/Api/PostController.php:114
* @route '/api/posts/{post}/media'
*/
storeMedia.url = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { post: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
    }

    return storeMedia.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PostController::storeMedia
* @see app/Http/Controllers/Api/PostController.php:114
* @route '/api/posts/{post}/media'
*/
storeMedia.post = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMedia.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\PostController::attachMediaFromUrl
* @see app/Http/Controllers/Api/PostController.php:149
* @route '/api/posts/{post}/media/from-url'
*/
export const attachMediaFromUrl = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attachMediaFromUrl.url(args, options),
    method: 'post',
})

attachMediaFromUrl.definition = {
    methods: ["post"],
    url: '/api/posts/{post}/media/from-url',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\PostController::attachMediaFromUrl
* @see app/Http/Controllers/Api/PostController.php:149
* @route '/api/posts/{post}/media/from-url'
*/
attachMediaFromUrl.url = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { post: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
    }

    return attachMediaFromUrl.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PostController::attachMediaFromUrl
* @see app/Http/Controllers/Api/PostController.php:149
* @route '/api/posts/{post}/media/from-url'
*/
attachMediaFromUrl.post = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attachMediaFromUrl.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\PostController::metrics
* @see app/Http/Controllers/Api/PostController.php:160
* @route '/api/posts/{post}/metrics'
*/
export const metrics = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: metrics.url(args, options),
    method: 'get',
})

metrics.definition = {
    methods: ["get","head"],
    url: '/api/posts/{post}/metrics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\PostController::metrics
* @see app/Http/Controllers/Api/PostController.php:160
* @route '/api/posts/{post}/metrics'
*/
metrics.url = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { post: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
    }

    return metrics.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PostController::metrics
* @see app/Http/Controllers/Api/PostController.php:160
* @route '/api/posts/{post}/metrics'
*/
metrics.get = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: metrics.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\PostController::metrics
* @see app/Http/Controllers/Api/PostController.php:160
* @route '/api/posts/{post}/metrics'
*/
metrics.head = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: metrics.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\PostController::preview
* @see app/Http/Controllers/Api/PostController.php:169
* @route '/api/posts/{post}/preview'
*/
export const preview = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

preview.definition = {
    methods: ["get","head"],
    url: '/api/posts/{post}/preview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\PostController::preview
* @see app/Http/Controllers/Api/PostController.php:169
* @route '/api/posts/{post}/preview'
*/
preview.url = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { post: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
    }

    return preview.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PostController::preview
* @see app/Http/Controllers/Api/PostController.php:169
* @route '/api/posts/{post}/preview'
*/
preview.get = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\PostController::preview
* @see app/Http/Controllers/Api/PostController.php:169
* @route '/api/posts/{post}/preview'
*/
preview.head = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preview.url(args, options),
    method: 'head',
})

const posts = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    storeMedia: Object.assign(storeMedia, storeMedia),
    attachMediaFromUrl: Object.assign(attachMediaFromUrl, attachMediaFromUrl),
    metrics: Object.assign(metrics, metrics),
    preview: Object.assign(preview, preview),
}

export default posts