import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\App\NotificationController::markAsRead
* @see app/Http/Controllers/App/NotificationController.php:43
* @route '/notifications/{notification}/read'
*/
export const markAsRead = (args: { notification: string | { id: string } } | [notification: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: markAsRead.url(args, options),
    method: 'put',
})

markAsRead.definition = {
    methods: ["put"],
    url: '/notifications/{notification}/read',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\App\NotificationController::markAsRead
* @see app/Http/Controllers/App/NotificationController.php:43
* @route '/notifications/{notification}/read'
*/
markAsRead.url = (args: { notification: string | { id: string } } | [notification: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return markAsRead.definition.url
            .replace('{notification}', parsedArgs.notification.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\NotificationController::markAsRead
* @see app/Http/Controllers/App/NotificationController.php:43
* @route '/notifications/{notification}/read'
*/
markAsRead.put = (args: { notification: string | { id: string } } | [notification: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: markAsRead.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\App\NotificationController::markAllAsRead
* @see app/Http/Controllers/App/NotificationController.php:54
* @route '/notifications/read-all'
*/
export const markAllAsRead = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAllAsRead.url(options),
    method: 'post',
})

markAllAsRead.definition = {
    methods: ["post"],
    url: '/notifications/read-all',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\NotificationController::markAllAsRead
* @see app/Http/Controllers/App/NotificationController.php:54
* @route '/notifications/read-all'
*/
markAllAsRead.url = (options?: RouteQueryOptions) => {
    return markAllAsRead.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\NotificationController::markAllAsRead
* @see app/Http/Controllers/App/NotificationController.php:54
* @route '/notifications/read-all'
*/
markAllAsRead.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAllAsRead.url(options),
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

const NotificationController = { index, markAsRead, markAllAsRead, archiveAll }

export default NotificationController