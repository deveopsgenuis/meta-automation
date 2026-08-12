import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\Settings\ProfileController::edit
* @see app/Http/Controllers/App/Settings/ProfileController.php:22
* @route '/settings/profile'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/settings/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::edit
* @see app/Http/Controllers/App/Settings/ProfileController.php:22
* @route '/settings/profile'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::edit
* @see app/Http/Controllers/App/Settings/ProfileController.php:22
* @route '/settings/profile'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::edit
* @see app/Http/Controllers/App/Settings/ProfileController.php:22
* @route '/settings/profile'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::update
* @see app/Http/Controllers/App/Settings/ProfileController.php:30
* @route '/settings/profile'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/settings/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::update
* @see app/Http/Controllers/App/Settings/ProfileController.php:30
* @route '/settings/profile'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::update
* @see app/Http/Controllers/App/Settings/ProfileController.php:30
* @route '/settings/profile'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::uploadPhoto
* @see app/Http/Controllers/App/Settings/ProfileController.php:46
* @route '/settings/profile/photo'
*/
export const uploadPhoto = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadPhoto.url(options),
    method: 'post',
})

uploadPhoto.definition = {
    methods: ["post"],
    url: '/settings/profile/photo',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::uploadPhoto
* @see app/Http/Controllers/App/Settings/ProfileController.php:46
* @route '/settings/profile/photo'
*/
uploadPhoto.url = (options?: RouteQueryOptions) => {
    return uploadPhoto.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::uploadPhoto
* @see app/Http/Controllers/App/Settings/ProfileController.php:46
* @route '/settings/profile/photo'
*/
uploadPhoto.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadPhoto.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::deletePhoto
* @see app/Http/Controllers/App/Settings/ProfileController.php:63
* @route '/settings/profile/photo'
*/
export const deletePhoto = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePhoto.url(options),
    method: 'delete',
})

deletePhoto.definition = {
    methods: ["delete"],
    url: '/settings/profile/photo',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::deletePhoto
* @see app/Http/Controllers/App/Settings/ProfileController.php:63
* @route '/settings/profile/photo'
*/
deletePhoto.url = (options?: RouteQueryOptions) => {
    return deletePhoto.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::deletePhoto
* @see app/Http/Controllers/App/Settings/ProfileController.php:63
* @route '/settings/profile/photo'
*/
deletePhoto.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePhoto.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::updateLanguage
* @see app/Http/Controllers/App/Settings/ProfileController.php:75
* @route '/settings/language'
*/
export const updateLanguage = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateLanguage.url(options),
    method: 'put',
})

updateLanguage.definition = {
    methods: ["put"],
    url: '/settings/language',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::updateLanguage
* @see app/Http/Controllers/App/Settings/ProfileController.php:75
* @route '/settings/language'
*/
updateLanguage.url = (options?: RouteQueryOptions) => {
    return updateLanguage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::updateLanguage
* @see app/Http/Controllers/App/Settings/ProfileController.php:75
* @route '/settings/language'
*/
updateLanguage.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateLanguage.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::destroy
* @see app/Http/Controllers/App/Settings/ProfileController.php:86
* @route '/settings/profile'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/settings/profile',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::destroy
* @see app/Http/Controllers/App/Settings/ProfileController.php:86
* @route '/settings/profile'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Settings\ProfileController::destroy
* @see app/Http/Controllers/App/Settings/ProfileController.php:86
* @route '/settings/profile'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

const ProfileController = { edit, update, uploadPhoto, deletePhoto, updateLanguage, destroy }

export default ProfileController