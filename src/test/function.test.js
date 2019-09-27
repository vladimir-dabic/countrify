import countries from '../fetch/europe.json'
import {getIncludedRandomizeCountries, randomize, getNCountries} from '../functions'



it('should work', () => {
  try {
    let included = countries[34]
    let x = getIncludedRandomizeCountries(included, countries, 3)
    console.log('hej', x.map(c => c.name))

  } catch (err) {
    console.log(error)
  }
})