import BillingController from './BillingController'
import OnboardingController from './OnboardingController'
import WorkspaceController from './WorkspaceController'
import PresenceController from './PresenceController'
import DiscordController from './DiscordController'
import AnalyticsController from './AnalyticsController'
import PostController from './PostController'
import LinkPreviewController from './LinkPreviewController'
import PostTemplateController from './PostTemplateController'
import PostAiGenerateController from './PostAiGenerateController'
import PostAiRegenerateMediaController from './PostAiRegenerateMediaController'
import PostAiReviewController from './PostAiReviewController'
import PostAiCreateController from './PostAiCreateController'
import PosterDesignController from './PosterDesignController'
import Ai from './Ai'
import PostCommentController from './PostCommentController'
import WorkspaceInviteController from './WorkspaceInviteController'
import WorkspaceSignatureController from './WorkspaceSignatureController'
import AssetController from './AssetController'
import UnsplashController from './UnsplashController'
import GiphyController from './GiphyController'
import WorkspaceLabelController from './WorkspaceLabelController'
import AutomationController from './AutomationController'
import ApiKeyController from './ApiKeyController'
import Settings from './Settings'
import NotificationController from './NotificationController'

const App = {
    BillingController: Object.assign(BillingController, BillingController),
    OnboardingController: Object.assign(OnboardingController, OnboardingController),
    WorkspaceController: Object.assign(WorkspaceController, WorkspaceController),
    PresenceController: Object.assign(PresenceController, PresenceController),
    DiscordController: Object.assign(DiscordController, DiscordController),
    AnalyticsController: Object.assign(AnalyticsController, AnalyticsController),
    PostController: Object.assign(PostController, PostController),
    LinkPreviewController: Object.assign(LinkPreviewController, LinkPreviewController),
    PostTemplateController: Object.assign(PostTemplateController, PostTemplateController),
    PostAiGenerateController: Object.assign(PostAiGenerateController, PostAiGenerateController),
    PostAiRegenerateMediaController: Object.assign(PostAiRegenerateMediaController, PostAiRegenerateMediaController),
    PostAiReviewController: Object.assign(PostAiReviewController, PostAiReviewController),
    PostAiCreateController: Object.assign(PostAiCreateController, PostAiCreateController),
    PosterDesignController: Object.assign(PosterDesignController, PosterDesignController),
    Ai: Object.assign(Ai, Ai),
    PostCommentController: Object.assign(PostCommentController, PostCommentController),
    WorkspaceInviteController: Object.assign(WorkspaceInviteController, WorkspaceInviteController),
    WorkspaceSignatureController: Object.assign(WorkspaceSignatureController, WorkspaceSignatureController),
    AssetController: Object.assign(AssetController, AssetController),
    UnsplashController: Object.assign(UnsplashController, UnsplashController),
    GiphyController: Object.assign(GiphyController, GiphyController),
    WorkspaceLabelController: Object.assign(WorkspaceLabelController, WorkspaceLabelController),
    AutomationController: Object.assign(AutomationController, AutomationController),
    ApiKeyController: Object.assign(ApiKeyController, ApiKeyController),
    Settings: Object.assign(Settings, Settings),
    NotificationController: Object.assign(NotificationController, NotificationController),
}

export default App