import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Webhooks\TelegramWebhookController::webhook
* @see app/Http/Controllers/Webhooks/TelegramWebhookController.php:23
* @route '//meta-automation.nishe.ma/telegram/webhook'
*/
export const webhook = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(options),
    method: 'post',
})

webhook.definition = {
    methods: ["post"],
    url: '//meta-automation.nishe.ma/telegram/webhook',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Webhooks\TelegramWebhookController::webhook
* @see app/Http/Controllers/Webhooks/TelegramWebhookController.php:23
* @route '//meta-automation.nishe.ma/telegram/webhook'
*/
webhook.url = (options?: RouteQueryOptions) => {
    return webhook.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Webhooks\TelegramWebhookController::webhook
* @see app/Http/Controllers/Webhooks/TelegramWebhookController.php:23
* @route '//meta-automation.nishe.ma/telegram/webhook'
*/
webhook.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(options),
    method: 'post',
})

const telegram = {
    webhook: Object.assign(webhook, webhook),
}

export default telegram