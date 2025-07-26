# Setup Guide

## Installed Packages

✅ **Tailwind CSS** - Utility-first CSS framework
✅ **Pinia** - State management for Vue
✅ **Supabase** - Backend as a Service
✅ **Google Fonts** - Web font optimization

## Configuration

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

# Optional: Google Fonts API Key (if needed)
GOOGLE_FONTS_API_KEY=your_google_fonts_api_key
```

### 2. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your project URL and anon key from the project settings
3. Add them to your `.env` file

### 3. Google Fonts

The Google Fonts module is configured to use:
- Inter (300, 400, 500, 600, 700)
- Poppins (300, 400, 500, 600, 700)
- Roboto (300, 400, 500, 700)

You can use these fonts in your CSS with:
```css
font-family: 'Inter', sans-serif;
font-family: 'Poppins', sans-serif;
font-family: 'Roboto', sans-serif;
```

### 4. Tailwind CSS

Tailwind is configured with:
- Custom color palette (primary colors)
- Custom font families
- All standard Tailwind utilities

### 5. Pinia Store

A sample todo store is created at `stores/index.ts` with:
- Add todo
- Toggle todo completion
- Remove todo
- Clear completed todos
- Getters for filtered todos

## Usage

### Start Development Server
```bash
pnpm run dev
```

### Build for Production
```bash
pnpm run build
```

### Generate Static Site
```bash
pnpm run generate
``` 