import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Webhooks\TelegramWebhookController::handle
* @see app/Http/Controllers/Webhooks/TelegramWebhookController.php:23
* @route '//meta-automation.nishe.ma/telegram/webhook'
*/
export const handle = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handle.url(options),
    method: 'post',
})

handle.definition = {
    methods: ["post"],
    url: '//meta-automation.nishe.ma/telegram/webhook',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Webhooks\TelegramWebhookController::handle
* @see app/Http/Controllers/Webhooks/TelegramWebhookController.php:23
* @route '//meta-automation.nishe.ma/telegram/webhook'
*/
handle.url = (options?: RouteQueryOptions) => {
    return handle.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Webhooks\TelegramWebhookController::handle
* @see app/Http/Controllers/Webhooks/TelegramWebhookController.php:23
* @route '//meta-automation.nishe.ma/telegram/webhook'
*/
handle.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handle.url(options),
    method: 'post',
})

const TelegramWebhookController = { handle }

export default TelegramWebhookController