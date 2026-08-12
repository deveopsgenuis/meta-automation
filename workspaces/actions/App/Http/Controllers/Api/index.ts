import UploadController from './UploadController'
import PostController from './PostController'
import PlatformController from './PlatformController'
import WorkspaceController from './WorkspaceController'
import SignatureController from './SignatureController'
import LabelController from './LabelController'
import SocialAccountController from './SocialAccountController'
import ApiKeyController from './ApiKeyController'

const Api = {
    UploadController: Object.assign(UploadController, UploadController),
    PostController: Object.assign(PostController, PostController),
    PlatformController: Object.assign(PlatformController, PlatformController),
    WorkspaceController: Object.assign(WorkspaceController, WorkspaceController),
    SignatureController: Object.assign(SignatureController, SignatureController),
    LabelController: Object.assign(LabelController, LabelController),
    SocialAccountController: Object.assign(SocialAccountController, SocialAccountController),
    ApiKeyController: Object.assign(ApiKeyController, ApiKeyController),
}

export default Api