import google from './google'
import github from './github'

const auth = {
    google: Object.assign(google, google),
    github: Object.assign(github, github),
}

export default auth