<p align="center">
  <img src="https://user-images.githubusercontent.com/114783191/219676457-1e972ab3-839f-4d70-9139-edddb4f95497.png">
</p>

WeFlixx is a website to watch HD movies online with friends for free - Here, you can watch all your favorite movies and TV shows totally free with our super fast server. Plus, you can create private rooms to watch movies with friends while you chat live. We also provide live info from TMDB so you can stay up-to-date on the latest releases and with our user profiles, you can track your watch history and review your favorite movies. 

So what are you waiting for? Sign up now and start streaming!

## Overview

- Official website 👉 https://weflixx.com

## Preview
<p>Detailed home page with tmdb popular api showcasing trending movies with react swiper scroller. Movie covers are from loklok api.</p> 
<img width="1313" alt="Screen Shot 2023-02-17 at 8 17 24 AM" src="https://user-images.githubusercontent.com/114783191/219663021-e941faba-3074-4f11-a9ea-78aeac1e5d4a.png">
<p></p>

## News
<p>News api pull info directly from LokLok api and showcases rich details about movies and tvshows.</p>
<img width="1044" alt="Screen Shot 2023-02-17 at 8 06 00 AM" src="https://user-images.githubusercontent.com/114783191/219661843-8a56cb45-ecc6-445b-b87c-a14454a804f3.png">
<p></p>

## Explore
<p>Explore allows users to search with multiple filter options</p>
<img width="1041" alt="Screen Shot 2023-02-17 at 8 06 48 AM" src="https://user-images.githubusercontent.com/114783191/219661847-62109dad-04b1-447c-b813-8070777cf191.png">
<p></p>

## Watch history
<p>Watch history allows users easy access to rewatch their favorite movies or tvshows.</p>
<img width="1044" alt="Screen Shot 2023-02-17 at 8 06 25 AM" src="https://user-images.githubusercontent.com/114783191/219661854-e6c7ec6c-533e-458d-a67e-527d5b61e783.png">
<p></p>

## Rooms
<p>Rooms allows users to create a room select a movie or tv show and invite friends by sending them a link. The creator will control the movie or tvshow and everyone in the room will see it on their screen. The room will also host a live chat so users can talk while the movie or show is playing. The room automatically gets deleted after 5 hours.</p>
<img width="1360" alt="Screen Shot 2023-02-17 at 8 11 04 AM" src="https://user-images.githubusercontent.com/114783191/219661865-0559b573-f05c-4441-8344-bebe7db6dbf8.png">
<img width="1341" alt="Screen Shot 2023-02-17 at 9 31 05 AM" src="https://user-images.githubusercontent.com/114783191/219682978-241e6845-ae08-4536-853c-f5755dbafefa.png">

## Profile
<img width="1329" alt="Screen Shot 2023-02-17 at 8 10 23 AM" src="https://user-images.githubusercontent.com/114783191/219661878-4eea91f0-de58-408b-b600-db6fbed60e78.png">


## Resources

- API: https://documenter.getpostman.com/view/18986031/UVXdNeFD?fbclid=IwAR3XYwO8C563AuepUFWNFDs9iJzc3jfTWybQRWUekZX4PNWeiGBum_CiRKk
- Font Family: Montserrat

## Main technology used

- NextJS, Typescript
- TMDB api
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
- Create a room to watch movie with your friends and control the movie while everyone watches
- Live chat when watching movies with friends
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
