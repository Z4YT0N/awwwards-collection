require('dotenv').config()

const logger = require('morgan')
const express = require('express')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const find = require('lodash/find')

const app = express()
const path = require('path')
const port = 3000

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride())
app.use(errorHandler())
app.use(express.static(path.join(__dirname, 'public')))

const Prismic = require('@prismicio/client')
const PrismicDOM = require('prismic-dom')
const UAParser = require('ua-parser-js')

const initApi = req => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req
  })
}

const handleLinkResolver = doc => {
  if (doc.type === 'product') {
    return `/detail/${doc.uid}`
  }

  if (doc.type === 'collections') {
    return '/collections'
  }

  if (doc.type === 'about') {
    return '/about'
  }

  return '/'
}

app.use((req, res, next) => {
  const ua = UAParser(req.headers['user-agent'])

  res.locals.isDesktop = ua.device.type === undefined
  res.locals.isPhone = ua.device.type === 'mobile'
  res.locals.isTablet = ua.device.type === 'tablet'

  res.locals.Link = handleLinkResolver

  res.locals.Numbers = index => {
    return index == 0 ? 'One' : index == 1 ? 'Two' : index == 2 ? 'Three' : index == 3 ? 'Four' : '';
  }

  res.locals.PrismicDOM = PrismicDOM

  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const handleRequest = async api => {
  const about = await api.getSingle('about')
  const home = await api.getSingle('home')
  const meta = await api.getSingle('meta')
  const navigation = await api.getSingle('navigation')
  const preloader = await api.getSingle('preloader')

  const { results: collectionsData } = await api.query(Prismic.Predicates.at('document.type', 'collection'), {
    fetchLinks: 'product.image, product.model'
  })

  const { results: productsData } = await api.query(Prismic.Predicates.at('document.type', 'product'), {
    fetchLinks: 'collection.title',
    pageSize: 100
  })

  const { data: { list: collectionsOrder } } = await api.getSingle('collections')

  const collections = collectionsOrder.map(({ collection }) => {
    const { uid } = collection
    const data = find(collectionsData, { uid })

    return data
  })

  const products = []

  collections.forEach(collection => {
    collection.data.products.forEach(({ products_product: { uid } }) => {
      products.push(find(productsData, { uid }))
    })
  })

  const assets = []

  home.data.gallery.forEach(item => {
    assets.push(item.image.url)
  })

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
      assets.push(item.products_product.data.model.url)
    })
  })

  return {
    about,
    assets,
    collections,
    home,
    meta,
    navigation,
    preloader,
    products
  }
}

app.get('/', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('base', {
    ...defaults
  })
})

app.get('/about', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('base', {
    ...defaults
  })
})

app.get('/collections', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('base', {
    ...defaults
  })
})

app.get('/detail/:uid', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('base', {
    ...defaults
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
