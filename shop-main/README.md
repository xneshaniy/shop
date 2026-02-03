# Zaicomai Shop

Initial setup and usage for the Laravel + Inertia (React) shop.

## Prerequisites
- PHP >= 8.2 with required extensions (mbstring, openssl, pdo, gd, fileinfo, etc.)
- Composer
- Node.js >= 20 and pnpm (recommended)
- SQLite/MySQL/PostgreSQL (any DB supported by Laravel)

## Install prerequisites (Composer, Node.js, XAMPP)

- Linux (Ubuntu/Debian):
  ```bash
  # Composer
  sudo apt update && sudo apt install -y curl unzip git php-cli
  php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
  php composer-setup.php --install-dir=/usr/local/bin --filename=composer
  rm composer-setup.php

  # Node.js via nvm (recommended)
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
  nvm install 20
  corepack enable  # enables pnpm

  # XAMPP (optional; includes Apache, MySQL, PHP)
  # Download the Linux installer from the official page and run it:
  # https://www.apachefriends.org/download.html
  ```
- Windows/macOS:
  - Composer: [Composer downloads](https://getcomposer.org/download/)
  - Node.js: [Node.js downloads](https://nodejs.org/en/download) (install Node 20+), then enable pnpm with `corepack enable`
  - XAMPP (optional): [XAMPP downloads](https://www.apachefriends.org/download.html)

## Quick Start
```bash
# 1) Install PHP dependencies
composer install

# 2) Install Node dependencies (uses pnpm; use npm/yarn if you prefer)
pnpm install

# 3) Create environment file
cp .env.example .env

# 4) Generate app key
php artisan key:generate

# 5) Configure your database in .env, then run migrations
php artisan migrate

# 6) Link storage for media
php artisan storage:link

# 7) Start the development environment (PHP server, queue, logs, Vite)
composer dev
```

The app will serve at `http://127.0.0.1:8000` by default. Vite dev server runs on `http://127.0.0.1:5173`.

## Environment
Update these keys in `.env` at minimum:
- `APP_NAME`, `APP_URL`
- `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
- `MAIL_*` (if sending emails)

SQLite quick config (optional):
```bash
touch database/database.sqlite
sed -i 's/DB_CONNECTION=.*/DB_CONNECTION=sqlite/' .env
```

## Building for Production
```bash
# Build assets
pnpm run build

# Cache config/routes/views for performance (optional)
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Serve your Laravel app with your preferred web server (Nginx/Apache) or `php artisan serve`.

## Optional: Server‑Side Rendering (SSR)
```bash
# Build SSR bundle and run dev with SSR service
composer run dev:ssr
```

## Running Tests
```bash
composer test
```

## Common Commands
- Start only Vite: `pnpm run dev`
- Start only PHP server: `php artisan serve`
- Queue worker (if not using `composer dev`): `php artisan queue:listen --tries=1`
- Lint/format frontend: `pnpm run lint`, `pnpm run format`

## Notes
- Media uploads rely on `storage:link`.
- Seeds: add or adjust `DatabaseSeeder` as needed, then run `php artisan db:seed`.
