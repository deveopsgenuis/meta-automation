import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\OnboardingController::store
* @see app/Http/Controllers/App/OnboardingController.php:91
* @route '/onboarding/goals'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/onboarding/goals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\OnboardingController::store
* @see app/Http/Controllers/App/OnboardingController.php:91
* @route '/onboarding/goals'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\OnboardingController::store
* @see app/Http/Controllers/App/OnboardingController.php:91
* @route '/onboarding/goals'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const goals = {
    store: Object.assign(store, store),
}

export default goals