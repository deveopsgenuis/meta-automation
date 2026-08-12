import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import protectedResourceCb2df8 from './protected-resource'
import authorizationServer94ebaf from './authorization-server'
/**
* @see vendor/laravel/mcp/src/Server/Registrar.php:96
* @route '/.well-known/oauth-protected-resource'
*/
export const protectedResource = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: protectedResource.url(options),
    method: 'get',
})

protectedResource.definition = {
    methods: ["get","head"],
    url: '/.well-known/oauth-protected-resource',
} satisfies RouteDefinition<["get","head"]>

/**
* @see vendor/laravel/mcp/src/Server/Registrar.php:96
* @route '/.well-known/oauth-protected-resource'
*/
protectedResource.url = (options?: RouteQueryOptions) => {
    return protectedResource.definition.url + queryParams(options)
}

/**
* @see vendor/laravel/mcp/src/Server/Registrar.php:96
* @route '/.well-known/oauth-protected-resource'
*/
protectedResource.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: protectedResource.url(options),
    method: 'get',
})

/**
* @see vendor/laravel/mcp/src/Server/Registrar.php:96
* @route '/.well-known/oauth-protected-resource'
*/
protectedResource.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: protectedResource.url(options),
    method: 'head',
})

/**
* @see vendor/laravel/mcp/src/Server/Registrar.php:101
* @route '/.well-known/oauth-authorization-server'
*/
export const authorizationServer = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: authorizationServer.url(options),
    method: 'get',
})

authorizationServer.definition = {
    methods: ["get","head"],
    url: '/.well-known/oauth-authorization-server',
} satisfies RouteDefinition<["get","head"]>

/**
* @see vendor/laravel/mcp/src/Server/Registrar.php:101
* @route '/.well-known/oauth-authorization-server'
*/
authorizationServer.url = (options?: RouteQueryOptions) => {
    return authorizationServer.definition.url + queryParams(options)
}

/**
* @see vendor/laravel/mcp/src/Server/Registrar.php:101
* @route '/.well-known/oauth-authorization-server'
*/
authorizationServer.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: authorizationServer.url(options),
    method: 'get',
})

/**
* @see vendor/laravel/mcp/src/Server/Registrar.php:101
* @route '/.well-known/oauth-authorization-server'
*/
authorizationServer.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: authorizationServer.url(options),
    method: 'head',
})

const oauth = {
    protectedResource: Object.assign(protectedResource, protectedResourceCb2df8),
    authorizationServer: Object.assign(authorizationServer, authorizationServer94ebaf),
}

export default oauth