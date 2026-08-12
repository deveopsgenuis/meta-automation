import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
import plan from './plan'
import video from './video'
/**
* @see \App\Http\Controllers\App\PostAiGenerateController::generate
* @see app/Http/Controllers/App/PostAiGenerateController.php:17
* @route '/posts/{post}/ai/generate'
*/
export const generate = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(args, options),
    method: 'post',
})

generate.definition = {
    methods: ["post"],
    url: '/posts/{post}/ai/generate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\PostAiGenerateController::generate
* @see app/Http/Controllers/App/PostAiGenerateController.php:17
* @route '/posts/{post}/ai/generate'
*/
generate.url = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return generate.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostAiGenerateController::generate
* @see app/Http/Controllers/App/PostAiGenerateController.php:17
* @route '/posts/{post}/ai/generate'
*/
generate.post = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\PostAiRegenerateMediaController::regenerateMedia
* @see app/Http/Controllers/App/PostAiRegenerateMediaController.php:20
* @route '/posts/{post}/media/{mediaId}/ai/regenerate'
*/
export const regenerateMedia = (args: { post: string | { id: string }, mediaId: string | number } | [post: string | { id: string }, mediaId: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerateMedia.url(args, options),
    method: 'post',
})

regenerateMedia.definition = {
    methods: ["post"],
    url: '/posts/{post}/media/{mediaId}/ai/regenerate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\PostAiRegenerateMediaController::regenerateMedia
* @see app/Http/Controllers/App/PostAiRegenerateMediaController.php:20
* @route '/posts/{post}/media/{mediaId}/ai/regenerate'
*/
regenerateMedia.url = (args: { post: string | { id: string }, mediaId: string | number } | [post: string | { id: string }, mediaId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            post: args[0],
            mediaId: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
        mediaId: args.mediaId,
    }

    return regenerateMedia.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace('{mediaId}', parsedArgs.mediaId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostAiRegenerateMediaController::regenerateMedia
* @see app/Http/Controllers/App/PostAiRegenerateMediaController.php:20
* @route '/posts/{post}/media/{mediaId}/ai/regenerate'
*/
regenerateMedia.post = (args: { post: string | { id: string }, mediaId: string | number } | [post: string | { id: string }, mediaId: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerateMedia.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\PostAiReviewController::review
* @see app/Http/Controllers/App/PostAiReviewController.php:18
* @route '/posts/{post}/ai/review'
*/
export const review = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: review.url(args, options),
    method: 'post',
})

review.definition = {
    methods: ["post"],
    url: '/posts/{post}/ai/review',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\PostAiReviewController::review
* @see app/Http/Controllers/App/PostAiReviewController.php:18
* @route '/posts/{post}/ai/review'
*/
review.url = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return review.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostAiReviewController::review
* @see app/Http/Controllers/App/PostAiReviewController.php:18
* @route '/posts/{post}/ai/review'
*/
review.post = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: review.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\PostAiCreateController::create
* @see app/Http/Controllers/App/PostAiCreateController.php:21
* @route '/posts/ai/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

create.definition = {
    methods: ["post"],
    url: '/posts/ai/create',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\PostAiCreateController::create
* @see app/Http/Controllers/App/PostAiCreateController.php:21
* @route '/posts/ai/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostAiCreateController::create
* @see app/Http/Controllers/App/PostAiCreateController.php:21
* @route '/posts/ai/create'
*/
create.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\PosterDesignController::posterDesign
* @see app/Http/Controllers/App/PosterDesignController.php:16
* @route '/posts/ai/poster-design'
*/
export const posterDesign = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: posterDesign.url(options),
    method: 'post',
})

posterDesign.definition = {
    methods: ["post"],
    url: '/posts/ai/poster-design',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\PosterDesignController::posterDesign
* @see app/Http/Controllers/App/PosterDesignController.php:16
* @route '/posts/ai/poster-design'
*/
posterDesign.url = (options?: RouteQueryOptions) => {
    return posterDesign.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PosterDesignController::posterDesign
* @see app/Http/Controllers/App/PosterDesignController.php:16
* @route '/posts/ai/poster-design'
*/
posterDesign.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: posterDesign.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\PostAiCreateController::loading
* @see app/Http/Controllers/App/PostAiCreateController.php:76
* @route '/posts/ai/{creationId}/loading'
*/
export const loading = (args: { creationId: string | number } | [creationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loading.url(args, options),
    method: 'get',
})

loading.definition = {
    methods: ["get","head"],
    url: '/posts/ai/{creationId}/loading',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\PostAiCreateController::loading
* @see app/Http/Controllers/App/PostAiCreateController.php:76
* @route '/posts/ai/{creationId}/loading'
*/
loading.url = (args: { creationId: string | number } | [creationId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { creationId: args }
    }

    if (Array.isArray(args)) {
        args = {
            creationId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        creationId: args.creationId,
    }

    return loading.definition.url
            .replace('{creationId}', parsedArgs.creationId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostAiCreateController::loading
* @see app/Http/Controllers/App/PostAiCreateController.php:76
* @route '/posts/ai/{creationId}/loading'
*/
loading.get = (args: { creationId: string | number } | [creationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loading.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\PostAiCreateController::loading
* @see app/Http/Controllers/App/PostAiCreateController.php:76
* @route '/posts/ai/{creationId}/loading'
*/
loading.head = (args: { creationId: string | number } | [creationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: loading.url(args, options),
    method: 'head',
})

const ai = {
    generate: Object.assign(generate, generate),
    regenerateMedia: Object.assign(regenerateMedia, regenerateMedia),
    review: Object.assign(review, review),
    create: Object.assign(create, create),
    posterDesign: Object.assign(posterDesign, posterDesign),
    plan: Object.assign(plan, plan),
    loading: Object.assign(loading, loading),
    video: Object.assign(video, video),
}

export default ai