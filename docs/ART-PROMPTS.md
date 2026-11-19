# LAST ORDER — art inventory and prompts

## Shared art direction

Use this prefix for every asset:

> Original pixel-art game asset for LAST ORDER, a first-person undercover restaurant simulator in the fictional coastal city of Bellport, 1999. Late-1990s fast-food diner, warm amber practical lighting, burgundy booths, cream enamel, muted teal rain and neon outside. Adult characters with natural proportions, restrained expressions, lived-in details, readable silhouettes, selective dark outlines, crisp integer pixels, 16-bit adventure-game craft with cinematic coastal crime atmosphere. Consistent palette: ink #251e22, burgundy #8f333b, cream #f2ead7, amber #efb95a, teal #427078, muted green #83b49b. Original brands and characters. No recognizable franchise logos, no watermark, no illegible decorative writing.

Prefer transparency for sprites and props; opaque backgrounds for scenes. Do not pay to regenerate assets solely because a concept sheet has the wrong grid: first inspect it and adapt the engine’s atlas coordinates. In this build the character sheet is four columns by two rows, not the initially requested two-by-two layout.

## Assets already used

| Asset | Delivered form | Use |
| --- | --- | --- |
| Neon diner concept | Existing `cover.png` | Full-screen title background |
| Character sheet | PixelLab, 192×192, transparent, 4×2 grid | Mara, Mina, Nico, and Cole billboards and portraits |
| Food sheet | PixelLab, 192×128, transparent, 4×2 grid | Tray and workstation food icons |
| Walls, windows, counter, furniture, equipment | Procedural Canvas textures and sprites | Navigable diner; no additional credits |
| Other regulars | Original runtime pixel figures | Vera, Iris, June, Frank, Sam, Robin |

Budget for this delivery: two trial generations. The following prompts are a future production inventory; generating the entire list is not required to play.

## Scenes and cover

| ID / target | Prompt suffix |
| --- | --- |
| COVER / 16:9, 1672×941 or larger concept | First-person view behind a burger counter, warm kitchen on the left, burgundy booths beyond the service counter, rainy harbor street and teal neon through large front windows, an ordinary courier waiting with a paper bag, a folded invoice almost hidden under a receipt, amber light inside against blue rain outside, cinematic depth, strong dark negative space on the left for a title added later, no rendered lettering |
| EXTERIOR-DAY / 16:9 | Street-level exterior of an independent corner burger diner, cream and burgundy facade, striped awning, large front windows, a bicycle leaning beside the entrance, bus stop, weathered harbor buildings, 1999 cars, morning amber light, grounded and inviting, sign panel blank for separate typography |
| EXTERIOR-NIGHT / same composition | Same diner and camera as the daytime exterior, rain on asphalt, warm windows, teal neon reflections, an unmarked sedan across the road, two pedestrians under umbrellas, no threatening weapons, quiet suspense |
| DINING-ROOM / 16:9 | Eye-level view from behind the register, three booth tables, front windows, condiment station, paper menu board, checker floor, ordinary customers with space for separate sprites, empty foreground counter, all architecture readable |
| KITCHEN / 16:9 | Eye-level first-person kitchen work area, flat-top grill left, fryer center, assembly counter right, clean stainless steel worn by daily use, buns and wrapped cheese, amber extraction hood, clear work surfaces for interactive overlays, no people |
| OFFICE / 16:9 | Tiny owner’s back office, beige CRT computer with simple green lines, desk telephone, locked file cabinet, staff rota on cork board, storm plan, mug, practical lamp, a spare apron, blank paper surfaces for legible UI text |
| STOCKROOM / 16:9 | Small walk-in stockroom with cardboard food cartons, wire shelves, fridge door and visible breaker cabinet, clear walking route, old fluorescent light mixed with warm doorway light, no text on boxes |
| STORM / same dining-room composition | Same diner during a power outage, blue-gray rainy windows, emergency red indicator, a few warm candle-like battery lights, neighbors sheltering inside, readable dark shapes, no disaster spectacle |
| ENDING-CLOSING / 16:9 | After closing, clean counter, two coffee cups, one empty booth, first light over a quiet harbor, one bicycle outside, warm small human details, room for ending text overlay |

## Character sprites

Production target: one character per transparent canvas, 48×96 pixels for front view; later generate side and back views using the approved front as reference. Keep feet on the same baseline, full body visible, no embedded name labels.

| Character | Prompt suffix |
| --- | --- |
| Alex Vale / optional hands | First-person adult worker’s hands in rolled cream sleeves, one holding a paper food tray, second pose holding a small receipt, neutral appearance, clean silhouettes, separate poses with generous spacing |
| Mara Bell | Adult woman in her late forties, short warm brown hair, green work shirt, burgundy apron, comfortable dark trousers, practical shoes, tired amused expression, owner who has worked this counter for twenty years |
| Mina Park | Young adult woman, straight black bob, mustard shirt and burgundy apron, practical work shoes, observant expression, confident relaxed posture, fast-food coworker |
| Nico Reyes | Young adult male bicycle courier, curly dark hair, blue windbreaker over casual clothing, canvas cross-body messenger bag, worn sneakers, alert but approachable, no weapon |
| Elias Cole | Middle-aged male city investigator, gray suit, loosened tie, tan raincoat, neat dark hair, calm thoughtful expression, an official who listens before making a claim |
| Vera Quinn | Middle-aged woman food safety inspector, pale blue-gray jacket, clipboard and pen, sensible shoes, matter-of-fact expression, clearly distinct from the raincoat investigator |
| Iris Shaw | Adult woman reporter and regular customer, muted plum coat, copper-brown hair, small notebook and folded newspaper, composed watchful expression, no trench-coat stereotype |
| June | Middle-aged woman bus driver, muted teal uniform jacket, graying hair, sturdy shoes, paper coffee cup, warm exhausted expression |
| Frank | Adult male mechanic, navy work overalls with lightly worn knees, brown hair, broad grounded stance, clean hands before eating, everyday neighborhood regular |
| Sam | Adult office worker, taupe jacket, pale shirt, paper folder, distracted hurried expression, modest outfit, ordinary person rather than a villain silhouette |
| Robin | Adult visitor in a tan rain jacket, small tourist map, comfortable shoes, curious friendly expression, no modern smartphone |
| Extras / 6 variants | Six distinct adult diner customers, varied skin tones, ages, builds, hair, 1999 casual and work clothing, clear full-body front silhouettes, equal scale and baseline, no duplicate poses |

