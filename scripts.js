/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"zzls":"https://zzls.xyz/"}
const engine = "https://4get.zzls.xyz/web?s={query}"
const engineUrls = {
  duckduckgo: "https://duckduckgo.com/?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  searxng: "https://search.zzls.xyz/search?q={query}",
  librex: "https://librex.zzls.xyz/search.php?q={query}",
  4get: "https://4get.zzls.xyz/web?s={query}",
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

const bookmarks = [{"id":"PNjspx2tZuq62lbF","label":"dev","bookmarks":[{"id":"T1fMMFh5cq6e8bEV","label":"git","url":"https://github.com/login"},{"id":"yk7cEdO7aPd6a6sm","label":"deploy","url":"https://dash.deno.com/projects"},{"id":"1SSiyaxhRlihw6Z5","label":"web test","url":"http://localhost:8000/"}]},{"id":"Y4G0nYOlESb5UO0s","label":"tools","bookmarks":[{"id":"Sc1Tatq6mF99eyAR","label":"send","url":"https://send.cyberjake.xyz/"},{"id":"yUhAkSFNGKd5zQau","label":"temp mail","url":"https://www.guerrillamail.com/"}]},{"id":"QiPDbBvcgy1iXp7T","label":"docs","bookmarks":[{"id":"yIdxtRQLmYFsebSU","label":"md","url":"https://www.markdownguide.org/basic-syntax/"},{"id":"AXmso9zl3twJf9xe","label":"deno","url":"https://deno.land/manual"},{"id":"vZAQbKxclP8okqaW","label":"fresh","url":"https://fresh.deno.dev/docs/"}]},{"id":"SbNvXBN7Pz6hReUR","label":"etc","bookmarks":[{"id":"cNkik46Wj9cqGbDT","label":"flathub","url":"https://flathub.org"},{"id":"XCtCArL8cbF95VaO","label":"alternativeto","url":"https://alternativeto.net/"}]}]

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
