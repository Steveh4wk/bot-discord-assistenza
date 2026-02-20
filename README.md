# Bot Discord - Assistenza

## Funzioni
- Comando testuale `!assistenza` in un canale.
- Il bot invia un pulsante `Apri modulo assistenza`.
- Alla pressione, apre un form con i campi:
  - Nome IC (obbligatorio)
  - Nome OOC (obbligatorio)
  - Staffer con cui desideri parlare (opzionale)
  - Motivazione assistenza (obbligatorio)
- Dopo l'invio, il bot pubblica nel canale una scheda ordinata visibile a tutti con i dati inseriti.

## Requisiti
- Node.js 18.17+ (consigliato Node.js 20)
- Un'app bot Discord con token
- Intents attivi nel Developer Portal:
  - Message Content Intent
  - Server Members Intent non necessario per questo script

## Installazione
1. Apri la cartella del progetto.
2. Installa dipendenze:
   ```bash
   npm install
   ```
3. Copia `.env.example` in `.env` e inserisci il token:
   ```env
   DISCORD_TOKEN=il_tuo_token
   ```
4. Avvia il bot:
   ```bash
   npm start
   ```

## Permessi bot consigliati
- View Channels
- Send Messages
- Embed Links
- Read Message History

## Note
- Il comando è case-insensitive (`!ASSISTENZA` funziona).
- Il riepilogo viene inviato nel canale dove l'utente apre/invia il form.
