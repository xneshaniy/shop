@echo off
echo Deploying Zaicomai Shop to StackCP...

REM Build frontend assets
echo Building frontend assets...
pnpm install
pnpm run build

REM Create .env file for production
echo Creating production .env file...
(
echo APP_NAME="Zaicomai Shop"
echo APP_ENV=production
echo APP_KEY=
echo APP_DEBUG=false
echo APP_URL=https://shop.zaicomai.com
echo.
echo LOG_CHANNEL=stack
echo LOG_DEPRECATIONS_CHANNEL=null
echo LOG_LEVEL=debug
echo.
echo DB_CONNECTION=mysql
echo DB_HOST=sdb-87.hosting.stackcp.net
echo DB_PORT=3306
echo DB_DATABASE=shop-3531313726a1-353131332e58
echo DB_USERNAME=shop-acd2
echo DB_PASSWORD=ZxcvbnM!750
echo.
echo BROADCAST_DRIVER=log
echo CACHE_DRIVER=file
echo FILESYSTEM_DISK=local
echo QUEUE_CONNECTION=database
echo SESSION_DRIVER=file
echo SESSION_LIFETIME=120
echo.
echo MEMCACHED_HOST=127.0.0.1
echo.
echo REDIS_HOST=127.0.0.1
echo REDIS_PASSWORD=null
echo REDIS_PORT=6379
echo.
echo MAIL_MAILER=smtp
echo MAIL_HOST=mailpit
echo MAIL_PORT=1025
echo MAIL_USERNAME=null
echo MAIL_PASSWORD=null
echo MAIL_ENCRYPTION=null
echo MAIL_FROM_ADDRESS="hello@zaicomai.com"
echo MAIL_FROM_NAME="${APP_NAME}"
echo.
echo AWS_ACCESS_KEY_ID=
echo AWS_SECRET_ACCESS_KEY=
echo AWS_DEFAULT_REGION=us-east-1
echo AWS_BUCKET=
echo AWS_USE_PATH_STYLE_ENDPOINT=false
echo.
echo PUSHER_APP_ID=
echo PUSHER_APP_KEY=
echo PUSHER_APP_SECRET=
echo PUSHER_HOST=
echo PUSHER_PORT=443
echo PUSHER_SCHEME=https
echo PUSHER_APP_CLUSTER=mt1
echo.
echo VITE_APP_NAME="${APP_NAME}"
) > .env

echo.
echo Uploading files to StackCP...
scp -r ./ shop.zaicomai.com@ssh.gb.stackcp.com:/home/sites/1b/6/61a30ca205/public_html/shop/

echo.
echo Setting up document root structure...
ssh shop.zaicomai.com@ssh.gb.stackcp.com "
cd /home/sites/1b/6/61a30ca205/public_html/shop &&
echo 'Moving Laravel files to correct structure...' &&
if [ -f public/index.php ]; then
    echo 'Laravel structure detected - setting up document root...' &&
    cp -r public/* /home/sites/1b/6/61a30ca205/public_html/shop/ &&
    cp public/.htaccess /home/sites/1b/6/61a30ca205/public_html/shop/ 2>/dev/null || echo 'No .htaccess in public folder' &&
    echo 'Document root setup complete'
else
    echo 'Standard Laravel structure - files should be in public_html/shop root'
fi
"

echo.
echo Setting up on server...
ssh shop.zaicomai.com@ssh.gb.stackcp.com "
mkdir -p /home/sites/1b/6/61a30ca205/public_html/shop &&
cd /home/sites/1b/6/61a30ca205/public_html/shop &&

echo 'Installing dependencies...' &&
composer install --no-dev --optimize-autoloader &&

echo 'Generating application key...' &&
php artisan key:generate --ansi &&

echo 'Running database migrations...' &&
php artisan migrate --force &&

echo 'Creating storage link...' &&
php artisan storage:link &&

echo 'Setting proper file permissions...' &&
chmod -R 755 storage bootstrap/cache &&
chmod -R 644 public/*.php &&
chmod 644 public/.htaccess &&
chmod 644 .env &&

echo 'Clearing and caching configurations...' &&
php artisan config:clear &&
php artisan route:clear &&
php artisan view:clear &&
php artisan cache:clear &&
php artisan config:cache &&
php artisan route:cache &&
php artisan view:cache &&

echo 'Optimizing application...' &&
php artisan optimize &&

echo 'Checking for maintenance mode...' &&
php artisan up &&

echo 'Verifying .htaccess exists...' &&
if [ ! -f public/.htaccess ]; then echo 'WARNING: .htaccess file missing!'; fi &&

echo 'Checking error logs...' &&
tail -n 20 /home/sites/1b/6/61a30ca205/logs/error.log 2>/dev/null || echo 'No error logs found' &&

echo 'Validating environment configuration...' &&
if [ -f .env ]; then
    echo 'Environment file exists' &&
    grep -q 'APP_URL=https://shop.zaicomai.com' .env && echo 'APP_URL correctly set' || echo 'WARNING: APP_URL may not be correct'
else
    echo 'ERROR: .env file not found!'
fi &&

echo 'Checking SSL/HTTPS configuration...' &&
echo 'Make sure SSL certificate is properly configured in StackCP control panel' &&

echo 'Server setup complete!'
"

echo.
echo Deployment complete! Your shop is live at: https://shop.zaicomai.com
pause
