import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\App\BillingController::processing
* @see app/Http/Controllers/App/BillingController.php:24
* @route '/billing/processing'
*/
export const processing = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: processing.url(options),
    method: 'get',
})

processing.definition = {
    methods: ["get","head"],
    url: '/billing/processing',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\BillingController::processing
* @see app/Http/Controllers/App/BillingController.php:24
* @route '/billing/processing'
*/
processing.url = (options?: RouteQueryOptions) => {
    return processing.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\BillingController::processing
* @see app/Http/Controllers/App/BillingController.php:24
* @route '/billing/processing'
*/
processing.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: processing.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\BillingController::processing
* @see app/Http/Controllers/App/BillingController.php:24
* @route '/billing/processing'
*/
processing.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: processing.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\BillingController::index
* @see app/Http/Controllers/App/BillingController.php:83
* @route '/settings/account/billing'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/settings/account/billing',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\BillingController::index
* @see app/Http/Controllers/App/BillingController.php:83
* @route '/settings/account/billing'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\BillingController::index
* @see app/Http/Controllers/App/BillingController.php:83
* @route '/settings/account/billing'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\BillingController::index
* @see app/Http/Controllers/App/BillingController.php:83
* @route '/settings/account/billing'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\BillingController::portal
* @see app/Http/Controllers/App/BillingController.php:152
* @route '/settings/account/billing/portal'
*/
export const portal = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: portal.url(options),
    method: 'get',
})

portal.definition = {
    methods: ["get","head"],
    url: '/settings/account/billing/portal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\BillingController::portal
* @see app/Http/Controllers/App/BillingController.php:152
* @route '/settings/account/billing/portal'
*/
portal.url = (options?: RouteQueryOptions) => {
    return portal.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\BillingController::portal
* @see app/Http/Controllers/App/BillingController.php:152
* @route '/settings/account/billing/portal'
*/
portal.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: portal.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\BillingController::portal
* @see app/Http/Controllers/App/BillingController.php:152
* @route '/settings/account/billing/portal'
*/
portal.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: portal.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\BillingController::swapToYearly
* @see app/Http/Controllers/App/BillingController.php:116
* @route '/settings/account/billing/swap-to-yearly'
*/
export const swapToYearly = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: swapToYearly.url(options),
    method: 'post',
})

swapToYearly.definition = {
    methods: ["post"],
    url: '/settings/account/billing/swap-to-yearly',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\BillingController::swapToYearly
* @see app/Http/Controllers/App/BillingController.php:116
* @route '/settings/account/billing/swap-to-yearly'
*/
swapToYearly.url = (options?: RouteQueryOptions) => {
    return swapToYearly.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\BillingController::swapToYearly
* @see app/Http/Controllers/App/BillingController.php:116
* @route '/settings/account/billing/swap-to-yearly'
*/
swapToYearly.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: swapToYearly.url(options),
    method: 'post',
})

const billing = {
    processing: Object.assign(processing, processing),
    index: Object.assign(index, index),
    portal: Object.assign(portal, portal),
    swapToYearly: Object.assign(swapToYearly, swapToYearly),
}

export default billing