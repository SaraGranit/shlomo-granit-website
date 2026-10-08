(function () {
  var menuButton = document.querySelector('.menu-toggle')
  var mainNav = document.querySelector('#main-nav')
  if (!menuButton || !mainNav) return

  function setMenu(open) {
    menuButton.setAttribute('aria-expanded', String(open))
    menuButton.setAttribute('aria-label', open ? 'סגירת תפריט' : 'פתיחת תפריט')
    mainNav.classList.toggle('is-open', open)
  }

  menuButton.addEventListener('click', function () {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true')
  })
  mainNav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setMenu(false)
  })
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false)
      menuButton.focus()
    }
  })
  window.matchMedia('(min-width: 1081px)').addEventListener('change', function () { setMenu(false) })
})()
