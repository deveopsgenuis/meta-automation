import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \SendKit\Laravel\Http\Controllers\WebhookController::__invoke
* @see vendor/sendkit/sendkit-laravel/src/Http/Controllers/WebhookController.php:41
* @route '/webhook/sendkit'
*/
const WebhookController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: WebhookController.url(options),
    method: 'post',
})

WebhookController.definition = {
    methods: ["post"],
    url: '/webhook/sendkit',
} satisfies RouteDefinition<["post"]>

/**
* @see \SendKit\Laravel\Http\Controllers\WebhookController::__invoke
* @see vendor/sendkit/sendkit-laravel/src/Http/Controllers/WebhookController.php:41
* @route '/webhook/sendkit'
*/
WebhookController.url = (options?: RouteQueryOptions) => {
    return WebhookController.definition.url + queryParams(options)
}

/**
* @see \SendKit\Laravel\Http\Controllers\WebhookController::__invoke
* @see vendor/sendkit/sendkit-laravel/src/Http/Controllers/WebhookController.php:41
* @route '/webhook/sendkit'
*/
WebhookController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: WebhookController.url(options),
    method: 'post',
})

export default WebhookController