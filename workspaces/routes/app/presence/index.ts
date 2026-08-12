import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\App\PresenceController::heartbeat
* @see app/Http/Controllers/App/PresenceController.php:14
* @route '/presence/heartbeat'
*/
export const heartbeat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: heartbeat.url(options),
    method: 'post',
})

heartbeat.definition = {
    methods: ["post"],
    url: '/presence/heartbeat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\PresenceController::heartbeat
* @see app/Http/Controllers/App/PresenceController.php:14
* @route '/presence/heartbeat'
*/
heartbeat.url = (options?: RouteQueryOptions) => {
    return heartbeat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PresenceController::heartbeat
* @see app/Http/Controllers/App/PresenceController.php:14
* @route '/presence/heartbeat'
*/
heartbeat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: heartbeat.url(options),
    method: 'post',
})

const presence = {
    heartbeat: Object.assign(heartbeat, heartbeat),
}

export default presence