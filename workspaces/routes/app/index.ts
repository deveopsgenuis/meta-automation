import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import invites from './invites'
import onboardingC947a0 from './onboarding'
import billing from './billing'
import workspaces from './workspaces'
import workspace from './workspace'
import presence from './presence'
import social from './social'
import accountsDb024e from './accounts'
import discord from './discord'
import analytics72d765 from './analytics'
import posts from './posts'
import postTemplates from './post-templates'
import members79483b from './members'
import signatures from './signatures'
import assets from './assets'
import labels from './labels'
import automations from './automations'
import apiKeys from './api-keys'
import account from './account'
import usage from './usage'
import notifications from './notifications'
import profile from './profile'
import authentication from './authentication'
/**
* @see routes/app.php:58
* @route '/'
*/
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/app.php:58
* @route '/'
*/
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see routes/app.php:58
* @route '/'
*/
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

/**
* @see routes/app.php:58
* @route '/'
*/
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\BillingController::subscribe
* @see app/Http/Controllers/App/BillingController.php:19
* @route '/subscribe'
*/
export const subscribe = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subscribe.url(options),
    method: 'get',
})

subscribe.definition = {
    methods: ["get","head"],
    url: '/subscribe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\BillingController::subscribe
* @see app/Http/Controllers/App/BillingController.php:19
* @route '/subscribe'
*/
subscribe.url = (options?: RouteQueryOptions) => {
    return subscribe.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\BillingController::subscribe
* @see app/Http/Controllers/App/BillingController.php:19
* @route '/subscribe'
*/
subscribe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subscribe.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\BillingController::subscribe
* @see app/Http/Controllers/App/BillingController.php:19
* @route '/subscribe'
*/
subscribe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: subscribe.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\OnboardingController::onboarding
* @see app/Http/Controllers/App/OnboardingController.php:28
* @route '/onboarding'
*/
export const onboarding = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: onboarding.url(options),
    method: 'get',
})

onboarding.definition = {
    methods: ["get","head"],
    url: '/onboarding',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\OnboardingController::onboarding
* @see app/Http/Controllers/App/OnboardingController.php:28
* @route '/onboarding'
*/
onboarding.url = (options?: RouteQueryOptions) => {
    return onboarding.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\OnboardingController::onboarding
* @see app/Http/Controllers/App/OnboardingController.php:28
* @route '/onboarding'
*/
onboarding.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: onboarding.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\OnboardingController::onboarding
* @see app/Http/Controllers/App/OnboardingController.php:28
* @route '/onboarding'
*/
onboarding.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: onboarding.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\SocialController::accounts
* @see app/Http/Controllers/Auth/SocialController.php:35
* @route '/accounts'
*/
export const accounts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: accounts.url(options),
    method: 'get',
})

accounts.definition = {
    methods: ["get","head"],
    url: '/accounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\SocialController::accounts
* @see app/Http/Controllers/Auth/SocialController.php:35
* @route '/accounts'
*/
accounts.url = (options?: RouteQueryOptions) => {
    return accounts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\SocialController::accounts
* @see app/Http/Controllers/Auth/SocialController.php:35
* @route '/accounts'
*/
accounts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: accounts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\SocialController::accounts
* @see app/Http/Controllers/Auth/SocialController.php:35
* @route '/accounts'
*/
accounts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: accounts.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\AnalyticsController::analytics
* @see app/Http/Controllers/App/AnalyticsController.php:41
* @route '/analytics'
*/
export const analytics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})

analytics.definition = {
    methods: ["get","head"],
    url: '/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\AnalyticsController::analytics
* @see app/Http/Controllers/App/AnalyticsController.php:41
* @route '/analytics'
*/
analytics.url = (options?: RouteQueryOptions) => {
    return analytics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\AnalyticsController::analytics
* @see app/Http/Controllers/App/AnalyticsController.php:41
* @route '/analytics'
*/
analytics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\AnalyticsController::analytics
* @see app/Http/Controllers/App/AnalyticsController.php:41
* @route '/analytics'
*/
analytics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: analytics.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\PostController::calendar
* @see app/Http/Controllers/App/PostController.php:88
* @route '/calendar'
*/
export const calendar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendar.url(options),
    method: 'get',
})

calendar.definition = {
    methods: ["get","head"],
    url: '/calendar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\PostController::calendar
* @see app/Http/Controllers/App/PostController.php:88
* @route '/calendar'
*/
calendar.url = (options?: RouteQueryOptions) => {
    return calendar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\PostController::calendar
* @see app/Http/Controllers/App/PostController.php:88
* @route '/calendar'
*/
calendar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendar.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\PostController::calendar
* @see app/Http/Controllers/App/PostController.php:88
* @route '/calendar'
*/
calendar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calendar.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::members
* @see app/Http/Controllers/App/WorkspaceInviteController.php:21
* @route '/settings/workspace/members'
*/
export const members = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: members.url(options),
    method: 'get',
})

members.definition = {
    methods: ["get","head"],
    url: '/settings/workspace/members',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::members
* @see app/Http/Controllers/App/WorkspaceInviteController.php:21
* @route '/settings/workspace/members'
*/
members.url = (options?: RouteQueryOptions) => {
    return members.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::members
* @see app/Http/Controllers/App/WorkspaceInviteController.php:21
* @route '/settings/workspace/members'
*/
members.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: members.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\WorkspaceInviteController::members
* @see app/Http/Controllers/App/WorkspaceInviteController.php:21
* @route '/settings/workspace/members'
*/
members.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: members.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\App\Settings\SettingsController::settings
* @see app/Http/Controllers/App/Settings/SettingsController.php:15
* @route '/settings'
*/
export const settings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})

settings.definition = {
    methods: ["get","head"],
    url: '/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\App\Settings\SettingsController::settings
* @see app/Http/Controllers/App/Settings/SettingsController.php:15
* @route '/settings'
*/
settings.url = (options?: RouteQueryOptions) => {
    return settings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\App\Settings\SettingsController::settings
* @see app/Http/Controllers/App/Settings/SettingsController.php:15
* @route '/settings'
*/
settings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\App\Settings\SettingsController::settings
* @see app/Http/Controllers/App/Settings/SettingsController.php:15
* @route '/settings'
*/
settings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: settings.url(options),
    method: 'head',
})

const app = {
    invites: Object.assign(invites, invites),
    home: Object.assign(home, home),
    subscribe: Object.assign(subscribe, subscribe),
    onboarding: Object.assign(onboarding, onboardingC947a0),
    billing: Object.assign(billing, billing),
    workspaces: Object.assign(workspaces, workspaces),
    workspace: Object.assign(workspace, workspace),
    presence: Object.assign(presence, presence),
    social: Object.assign(social, social),
    accounts: Object.assign(accounts, accountsDb024e),
    discord: Object.assign(discord, discord),
    analytics: Object.assign(analytics, analytics72d765),
    calendar: Object.assign(calendar, calendar),
    posts: Object.assign(posts, posts),
    postTemplates: Object.assign(postTemplates, postTemplates),
    members: Object.assign(members, members79483b),
    signatures: Object.assign(signatures, signatures),
    assets: Object.assign(assets, assets),
    labels: Object.assign(labels, labels),
    automations: Object.assign(automations, automations),
    apiKeys: Object.assign(apiKeys, apiKeys),
    account: Object.assign(account, account),
    usage: Object.assign(usage, usage),
    notifications: Object.assign(notifications, notifications),
    settings: Object.assign(settings, settings),
    profile: Object.assign(profile, profile),
    authentication: Object.assign(authentication, authentication),
}

export default app