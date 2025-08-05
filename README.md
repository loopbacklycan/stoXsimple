# stoXsimple

**stoXsimple** is a lightweight, privacy-focused, self-hosted web app for viewing multiple stock candlestick charts easily.  
Built with simplicity and transparency in mind, it lets you track your favorite tickers without relying on third-party hosted services.

![stoXsimple Screenshot](https://github.com/0wardriver0/stoXsimple/blob/main/image.png)

## Features

- Multi-ticker candlestick charts with historical market data
- Clean, minimal UI with no tracking or analytics
- Uses a CORS proxy only when fetching market data for smooth privacy
- Easy to customize and extend — perfect for traders, researchers, and developers
- No accounts, no ads, no backend server required

## Tech Stack

- HTML, CSS, and JavaScript frontend
- Chart.js with financial chart plugin for candlestick rendering
- Fetches market data via Yahoo Finance (using a CORS proxy)

### Requirements

- node.js 
- npm/npx

## Getting Started

### How to Run Locally

You just need to serve the files on any static file server:

1. Clone or download the repository:

   ```bash
   git clone https://github.com/0wardriver0/stoXsimple.git
   cd stoXsimple
   
   npx serve
