import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\Settings\NotificationPreferenceController::update
* @see app/Http/Controllers/App/Settings/NotificationPreferenceController.php:32
* @route '/settings/profile/notifications'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/settings/profile/notifications',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\App\Settings\NotificationPreferenceController::update
* @see app/Http/Controllers/App/Settings/NotificationPreferenceController.php:32
* @route '/settings/profile/notifications'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Settings\NotificationPreferenceController::update
* @see app/Http/Controllers/App/Settings/NotificationPreferenceController.php:32
* @route '/settings/profile/notifications'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const preferences = {
    update: Object.assign(update, update),
}

export default preferences