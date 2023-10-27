import axios from "axios";

const path = 'http://localhost/api/';

const state = () => ({
    type: null,
    loaded: false,
    catBreeds: [],
    dogBreeds: []
})

const getters = {
    breedLoaded: (state) => {
        return state.loaded && state.type
    },
    breedList: (state) => {
        let breedList = [];
        if (!state.type) {
            return breedList;
        }
        if (state.type === 'dog') {
            breedList = state.dogBreeds
        }
        if (state.type === 'cat') {
            breedList = state.catBreeds
        }
        breedList.push('Can\'t find it?')
        return breedList;
    }
}

const actions = {
    async loadList ({ commit }) {
        try {
            const response = await axios.get(
                path + 'breeds/'
            );
            if (response.status != 200) {
                throw new Error('Breed query endpoint did not return 200')
            }
            if (!response.data) {
                throw new Error('Breed query response is empty')
            }
            commit("setBreeds", response.data.data)
        } catch (e) {
            commit("setBreeds", []);
        }
    }

}

const mutations = {
    setBreeds (state, breeds) {
        let catBreeds = [];
        let dogBreeds = [];
        for (const key in breeds) {
            let breed = breeds[key]
            if (breeds[key].type === 'dog') {
                dogBreeds.push(breeds[key].name);
            }
            if (breeds[key].type === 'cat') {
                catBreeds.push(breeds[key].name);
            }
        }
        state.dogBreeds = dogBreeds
        state.catBreeds = catBreeds
        state.loaded = true
    },
    updateType (state, type) {
        state.type = type
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}