Animation prompt after a design is approved:

> Use the approved character unchanged. Four-frame idle animation, subtle breathing and one natural blink. Identical canvas, palette, outfit, proportions, foot placement, and lighting in every frame. Transparent background. No camera movement, no new props, no morphing.

Additional animations: walk four directions, receive bag, pay, point at a receipt, hold coffee, worried glance. Generate only the frames the engine actually uses.

## Food, equipment, and props

Default food icons: transparent 48×64 pixels; objects: 64×64 or 96×96 as listed.

| Asset group | Prompt suffix |
| --- | --- |
| Food atlas / 192×128 | Exactly four columns and two rows, eight isolated icons, one per 48×64 cell. Top row: cheeseburger, veggie burger, red fries carton, soda cup with straw. Bottom row: takeaway coffee cup, raw pink patty, cooked brown patty, burnt black patty. Low top-down angle, consistent scale and padding, transparent |
| Burger components / 48×48 each | Separate bun top, bun bottom, raw beef patty, raw veggie patty, cooked versions, cheese slice, sliced onions, each centered and clearly distinguishable at small size, transparent |
| Grill / 96×96 | Front-facing stainless flat-top grill, two visible cooking zones, four control knobs, lower doors, warm hood edge, game prop with readable outline, no food included |
| Fryer / 96×96 | Front-facing commercial fryer with basket and amber oil, matching the approved grill palette and viewpoint, separate raw/ready/burnt basket overlays |
| Coffee machine / 96×96 | Beige-and-chrome 1990s drip coffee station, glass carafe, simple indicator, paper cup stack, no brand, consistent front-facing game prop |
| Soda fountain / 96×96 | Small burgundy and cream fountain with three simple levers, no branded labels, drip tray, separate red out-of-order indicator overlay |
| Register / 96×96 | Chunky cream 1990s cash register with small green display, paper receipt roll, burgundy tray edge, blank display for runtime numbers |
| Booth / 96×96 | Burgundy vinyl diner booth pair around a cream laminate table, metal pedestal, ketchup and mustard bottle silhouettes, slight wear, front-facing billboard compatible |
| Office desk / 96×96 | Worn wooden desk, beige CRT with abstract green screen, keyboard, desk lamp, stacked blank invoices, front-facing game prop |
| Evidence objects / 64×64 each | Brown sealed envelope, folded invoice, clipped transport order, redacted document, plain manila folder, small 1990s pager, each an isolated icon with generous transparent margin |
| Repair props / 64×64 each | Wall breaker box with red and green indicator variants, toolbox, cloth and spray bottle, stock crate, fridge thermometer, separate readable game icons |
| UI markers / 32×32 each | Minimal pixel symbols for listening, notebook, verified source, unconfirmed claim, hygiene, suspicion, cash, and trust; consistent two-pixel stroke, cream and amber on transparent background |

## Mission documents and typography

Render document text in HTML or the engine, not inside generated images. AI art should supply paper, stamps, folds, and empty layouts only. This preserves spelling, accessibility, localization, and legibility.

| Document | Blank-layout prompt | Text supplied by the game |
| --- | --- | --- |
| Morning brief | Cream folded intelligence memo, burgundy header rule, blank body, small abstract classification stamp, no lettering | Day brief and mission |
| Supplier notice | Slightly worn white A5 business notice, simple black header line, blank date field | Northline closure on October 15 |
| Pickup slip | Narrow carbon-copy collection slip, faint grid and blank authorization lines | Northline, October 14, one sealed parcel |
| Staff rota | Corkboard with cream weekly roster grid and blank rows | Alex, Monday, Mara |
| Transport order | Formal gray-green municipal form, blank route and passenger sections, no seals copied from real institutions | Cole’s documented order and uncertainty |
| Original/altered files | Two matched paper forms, one with a few abstract inserted marks, blank legible-text areas | Iris’s comparison and provenance |
| Route notice | Cream bus-depot announcement, blank location/time fields, thin teal border | Depot 2, 7:30 p.m., driver unconfirmed |
| Redacted brief | Cream memo with a few solid black privacy bars and blank paragraphs | Final player-written report |

## Export and review checklist

Export lossless PNG, never JPEG for sprites. Maintain transparent alpha. Do not smooth or rescale pixel assets with a blurry filter. Inspect exact grid, dimensions, edge clipping, silhouette, baseline, and palette before integration. Test each sprite against both cream UI and the dark diner. Keep editable prompts and atlas coordinates with the source. Reserve new generations for assets the current camera and mechanics can actually display.
