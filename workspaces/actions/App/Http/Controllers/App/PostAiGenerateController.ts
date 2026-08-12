import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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

const PostAiGenerateController = { generate }

export default PostAiGenerateController