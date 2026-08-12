import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\LinkPreviewController::__invoke
* @see app/Http/Controllers/App/LinkPreviewController.php:15
* @route '/posts/link-preview'
*/
const LinkPreviewController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: LinkPreviewController.url(options),
    method: 'post',
})

LinkPreviewController.definition = {
    methods: ["post"],
    url: '/posts/link-preview',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\LinkPreviewController::__invoke
* @see app/Http/Controllers/App/LinkPreviewController.php:15
* @route '/posts/link-preview'
*/
LinkPreviewController.url = (options?: RouteQueryOptions) => {
    return LinkPreviewController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\LinkPreviewController::__invoke
* @see app/Http/Controllers/App/LinkPreviewController.php:15
* @route '/posts/link-preview'
*/
LinkPreviewController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: LinkPreviewController.url(options),
    method: 'post',
})

export default LinkPreviewController