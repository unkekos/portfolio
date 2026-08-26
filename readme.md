# Esa Partanen - portfolio

Henkilökohtainen portfolio ja työnäytesivusto, jossa esitellään WooCommerce-,
PHP-, Python-, Linux-, Docker- sekä dataan ja tekoälyyn liittyviä projekteja.

Sivusto on tehty staattisilla HTML-, CSS- ja JavaScript-tiedostoilla. Erillistä build-vaihetta ei tarvita.

Live-sivusto: <https://epartanen.fi>

## Sisältö

- WooCommerce-verkkokauppojen kehitystyö ja tuotantoympäristöt
- WordPress- ja WooCommerce-lisäosat
- Verkkokaupan integraatiot, tuotetiedon hallinta ja Google-tuotesyötteet
- Python-, data- ja tekoälyprojektit
- Linux-, Docker- ja palvelinympäristöihin liittyvä osaaminen
- Opintojen aikana tehdyt ohjelmointi-, data- ja järjestelmäsuunnittelutehtävät

## Rakenne

```text
readme.md                  Projektin yleiskuvaus
LOCAL_DEPLOYMENT.md        Paikalliset julkaisuohjeet, ei gitissä
public/                    Julkaistava staattinen sivusto
public/index.html          Etusivu
public/pkc/ ym.            Siistit alasivujen URL-rakenteet
public/pages/              Vanhat osoitteet uudelleenohjauksia varten
public/assets/             CSS- ja JavaScript-tiedostot
public/images/             Kuvat ja logot
```

## Kehittäminen

Muokkaa julkaistavia sivutiedostoja `public/`-kansion sisällä.

Paikalliseen testaukseen voi käyttää esimerkiksi Pythonin staattista palvelinta:

```bash
python3 -m http.server 5173 --directory public
```

Tämän jälkeen sivu avautuu paikallisesti osoitteessa:

```text
http://127.0.0.1:5173/
```

## Tekninen toteutus

Portfolio toimii ilman raskasta frontend-kehystä tai build-putkea. Ratkaisu on
kevyt, helposti ylläpidettävä ja sopii staattisena sivustona julkaistavaksi
useisiin ympäristöihin. JavaScriptiä käytetään vain pieniin käyttöliittymän
toimintoihin, kuten vuosiluvun päivittämiseen ja mobiilivalikon avaamiseen.
