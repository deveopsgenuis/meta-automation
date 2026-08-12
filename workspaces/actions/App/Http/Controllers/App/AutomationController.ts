import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\AutomationController::index
* @see app/Http/Controllers/App/AutomationController.php:50
* @route '/automations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/automations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\AutomationController::index
* @see app/Http/Controllers/App/AutomationController.php:50
* @route '/automations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::index
* @see app/Http/Controllers/App/AutomationController.php:50
* @route '/automations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\AutomationController::index
* @see app/Http/Controllers/App/AutomationController.php:50
* @route '/automations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\AutomationController::store
* @see app/Http/Controllers/App/AutomationController.php:65
* @route '/automations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/automations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\AutomationController::store
* @see app/Http/Controllers/App/AutomationController.php:65
* @route '/automations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::store
* @see app/Http/Controllers/App/AutomationController.php:65
* @route '/automations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\AutomationController::show
* @see app/Http/Controllers/App/AutomationController.php:77
* @route '/automations/{automation}'
*/
export const show = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/automations/{automation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\AutomationController::show
* @see app/Http/Controllers/App/AutomationController.php:77
* @route '/automations/{automation}'
*/
show.url = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { automation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { automation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            automation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automation: typeof args.automation === 'object'
        ? args.automation.id
        : args.automation,
    }

    return show.definition.url
            .replace('{automation}', parsedArgs.automation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::show
* @see app/Http/Controllers/App/AutomationController.php:77
* @route '/automations/{automation}'
*/
show.get = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\AutomationController::show
* @see app/Http/Controllers/App/AutomationController.php:77
* @route '/automations/{automation}'
*/
show.head = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\AutomationController::workflow
* @see app/Http/Controllers/App/AutomationController.php:88
* @route '/automations/{automation}/workflow'
*/
export const workflow = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: workflow.url(args, options),
    method: 'get',
})

workflow.definition = {
    methods: ["get","head"],
    url: '/automations/{automation}/workflow',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\AutomationController::workflow
* @see app/Http/Controllers/App/AutomationController.php:88
* @route '/automations/{automation}/workflow'
*/
workflow.url = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { automation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { automation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            automation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automation: typeof args.automation === 'object'
        ? args.automation.id
        : args.automation,
    }

    return workflow.definition.url
            .replace('{automation}', parsedArgs.automation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::workflow
* @see app/Http/Controllers/App/AutomationController.php:88
* @route '/automations/{automation}/workflow'
*/
workflow.get = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: workflow.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\AutomationController::workflow
* @see app/Http/Controllers/App/AutomationController.php:88
* @route '/automations/{automation}/workflow'
*/
workflow.head = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: workflow.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\AutomationController::invocations
* @see app/Http/Controllers/App/AutomationController.php:107
* @route '/automations/{automation}/invocations'
*/
export const invocations = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: invocations.url(args, options),
    method: 'get',
})

invocations.definition = {
    methods: ["get","head"],
    url: '/automations/{automation}/invocations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\AutomationController::invocations
* @see app/Http/Controllers/App/AutomationController.php:107
* @route '/automations/{automation}/invocations'
*/
invocations.url = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { automation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { automation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            automation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automation: typeof args.automation === 'object'
        ? args.automation.id
        : args.automation,
    }

    return invocations.definition.url
            .replace('{automation}', parsedArgs.automation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::invocations
* @see app/Http/Controllers/App/AutomationController.php:107
* @route '/automations/{automation}/invocations'
*/
invocations.get = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: invocations.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\AutomationController::invocations
* @see app/Http/Controllers/App/AutomationController.php:107
* @route '/automations/{automation}/invocations'
*/
invocations.head = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: invocations.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\AutomationController::metrics
* @see app/Http/Controllers/App/AutomationController.php:135
* @route '/automations/{automation}/metrics'
*/
export const metrics = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: metrics.url(args, options),
    method: 'get',
})

metrics.definition = {
    methods: ["get","head"],
    url: '/automations/{automation}/metrics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\AutomationController::metrics
* @see app/Http/Controllers/App/AutomationController.php:135
* @route '/automations/{automation}/metrics'
*/
metrics.url = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { automation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { automation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            automation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automation: typeof args.automation === 'object'
        ? args.automation.id
        : args.automation,
    }

    return metrics.definition.url
            .replace('{automation}', parsedArgs.automation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::metrics
* @see app/Http/Controllers/App/AutomationController.php:135
* @route '/automations/{automation}/metrics'
*/
metrics.get = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: metrics.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\AutomationController::metrics
* @see app/Http/Controllers/App/AutomationController.php:135
* @route '/automations/{automation}/metrics'
*/
metrics.head = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: metrics.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\AutomationController::settings
* @see app/Http/Controllers/App/AutomationController.php:126
* @route '/automations/{automation}/settings'
*/
export const settings = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(args, options),
    method: 'get',
})

settings.definition = {
    methods: ["get","head"],
    url: '/automations/{automation}/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\AutomationController::settings
* @see app/Http/Controllers/App/AutomationController.php:126
* @route '/automations/{automation}/settings'
*/
settings.url = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { automation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { automation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            automation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automation: typeof args.automation === 'object'
        ? args.automation.id
        : args.automation,
    }

    return settings.definition.url
            .replace('{automation}', parsedArgs.automation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::settings
* @see app/Http/Controllers/App/AutomationController.php:126
* @route '/automations/{automation}/settings'
*/
settings.get = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\AutomationController::settings
* @see app/Http/Controllers/App/AutomationController.php:126
* @route '/automations/{automation}/settings'
*/
settings.head = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: settings.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\AutomationController::update
* @see app/Http/Controllers/App/AutomationController.php:162
* @route '/automations/{automation}'
*/
export const update = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/automations/{automation}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\App\AutomationController::update
* @see app/Http/Controllers/App/AutomationController.php:162
* @route '/automations/{automation}'
*/
update.url = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { automation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { automation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            automation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automation: typeof args.automation === 'object'
        ? args.automation.id
        : args.automation,
    }

    return update.definition.url
            .replace('{automation}', parsedArgs.automation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::update
* @see app/Http/Controllers/App/AutomationController.php:162
* @route '/automations/{automation}'
*/
update.put = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\App\AutomationController::destroy
* @see app/Http/Controllers/App/AutomationController.php:171
* @route '/automations/{automation}'
*/
export const destroy = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/automations/{automation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\App\AutomationController::destroy
* @see app/Http/Controllers/App/AutomationController.php:171
* @route '/automations/{automation}'
*/
destroy.url = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { automation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { automation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            automation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automation: typeof args.automation === 'object'
        ? args.automation.id
        : args.automation,
    }

    return destroy.definition.url
            .replace('{automation}', parsedArgs.automation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::destroy
* @see app/Http/Controllers/App/AutomationController.php:171
* @route '/automations/{automation}'
*/
destroy.delete = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\App\AutomationController::activate
* @see app/Http/Controllers/App/AutomationController.php:182
* @route '/automations/{automation}/activate'
*/
export const activate = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activate.url(args, options),
    method: 'post',
})

activate.definition = {
    methods: ["post"],
    url: '/automations/{automation}/activate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\AutomationController::activate
* @see app/Http/Controllers/App/AutomationController.php:182
* @route '/automations/{automation}/activate'
*/
activate.url = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { automation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { automation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            automation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automation: typeof args.automation === 'object'
        ? args.automation.id
        : args.automation,
    }

    return activate.definition.url
            .replace('{automation}', parsedArgs.automation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::activate
* @see app/Http/Controllers/App/AutomationController.php:182
* @route '/automations/{automation}/activate'
*/
activate.post = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activate.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\AutomationController::pause
* @see app/Http/Controllers/App/AutomationController.php:191
* @route '/automations/{automation}/pause'
*/
export const pause = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pause.url(args, options),
    method: 'post',
})

pause.definition = {
    methods: ["post"],
    url: '/automations/{automation}/pause',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\AutomationController::pause
* @see app/Http/Controllers/App/AutomationController.php:191
* @route '/automations/{automation}/pause'
*/
pause.url = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { automation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { automation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            automation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automation: typeof args.automation === 'object'
        ? args.automation.id
        : args.automation,
    }

    return pause.definition.url
            .replace('{automation}', parsedArgs.automation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::pause
* @see app/Http/Controllers/App/AutomationController.php:191
* @route '/automations/{automation}/pause'
*/
pause.post = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pause.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\AutomationController::retryRun
* @see app/Http/Controllers/App/AutomationController.php:200
* @route '/automations/{automation}/runs/{run}/retry'
*/
export const retryRun = (args: { automation: string | { id: string }, run: string | { id: string } } | [automation: string | { id: string }, run: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retryRun.url(args, options),
    method: 'post',
})

retryRun.definition = {
    methods: ["post"],
    url: '/automations/{automation}/runs/{run}/retry',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\AutomationController::retryRun
* @see app/Http/Controllers/App/AutomationController.php:200
* @route '/automations/{automation}/runs/{run}/retry'
*/
retryRun.url = (args: { automation: string | { id: string }, run: string | { id: string } } | [automation: string | { id: string }, run: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            automation: args[0],
            run: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automation: typeof args.automation === 'object'
        ? args.automation.id
        : args.automation,
        run: typeof args.run === 'object'
        ? args.run.id
        : args.run,
    }

    return retryRun.definition.url
            .replace('{automation}', parsedArgs.automation.toString())
            .replace('{run}', parsedArgs.run.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::retryRun
* @see app/Http/Controllers/App/AutomationController.php:200
* @route '/automations/{automation}/runs/{run}/retry'
*/
retryRun.post = (args: { automation: string | { id: string }, run: string | { id: string } } | [automation: string | { id: string }, run: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: retryRun.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\AutomationController::test
* @see app/Http/Controllers/App/AutomationController.php:215
* @route '/automations/{automation}/test'
*/
export const test = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(args, options),
    method: 'post',
})

test.definition = {
    methods: ["post"],
    url: '/automations/{automation}/test',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\AutomationController::test
* @see app/Http/Controllers/App/AutomationController.php:215
* @route '/automations/{automation}/test'
*/
test.url = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { automation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { automation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            automation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automation: typeof args.automation === 'object'
        ? args.automation.id
        : args.automation,
    }

    return test.definition.url
            .replace('{automation}', parsedArgs.automation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::test
* @see app/Http/Controllers/App/AutomationController.php:215
* @route '/automations/{automation}/test'
*/
test.post = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\AutomationController::inspectFeed
* @see app/Http/Controllers/App/AutomationController.php:224
* @route '/automations/{automation}/feed/inspect'
*/
export const inspectFeed = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: inspectFeed.url(args, options),
    method: 'post',
})

inspectFeed.definition = {
    methods: ["post"],
    url: '/automations/{automation}/feed/inspect',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\AutomationController::inspectFeed
* @see app/Http/Controllers/App/AutomationController.php:224
* @route '/automations/{automation}/feed/inspect'
*/
inspectFeed.url = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { automation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { automation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            automation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automation: typeof args.automation === 'object'
        ? args.automation.id
        : args.automation,
    }

    return inspectFeed.definition.url
            .replace('{automation}', parsedArgs.automation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::inspectFeed
* @see app/Http/Controllers/App/AutomationController.php:224
* @route '/automations/{automation}/feed/inspect'
*/
inspectFeed.post = (args: { automation: string | { id: string } } | [automation: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: inspectFeed.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\AutomationController::showRun
* @see app/Http/Controllers/App/AutomationController.php:256
* @route '/automations/{automation}/runs/{run}'
*/
export const showRun = (args: { automation: string | { id: string }, run: string | { id: string } } | [automation: string | { id: string }, run: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRun.url(args, options),
    method: 'get',
})

showRun.definition = {
    methods: ["get","head"],
    url: '/automations/{automation}/runs/{run}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\AutomationController::showRun
* @see app/Http/Controllers/App/AutomationController.php:256
* @route '/automations/{automation}/runs/{run}'
*/
showRun.url = (args: { automation: string | { id: string }, run: string | { id: string } } | [automation: string | { id: string }, run: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            automation: args[0],
            run: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        automation: typeof args.automation === 'object'
        ? args.automation.id
        : args.automation,
        run: typeof args.run === 'object'
        ? args.run.id
        : args.run,
    }

    return showRun.definition.url
            .replace('{automation}', parsedArgs.automation.toString())
            .replace('{run}', parsedArgs.run.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AutomationController::showRun
* @see app/Http/Controllers/App/AutomationController.php:256
* @route '/automations/{automation}/runs/{run}'
*/
showRun.get = (args: { automation: string | { id: string }, run: string | { id: string } } | [automation: string | { id: string }, run: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRun.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\AutomationController::showRun
* @see app/Http/Controllers/App/AutomationController.php:256
* @route '/automations/{automation}/runs/{run}'
*/
showRun.head = (args: { automation: string | { id: string }, run: string | { id: string } } | [automation: string | { id: string }, run: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showRun.url(args, options),
    method: 'head',
})

const AutomationController = { index, store, show, workflow, invocations, metrics, settings, update, destroy, activate, pause, retryRun, test, inspectFeed, showRun }

export default AutomationController