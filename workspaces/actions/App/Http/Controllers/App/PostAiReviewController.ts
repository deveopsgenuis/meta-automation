import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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

const PostAiReviewController = { review }

export default PostAiReviewController