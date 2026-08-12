import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\App\PostCommentController::index
* @see app/Http/Controllers/App/PostCommentController.php:22
* @route '/posts/{post}/comments'
*/
export const index = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/posts/{post}/comments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\PostCommentController::index
* @see app/Http/Controllers/App/PostCommentController.php:22
* @route '/posts/{post}/comments'
*/
index.url = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostCommentController::index
* @see app/Http/Controllers/App/PostCommentController.php:22
* @route '/posts/{post}/comments'
*/
index.get = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\PostCommentController::index
* @see app/Http/Controllers/App/PostCommentController.php:22
* @route '/posts/{post}/comments'
*/
index.head = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\PostCommentController::store
* @see app/Http/Controllers/App/PostCommentController.php:63
* @route '/posts/{post}/comments'
*/
export const store = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/posts/{post}/comments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\PostCommentController::store
* @see app/Http/Controllers/App/PostCommentController.php:63
* @route '/posts/{post}/comments'
*/
store.url = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostCommentController::store
* @see app/Http/Controllers/App/PostCommentController.php:63
* @route '/posts/{post}/comments'
*/
store.post = (args: { post: string | { id: string } } | [post: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\App\PostCommentController::update
* @see app/Http/Controllers/App/PostCommentController.php:101
* @route '/posts/{post}/comments/{comment}'
*/
export const update = (args: { post: string | { id: string }, comment: string | { id: string } } | [post: string | { id: string }, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/posts/{post}/comments/{comment}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\App\PostCommentController::update
* @see app/Http/Controllers/App/PostCommentController.php:101
* @route '/posts/{post}/comments/{comment}'
*/
update.url = (args: { post: string | { id: string }, comment: string | { id: string } } | [post: string | { id: string }, comment: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            post: args[0],
            comment: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
        comment: typeof args.comment === 'object'
        ? args.comment.id
        : args.comment,
    }

    return update.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostCommentController::update
* @see app/Http/Controllers/App/PostCommentController.php:101
* @route '/posts/{post}/comments/{comment}'
*/
update.put = (args: { post: string | { id: string }, comment: string | { id: string } } | [post: string | { id: string }, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\App\PostCommentController::destroy
* @see app/Http/Controllers/App/PostCommentController.php:126
* @route '/posts/{post}/comments/{comment}'
*/
export const destroy = (args: { post: string | { id: string }, comment: string | { id: string } } | [post: string | { id: string }, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/posts/{post}/comments/{comment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\App\PostCommentController::destroy
* @see app/Http/Controllers/App/PostCommentController.php:126
* @route '/posts/{post}/comments/{comment}'
*/
destroy.url = (args: { post: string | { id: string }, comment: string | { id: string } } | [post: string | { id: string }, comment: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            post: args[0],
            comment: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
        comment: typeof args.comment === 'object'
        ? args.comment.id
        : args.comment,
    }

    return destroy.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostCommentController::destroy
* @see app/Http/Controllers/App/PostCommentController.php:126
* @route '/posts/{post}/comments/{comment}'
*/
destroy.delete = (args: { post: string | { id: string }, comment: string | { id: string } } | [post: string | { id: string }, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\App\PostCommentController::react
* @see app/Http/Controllers/App/PostCommentController.php:146
* @route '/posts/{post}/comments/{comment}/react'
*/
export const react = (args: { post: string | { id: string }, comment: string | { id: string } } | [post: string | { id: string }, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: react.url(args, options),
    method: 'post',
})

react.definition = {
    methods: ["post"],
    url: '/posts/{post}/comments/{comment}/react',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\App\PostCommentController::react
* @see app/Http/Controllers/App/PostCommentController.php:146
* @route '/posts/{post}/comments/{comment}/react'
*/
react.url = (args: { post: string | { id: string }, comment: string | { id: string } } | [post: string | { id: string }, comment: string | { id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            post: args[0],
            comment: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
        comment: typeof args.comment === 'object'
        ? args.comment.id
        : args.comment,
    }

    return react.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace('{comment}', parsedArgs.comment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostCommentController::react
* @see app/Http/Controllers/App/PostCommentController.php:146
* @route '/posts/{post}/comments/{comment}/react'
*/
react.post = (args: { post: string | { id: string }, comment: string | { id: string } } | [post: string | { id: string }, comment: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: react.url(args, options),
    method: 'post',
})

const PostCommentController = { index, store, update, destroy, react }

export default PostCommentController