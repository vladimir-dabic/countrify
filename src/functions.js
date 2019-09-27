
export const randomize = (arr) => {
  return arr.sort( () =>  0.5 - Math.random() )
}

export const getNCountries = (countries, n) => {
  if (n === 'all') return randomize(countries)
  return randomize(countries).splice(0, n)
}

export const getIncludedRandomizeCountries = (included = null, countries = [], n = 4) => {
  if (included) {
    return randomize(
      [
        included,
        ...randomize(countries.filter(c => c.name !== included.name )).splice(0, n - 1)
      ]
    )
  }
  return []
}