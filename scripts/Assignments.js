import { getCities, getPets, getWalkerCities, getWalkers } from "./database.js"

// Get copy of state for use in this module
const pets = getPets()
const walkers = getWalkers()
const walkerCities = getWalkerCities()
const cities = getCities()


//define function that returns all walkerCities objects that correspond with the walker that is clicked on...should return array of matching objects

export const getAllCities = (walker) => {
    const allCities = []
    for (const city of walkerCities) {
        if (walker.id === city.walkerId) {
            allCities.push(city.cityId)
        }
    }
    return allCities
}

const getCityNames = (walkerCityArray) => {
    const cityArray = []
    for (const walkerCity of walkerCityArray) {
        for (const city of cities) {
            if (walkerCity === city.id) {
                cityArray.push(` ${city.name}`)
            }
        }
    }
    return cityArray

}


// Function whose responsibility is to find the walker assigned to a pet
const findWalker = (pets, walkers) => {
    let petWalker = null

    for (const walker of walkers) {
        if (walker.id === pets.walkerId) {
            petWalker = walker
        }
    }

    return petWalker
}

export const Assignments = () => {
    let assignmentHTML = ""
    assignmentHTML = "<ul>"

    for (const currentPet of pets) {
        const currentPetWalker = findWalker(currentPet, walkers)
        const allWalkerCities = getAllCities(currentPetWalker)
        const walkerCityNames = getCityNames(allWalkerCities)
        assignmentHTML += `
            <li>
                ${currentPet.name} is being walked by
                ${currentPetWalker.name} in ${walkerCityNames}
            </li>
        `
    }

    assignmentHTML += "</ul>"

    return assignmentHTML
}


