# WeFlixx

A website to watch HD movies online with friends for free - Here you can watch thousands of movies and TV shows built using NextJS.

## Overview

- Official website: https://weflixx.com

## Preview

<img width="926" alt="Screen Shot 2023-02-16 at 9 35 18 PM" src="https://user-images.githubusercontent.com/114783191/219535181-9f4e6a3a-5ea5-4496-aaa9-7f86365f4d24.png">


## Resources

- API: https://documenter.getpostman.com/view/18986031/UVXdNeFD?fbclid=IwAR3XYwO8C563AuepUFWNFDs9iJzc3jfTWybQRWUekZX4PNWeiGBum_CiRKk
- Font Family: Montserrat

## Main technology used

- NextJS, Typescript
- Sass module
- Firebase
- Redux, Redux toolkit (State management)
- Axios, Swr (Support fetching data)
- Swiper (Slider), react-modal (Modal)
- React-toastify, react-hot-toast (Message UI)
- Next-swagger-doc, swagger-ui-react (Document API)
- Cheerio (Crawl data from website Loklok)
- react-hls-player (Media player video m3u8)
- Other: query-string, uuidv4, ...

## Features

- Full HD movies with subtitles in many languages
- Suggested movies you may like
- Skeleton loading, infinite scrolling movie at Home page and Explore page
- Search movie by name, with suggestion keywords, filter movie by type (category, area, year,...)
- Profile page: allowing to change profile photo avatar, fullname, password.
- Comment: allowing to give reactions, see who reacts to a comment, edit and delete comment.
- Discovery movie trailer (Short videos like TikTok)
- Save history you watch, follow movie you like
- View information of the actors in the movie
- Read latest breaking movie news
- Optimize SEO and Responsive on many devices

## Environment Variables

```
NEXT_PUBLIC_NODE_ENV = development
  (development if run at localhost or production if deploy to vercel)
NEXT_PUBLIC_BASE_URL_API = https://ga-mobile-api.loklok.tv/cms/app
NEXT_PUBLIC_BASE_URL_API_SUB = https://mobile-api.netpop.app/cms/web/pc
NEXT_PUBLIC_VERCEL = (Your link vercel)
NEXT_PUBLIC_LOCALHOST = http://localhost:3002

# See: https://firebase.google.com
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

## Deployment

- Create a new project on the vercel dashboard -> Add Environment Variables from .env.example
- Redeploy the project
