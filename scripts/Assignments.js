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
    let citynames = ""
    

    for (const currentPet of pets) {
        const currentPetWalker = findWalker(currentPet, walkers)
        const allWalkerCities = getAllCities(currentPetWalker)
        const walkerCityNamesArray = getCityNames(allWalkerCities)
        
        assignmentHTML += `
            <li>
                ${currentPet.name} is being walked by
                ${currentPetWalker.name} in ${walkerCityNamesArray}
            </li>
        `
    }

    assignmentHTML += "</ul>"
    

    return assignmentHTML


}



document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("walker")) {
            const [,walkerId] = itemClicked.id.split("--")
            for (const walker of walkers) {
                if (walker.id === parseInt(walkerId)) {
                    const allWalkerCities = getAllCities(walker)
                    const walkerCityNamesArray = getCityNames(allWalkerCities)
                    window.alert(`${walker.name} services ${walkerCityNamesArray}`)
                }
            }
        }
    }
)