import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\PostAiRegenerateMediaController::regenerate
* @see app/Http/Controllers/App/PostAiRegenerateMediaController.php:20
* @route '/posts/{post}/media/{mediaId}/ai/regenerate'
*/
export const regenerate = (args: { post: string | { id: string }, mediaId: string | number } | [post: string | { id: string }, mediaId: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerate.url(args, options),
    method: 'post',
})

regenerate.definition = {
    methods: ["post"],
    url: '/posts/{post}/media/{mediaId}/ai/regenerate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\PostAiRegenerateMediaController::regenerate
* @see app/Http/Controllers/App/PostAiRegenerateMediaController.php:20
* @route '/posts/{post}/media/{mediaId}/ai/regenerate'
*/
regenerate.url = (args: { post: string | { id: string }, mediaId: string | number } | [post: string | { id: string }, mediaId: string | number ], options?: RouteQueryOptions) => {
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

    return regenerate.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace('{mediaId}', parsedArgs.mediaId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostAiRegenerateMediaController::regenerate
* @see app/Http/Controllers/App/PostAiRegenerateMediaController.php:20
* @route '/posts/{post}/media/{mediaId}/ai/regenerate'
*/
regenerate.post = (args: { post: string | { id: string }, mediaId: string | number } | [post: string | { id: string }, mediaId: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerate.url(args, options),
    method: 'post',
})

const PostAiRegenerateMediaController = { regenerate }

export default PostAiRegenerateMediaController