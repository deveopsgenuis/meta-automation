import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\OnboardingController::store
* @see app/Http/Controllers/App/OnboardingController.php:144
* @route '/onboarding/referral-source'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/onboarding/referral-source',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\OnboardingController::store
* @see app/Http/Controllers/App/OnboardingController.php:144
* @route '/onboarding/referral-source'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\OnboardingController::store
* @see app/Http/Controllers/App/OnboardingController.php:144
* @route '/onboarding/referral-source'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const referralSource = {
    store: Object.assign(store, store),
}

export default referralSource