# habit

Тестовое задание для KeyHabit

## DB carsdb (PostgreSQL)

sudo -u postgres psql
-- Создание пользователя
CREATE USER carry WITH PASSWORD 'carry';

-- Создание базы данных
CREATE DATABASE cardb
WITH
OWNER = carry
ENCODING = 'UTF8'
LC_COLLATE = 'en_US.UTF-8'
LC_CTYPE = 'en_US.UTF-8'
TEMPLATE = template0;

-- Подключение к базе данных
\c cardb

-- Предоставление прав
GRANT ALL ON SCHEMA public TO carry;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO carry;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO carry;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO carry;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO carry;


## Стиль создания
### Back
В силу простоты приложения принято решение не создавать классический MVC,
а обойтись простым модулем совмещающим routings и запросы к БД.

По умолчанию `http://localhost:8084/`
```
npm run start: start
npm run dev: dev debug (nodemon)
npm run table:create: create table
npm run table:seed: table seed default
```
#### сборка:
Node v22.17.1
npm 10.9.2

### Front
В качестве основтого элемента отабражения таблицы сделан компонент `VueTable (c VueTableRow)`
В компонент добавлен `selectedCar` - как задел на будущее расширение
Модальная форма - `CarForm`. Позволяет вводить новый и изменять выбранный автомобиль.

По умолчанию `http://localhost:8085/`

```
npm run:
serve: start,
build: build,
dev: vevelopment for port 8085
```
#### сборка:
Vue: 2.7.14
