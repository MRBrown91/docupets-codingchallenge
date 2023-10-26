import { createStore } from 'vuex'
import pet from './modules/pet'

export default createStore({
    modules: {
        pet
    }
})