import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import uploads from './uploads'
import posts from './posts'
import workspace from './workspace'
import signatures from './signatures'
import labels from './labels'
import socialAccounts from './social-accounts'
import apiKeys from './api-keys'
/**
* @see \App\Http\Controllers\Api\PlatformController::contentTypes
* @see app/Http/Controllers/Api/PlatformController.php:18
* @route '/api/content-types'
*/
export const contentTypes = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contentTypes.url(options),
    method: 'get',
})

contentTypes.definition = {
    methods: ["get","head"],
    url: '/api/content-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\PlatformController::contentTypes
* @see app/Http/Controllers/Api/PlatformController.php:18
* @route '/api/content-types'
*/
contentTypes.url = (options?: RouteQueryOptions) => {
    return contentTypes.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PlatformController::contentTypes
* @see app/Http/Controllers/Api/PlatformController.php:18
* @route '/api/content-types'
*/
contentTypes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contentTypes.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\PlatformController::contentTypes
* @see app/Http/Controllers/Api/PlatformController.php:18
* @route '/api/content-types'
*/
contentTypes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contentTypes.url(options),
    method: 'head',
})

const api = {
    uploads: Object.assign(uploads, uploads),
    posts: Object.assign(posts, posts),
    contentTypes: Object.assign(contentTypes, contentTypes),
    workspace: Object.assign(workspace, workspace),
    signatures: Object.assign(signatures, signatures),
    labels: Object.assign(labels, labels),
    socialAccounts: Object.assign(socialAccounts, socialAccounts),
    apiKeys: Object.assign(apiKeys, apiKeys),
}

export default api