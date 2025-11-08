# Movie-Searcher

This is a movie search application built with Angular. It uses the public API from The Movie Database (TMDb) to search and display movie information.

## Features
- Search for movies by title
- View movie details (poster, year, runtime, etc.)
- Modern UI powered by Taiga UI

## How to Run

### 1. Locally (Development)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open your browser and go to [http://localhost:4200](http://localhost:4200)

### 2. In Docker

1. Build the Docker image:
   ```bash
   docker build -t movie-searcher .
   ```
2. Run the container:
   ```bash
   docker run -p 8080:80 movie-searcher
   ```
3. Open your browser and go to [http://localhost:8080](http://localhost:8080)

## Testing

To run unit tests:
```bash
npm test
```

## Environment Variables

To use the TMDb API, create a `.env` file (if needed) and add your API key:
```
TMDB_API_KEY=your_key_here
```

## Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [TMDb API Documentation](https://developer.themoviedb.org/docs)

---

The application is ready to run and use for movie searching!
