import Webhooks from './Webhooks'
import Api from './Api'
import Auth from './Auth'
import LegalController from './LegalController'
import App from './App'

const Controllers = {
    Webhooks: Object.assign(Webhooks, Webhooks),
    Api: Object.assign(Api, Api),
    Auth: Object.assign(Auth, Auth),
    LegalController: Object.assign(LegalController, LegalController),
    App: Object.assign(App, App),
}

export default Controllers