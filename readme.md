# Esa Partanen - portfolio

Henkilökohtainen portfolio ja työnäytesivusto, jossa esitellään WooCommerce-,
PHP-, Python-, Linux-, Docker- sekä dataan ja tekoälyyn liittyviä projekteja.

Sivusto on tehty staattisilla HTML-, CSS- ja JavaScript-tiedostoilla. Erillistä build-vaihetta ei tarvita.

Live-sivusto: <https://portfolio.esasannaemmakoti.fi>

## Sisältö

- WooCommerce-verkkokauppojen kehitystyö ja tuotantoympäristöt
- WordPress- ja WooCommerce-lisäosat
- Verkkokaupan integraatiot, tuotetiedon hallinta ja Google-tuotesyötteet
- Python-, data- ja tekoälyprojektit
- Linux-, Docker- ja palvelinympäristöihin liittyvä osaaminen
- Opintojen aikana tehdyt ohjelmointi-, data- ja järjestelmäsuunnittelutehtävät

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

## Tekninen toteutus

Portfolio toimii ilman raskasta frontend-kehystä tai build-putkea. Ratkaisu on
kevyt, helposti ylläpidettävä ja sopii staattisena sivustona julkaistavaksi
useisiin ympäristöihin. JavaScriptiä käytetään vain pieniin käyttöliittymän
toimintoihin, kuten vuosiluvun päivittämiseen ja mobiilivalikon avaamiseen.
