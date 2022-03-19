const tags = 'div,p,a,img,ul,li'.split(',')

// methods 1
function isHTMLTag(tagName) {
  tagName = tagName.toLowerCase()
  if (tags.indexOf(tagName) > -1) return true
  return false
}

// methods 2
function makeMap(keys) {
  const set = {}
  tags.forEach(key => set[key] = true)

  return function(tagName) {
    return !!set[tagName.toLowerCase()]
  }
}

const isHTMLTag1 = makeMap(tags)
