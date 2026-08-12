import linkedin from './linkedin'
import x from './x'
import tiktok from './tiktok'
import youtube from './youtube'
import facebook from './facebook'
import instagram from './instagram'
import instagramFacebook from './instagram-facebook'
import threads from './threads'
import pinterest from './pinterest'
import bluesky from './bluesky'
import mastodon from './mastodon'
import telegram from './telegram'
import discord from './discord'

const social = {
    linkedin: Object.assign(linkedin, linkedin),
    x: Object.assign(x, x),
    tiktok: Object.assign(tiktok, tiktok),
    youtube: Object.assign(youtube, youtube),
    facebook: Object.assign(facebook, facebook),
    instagram: Object.assign(instagram, instagram),
    instagramFacebook: Object.assign(instagramFacebook, instagramFacebook),
    threads: Object.assign(threads, threads),
    pinterest: Object.assign(pinterest, pinterest),
    bluesky: Object.assign(bluesky, bluesky),
    mastodon: Object.assign(mastodon, mastodon),
    telegram: Object.assign(telegram, telegram),
    discord: Object.assign(discord, discord),
}

export default social