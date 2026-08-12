import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \SendKit\Laravel\Http\Controllers\WebhookController::__invoke
* @see vendor/sendkit/sendkit-laravel/src/Http/Controllers/WebhookController.php:41
* @route '/webhook/sendkit'
*/
export const webhook = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(options),
    method: 'post',
})

webhook.definition = {
    methods: ["post"],
    url: '/webhook/sendkit',
} satisfies RouteDefinition<["post"]>

/**
* @see \SendKit\Laravel\Http\Controllers\WebhookController::__invoke
* @see vendor/sendkit/sendkit-laravel/src/Http/Controllers/WebhookController.php:41
* @route '/webhook/sendkit'
*/
webhook.url = (options?: RouteQueryOptions) => {
    return webhook.definition.url + queryParams(options)
}

/**
* @see \SendKit\Laravel\Http\Controllers\WebhookController::__invoke
* @see vendor/sendkit/sendkit-laravel/src/Http/Controllers/WebhookController.php:41
* @route '/webhook/sendkit'
*/
webhook.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(options),
    method: 'post',
})

const sendkit = {
    webhook: Object.assign(webhook, webhook),
}

export default sendkit