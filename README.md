# ntoa: _Number to String_ converter.

Wondering how to correctly pronounce
`659102863539127065129078569382156238956190238`?

No? Understandable, have a nice day.

But with `ntoa` you can do it - using the API, CLI, or WebApp.

> 659 Tredecillion 102 Duodecillion 863 Undecillion 539 Decillion 127 Nonillion
> 65 Octillion 129 Septillion 78 Sextillion 569 Quintillion 382 Quadrillion 156
> Trillion 238 Billion 956 Million 190 Thousand 238

Or if you're french 🇫🇷 or portuguese 🇵🇹 and use the awkward long scale, it's
(long version):

> Six Hundred Fifty Nine Septillion One Hundred Two Thousand Eight Hundred Sixty
> Three Sextillion Five Hundred Thirty Nine Thousand One Hundred Twenty Seven
> Quintillion Sixty Five Thousand One Hundred Twenty Nine Quadrillion Seventy
> Eight Thousand Five Hundred Sixty Nine Trillion Three Hundred Eighty Two
> Thousand One Hundred Fifty Six Billion Two Hundred Thirty Eight Thousand Nine
> Hundred Fifty Six Million One Hundred Ninety Thousand Two Hundred Thirty Eight

## Usage

### Web API 🌐 🦕

```ts
import { ntoa } from "https://esm.sh/gh/zettca/ntoa/mod.ts";

ntoa("123456789"); /// 123 million 456 thousand 789
ntoa("123456789123456789"); /// 123 Quadrillion 456 Trillion 789 Billion 123 Million 456 Thousand 780
```

### CLI

```sh
# install
deno install -f https://deno.land/x/ntoa/main.ts
# run
ntoa 123456789123456789123456789
# 123 Septillion 456 Sextillion 789 Quintillion 123 Quadrillion 456 Trillion 790 Billion
```
