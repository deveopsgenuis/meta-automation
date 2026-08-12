import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\App\WorkspaceController::autofillBrand
* @see app/Http/Controllers/App/WorkspaceController.php:100
* @route '/workspaces/autofill'
*/
export const autofillBrand = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: autofillBrand.url(options),
    method: 'post',
})

autofillBrand.definition = {
    methods: ["post"],
    url: '/workspaces/autofill',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\WorkspaceController::autofillBrand
* @see app/Http/Controllers/App/WorkspaceController.php:100
* @route '/workspaces/autofill'
*/
autofillBrand.url = (options?: RouteQueryOptions) => {
    return autofillBrand.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceController::autofillBrand
* @see app/Http/Controllers/App/WorkspaceController.php:100
* @route '/workspaces/autofill'
*/
autofillBrand.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: autofillBrand.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\WorkspaceController::searchMembers
* @see app/Http/Controllers/App/WorkspaceController.php:32
* @route '/workspace/members/search'
*/
export const searchMembers = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchMembers.url(options),
    method: 'get',
})

searchMembers.definition = {
    methods: ["get","head"],
    url: '/workspace/members/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\WorkspaceController::searchMembers
* @see app/Http/Controllers/App/WorkspaceController.php:32
* @route '/workspace/members/search'
*/
searchMembers.url = (options?: RouteQueryOptions) => {
    return searchMembers.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceController::searchMembers
* @see app/Http/Controllers/App/WorkspaceController.php:32
* @route '/workspace/members/search'
*/
searchMembers.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchMembers.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\WorkspaceController::searchMembers
* @see app/Http/Controllers/App/WorkspaceController.php:32
* @route '/workspace/members/search'
*/
searchMembers.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchMembers.url(options),
    method: 'head',
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
* @see \App\Http\Controllers\App\WorkspaceController::updateSettings
* @see app/Http/Controllers/App/WorkspaceController.php:209
* @route '/settings/workspace'
*/
export const updateSettings = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSettings.url(options),
    method: 'put',
})

updateSettings.definition = {
    methods: ["put"],
    url: '/settings/workspace',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\App\WorkspaceController::updateSettings
* @see app/Http/Controllers/App/WorkspaceController.php:209
* @route '/settings/workspace'
*/
updateSettings.url = (options?: RouteQueryOptions) => {
    return updateSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceController::updateSettings
* @see app/Http/Controllers/App/WorkspaceController.php:209
* @route '/settings/workspace'
*/
updateSettings.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSettings.url(options),
    method: 'put',
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
* @see \App\Http\Controllers\App\WorkspaceController::brandSettings
* @see app/Http/Controllers/App/WorkspaceController.php:160
* @route '/settings/workspace/brand'
*/
export const brandSettings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: brandSettings.url(options),
    method: 'get',
})

brandSettings.definition = {
    methods: ["get","head"],
    url: '/settings/workspace/brand',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\WorkspaceController::brandSettings
* @see app/Http/Controllers/App/WorkspaceController.php:160
* @route '/settings/workspace/brand'
*/
brandSettings.url = (options?: RouteQueryOptions) => {
    return brandSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceController::brandSettings
* @see app/Http/Controllers/App/WorkspaceController.php:160
* @route '/settings/workspace/brand'
*/
brandSettings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: brandSettings.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\WorkspaceController::brandSettings
* @see app/Http/Controllers/App/WorkspaceController.php:160
* @route '/settings/workspace/brand'
*/
brandSettings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: brandSettings.url(options),
    method: 'head',
})

const WorkspaceController = { create, store, autofillBrand, searchMembers, index, switchMethod, destroy, settings, updateSettings, uploadLogo, deleteLogo, brandSettings, switch: switchMethod }

export default WorkspaceController