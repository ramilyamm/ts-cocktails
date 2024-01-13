import axios from "axios";

const instanse = axios.create({
    baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/',
})

export const cocktailsAPI = {
    getAllCocktails() {
        return instanse.get('filter.php?c=Cocktail')
    },
    getFullCocktailsInfo(id: string) {
        return instanse.get(`lookup.php?i=${id}`)
    },
    getRandom() {
        return instanse.get(`random.php`)
    },
    getFilter(option: string) {
        return instanse.get(`filter.php?a=${option}`)
    },
    getByName(value: string) {
        return instanse.get(`search.php?s=${value}`)
    },
    getByIngredient(name: string) {
        return instanse.get(`search.php?i=${name}`)
    },
    getByGlass(value: string) {
        return instanse.get(`filter.php?g=${value}`)
    },
    getGlassesList() {
        return instanse.get(`list.php?g=list`)
    }
}