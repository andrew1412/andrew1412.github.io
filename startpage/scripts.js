/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"zzls":"https://zzls.xyz/"}
const engine = "searxng"
const engineUrls = {
  duckduckgo: "https://duckduckgo.com/?q=",
  startpage: "https://www.startpage.com/search?q=",
  searxng: "https://search.zzls.xyz/search?q=",
  librex: "https://librex.zzls.xyz/search.php?q=",
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
  return engineUrls[engine] + value
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

const bookmarks = [{"id":"FyrYDG7rHKufsjZi","label":"work","bookmarks":[{"id":"Ah9aZ18HK6G0NsOm","label":"hosting","url":"http://hpanel.hostinger.com/"},{"id":"FWkRZ13T2j1e8B47","label":"dashboard","url":"https://montetzion.net/dws9eyusqg2k2ncu/index.php?controller=AdminLogin&token=65f4366397b7526bfe5e70af67bbc66d&redirect=AdminDashboard"},{"id":"ud3Q7RBtogfCfgJN","label":"web","url":"https://montetzion.net"}]},{"id":"PNjspx2tZuq62lbF","label":"dev","bookmarks":[{"id":"T1fMMFh5cq6e8bEV","label":"github","url":"https://github.com/login"},{"id":"yk7cEdO7aPd6a6sm","label":"deno","url":"https://dash.deno.com/projects"}]},{"id":"Y4G0nYOlESb5UO0s","label":"tools","bookmarks":[{"id":"Sc1Tatq6mF99eyAR","label":"send","url":"https://send.cyberjake.xyz/"},{"id":"yUhAkSFNGKd5zQau","label":"temp mail","url":"https://www.guerrillamail.com/"},{"id":"5Htf7TRNP9GJns3S","label":"solotodo","url":"https://www.solotodo.cl"}]},{"id":"6wEhQbRCh0U10YKM","label":"etc","bookmarks":[{"id":"fngJBqw1Kc8rpojA","label":"flathub","url":"https://flathub.org"}]}]

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
