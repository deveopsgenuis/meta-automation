import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import goals384f59 from './goals'
import referralSourceDea511 from './referral-source'
/**
* @see \App\Http\Controllers\App\OnboardingController::store
* @see app/Http/Controllers/App/OnboardingController.php:46
* @route '/onboarding'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/onboarding',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\OnboardingController::store
* @see app/Http/Controllers/App/OnboardingController.php:46
* @route '/onboarding'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\OnboardingController::store
* @see app/Http/Controllers/App/OnboardingController.php:46
* @route '/onboarding'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\OnboardingController::goals
* @see app/Http/Controllers/App/OnboardingController.php:69
* @route '/onboarding/goals'
*/
export const goals = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: goals.url(options),
    method: 'get',
})

goals.definition = {
    methods: ["get","head"],
    url: '/onboarding/goals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\OnboardingController::goals
* @see app/Http/Controllers/App/OnboardingController.php:69
* @route '/onboarding/goals'
*/
goals.url = (options?: RouteQueryOptions) => {
    return goals.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\OnboardingController::goals
* @see app/Http/Controllers/App/OnboardingController.php:69
* @route '/onboarding/goals'
*/
goals.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: goals.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\OnboardingController::goals
* @see app/Http/Controllers/App/OnboardingController.php:69
* @route '/onboarding/goals'
*/
goals.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: goals.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\OnboardingController::referralSource
* @see app/Http/Controllers/App/OnboardingController.php:118
* @route '/onboarding/referral-source'
*/
export const referralSource = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: referralSource.url(options),
    method: 'get',
})

referralSource.definition = {
    methods: ["get","head"],
    url: '/onboarding/referral-source',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\OnboardingController::referralSource
* @see app/Http/Controllers/App/OnboardingController.php:118
* @route '/onboarding/referral-source'
*/
referralSource.url = (options?: RouteQueryOptions) => {
    return referralSource.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\OnboardingController::referralSource
* @see app/Http/Controllers/App/OnboardingController.php:118
* @route '/onboarding/referral-source'
*/
referralSource.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: referralSource.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\OnboardingController::referralSource
* @see app/Http/Controllers/App/OnboardingController.php:118
* @route '/onboarding/referral-source'
*/
referralSource.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: referralSource.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\OnboardingController::connect
* @see app/Http/Controllers/App/OnboardingController.php:175
* @route '/onboarding/connect'
*/
export const connect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

connect.definition = {
    methods: ["get","head"],
    url: '/onboarding/connect',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\OnboardingController::connect
* @see app/Http/Controllers/App/OnboardingController.php:175
* @route '/onboarding/connect'
*/
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\OnboardingController::connect
* @see app/Http/Controllers/App/OnboardingController.php:175
* @route '/onboarding/connect'
*/
connect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: connect.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\OnboardingController::connect
* @see app/Http/Controllers/App/OnboardingController.php:175
* @route '/onboarding/connect'
*/
connect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: connect.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\OnboardingController::checkout
* @see app/Http/Controllers/App/OnboardingController.php:228
* @route '/onboarding/connect'
*/
export const checkout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
})

checkout.definition = {
    methods: ["post"],
    url: '/onboarding/connect',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\OnboardingController::checkout
* @see app/Http/Controllers/App/OnboardingController.php:228
* @route '/onboarding/connect'
*/
checkout.url = (options?: RouteQueryOptions) => {
    return checkout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\OnboardingController::checkout
* @see app/Http/Controllers/App/OnboardingController.php:228
* @route '/onboarding/connect'
*/
checkout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
})

const onboarding = {
    store: Object.assign(store, store),
    goals: Object.assign(goals, goals384f59),
    referralSource: Object.assign(referralSource, referralSourceDea511),
    connect: Object.assign(connect, connect),
    checkout: Object.assign(checkout, checkout),
}

export default onboarding