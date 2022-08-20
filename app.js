// Collapse Skills
const collapseSkills = new bootstrap.Collapse('#collapseSkills', {
    toggle: false
})

const expandSkillsBtn = document.getElementById('expandSkillsBtn')
const skillsTooltip = new bootstrap.Tooltip(expandSkillsBtn)

expandSkillsBtn.addEventListener('click', () => {
    const elem = document.getElementById('collapseSkills')
    const arrow = expandSkillsBtn.children[0]

    if (elem.classList.contains('show')) {
        collapseSkills.hide()
        arrow.classList.remove('down')
        arrow.classList.add('up')
        skillsTooltip.setContent({'.tooltip-inner': 'Show More'})
    } else {
        collapseSkills.show()
        arrow.classList.remove('up')
        arrow.classList.add('down')
        skillsTooltip.setContent({'.tooltip-inner': 'Show Less'})
    }
})


// Collapse Nav
const collapseNav = new bootstrap.Collapse('#collapseNav', {
  toggle: false
})

document.getElementById('expandNavBtn').addEventListener('click', () => {
  elem = document.getElementById('collapseNav')

  if (elem.classList.contains('show')) {
      collapseNav.hide()

      document.getElementById('body').style.height = 'calc(100% - 56px)'
  } else {
      collapseNav.show()
  }
})

document.getElementById('collapseNav').addEventListener('shown.bs.collapse', () => {
  document.getElementById('body').style.height = 'calc(100% - 296px)'
})

window.addEventListener('resize', () => {
  if (window.innerWidth > 992) {
    document.getElementById('body').style.height = 'calc(100% - 56px)'
  }
})

const emailLinks = document.querySelectorAll('.email-link')

emailLinks.forEach(emailLink => {
  const emailTooltip = new bootstrap.Tooltip(emailLink)

  emailLink.addEventListener('click', () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      if (document.querySelector('html').lang === 'en') {
        emailTooltip.setContent({'.tooltip-inner': 'Copied!'})
        setTimeout(() => {
          emailTooltip.hide()
          emailTooltip.setContent({'.tooltip-inner': 'Click to copy'})
        }, 1500)
      } else {
        emailTooltip.setContent({'.tooltip-inner': 'Skopiowano!'})
        setTimeout(() => {
          emailTooltip.hide()
          emailTooltip.setContent({'.tooltip-inner': 'Kliknij żeby skopiować'})
        }, 1500)
      }
      return navigator.clipboard.writeText('marcinrybok@protonmail.com');
    }
  
    return Promise.reject('The Clipboard API is not available.');
  })
  
})

// Carousels
const techsPerSlide = 3

function createTechElem(name) {
    const newElem = document.createElement('div')

    newElem.innerHTML = `
      <div class="d-flex justify-content-center">
        <div>
          <div class="d-flex justify-content-center mb-1">
              <img src="static/images/tech/${name.toLowerCase()}_logo.png" alt="">
          </div>
          <div class="d-flex justify-content-center">
              <h6>${name}</h6>
          </div>
        </div>
      </div>
    `

    newElem.classList.add('col', 'tech')
    return newElem
}

const allTechs = {
    'dataScience': [
      true, 
      [
        'Python', 'NumPy', 'SciPy', 'pandas', 'sklearn', 'Jupyter', 'seaborn', 'Matplotlib',
      ]
    ],
    'webDev': [
      true,
      [
        'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'Materialize', 'React', 'DataTables', 'Flask', 
        'Spring'
      ]
    ],
    'other': [
        true, 
        [
          'MATLAB', 'Java', 'Haskell', 'Scala', 'Golang', 'C',
        ]
    ],
}

function animateCarousel(first, last, i, direction, key) {
    if (direction === 'next') {
      first.style.marginLeft = `${90-i}px`
      last.style.marginRight = `${i}px`

    } else if (direction === 'prev') {
      first.style.marginLeft = `${i}px`
      last.style.marginRight = `${90-i}px`
    }
  
    if (i < 90) {
      setTimeout(() => {animateCarousel(first, last, i+1, direction, key)}, 600 / 90)
    } else {
      let next = null
  
      if (direction === 'next') {
        next = last.parentElement.nextElementSibling
  
        if (!next) {
          next = document.querySelector(`#${key}Carousel .carousel-item`)
        }
      } else if (direction === 'prev') {
        next = last.parentElement.previousElementSibling
  
        if (!next) {
          next = document.querySelectorAll(`#${key}Carousel .carousel-item`)
          next = next[next.length-1]
        }
      }
  
      last.parentElement.classList.remove('active')
      next.classList.add('active')

      first.style.marginLeft = '0px'
      last.style.marginRight = '0px'
      allTechs[key][0] = true
    }
  }
  
Object.entries(allTechs).forEach(item => {
    const key = item[0]
    const techs = item[1][1]
    const carousel = document.querySelector(`#${key}Carousel .carousel-inner`)

    for (let i = 0; i < techs.length; i++) {
        const carouselItem1 = document.createElement('div')
        const carouselItem2 = document.createElement('div')

        carouselItem1.classList.add('carousel-item')
        carouselItem2.classList.add('carousel-item')
        carouselItem1.classList.add('justify-content-center')
        carouselItem2.classList.add('justify-content-center')
      
        for (let j = 0; j < techsPerSlide + 1; j++) {
          const idx = (i + j) % techs.length
      
          if (j < techsPerSlide) {
            carouselItem1.appendChild(createTechElem(techs[idx]))
          }

          carouselItem2.appendChild(createTechElem(techs[idx]))
        }
      
        carousel.appendChild(carouselItem1)
        carousel.appendChild(carouselItem2)
    }

    carousel.children[0].classList.add('active')

    document.querySelector(`#${key}Next`).addEventListener('click', () => {
        if (allTechs[key][0]) {
          const current = document.querySelector(`#${key}Carousel .carousel-item.active`)
          let next = current.nextElementSibling
      
          if (!next) {
            next = document.querySelector(`#${key}Carousel .carousel-item`)
          }
      
          current.classList.remove('active')
          next.classList.add('active')
      
          const firstTech = next.children[0]
          const lastTech = next.children[next.children.length-1]
          allTechs[key][0] = false
      
          animateCarousel(firstTech, lastTech, 0, 'next', key)
        }
    })

    document.querySelector(`#${key}Prev`).addEventListener('click', () => {
        if (allTechs[key][0]) {
          const current = document.querySelector(`#${key}Carousel .carousel-item.active`)
          let prev = current.previousElementSibling
      
          if (!prev) {
            prev = document.querySelectorAll(`#${key}Carousel .carousel-item`)
            prev = prev[prev.length-1]
          }
      
          current.classList.remove('active')
          prev.classList.add('active')
      
          const firstTech = prev.children[0]
          const lastTech = prev.children[prev.children.length-1]
          allTechs[key][0] = false
      
          animateCarousel(firstTech, lastTech, 0, 'prev', key)
        }
    })
})

// Animate profile image border
const borderSpeed = 3

function animateCircle(i) {
  const masks = document.querySelectorAll('.mask-1')

  if (i < 360) {
    masks.forEach(mask => {
      mask.style.backgroundImage = `conic-gradient(transparent 0deg, transparent ${i}deg, #0F1D32 ${i}deg, #0F1D32 360deg)`
    })
    
    setTimeout(() => {
      animateCircle(i+borderSpeed)
    }, 1)
  } else {
    masks.forEach(mask => {
      mask.style.backgroundImage = `conic-gradient(transparent 0deg, transparent 360deg)`
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  animateCircle(0)
})