# Mesigo Eng Fab: verified facts and open items

Checked 2026-10-18. Every business fact on the homepage comes from the sources below.
Anything not listed here is not published.

## Sources

| Source | URL |
|---|---|
| Current holding page | https://mesigoengfab.com/ |
| IndiaMART catalogue | https://www.indiamart.com/mesigoengfab/ (profile.html, products.html, category pages) |
| TradeIndia | https://www.tradeindia.com/mesigo-eng-fab-17474743/ |
| ExportersIndia | https://www.exportersindia.com/mesigo-eng-fab/ |

## Facts used on the site

| Fact | Value | Source |
|---|---|---|
| Name | Mesigo Eng Fab | all |
| Legal form | Proprietorship | IndiaMART |
| Established | 2014 | IndiaMART, TradeIndia, mesigoengfab.com |
| Proprietor | Dinesh Panchal | IndiaMART profile, TradeIndia |
| GSTIN | 24BZQPP6811A1ZF | IndiaMART factsheet |
| Phone / WhatsApp | +91 91064 07607 | mesigoengfab.com (tel: and wa.me links) |
| Address | Plot No. 6 & 7, Nilkanth Industrial Park, Opp. Darshan Hotel, Por, Vadodara, Gujarat 391243 | TradeIndia; "Por Industrial Zone, Vadodara" on mesigoengfab.com |
| Product families | Screw conveyors (SS/MS, U-trough, taper, inclined, tubular), bucket elevators (incl. Z-type), ribbon blenders, storage hopper bins, rotary airlock valves, dust collectors (baghouse, cyclone), industrial air blowers, hydraulic baling presses, slat chain / gravity roller / belt conveyors, screw flights, storage tanks and air receivers, ash conditioners | IndiaMART, TradeIndia |
| Screw conveyor ranges | SS304 or MS; diameter 100 to 600 mm | IndiaMART SS screw conveyor listing |
| Industries | Cement, concrete batching, grain/flour/dal/rice mills, cattle feed, pharma, chemical, food, dairy, boiler plants, scrap recycling | IndiaMART category names and listing application fields |
| Product photos | `assets-src/indiamart/` | IndiaMART catalogue images |

## Conflicts and items for the client to confirm

1. **Address.** ExportersIndia lists `331 A 8, Makarpura GIDC, Vadodara 390010` and gives 2016 as the founding year. The site uses the Por address and 2014 (two sources agree). Confirm the current workshop address before adding a `LocalBusiness` schema or a map.
2. **Email.** No public email address was found. Needed for `ENQUIRY_TO_EMAIL` and could be shown in the footer.
3. **Opening hours.** Not published anywhere; required before a `LocalBusiness` schema.
4. **Logo source file.** Only a 1304x620 PNG with a blurred tagline strip exists. A vector logo would allow the full wordmark in the header.
5. **Catalogue renders.** The bucket elevator, baling press, dust collector and hopper images look like catalogue renders, not workshop photos. Real photos of delivered machines would be stronger.
6. **Tagline.** The logo tagline reads approximately "We turn ideas into reality"; not used on the site until confirmed.
7. **www redirect.** `www.mesigoengfab.com` and `mesigoengfab.com` both answer 200. Add a 301 from www to the apex (canonical) at Cloudflare/DNS level.

## Deliberately not published

Years-of-experience counters, "Pan-India network", clientele claims, certifications, capacity/tonnage figures, prices, testimonials and IndiaMART star ratings. These appear on marketplace listings or the holding page but are not independently verifiable.
