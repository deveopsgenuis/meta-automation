import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\SignupSuccessController::__invoke
* @see app/Http/Controllers/Auth/SignupSuccessController.php:14
* @route '/register/success'
*/
const SignupSuccessController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SignupSuccessController.url(options),
    method: 'get',
})

SignupSuccessController.definition = {
    methods: ["get","head"],
    url: '/register/success',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\SignupSuccessController::__invoke
* @see app/Http/Controllers/Auth/SignupSuccessController.php:14
* @route '/register/success'
*/
SignupSuccessController.url = (options?: RouteQueryOptions) => {
    return SignupSuccessController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\SignupSuccessController::__invoke
* @see app/Http/Controllers/Auth/SignupSuccessController.php:14
* @route '/register/success'
*/
SignupSuccessController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SignupSuccessController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\SignupSuccessController::__invoke
* @see app/Http/Controllers/Auth/SignupSuccessController.php:14
* @route '/register/success'
*/
SignupSuccessController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: SignupSuccessController.url(options),
    method: 'head',
})

export default SignupSuccessController