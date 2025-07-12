             ┌─────────────────────────────┐
             │   📷 Image Upload (User)    │
             └────────────┬────────────────┘
                          ▼
               ┌─────────────────────┐
               │   🧠 OCR Service     │  ← (Tesseract / Node.js)
               └────────────┬────────┘
                            ▼
              ┌────────────────────────┐
              │ Ingredient Parser &    │
              │ Normalization Service  │
              │ (Clean, split, map)    │
              └────────────┬───────────┘
                           ▼
        ┌───────────────────────────────┐
        │  Loop through each ingredient │
        └───────────────────────────────┘
                  ▼          ▼
             ┌────────┐   ┌──────────────┐
             │Check DB│   │❌ Not in DB? │
             └────┬───┘   └────┬─────────┘
                  ▼           ▼
        ┌────────────────┐  ┌────────────────────┐
        │ Return from DB │  │ 💬 Query ChatGPT API│
        │ (desc, benefits│  │ Prompted response   │
        │  risks, tags)  │  └────────┬────────────┘
        └──────┬─────────┘           ▼
              ▼            ┌────────────────────────────┐
            Store in cache │ Save response in DB/cache  │
            or format      │ for future requests        │
                           └────────────┬───────────────┘
                                        ▼
                    ┌────────────────────────────────┐
                    │ 🔍 Personalization Engine       │
                    │ Filter for:                    │
                    │  - Allergens                   │
                    │  - Diet type (Vegan, etc.)     │
                    │  - Health conditions           │
                    └────────────┬───────────────────┘
                                 ▼
                      ┌───────────────────────┐
                      │   🧾 Final Result API  │
                      │   (Clean JSON output) │
                      └────────────┬──────────┘
                                   ▼
                    ┌────────────────────────────────┐
                    │ UI: Show result with badges,   │
                    │ highlights, and warnings       │
                    └────────────────────────────────┘


