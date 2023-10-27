import { createStore } from 'vuex'
import pet from './modules/pet'
import breeds from './modules/breeds'

export default createStore({
    modules: {
        pet,
        breeds
    }
})