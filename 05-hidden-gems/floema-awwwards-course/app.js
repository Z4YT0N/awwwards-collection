require('dotenv').config()

const logger = require('morgan')
const express = require('express')
const errorHandler = require('errorhandler')
const methodOverride = require('method-override')
const path = require('path')

const app = express()
const PORT = 3000

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride())
app.use(errorHandler())
app.use(express.static(path.join(__dirname, 'public')))

const Prismic = require('@prismicio/client')
const PrismicDOM = require('prismic-dom')
const UAParser = require('ua-parser-js')

const initApi = (req) => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req: req
  });
}

const handleLinkResolver = (doc) => {
  if (doc.type === 'product') {
    return `/detail/${doc.slug}`
  } else if (doc.type === 'about') {
    return '/about'
  } else if (doc.type === 'collections' || doc === 'Collection') {
    return '/collections'
  }

  return '/'
}


app.use((req, res, next) => {
  const ua = UAParser(req.headers['user-agent'])

  res.locals.isDesktop = ua.device.type === undefined
  res.locals.isPhone = ua.device.type === 'mobile'
  res.locals.isTablet = ua.device.type === 'tablet'

  res.locals.Link = handleLinkResolver

  res.locals.PrismicDOM = PrismicDOM

  res.locals.ParseToNumbers = index => {
    return index === 0 ? 'One' : index === 1 ? 'Two' : index === 2 ? 'Three' : index === 3 ? 'Four' : ''
  }

  next();
})

app.engine('pug', require('pug').__express)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


const handleRequest = async api => {
  const about = await api.getSingle('about')
  const home = await api.getSingle('h')
  const meta = await api.getSingle('metadata')
  const navigation = await api.getSingle('navigation')
  const preloader = await api.getSingle('preloader')
  const { results: collections } = await api.query(Prismic.Predicates.at('document.type', 'collection'), {
    fetchLinks: 'product.image'
  })

  let assets = []

  about.data.gallery.forEach(item => {
    assets.push(item.image.url)
  })

  about.data.body.forEach(section => {
    if (section.slice_type === 'gallery') {
      section.items.forEach(item => {
        assets.push(item.image.url)
      })
    }
  })

  collections.forEach(collection => {
    collection.data.products.forEach(item => {
      assets.push(item.products_product.data.image.url)
    })
  })

  home.data.gallery.forEach(item => {
    assets.push(item.image.url)
  })

  return {
    assets,
    about,
    collections,
    home,
    meta,
    navigation,
    preloader,
  }
}

app.get('/', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('pages/home', {
    ...defaults
  })
})

app.get('/about', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('pages/about', {
    ...defaults,
  })
})

app.get('/collections', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('pages/collections', {
    ...defaults,
  })
})

app.get('/detail/:uid', async (req, res) => {
  const uid = req.params.uid

  const api = await initApi(req)
  const defaults = await handleRequest(api)
  const product = await api.getByUID('product', uid, {
    fetchLinks: 'collection.title'
  })


  res.render('pages/detail', {
    ...defaults,
    product
  })
})


app.listen(process.env.PORT || PORT,  () => {
  console.log(`App listening to port ${process.env.PORT || PORT} 🚀`)
})
