/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"torrent":"https://1337x.to/"}
const engine = "https://4get.nadeko.net/web?s={query}"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"PNjspx2tZuq62lbF","label":"dev","bookmarks":[{"id":"T1fMMFh5cq6e8bEV","label":"git","url":"https://github.com/login"},{"id":"yk7cEdO7aPd6a6sm","label":"deploy","url":"https://dash.deno.com/projects"},{"id":"1SSiyaxhRlihw6Z5","label":"docs","url":"https://fresh.deno.dev/docs/"}]},{"id":"w2kLX60zfei8IAPq","label":"fun","bookmarks":[{"id":"UO1cldjDR1rik3pa","label":"roms","url":"https://vimm.net/"},{"id":"fZoX9g5FVBnNVoPF","label":"anime","url":"https://everythingmoe.com/"}]},{"id":"LvmjE4vAYoBUI2NV","label":"web","bookmarks":[{"id":"lxzH6F8PIolxExp7","label":"nadeko","url":"https://nadeko.net"},{"id":"qxZCleFVhpC9ERrw","label":"temp mail","url":"https://www.guerrillamail.com/"},{"id":"vsb9tg9JnMB9lSJg","label":"alternativeto","url":"https://alternativeto.net/"}]},{"id":"C99Moawhds9qWiYz","label":"etc","bookmarks":[{"id":"pGpRB4vtzQXmewFG","label":"lemmy","url":"https://lemmy.sdf.org"},{"id":"oZsTAaWJ4RpTFdFc","label":"speedtest","url":"https://librespeed.org/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
