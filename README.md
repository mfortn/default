cd <Project>
git clone https://github.com/mfortn/default.git new

MOVE FILES TO `default/`
rm -rf new

sudo chown -R mfortn:mfortn /home/mfortn/workspace/<Project>

.env (api/)
APP_URL=http://localhost:8081
FRONTEND_URL=http://localhost:5173
SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=localhost:5173

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=<Project>_db
DB_USERNAME=root
DB_PASSWORD=<Project>_root
