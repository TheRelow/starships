export default function (obj, keys) {
  let result = {}
  let objKeys = Object.keys(obj)
  let requiredKeys = keys.filter(el=>objKeys.includes(el))
  for (let i of requiredKeys) {
    if (!!obj[i]) {
      result[i] = obj[i]
    }
  }
  return result
}
