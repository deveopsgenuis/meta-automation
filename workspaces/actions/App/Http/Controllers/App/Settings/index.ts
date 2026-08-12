import AccountController from './AccountController'
import UsageController from './UsageController'
import SettingsController from './SettingsController'
import ProfileController from './ProfileController'
import AuthenticationController from './AuthenticationController'
import NotificationPreferenceController from './NotificationPreferenceController'

const Settings = {
    AccountController: Object.assign(AccountController, AccountController),
    UsageController: Object.assign(UsageController, UsageController),
    SettingsController: Object.assign(SettingsController, SettingsController),
    ProfileController: Object.assign(ProfileController, ProfileController),
    AuthenticationController: Object.assign(AuthenticationController, AuthenticationController),
    NotificationPreferenceController: Object.assign(NotificationPreferenceController, NotificationPreferenceController),
}

export default Settings