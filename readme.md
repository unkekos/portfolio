Tämä on henkilökohtainen portfolio ja työnäytesivusto.

Sivusto on tehty staattisilla HTML-, CSS- ja JavaScript-tiedostoilla. Erillistä build-vaihetta ei tarvita.

## Rakenne

```text
index.html        Etusivu
pages/            Alasivut ja tarkemmat työnäytteet
css/style.css     Sivuston tyylit
js/script.js      Sivuston JavaScript
images/           Kuvat ja logot
assets/           Muut staattiset tiedostot
```

## Kehittäminen

Muokkaa tiedostoja suoraan tässä hakemistossa.

Paikalliseen testaukseen voi käyttää esimerkiksi Pythonin staattista palvelinta:

```bash
python3 -m http.server 5173
```

Tämän jälkeen sivu avautuu paikallisesti osoitteessa:

```text
http://127.0.0.1:5173/
```

## Julkaisu

Varsinainen palvelinkohtainen julkaisutapa ei kuulu tähän repoon, koska se sisältää konekohtaisia polkuja, palvelunimiä ja Cloudflare Tunnel -asetuksia.

Tällä palvelimella paikalliset julkaisuohjeet ovat tiedostossa:

```text
LOCAL_DEPLOYMENT.md
```

Tiedosto on tarkoituksella jätetty gitin ulkopuolelle.
