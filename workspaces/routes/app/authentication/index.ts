import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\App\Settings\AuthenticationController::edit
* @see app/Http/Controllers/App/Settings/AuthenticationController.php:23
* @route '/settings/authentication'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/settings/authentication',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\Settings\AuthenticationController::edit
* @see app/Http/Controllers/App/Settings/AuthenticationController.php:23
* @route '/settings/authentication'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Settings\AuthenticationController::edit
* @see app/Http/Controllers/App/Settings/AuthenticationController.php:23
* @route '/settings/authentication'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\Settings\AuthenticationController::edit
* @see app/Http/Controllers/App/Settings/AuthenticationController.php:23
* @route '/settings/authentication'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\Settings\AuthenticationController::updatePassword
* @see app/Http/Controllers/App/Settings/AuthenticationController.php:34
* @route '/settings/authentication/password'
*/
export const updatePassword = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePassword.url(options),
    method: 'put',
})

updatePassword.definition = {
    methods: ["put"],
    url: '/settings/authentication/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\App\Settings\AuthenticationController::updatePassword
* @see app/Http/Controllers/App/Settings/AuthenticationController.php:34
* @route '/settings/authentication/password'
*/
updatePassword.url = (options?: RouteQueryOptions) => {
    return updatePassword.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Settings\AuthenticationController::updatePassword
* @see app/Http/Controllers/App/Settings/AuthenticationController.php:34
* @route '/settings/authentication/password'
*/
updatePassword.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePassword.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\App\Settings\AuthenticationController::destroyOtherSessions
* @see app/Http/Controllers/App/Settings/AuthenticationController.php:43
* @route '/settings/authentication/sessions'
*/
export const destroyOtherSessions = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyOtherSessions.url(options),
    method: 'delete',
})

destroyOtherSessions.definition = {
    methods: ["delete"],
    url: '/settings/authentication/sessions',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\App\Settings\AuthenticationController::destroyOtherSessions
* @see app/Http/Controllers/App/Settings/AuthenticationController.php:43
* @route '/settings/authentication/sessions'
*/
destroyOtherSessions.url = (options?: RouteQueryOptions) => {
    return destroyOtherSessions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Settings\AuthenticationController::destroyOtherSessions
* @see app/Http/Controllers/App/Settings/AuthenticationController.php:43
* @route '/settings/authentication/sessions'
*/
destroyOtherSessions.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyOtherSessions.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\App\Settings\AuthenticationController::connectProvider
* @see app/Http/Controllers/App/Settings/AuthenticationController.php:67
* @route '/settings/authentication/providers/{provider}/connect'
*/
export const connectProvider = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connectProvider.url(args, options),
    method: 'get',
})

connectProvider.definition = {
    methods: ["get","head"],
    url: '/settings/authentication/providers/{provider}/connect',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\Settings\AuthenticationController::connectProvider
* @see app/Http/Controllers/App/Settings/AuthenticationController.php:67
* @route '/settings/authentication/providers/{provider}/connect'
*/
connectProvider.url = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { provider: args }
    }

    if (Array.isArray(args)) {
        args = {
            provider: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        provider: args.provider,
    }

    return connectProvider.definition.url
            .replace('{provider}', parsedArgs.provider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Settings\AuthenticationController::connectProvider
* @see app/Http/Controllers/App/Settings/AuthenticationController.php:67
* @route '/settings/authentication/providers/{provider}/connect'
*/
connectProvider.get = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connectProvider.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\Settings\AuthenticationController::connectProvider
* @see app/Http/Controllers/App/Settings/AuthenticationController.php:67
* @route '/settings/authentication/providers/{provider}/connect'
*/
connectProvider.head = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connectProvider.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\Settings\AuthenticationController::disconnectProvider
* @see app/Http/Controllers/App/Settings/AuthenticationController.php:77
* @route '/settings/authentication/providers/{provider}'
*/
export const disconnectProvider = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: disconnectProvider.url(args, options),
    method: 'delete',
})

disconnectProvider.definition = {
    methods: ["delete"],
    url: '/settings/authentication/providers/{provider}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\App\Settings\AuthenticationController::disconnectProvider
* @see app/Http/Controllers/App/Settings/AuthenticationController.php:77
* @route '/settings/authentication/providers/{provider}'
*/
disconnectProvider.url = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { provider: args }
    }

    if (Array.isArray(args)) {
        args = {
            provider: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        provider: args.provider,
    }

    return disconnectProvider.definition.url
            .replace('{provider}', parsedArgs.provider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Settings\AuthenticationController::disconnectProvider
* @see app/Http/Controllers/App/Settings/AuthenticationController.php:77
* @route '/settings/authentication/providers/{provider}'
*/
disconnectProvider.delete = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: disconnectProvider.url(args, options),
    method: 'delete',
})

const authentication = {
    edit: Object.assign(edit, edit),
    updatePassword: Object.assign(updatePassword, updatePassword),
    destroyOtherSessions: Object.assign(destroyOtherSessions, destroyOtherSessions),
    connectProvider: Object.assign(connectProvider, connectProvider),
    disconnectProvider: Object.assign(disconnectProvider, disconnectProvider),
}

export default authentication