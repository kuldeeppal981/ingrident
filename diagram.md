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
