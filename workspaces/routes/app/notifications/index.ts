import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
import preferencesA95905 from './preferences'
/**
* @see \App\Http\Controllers\App\NotificationController::index
* @see app/Http/Controllers/App/NotificationController.php:14
* @route '/notifications'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\NotificationController::index
* @see app/Http/Controllers/App/NotificationController.php:14
* @route '/notifications'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\NotificationController::index
* @see app/Http/Controllers/App/NotificationController.php:14
* @route '/notifications'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\NotificationController::index
* @see app/Http/Controllers/App/NotificationController.php:14
* @route '/notifications'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\NotificationController::read
* @see app/Http/Controllers/App/NotificationController.php:43
* @route '/notifications/{notification}/read'
*/
export const read = (args: { notification: string | { id: string } } | [notification: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: read.url(args, options),
    method: 'put',
})

read.definition = {
    methods: ["put"],
    url: '/notifications/{notification}/read',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\App\NotificationController::read
* @see app/Http/Controllers/App/NotificationController.php:43
* @route '/notifications/{notification}/read'
*/
read.url = (args: { notification: string | { id: string } } | [notification: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { notification: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { notification: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            notification: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        notification: typeof args.notification === 'object'
        ? args.notification.id
        : args.notification,
    }

    return read.definition.url
            .replace('{notification}', parsedArgs.notification.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\NotificationController::read
* @see app/Http/Controllers/App/NotificationController.php:43
* @route '/notifications/{notification}/read'
*/
read.put = (args: { notification: string | { id: string } } | [notification: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: read.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\App\NotificationController::readAll
* @see app/Http/Controllers/App/NotificationController.php:54
* @route '/notifications/read-all'
*/
export const readAll = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: readAll.url(options),
    method: 'post',
})

readAll.definition = {
    methods: ["post"],
    url: '/notifications/read-all',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\NotificationController::readAll
* @see app/Http/Controllers/App/NotificationController.php:54
* @route '/notifications/read-all'
*/
readAll.url = (options?: RouteQueryOptions) => {
    return readAll.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\NotificationController::readAll
* @see app/Http/Controllers/App/NotificationController.php:54
* @route '/notifications/read-all'
*/
readAll.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: readAll.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\NotificationController::archiveAll
* @see app/Http/Controllers/App/NotificationController.php:71
* @route '/notifications/archive-all'
*/
export const archiveAll = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: archiveAll.url(options),
    method: 'post',
})

archiveAll.definition = {
    methods: ["post"],
    url: '/notifications/archive-all',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\NotificationController::archiveAll
* @see app/Http/Controllers/App/NotificationController.php:71
* @route '/notifications/archive-all'
*/
archiveAll.url = (options?: RouteQueryOptions) => {
    return archiveAll.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\NotificationController::archiveAll
* @see app/Http/Controllers/App/NotificationController.php:71
* @route '/notifications/archive-all'
*/
archiveAll.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: archiveAll.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\Settings\NotificationPreferenceController::preferences
* @see app/Http/Controllers/App/Settings/NotificationPreferenceController.php:16
* @route '/settings/profile/notifications'
*/
export const preferences = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preferences.url(options),
    method: 'get',
})

preferences.definition = {
    methods: ["get","head"],
    url: '/settings/profile/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\Settings\NotificationPreferenceController::preferences
* @see app/Http/Controllers/App/Settings/NotificationPreferenceController.php:16
* @route '/settings/profile/notifications'
*/
preferences.url = (options?: RouteQueryOptions) => {
    return preferences.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Settings\NotificationPreferenceController::preferences
* @see app/Http/Controllers/App/Settings/NotificationPreferenceController.php:16
* @route '/settings/profile/notifications'
*/
preferences.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preferences.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\Settings\NotificationPreferenceController::preferences
* @see app/Http/Controllers/App/Settings/NotificationPreferenceController.php:16
* @route '/settings/profile/notifications'
*/
preferences.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preferences.url(options),
    method: 'head',
})

const notifications = {
    index: Object.assign(index, index),
    read: Object.assign(read, read),
    readAll: Object.assign(readAll, readAll),
    archiveAll: Object.assign(archiveAll, archiveAll),
    preferences: Object.assign(preferences, preferencesA95905),
}

export default notifications