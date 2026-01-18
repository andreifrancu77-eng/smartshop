# Documentație Arhitectură SmartShop

## Cuprins
1. [Prezentare Generală](#prezentare-generala)
2. [Arhitectura Sistemului](#arhitectura-sistemului)
3. [Tehnologii Utilizate](#tehnologii-utilizate)
4. [Fluxul de Date](#fluxul-de-date)
5. [Schema Bazei de Date](#schema-bazei-de-date)
6. [Structura API](#structura-api)
7. [Autentificare și Autorizare](#autentificare-si-autorizare)
8. [Integrare Plăți](#integrare-plati)
9. [Sistem Email](#sistem-email)
10. [Deployment](#deployment)

---

## Prezentare Generală

SmartShop este o platformă modernă de e-commerce specializată în smartphone-uri și electronice. Aplicația urmează un **model de arhitectură în trei nivele**:

- **Frontend**: Aplicație Next.js React (Vercel)
- **Backend**: API REST Spring Boot (Fly.io)
- **Baza de Date**: PostgreSQL (Fly.io Managed PostgreSQL)

Aplicația oferă o experiență completă de cumpărături, inclusiv navigarea produselor, autentificarea utilizatorilor, coșul de cumpărături, checkout-ul cu procesare de plăți și gestionarea comenzilor.

---

## Arhitectura Sistemului

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                          │
│                      (Next.js Frontend)                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                 │
│  │   Pages    │  │ Components │  │   API      │                 │
│  │            │  │            │  │   Client   │                 │
│  └────────────┘  └────────────┘  └────────────┘                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS/REST API
                              │ JWT Bearer Token
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND API (Spring Boot)                    │
│                      (Fly.io Deployment)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Controllers  │  │   Services   │  │ Repositories │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Security     │  │    JWT       │  │   Stripe     │           │
│  │   Config     │  │  Service     │  │   Service    │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│  ┌──────────────┐                                               │
│  │   Email      │                                               │
│  │   Service    │                                               │
│  └──────────────┘                                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ JDBC
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                          │
│                  (Fly.io Managed PostgreSQL)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   Users      │  │   Products   │  │    Orders    │           │
│  │   Categories │  │    Brands    │  │  OrderItems  │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Tehnologii Utilizate

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Limbaj**: TypeScript
- **Stilizare**: Tailwind CSS
- **Animații**: Framer Motion
- **Management Stare**: React Context API
- **Client HTTP**: Native Fetch API
- **Plăți**: Stripe.js / React Stripe.js
- **Optimizare Imagini**: Componenta Next.js Image

### Backend
- **Framework**: Spring Boot 3.5.6
- **Limbaj**: Java 21
- **Securitate**: Spring Security cu JWT
- **ORM**: Spring Data JPA / Hibernate
- **Baza de Date**: PostgreSQL
- **Procesare Plăți**: Stripe Java SDK
- **Email**: Spring Mail (JavaMailSender) cu Yahoo Mail SMTP
- **Documentație API**: SpringDoc OpenAPI (Swagger)
- **Tool Build**: Maven

### Infrastructură
- **Hosting Frontend**: Vercel
- **Hosting Backend**: Fly.io
- **Baza de Date**: Fly.io Managed PostgreSQL
- **Containerizare**: Docker
- **Variabile de Mediu**: dotenv-java (backend), Next.js .env (frontend)

---

## Fluxul de Date

### 1. Fluxul de Înregistrare Utilizator
```
Utilizator → Frontend (Formular Înregistrare) 
  → POST /api/auth/register
  → Backend (AuthenticationService.register())
  → Criptare Parolă (BCrypt)
  → Baza de Date (Utilizator salvat)
  → Generare Token JWT
  → Frontend (Token stocat în localStorage)
  → Utilizator autentificat
```

### 2. Fluxul de Autentificare Utilizator
```
Utilizator → Frontend (Formular Login)
  → POST /api/auth/authenticate
  → Backend (AuthenticationService.authenticate())
  → Baza de Date (Validare utilizator)
  → Verificare Parolă (BCrypt)
  → Generare Token JWT
  → Frontend (Token stocat în localStorage)
  → Utilizator autentificat
```

### 3. Fluxul de Navigare Produse
```
Utilizator → Frontend (Pagina Listă Produse)
  → GET /api/products
  → Backend (ProductController.getAllProducts())
  → Baza de Date (ProductRepository.findAll())
  → Produse returnate cu Categorii & Brand-uri
  → Frontend (Afișare produse cu imagini)
```

### 4. Fluxul Coș de Cumpărături
```
Utilizator → Frontend (Adaugă în Coș)
  → Stare Locală (Produse din coș stocate în React Context)
  → Fără apel backend (doar client-side)
  → Coș persistent în localStorage
```

### 5. Fluxul Checkout și Plată
```
Utilizator → Frontend (Formular Checkout - Info Livrare)
  → POST /api/payments/create-payment-intent
  → Backend (StripeService.createPaymentIntent())
  → Stripe API (PaymentIntent creat)
  → Frontend (Stripe.js - Formular Plată)
  → Utilizator completează plata
  → Stripe procesează plata
  → POST /api/orders (cu token JWT)
  → Backend (OrderService.createOrder())
  → Baza de Date (Comandă & Articole Comandă salvate)
  → EmailService.sendOrderConfirmationEmail()
  → EmailService.sendAdminNotificationEmail()
  → Frontend (Redirecționare către pagina de succes)
```

### 6. Fluxul Gestionare Comenzi
```
Utilizator → Frontend (Pagina Mele Comenzi)
  → GET /api/orders (cu token JWT)
  → Backend (JwtAuthenticationFilter validează token)
  → OrderController.getMyOrders()
  → Baza de Date (Comenzi filtrate după utilizator)
  → Frontend (Afișare comenzi)
```

---

## Schema Bazei de Date

### Relații între Entități
```
User (1) ────< (N) Order
                  │
                  └───< (N) OrderItem >─── (1) Product
                                              │
                                              ├─── (N) Category
                                              └─── (N) Brand
                                                      │
                                                      └─── (1) ProductSpecification
```

### Entități Principale

#### User (Utilizator)
- **id**: Cheie Primară (Long)
- **email**: Unic, obligatoriu (String)
- **password**: Criptat cu BCrypt (String)
- **firstName**: Opțional (String)
- **lastName**: Opțional (String)
- **role**: Enum (USER, ADMIN)
- **Relații**: One-to-Many cu Order

#### Product (Produs)
- **id**: Cheie Primară (Long)
- **name**: Obligatoriu (String)
- **description**: Text (String)
- **price**: BigDecimal
- **stock**: Integer
- **imageUrl**: String
- **category**: Many-to-One cu Category
- **brand**: Many-to-One cu Brand
- **specification**: One-to-One cu ProductSpecification

#### Category (Categorie)
- **id**: Cheie Primară (Long)
- **name**: Unic, obligatoriu (String)
- **description**: Text (String)
- **iconName**: String
- **Relații**: One-to-Many cu Product

#### Brand (Marca)
- **id**: Cheie Primară (Long)
- **name**: Unic, obligatoriu (String)
- **description**: Text (String)
- **Relații**: One-to-Many cu Product

#### Order (Comandă)
- **id**: Cheie Primară (Long)
- **user**: Many-to-One cu User
- **orderCode**: Unic (String, format: ORD-YYYYMMDD-NNNN)
- **total**: BigDecimal
- **status**: Enum (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- **deliveryName**: String
- **deliveryEmail**: String
- **deliveryPhone**: String
- **deliveryAddress**: String
- **deliveryCity**: String
- **deliveryCounty**: String
- **deliveryPostalCode**: String
- **deliveryCountry**: String
- **deliveryNotes**: String
- **createdAt**: LocalDateTime
- **Relații**: One-to-Many cu OrderItem

#### OrderItem (Articol Comandă)
- **id**: Cheie Primară (Long)
- **order**: Many-to-One cu Order
- **product**: Many-to-One cu Product
- **quantity**: Integer
- **price**: BigDecimal (snapshot al prețului produsului la momentul comenzii)

---

## Structura API

### URL de Bază
- **Production**: `https://smartshop-backend.fly.dev/api`
- **Dezvoltare Locală**: `http://localhost:8080/api`

### Endpoint-uri API

#### Autentificare (`/api/auth`)
- `POST /api/auth/register` - Înregistrare utilizator nou (Public)
- `POST /api/auth/authenticate` - Autentificare utilizator (Public)

#### Produse (`/api/products`)
- `GET /api/products` - Obține toate produsele (Public)
- `GET /api/products/{id}` - Obține produs după ID (Public)
- `GET /api/products/category/{categoryId}` - Obține produse după categorie (Public)
- `GET /api/products/brand/{brandId}` - Obține produse după brand (Public)
- `GET /api/products/search?q={query}` - Caută produse (Public)
- `POST /api/products` - Creează produs (Autentificat)
- `PUT /api/products/{id}` - Actualizează produs (Autentificat)
- `DELETE /api/products/{id}` - Șterge produs (Autentificat)

#### Categorii (`/api/categories`)
- `GET /api/categories` - Obține toate categoriile (Public)
- `GET /api/categories/{id}` - Obține categorie după ID (Public)
- `POST /api/categories` - Creează categorie (Autentificat)
- `PUT /api/categories/{id}` - Actualizează categorie (Autentificat)
- `DELETE /api/categories/{id}` - Șterge categorie (Autentificat)

#### Brand-uri (`/api/brands`)
- `GET /api/brands` - Obține toate brand-urile (Public)
- `GET /api/brands/{id}` - Obține brand după ID (Public)
- `POST /api/brands` - Creează brand (Autentificat)
- `PUT /api/brands/{id}` - Actualizează brand (Autentificat)
- `DELETE /api/brands/{id}` - Șterge brand (Autentificat)

#### Comenzi (`/api/orders`)
- `GET /api/orders` - Obține comenzile utilizatorului curent (Autentificat)
- `POST /api/orders` - Creează comandă nouă (Autentificat)
- `GET /api/orders/{id}` - Obține comandă după ID (Autentificat, doar proprietar)
- `GET /api/orders/code/{orderCode}` - Obține comandă după cod (Autentificat, doar proprietar)

#### Plăți (`/api/payments`)
- `POST /api/payments/create-payment-intent` - Creează intenție de plată Stripe (Public)
- `POST /api/payments/webhook` - Handler webhook Stripe (Public)
- `POST /api/payments/success` - Handler succes plată (Public)
- `POST /api/payments/failure` - Handler eșec plată (Public)

### Documentație API
- **Swagger UI**: `https://smartshop-backend.fly.dev/swagger-ui.html`
- **OpenAPI JSON**: `https://smartshop-backend.fly.dev/v3/api-docs`

---

## Autentificare și Autorizare

### Autentificare JWT (JSON Web Token)

1. **Generare Token**: După login/înregistrare reușit, backend-ul generează un token JWT care conține:
   - Email utilizator (subject)
   - Rol (authorities)
   - Timp expirare (24 ore)

2. **Stocare Token**: Frontend-ul stochează token-ul JWT în `localStorage` ca `token`

3. **Utilizare Token**: 
   - Frontend-ul include token-ul în header `Authorization: Bearer {token}` pentru endpoint-urile protejate
   - Backend-ul validează token-ul prin `JwtAuthenticationFilter`

4. **Flux Securitate**:
   ```
   Request → JwtAuthenticationFilter
            → Extrage token din header Authorization
            → Validează token (semnătură, expirare)
            → Încarcă UserDetails din baza de date
            → Setează Authentication în SecurityContext
            → Controller primește request autentificat
   ```

5. **Rute Protejate**: Toate endpoint-urile cu excepția `/api/auth/**`, `/api/products/**`, `/api/categories/**`, `/api/brands/**`, și `/api/payments/create-payment-intent` necesită autentificare.

---

## Integrare Plăți

### Flux Integrare Stripe

1. **Frontend**: Utilizatorul completează formularul de checkout cu informații de livrare
2. **Creare Payment Intent**:
   - Frontend-ul apelează `POST /api/payments/create-payment-intent` cu suma comenzii
   - Backend-ul creează PaymentIntent Stripe prin Stripe API
   - Backend-ul returnează `clientSecret` către frontend

3. **Procesare Plată**:
   - Frontend-ul folosește componenta Stripe.js `Elements` pentru formularul de plată
   - Utilizatorul introduce detaliile cardului
   - Stripe.js gestionează securizat datele cardului (conformitate PCI)
   - Plata este procesată prin Stripe API

4. **Creare Comandă**:
   - După plata reușită, frontend-ul apelează `POST /api/orders` cu detaliile comenzii
   - Backend-ul creează Order și OrderItems în baza de date
   - Email de confirmare trimis către client
   - Email de notificare trimis către admin

### Configurare Stripe
- **Mod Test**: Folosește chei Stripe de test (`pk_test_*`, `sk_test_*`)
- **Chei**: Stocate ca variabile de mediu (`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`)

---

## Sistem Email

### Configurare Email
- **Provider**: Yahoo Mail SMTP
- **Host**: `smtp.mail.yahoo.com`
- **Port**: `587` (STARTTLS)
- **Autentificare**: App Password (nu parola obișnuită)

### Tipuri Email

#### 1. Email Confirmare Comandă (către Client)
- **Trigger**: După crearea comenzii
- **Destinatar**: Email-ul de livrare al clientului
- **Conținut**: Detalii comandă, articole, total, adresă livrare

#### 2. Email Notificare Admin
- **Trigger**: După crearea comenzii
- **Destinatar**: Email admin (configurat în `ADMIN_EMAIL`)
- **Conținut**: Notificare comandă nouă cu detalii client și comandă

### Arhitectură Serviciu Email
```
OrderService.createOrder()
  → Comandă salvată în baza de date
  → EmailService.sendOrderConfirmationEmail() (try-catch, non-blocking)
  → EmailService.sendAdminNotificationEmail() (try-catch, non-blocking)
```

Eșecurile de email nu blochează crearea comenzii; erorile sunt logate dar comanda reușește oricum.

---

## Deployment

### Deployment Frontend (Vercel)
1. **Repository**: Conectat la GitHub
2. **Comandă Build**: `cd frontend && npm run build`
3. **Director Output**: `frontend/.next`
4. **Variabile de Mediu**:
   - `NEXT_PUBLIC_API_URL`: URL API backend
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Cheie publică Stripe

### Deployment Backend (Fly.io)
1. **Dockerfile**: Build multi-stage (Maven build + JRE runtime)
2. **Configurare**: `fly.toml` definește setările aplicației
3. **Baza de Date**: Fly.io Managed PostgreSQL atașată ca volum
4. **Variabile de Mediu** (Fly.io secrets):
   - `DATABASE_URL`: String conexiune PostgreSQL (auto-furnizat)
   - `STRIPE_SECRET_KEY`: Cheie secretă Stripe
   - `JWT_SECRET`: Cheie semnătură JWT
   - `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`: Configurare email
   - `ADMIN_EMAIL`: Email notificare admin

### Baza de Date (Fly.io Managed PostgreSQL)
- Atașată automat la aplicația backend
- String-ul de conexiune furnizat prin variabila de mediu `DATABASE_URL`
- Backend-ul parsează automat `DATABASE_URL` și îl convertește în format JDBC

---

## Pattern-uri de Design Principale

### Backend
- **Repository Pattern**: Abstraire acces date prin Spring Data JPA
- **Service Layer Pattern**: Logica de business separată de controllere
- **DTO Pattern**: Obiecte Transfer Date pentru request/response API
- **Filter Pattern**: Autentificare JWT prin Spring Security Filter

### Frontend
- **Context Pattern**: Management stare globală (AuthContext pentru autentificare)
- **Component Composition**: Componente UI reutilizabile
- **Custom Hooks**: Logica interacțiune API encapsulată în hook-uri
- **Server Components**: Componente Server Next.js pentru SSR

---

## Considerații Securitate

1. **Securitate Parolă**: Hash BCrypt cu forță 10
2. **Securitate JWT**: Token-uri semnate cu cheie secretă, expirare 24 ore
3. **CORS**: Configurat să permită doar origin-uri specifice (domenii Vercel)
4. **SQL Injection**: Prevenit prin interogări parametrizate JPA/Hibernate
5. **XSS**: Next.js scapă automat conținutul în JSX
6. **CSRF**: Dezactivat pentru API (folosind autentificare stateless JWT)
7. **Securitate Plăți**: Stripe.js gestionează conformitatea PCI, datele cardului nu ajung niciodată la backend

---

## Optimizări Performanță

### Frontend
- **Optimizare Imagini**: Componenta Next.js Image cu formate WebP/AVIF
- **Code Splitting**: Automat prin Next.js
- **Caching Client-Side**: localStorage pentru coș și autentificare
- **Lazy Loading**: Imagini încărcate la cerere

### Backend
- **Indexare Baza de Date**: Constraint-uri unice pe email, orderCode
- **Connection Pooling**: HikariCP (datasource implicit Spring Boot)
- **JPA Lazy Loading**: Categoriile și brand-urile încărcate eager doar când este necesar

---

## Îmbunătățiri Viitoare

1. **Panou Admin**: Dashboard pentru gestionarea produselor, comenzilor, utilizatorilor
2. **Recenzii Produse**: Sistem recenzii și rating-uri utilizatori
3. **Management Inventar**: Urmărire stocuri și alerte
4. **Tracking Comenzi**: Actualizări status comandă în timp real
5. **Lista de Dorințe**: Salvare produse pentru mai târziu
6. **Suport Multi-limbă**: Internaționalizare (i18n)
7. **Analitici**: Raportare și analiză comenzi
8. **Metode de Plată**: Gateway-uri de plată suplimentare (PayPal, etc.)
9. **Șabloane Email**: Șabloane email HTML bogate
10. **Caching**: Redis pentru caching sesiuni și produse

---

## Contact și Suport

- **Documentație API**: https://smartshop-backend.fly.dev/swagger-ui.html
- **Frontend**: https://smartshop-xgco.vercel.app
- **Backend API**: https://smartshop-backend.fly.dev/api

---

*Ultima Actualizare: Ianuarie 2025*
