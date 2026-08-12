import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\App\Settings\AccountController::edit
* @see app/Http/Controllers/App/Settings/AccountController.php:16
* @route '/settings/account'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/settings/account',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\Settings\AccountController::edit
* @see app/Http/Controllers/App/Settings/AccountController.php:16
* @route '/settings/account'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Settings\AccountController::edit
* @see app/Http/Controllers/App/Settings/AccountController.php:16
* @route '/settings/account'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\Settings\AccountController::edit
* @see app/Http/Controllers/App/Settings/AccountController.php:16
* @route '/settings/account'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\Settings\AccountController::update
* @see app/Http/Controllers/App/Settings/AccountController.php:32
* @route '/settings/account'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/settings/account',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\App\Settings\AccountController::update
* @see app/Http/Controllers/App/Settings/AccountController.php:32
* @route '/settings/account'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Settings\AccountController::update
* @see app/Http/Controllers/App/Settings/AccountController.php:32
* @route '/settings/account'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const account = {
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
}

export default account