src/
├── app/
│   ├── core/                           # Core functionality (singleton services)
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   └── index.ts
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   │   ├── error.interceptor.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── api.service.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── local-storage.service.ts
│   │   │   ├── notification.service.ts
│   │   │   └── index.ts
│   │   ├── models/
│   │   │   ├── user.model.ts
│   │   │   ├── scan.model.ts
│   │   │   ├── ingredient.model.ts
│   │   │   └── index.ts
│   │   ├── enums/
│   │   │   ├── safety-level.enum.ts
│   │   │   ├── dietary-preference.enum.ts
│   │   │   └── index.ts
│   │   └── core.module.ts
│   │
│   ├── shared/                         # Shared components, directives, pipes
│   │   ├── components/
│   │   │   ├── loading-spinner/
│   │   │   │   ├── loading-spinner.component.ts
│   │   │   │   ├── loading-spinner.component.html
│   │   │   │   └── loading-spinner.component.scss
│   │   │   ├── modal/
│   │   │   │   ├── modal.component.ts
│   │   │   │   ├── modal.component.html
│   │   │   │   └── modal.component.scss
│   │   │   ├── stat-card/
│   │   │   │   ├── stat-card.component.ts
│   │   │   │   ├── stat-card.component.html
│   │   │   │   └── stat-card.component.scss
│   │   │   ├── safety-badge/
│   │   │   │   ├── safety-badge.component.ts
│   │   │   │   ├── safety-badge.component.html
│   │   │   │   └── safety-badge.component.scss
│   │   │   └── index.ts
│   │   ├── directives/
│   │   │   ├── drag-drop.directive.ts
│   │   │   ├── touch-feedback.directive.ts
│   │   │   └── index.ts
│   │   ├── pipes/
│   │   │   ├── time-ago.pipe.ts
│   │   │   ├── safety-color.pipe.ts
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── file-validator.util.ts
│   │   │   ├── animation.util.ts
│   │   │   └── index.ts
│   │   └── shared.module.ts
│   │
│   ├── features/                       # Feature modules
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── welcome-section/
│   │   │   │   │   ├── welcome-section.component.ts
│   │   │   │   │   ├── welcome-section.component.html
│   │   │   │   │   └── welcome-section.component.scss
│   │   │   │   ├── stats-grid/
│   │   │   │   │   ├── stats-grid.component.ts
│   │   │   │   │   ├── stats-grid.component.html
│   │   │   │   │   └── stats-grid.component.scss
│   │   │   │   ├── scanner-section/
│   │   │   │   │   ├── scanner-section.component.ts
│   │   │   │   │   ├── scanner-section.component.html
│   │   │   │   │   └── scanner-section.component.scss
│   │   │   │   ├── quick-actions/
│   │   │   │   │   ├── quick-actions.component.ts
│   │   │   │   │   ├── quick-actions.component.html
│   │   │   │   │   └── quick-actions.component.scss
│   │   │   │   └── recent-scans/
│   │   │   │       ├── recent-scans.component.ts
│   │   │   │       ├── recent-scans.component.html
│   │   │   │       └── recent-scans.component.scss
│   │   │   ├── services/
│   │   │   │   └── dashboard.service.ts
│   │   │   ├── dashboard-routing.module.ts
│   │   │   ├── dashboard.module.ts
│   │   │   └── dashboard.component.ts
│   │   │
│   │   ├── scanner/
│   │   │   ├── components/
│   │   │   │   ├── image-upload/
│   │   │   │   │   ├── image-upload.component.ts
│   │   │   │   │   ├── image-upload.component.html
│   │   │   │   │   └── image-upload.component.scss
│   │   │   │   ├── scan-results/
│   │   │   │   │   ├── scan-results.component.ts
│   │   │   │   │   ├── scan-results.component.html
│   │   │   │   │   └── scan-results.component.scss
│   │   │   │   ├── ingredient-item/
│   │   │   │   │   ├── ingredient-item.component.ts
│   │   │   │   │   ├── ingredient-item.component.html
│   │   │   │   │   └── ingredient-item.component.scss
│   │   │   │   └── camera-capture/
│   │   │   │       ├── camera-capture.component.ts
│   │   │   │       ├── camera-capture.component.html
│   │   │   │       └── camera-capture.component.scss
│   │   │   ├── services/
│   │   │   │   ├── image-processing.service.ts
│   │   │   │   ├── ingredient-analysis.service.ts
│   │   │   │   └── ocr.service.ts
│   │   │   ├── scanner-routing.module.ts
│   │   │   ├── scanner.module.ts
│   │   │   └── scanner.component.ts
│   │   │
│   │   ├── history/
│   │   │   ├── components/
│   │   │   │   ├── scan-history-list/
│   │   │   │   │   ├── scan-history-list.component.ts
│   │   │   │   │   ├── scan-history-list.component.html
│   │   │   │   │   └── scan-history-list.component.scss
│   │   │   │   ├── history-filters/
│   │   │   │   │   ├── history-filters.component.ts
│   │   │   │   │   ├── history-filters.component.html
│   │   │   │   │   └── history-filters.component.scss
│   │   │   │   └── scan-detail/
│   │   │   │       ├── scan-detail.component.ts
│   │   │   │       ├── scan-detail.component.html
│   │   │   │       └── scan-detail.component.scss
│   │   │   ├── services/
│   │   │   │   └── history.service.ts
│   │   │   ├── history-routing.module.ts
│   │   │   ├── history.module.ts
│   │   │   └── history.component.ts
│   │   │
│   │   ├── analytics/
│   │   │   ├── components/
│   │   │   │   ├── health-insights/
│   │   │   │   │   ├── health-insights.component.ts
│   │   │   │   │   ├── health-insights.component.html
│   │   │   │   │   └── health-insights.component.scss
│   │   │   │   ├── trend-charts/
│   │   │   │   │   ├── trend-charts.component.ts
│   │   │   │   │   ├── trend-charts.component.html
│   │   │   │   │   └── trend-charts.component.scss
│   │   │   │   └── nutrition-summary/
│   │   │   │       ├── nutrition-summary.component.ts
│   │   │   │       ├── nutrition-summary.component.html
│   │   │   │       └── nutrition-summary.component.scss
│   │   │   ├── services/
│   │   │   │   └── analytics.service.ts
│   │   │   ├── analytics-routing.module.ts
│   │   │   ├── analytics.module.ts
│   │   │   └── analytics.component.ts
│   │   │
│   │   ├── profile/
│   │   │   ├── components/
│   │   │   │   ├── user-info/
│   │   │   │   │   ├── user-info.component.ts
│   │   │   │   │   ├── user-info.component.html
│   │   │   │   │   └── user-info.component.scss
│   │   │   │   ├── dietary-preferences/
│   │   │   │   │   ├── dietary-preferences.component.ts
│   │   │   │   │   ├── dietary-preferences.component.html
│   │   │   │   │   └── dietary-preferences.component.scss
│   │   │   │   ├── health-goals/
│   │   │   │   │   ├── health-goals.component.ts
│   │   │   │   │   ├── health-goals.component.html
│   │   │   │   │   └── health-goals.component.scss
│   │   │   │   └── notification-settings/
│   │   │   │       ├── notification-settings.component.ts
│   │   │   │       ├── notification-settings.component.html
│   │   │   │       └── notification-settings.component.scss
│   │   │   ├── services/
│   │   │   │   └── profile.service.ts
│   │   │   ├── profile-routing.module.ts
│   │   │   ├── profile.module.ts
│   │   │   └── profile.component.ts
│   │   │
│   │   └── auth/
│   │       ├── components/
│   │       │   ├── login/
│   │       │   │   ├── login.component.ts
│   │       │   │   ├── login.component.html
│   │       │   │   └── login.component.scss
│   │       │   ├── register/
│   │       │   │   ├── register.component.ts
│   │       │   │   ├── register.component.html
│   │       │   │   └── register.component.scss
│   │       │   └── forgot-password/
│   │       │       ├── forgot-password.component.ts
│   │       │       ├── forgot-password.component.html
│   │       │       └── forgot-password.component.scss
│   │       ├── services/
│   │       │   └── auth.service.ts
│   │       ├── auth-routing.module.ts
│   │       ├── auth.module.ts
│   │       └── auth.component.ts
│   │
│   ├── layout/                         # Layout components
│   │   ├── components/
│   │   │   ├── sidebar/
│   │   │   │   ├── sidebar.component.ts
│   │   │   │   ├── sidebar.component.html
│   │   │   │   └── sidebar.component.scss
│   │   │   ├── header/
│   │   │   │   ├── header.component.ts
│   │   │   │   ├── header.component.html
│   │   │   │   └── header.component.scss
│   │   │   ├── footer/
│   │   │   │   ├── footer.component.ts
│   │   │   │   ├── footer.component.html
│   │   │   │   └── footer.component.scss
│   │   │   └── main-layout/
│   │   │       ├── main-layout.component.ts
│   │   │       ├── main-layout.component.html
│   │   │       └── main-layout.component.scss
│   │   ├── services/
│   │   │   └── layout.service.ts
│   │   └── layout.module.ts
│   │
│   ├── app-routing.module.ts           # Main routing
│   ├── app.component.ts                # Root component
│   ├── app.component.html
│   ├── app.component.scss
│   └── app.module.ts                   # Root module
│
├── assets/                             # Static assets
│   ├── images/
│   │   ├── icons/
│   │   ├── logos/
│   │   └── illustrations/
│   ├── fonts/
│   └── data/
│       └── mock-data.json
│
├── environments/                       # Environment configurations
│   ├── environment.ts
│   ├── environment.prod.ts
│   └── environment.staging.ts
│
├── styles/                            # Global styles
│   ├── abstracts/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── _functions.scss
│   ├── base/
│   │   ├── _reset.scss
│   │   ├── _typography.scss
│   │   └── _base.scss
│   ├── components/
│   │   ├── _buttons.scss
│   │   ├── _forms.scss
│   │   ├── _cards.scss
│   │   └── _modals.scss
│   ├── layout/
│   │   ├── _grid.scss
│   │   ├── _header.scss
│   │   └── _sidebar.scss
│   ├── themes/
│   │   ├── _light.scss
│   │   └── _dark.scss
│   ├── utilities/
│   │   ├── _spacing.scss
│   │   ├── _colors.scss
│   │   └── _responsive.scss
│   └── styles.scss                    # Main styles file
│
├── favicon.ico
├── index.html
└── main.ts