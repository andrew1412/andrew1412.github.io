/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"netflix":"https://netflix.com","crunchyroll":"https://crunchyroll.com","banco estado":"https://nwm.bancoestado.cl/"}
const engine = "librex"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
  librex: "https://librex.zzls.xyz/search.php?q="
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

const bookmarks = [{"id":"Se9Ej4rJCrzsbVaf","label":"social","bookmarks":[{"id":"Lh5kBGKdwonCQqwn","label":"instagram","url":"https://instagram.com"},{"id":"utWJ48n5sZ5LuQ4N","label":"mail","url":"https://mail.proton.me/u/1/inbox"},{"id":"ovVjgzyZbYYHEMZF","label":"whatsapp","url":"https://web.whatsapp.com/"}]},{"id":"wQLNQtF8j9HOHA6Z","label":"channel","bookmarks":[{"id":"xtNNk05lDPb4A3zk","label":"music","url":"https://chillhop.com/"},{"id":"dqSE7EaqBpuYy5lI","label":"mail","url":"https://accounts.google.com"},{"id":"q5YIDPzF3Y9tRv6S","label":"ko-fi","url":"https://ko-fi.com/account/login"},{"id":"3ntc3GXfw10mvIA4","label":"youtube","url":"https://youtube.com/c/andrew1412"}]},{"id":"FyrYDG7rHKufsjZi","label":"work","bookmarks":[{"id":"Ah9aZ18HK6G0NsOm","label":"hosting","url":"http://hpanel.hostinger.com/"},{"id":"FWkRZ13T2j1e8B47","label":"web","url":"https://montetzion.net/dws9eyusqg2k2ncu/index.php?controller=AdminLogin&token=65f4366397b7526bfe5e70af67bbc66d&redirect=AdminDashboard"}]},{"id":"PNjspx2tZuq62lbF","label":"tools","bookmarks":[{"id":"T1fMMFh5cq6e8bEV","label":"github","url":"https://github.com/login"},{"id":"yk7cEdO7aPd6a6sm","label":"pexels","url":"https://"},{"id":"cQvhvLEzJtfAwKKg","label":"translate","url":"https://simplytranslate.org/"}]}]

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
