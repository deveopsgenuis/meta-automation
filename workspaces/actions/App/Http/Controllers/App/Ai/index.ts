import PostPlanController from './PostPlanController'
import ShortVideoPlanController from './ShortVideoPlanController'

const Ai = {
    PostPlanController: Object.assign(PostPlanController, PostPlanController),
    ShortVideoPlanController: Object.assign(ShortVideoPlanController, ShortVideoPlanController),
}

export default Ai