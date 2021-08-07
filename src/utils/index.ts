import faker from 'faker'

type fromTo = string | Date

const getFakerNumber = (min: number, max: number) => faker.datatype.number({ min, max })

const getFakerDate = (from: fromTo, to: fromTo) => faker.date.between(from, to)

const createGetFakerNumber = (min: number, max: number) => () => getFakerNumber(min, max)

const createGetFakerDate = (from: fromTo, to: fromTo) => () => getFakerDate(from, to)

const getSingleNumberArray = (min: number, max: number, len: number) => {
  const result = []
  const getFakerNumber = createGetFakerNumber(min, max)
  for (let i = 0; i < len; i++) {
    result.push(getFakerNumber())
  }
  return result
}

const getDoubleNumberArray = (
  min: number,
  max: number,
  remin: number,
  remax: number,
  len: number
) => {
  const result = []
  const fakerNumber = createGetFakerNumber(min, max)
  const reFakerNumber = createGetFakerNumber(remin, remax)
  for (let i = 0; i < len; i++) result.push([fakerNumber(), reFakerNumber()])
  return result
}

const getDateNumberArray = (from: fromTo, to: fromTo, min: number, max: number, len: number) => {
  const result = []
  const fakerDate = createGetFakerDate(from, to)
  const fakerNumber = createGetFakerNumber(min, max)
  for (let i = 0; i < len; i++) result.push([fakerDate(), fakerNumber()])
  return result
}

const getStringRange = (stop: number) => {
  const result = []
  for (let i = 0; i < stop; i++) result.push(i + '')
  return result
}

export {
  getSingleNumberArray,
  getDoubleNumberArray,
  getDateNumberArray,
  getStringRange,
  getFakerNumber
}
