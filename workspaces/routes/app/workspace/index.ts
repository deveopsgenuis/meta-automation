import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import members from './members'
import settings69f00b from './settings'
/**
* @see \App\Http\Controllers\App\WorkspaceController::settings
* @see app/Http/Controllers/App/WorkspaceController.php:144
* @route '/settings/workspace'
*/
export const settings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})

settings.definition = {
    methods: ["get","head"],
    url: '/settings/workspace',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\WorkspaceController::settings
* @see app/Http/Controllers/App/WorkspaceController.php:144
* @route '/settings/workspace'
*/
settings.url = (options?: RouteQueryOptions) => {
    return settings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceController::settings
* @see app/Http/Controllers/App/WorkspaceController.php:144
* @route '/settings/workspace'
*/
settings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\WorkspaceController::settings
* @see app/Http/Controllers/App/WorkspaceController.php:144
* @route '/settings/workspace'
*/
settings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: settings.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\WorkspaceController::uploadLogo
* @see app/Http/Controllers/App/WorkspaceController.php:180
* @route '/settings/workspace/logo'
*/
export const uploadLogo = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadLogo.url(options),
    method: 'post',
})

uploadLogo.definition = {
    methods: ["post"],
    url: '/settings/workspace/logo',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\WorkspaceController::uploadLogo
* @see app/Http/Controllers/App/WorkspaceController.php:180
* @route '/settings/workspace/logo'
*/
uploadLogo.url = (options?: RouteQueryOptions) => {
    return uploadLogo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceController::uploadLogo
* @see app/Http/Controllers/App/WorkspaceController.php:180
* @route '/settings/workspace/logo'
*/
uploadLogo.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadLogo.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\WorkspaceController::deleteLogo
* @see app/Http/Controllers/App/WorkspaceController.php:197
* @route '/settings/workspace/logo'
*/
export const deleteLogo = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteLogo.url(options),
    method: 'delete',
})

deleteLogo.definition = {
    methods: ["delete"],
    url: '/settings/workspace/logo',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\App\WorkspaceController::deleteLogo
* @see app/Http/Controllers/App/WorkspaceController.php:197
* @route '/settings/workspace/logo'
*/
deleteLogo.url = (options?: RouteQueryOptions) => {
    return deleteLogo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceController::deleteLogo
* @see app/Http/Controllers/App/WorkspaceController.php:197
* @route '/settings/workspace/logo'
*/
deleteLogo.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteLogo.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\App\WorkspaceController::brand
* @see app/Http/Controllers/App/WorkspaceController.php:160
* @route '/settings/workspace/brand'
*/
export const brand = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: brand.url(options),
    method: 'get',
})

brand.definition = {
    methods: ["get","head"],
    url: '/settings/workspace/brand',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\WorkspaceController::brand
* @see app/Http/Controllers/App/WorkspaceController.php:160
* @route '/settings/workspace/brand'
*/
brand.url = (options?: RouteQueryOptions) => {
    return brand.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceController::brand
* @see app/Http/Controllers/App/WorkspaceController.php:160
* @route '/settings/workspace/brand'
*/
brand.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: brand.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\WorkspaceController::brand
* @see app/Http/Controllers/App/WorkspaceController.php:160
* @route '/settings/workspace/brand'
*/
brand.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: brand.url(options),
    method: 'head',
})

const workspace = {
    members: Object.assign(members, members),
    settings: Object.assign(settings, settings69f00b),
    uploadLogo: Object.assign(uploadLogo, uploadLogo),
    deleteLogo: Object.assign(deleteLogo, deleteLogo),
    brand: Object.assign(brand, brand),
}

export default workspace