import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\PostTemplateController::index
* @see app/Http/Controllers/App/PostTemplateController.php:27
* @route '/post-templates'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/post-templates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\PostTemplateController::index
* @see app/Http/Controllers/App/PostTemplateController.php:27
* @route '/post-templates'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostTemplateController::index
* @see app/Http/Controllers/App/PostTemplateController.php:27
* @route '/post-templates'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\PostTemplateController::index
* @see app/Http/Controllers/App/PostTemplateController.php:27
* @route '/post-templates'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\PostTemplateController::apply
* @see app/Http/Controllers/App/PostTemplateController.php:49
* @route '/post-templates/{slug}/apply'
*/
export const apply = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apply.url(args, options),
    method: 'post',
})

apply.definition = {
    methods: ["post"],
    url: '/post-templates/{slug}/apply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\PostTemplateController::apply
* @see app/Http/Controllers/App/PostTemplateController.php:49
* @route '/post-templates/{slug}/apply'
*/
apply.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    if (Array.isArray(args)) {
        args = {
            slug: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        slug: args.slug,
    }

    return apply.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostTemplateController::apply
* @see app/Http/Controllers/App/PostTemplateController.php:49
* @route '/post-templates/{slug}/apply'
*/
apply.post = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apply.url(args, options),
    method: 'post',
})

const PostTemplateController = { index, apply }

export default PostTemplateController