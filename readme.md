Tämä on minun henkilökohtainen portfolio ja samalla itselle uusien juttujen testaus alusta.

## Julkinen osoite

Portfolio on julkaistu osoitteessa:

```bash
https://portfolio.esasannaemmakoti.fi/
```

Sivu on staattinen HTML/CSS/JS-sivusto. Sitä ei ajeta sovelluspalvelimena, vaan paikallinen staattinen HTTP-palvelu tarjoilee hakemiston `/home/uni/portfolio` ja Cloudflare Tunnel vie sen julkiseen osoitteeseen.

## Miten julkaisu toimii

Kokonaisuus koostuu kahdesta user systemd -palvelusta:

```bash
portfolio-http.service
cloudflared-portfolio.service
```

`portfolio-http.service` tarjoilee tämän hakemiston paikallisesti osoitteessa:

```bash
http://127.0.0.1:8082/
```

`cloudflared-portfolio.service` avaa Cloudflare Tunnelin ja ohjaa osoitteen `portfolio.esasannaemmakoti.fi` paikalliseen palveluun `127.0.0.1:8082`.

Palvelut käynnistyvät automaattisesti uudelleen bootin jälkeen, koska ne on otettu käyttöön `systemctl --user enable` -komennolla ja käyttäjällä `uni` on systemd linger päällä.

## Tärkeät tiedostot

```bash
/home/uni/.config/systemd/user/portfolio-http.service
/home/uni/.config/systemd/user/cloudflared-portfolio.service
/home/uni/.cloudflared/portfolio.yml
/home/uni/.local/bin/portfolio-static-server.py
```

`portfolio-static-server.py` on pieni Python-palvelin, joka estää piilotiedostojen ja hakemistolistausten tarjoamisen. Tämän takia esimerkiksi `.git/HEAD` ei näy julkisesti.

## Hallintakomennot

Tarkista palveluiden tila:

```bash
systemctl --user status portfolio-http.service cloudflared-portfolio.service
```

Käynnistä paikallinen portfolio-palvelin uudelleen:

```bash
systemctl --user restart portfolio-http.service
```

Käynnistä Cloudflare Tunnel uudelleen:

```bash
systemctl --user restart cloudflared-portfolio.service
```

Katso lokit reaaliajassa:

```bash
journalctl --user -u portfolio-http.service -u cloudflared-portfolio.service -f
```

Tarkista, että paikallinen palvelu vastaa:

```bash
curl -I http://127.0.0.1:8082/
```

Tarkista, että julkinen osoite vastaa:

```bash
curl -I https://portfolio.esasannaemmakoti.fi/
```

Tarkista, ettei `.git` ole julkisesti luettavissa:

```bash
curl -I https://portfolio.esasannaemmakoti.fi/.git/HEAD
```

Odotettu vastaus on `404`.

## Päivittäminen

Kun muokkaat portfolion HTML-, CSS-, JS- tai kuvatiedostoja tässä hakemistossa, muutokset näkyvät suoraan ilman build-vaihetta.

Jos muutokset eivät näy heti selaimessa, kokeile:

```bash
systemctl --user restart portfolio-http.service
```

ja päivitä selain välimuistin ohi.

## Huomio

Vanhaa manuaalista komentoa ei normaalisti tarvitse käyttää:

```bash
python3 -m http.server 5173
```

Se oli vain paikalliseen testaukseen. Pysyvä julkaisu käyttää nyt systemd-palvelua ja porttia `8082`.
