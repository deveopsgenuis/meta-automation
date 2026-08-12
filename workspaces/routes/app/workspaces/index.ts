import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\App\WorkspaceController::create
* @see app/Http/Controllers/App/WorkspaceController.php:68
* @route '/workspaces/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/workspaces/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\WorkspaceController::create
* @see app/Http/Controllers/App/WorkspaceController.php:68
* @route '/workspaces/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceController::create
* @see app/Http/Controllers/App/WorkspaceController.php:68
* @route '/workspaces/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\WorkspaceController::create
* @see app/Http/Controllers/App/WorkspaceController.php:68
* @route '/workspaces/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\WorkspaceController::store
* @see app/Http/Controllers/App/WorkspaceController.php:111
* @route '/workspaces'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/workspaces',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\WorkspaceController::store
* @see app/Http/Controllers/App/WorkspaceController.php:111
* @route '/workspaces'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceController::store
* @see app/Http/Controllers/App/WorkspaceController.php:111
* @route '/workspaces'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\WorkspaceController::autofill
* @see app/Http/Controllers/App/WorkspaceController.php:100
* @route '/workspaces/autofill'
*/
export const autofill = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: autofill.url(options),
    method: 'post',
})

autofill.definition = {
    methods: ["post"],
    url: '/workspaces/autofill',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\WorkspaceController::autofill
* @see app/Http/Controllers/App/WorkspaceController.php:100
* @route '/workspaces/autofill'
*/
autofill.url = (options?: RouteQueryOptions) => {
    return autofill.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceController::autofill
* @see app/Http/Controllers/App/WorkspaceController.php:100
* @route '/workspaces/autofill'
*/
autofill.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: autofill.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\WorkspaceController::index
* @see app/Http/Controllers/App/WorkspaceController.php:52
* @route '/workspaces'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/workspaces',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\WorkspaceController::index
* @see app/Http/Controllers/App/WorkspaceController.php:52
* @route '/workspaces'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceController::index
* @see app/Http/Controllers/App/WorkspaceController.php:52
* @route '/workspaces'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\WorkspaceController::index
* @see app/Http/Controllers/App/WorkspaceController.php:52
* @route '/workspaces'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\WorkspaceController::switchMethod
* @see app/Http/Controllers/App/WorkspaceController.php:131
* @route '/workspaces/{workspace}/switch'
*/
export const switchMethod = (args: { workspace: string | { id: string } } | [workspace: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: switchMethod.url(args, options),
    method: 'post',
})

switchMethod.definition = {
    methods: ["post"],
    url: '/workspaces/{workspace}/switch',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\WorkspaceController::switchMethod
* @see app/Http/Controllers/App/WorkspaceController.php:131
* @route '/workspaces/{workspace}/switch'
*/
switchMethod.url = (args: { workspace: string | { id: string } } | [workspace: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { workspace: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { workspace: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            workspace: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        workspace: typeof args.workspace === 'object'
        ? args.workspace.id
        : args.workspace,
    }

    return switchMethod.definition.url
            .replace('{workspace}', parsedArgs.workspace.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceController::switchMethod
* @see app/Http/Controllers/App/WorkspaceController.php:131
* @route '/workspaces/{workspace}/switch'
*/
switchMethod.post = (args: { workspace: string | { id: string } } | [workspace: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: switchMethod.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\WorkspaceController::destroy
* @see app/Http/Controllers/App/WorkspaceController.php:234
* @route '/workspaces/{workspace}'
*/
export const destroy = (args: { workspace: string | { id: string } } | [workspace: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/workspaces/{workspace}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\App\WorkspaceController::destroy
* @see app/Http/Controllers/App/WorkspaceController.php:234
* @route '/workspaces/{workspace}'
*/
destroy.url = (args: { workspace: string | { id: string } } | [workspace: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { workspace: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { workspace: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            workspace: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        workspace: typeof args.workspace === 'object'
        ? args.workspace.id
        : args.workspace,
    }

    return destroy.definition.url
            .replace('{workspace}', parsedArgs.workspace.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceController::destroy
* @see app/Http/Controllers/App/WorkspaceController.php:234
* @route '/workspaces/{workspace}'
*/
destroy.delete = (args: { workspace: string | { id: string } } | [workspace: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const workspaces = {
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    autofill: Object.assign(autofill, autofill),
    index: Object.assign(index, index),
    switch: Object.assign(switchMethod, switchMethod),
    destroy: Object.assign(destroy, destroy),
}

export default workspaces