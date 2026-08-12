import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults, validateParameters } from './../../../wayfinder'
import platforms from './platforms'
import ai from './ai'
import comments from './comments'
/**
* @see \App\Http\Controllers\App\PostController::index
* @see app/Http/Controllers/App/PostController.php:40
* @route '/posts/{status?}'
*/
export const index = (args?: { status?: string | number } | [status: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/posts/{status?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\PostController::index
* @see app/Http/Controllers/App/PostController.php:40
* @route '/posts/{status?}'
*/
index.url = (args?: { status?: string | number } | [status: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { status: args }
    }

    if (Array.isArray(args)) {
        args = {
            status: args[0],
        }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
        "status",
    ])

    const parsedArgs = {
        status: args?.status,
    }

    return index.definition.url
            .replace('{status?}', parsedArgs.status?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostController::index
* @see app/Http/Controllers/App/PostController.php:40
* @route '/posts/{status?}'
*/
index.get = (args?: { status?: string | number } | [status: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\PostController::index
* @see app/Http/Controllers/App/PostController.php:40
* @route '/posts/{status?}'
*/
index.head = (args?: { status?: string | number } | [status: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\PostController::create
* @see app/Http/Controllers/App/PostController.php:159
* @route '/posts/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/posts/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\PostController::create
* @see app/Http/Controllers/App/PostController.php:159
* @route '/posts/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostController::create
* @see app/Http/Controllers/App/PostController.php:159
* @route '/posts/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\PostController::create
* @see app/Http/Controllers/App/PostController.php:159
* @route '/posts/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\PostController::store
* @see app/Http/Controllers/App/PostController.php:186
* @route '/posts'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/posts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\PostController::store
* @see app/Http/Controllers/App/PostController.php:186
* @route '/posts'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostController::store
* @see app/Http/Controllers/App/PostController.php:186
* @route '/posts'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\PostController::edit
* @see app/Http/Controllers/App/PostController.php:249
* @route '/posts/{post}/edit'
*/
export const edit = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/posts/{post}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\PostController::edit
* @see app/Http/Controllers/App/PostController.php:249
* @route '/posts/{post}/edit'
*/
edit.url = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { post: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
    }

    return edit.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostController::edit
* @see app/Http/Controllers/App/PostController.php:249
* @route '/posts/{post}/edit'
*/
edit.get = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\PostController::edit
* @see app/Http/Controllers/App/PostController.php:249
* @route '/posts/{post}/edit'
*/
edit.head = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\PostController::show
* @see app/Http/Controllers/App/PostController.php:227
* @route '/posts/{post}'
*/
export const show = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/posts/{post}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\PostController::show
* @see app/Http/Controllers/App/PostController.php:227
* @route '/posts/{post}'
*/
show.url = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { post: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
    }

    return show.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostController::show
* @see app/Http/Controllers/App/PostController.php:227
* @route '/posts/{post}'
*/
show.get = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\PostController::show
* @see app/Http/Controllers/App/PostController.php:227
* @route '/posts/{post}'
*/
show.head = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\PostController::update
* @see app/Http/Controllers/App/PostController.php:310
* @route '/posts/{post}'
*/
export const update = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/posts/{post}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\App\PostController::update
* @see app/Http/Controllers/App/PostController.php:310
* @route '/posts/{post}'
*/
update.url = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { post: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
    }

    return update.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostController::update
* @see app/Http/Controllers/App/PostController.php:310
* @route '/posts/{post}'
*/
update.put = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\App\PostController::destroy
* @see app/Http/Controllers/App/PostController.php:345
* @route '/posts/{post}'
*/
export const destroy = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/posts/{post}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\App\PostController::destroy
* @see app/Http/Controllers/App/PostController.php:345
* @route '/posts/{post}'
*/
destroy.url = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { post: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
    }

    return destroy.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostController::destroy
* @see app/Http/Controllers/App/PostController.php:345
* @route '/posts/{post}'
*/
destroy.delete = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\App\PostController::duplicate
* @see app/Http/Controllers/App/PostController.php:378
* @route '/posts/{post}/duplicate'
*/
export const duplicate = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicate.url(args, options),
    method: 'post',
})

duplicate.definition = {
    methods: ["post"],
    url: '/posts/{post}/duplicate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\PostController::duplicate
* @see app/Http/Controllers/App/PostController.php:378
* @route '/posts/{post}/duplicate'
*/
duplicate.url = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { post: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
    }

    return duplicate.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostController::duplicate
* @see app/Http/Controllers/App/PostController.php:378
* @route '/posts/{post}/duplicate'
*/
duplicate.post = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicate.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\LinkPreviewController::__invoke
* @see app/Http/Controllers/App/LinkPreviewController.php:15
* @route '/posts/link-preview'
*/
export const linkPreview = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: linkPreview.url(options),
    method: 'post',
})

linkPreview.definition = {
    methods: ["post"],
    url: '/posts/link-preview',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\LinkPreviewController::__invoke
* @see app/Http/Controllers/App/LinkPreviewController.php:15
* @route '/posts/link-preview'
*/
linkPreview.url = (options?: RouteQueryOptions) => {
    return linkPreview.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\LinkPreviewController::__invoke
* @see app/Http/Controllers/App/LinkPreviewController.php:15
* @route '/posts/link-preview'
*/
linkPreview.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: linkPreview.url(options),
    method: 'post',
})

const posts = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    show: Object.assign(show, show),
    platforms: Object.assign(platforms, platforms),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    duplicate: Object.assign(duplicate, duplicate),
    linkPreview: Object.assign(linkPreview, linkPreview),
    ai: Object.assign(ai, ai),
    comments: Object.assign(comments, comments),
}

export default posts