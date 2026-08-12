import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see vendor/laravel/mcp/src/Server/Registrar.php:105
* @route '/.well-known/oauth-protected-resource/{path}'
*/
export const nested = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nested.url(args, options),
    method: 'get',
})

nested.definition = {
    methods: ["get","head"],
    url: '/.well-known/oauth-protected-resource/{path}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see vendor/laravel/mcp/src/Server/Registrar.php:105
* @route '/.well-known/oauth-protected-resource/{path}'
*/
nested.url = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { path: args }
    }

    if (Array.isArray(args)) {
        args = {
            path: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        path: args.path,
    }

    return nested.definition.url
            .replace('{path}', parsedArgs.path.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see vendor/laravel/mcp/src/Server/Registrar.php:105
* @route '/.well-known/oauth-protected-resource/{path}'
*/
nested.get = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nested.url(args, options),
    method: 'get',
})

/**
* @see vendor/laravel/mcp/src/Server/Registrar.php:105
* @route '/.well-known/oauth-protected-resource/{path}'
*/
nested.head = (args: { path: string | number } | [path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: nested.url(args, options),
    method: 'head',
})

const protectedResource = {
    nested: Object.assign(nested, nested),
}

export default protectedResource