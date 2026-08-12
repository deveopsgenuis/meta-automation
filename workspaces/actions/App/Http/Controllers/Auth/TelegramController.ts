import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\TelegramController::connect
* @see app/Http/Controllers/Auth/TelegramController.php:23
* @route '/connect/telegram'
*/
export const connect = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: connect.url(options),
    method: 'post',
})

connect.definition = {
    methods: ["post"],
    url: '/connect/telegram',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\TelegramController::connect
* @see app/Http/Controllers/Auth/TelegramController.php:23
* @route '/connect/telegram'
*/
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\TelegramController::connect
* @see app/Http/Controllers/Auth/TelegramController.php:23
* @route '/connect/telegram'
*/
connect.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: connect.url(options),
    method: 'post',
})

const TelegramController = { connect }

export default TelegramController