# LAST ORDER — playable design

## Premise and tone

Bellport is a fictional coastal city in 1999. Its institutions are becoming quieter and less accountable while its streets prepare for Harbor Week. Starline Burger is one small room where drivers, clerks, officials, neighbors, and visitors cross paths. Like a neighborhood stage, the diner reveals a city through its regulars. Domestic comedy and ordinary work create room for a humane spy story.

The setting and characters are original. The inspirations are a single social gathering place, the contrast between cover work and private stakes, and a late-1990s coastal crime atmosphere. The project does not reproduce characters, logos, maps, or dialogue from existing franchises.

The player is Alex Vale, a new employee who is also an operative. Control initially frames the work as moving delivery information. Each shift reveals that the records concern witnesses, and that obeying an instruction can harm the people the operation claims to protect.

## Core loop

Read a morning brief → open a continuous restaurant shift → listen to real orders → prepare and serve food → respond to interruptions → identify the contact → collect and secure evidence → write a useful report → invest in the shop → return the next morning.

The restaurant continues during work panels. Reading and accessibility dialogs pause it. The morning intelligence sheet has an optional 90-second timer. There is no separate quiz screen between food orders: language is needed to do the work.

## Five-shift script

| Shift | Everyday problem | Spy development | Language demand | Consequence |
| --- | --- | --- | --- | --- |
| 1 — The New Hire | Learn the grill and corrected orders | Nico changes 6 p.m./west to 7:30 p.m./east | Listen for replacement details; write a precise change | The report preserves the useful instruction or repeats an obsolete one |
| 2 — Same as Yesterday | Compare supplier paperwork | An old Northline slip is invalid; Nico says the names are witnesses | Read dates; distinguish document evidence from a claim | A mistaken release raises suspicion and loses the parcel |
| 3 — Routine Inspection | Hygiene check and staffing questions | Cole’s transport order lacks normal tickets and a route | Give a consistent written account; preserve uncertainty | Cleanliness and credibility affect official cooperation |
| 4 — The Storm Special | Power failure and stranded regulars | Iris corroborates altered records and depot 2, but not the driver | Integrate written and spoken sources; retain an unknown | Repairs protect service; corroboration supports the final case |
| 5 — Last Order | Celebration rush | Control, Iris, Cole, and Nico want different uses of the evidence | Write a concise final brief; protect identities | Four recipient choices lead to different outcomes |

The full player-facing brief, staff memo, spoken handoff, facts, report task, and Mara's opening/closing lines are authored in `dist/story.js`. Endings are in `dist/core.js`.

## Systems and rules

| System | Implementation |
| --- | --- |
| Movement | First-person raycasting, collision walls/counter, free walking and looking; accessible station jumps |
| Orders | Six authored orders; beef/veggie, cheese, onions, fries, coffee/soda, plus spoken self-correction and negation |
| Cooking | Patties ready after 8 seconds, or 6 with upgrade; burn after 23. Fries ready after 7 or 5; burn after 25 |
| Capacity | Two grill slots, or three with upgrade. One fryer basket. One tray |
| Sales | Base burger $4.50; cheese $0.50; fries $2; drink $1.50. Daily overhead $18 |
| Mistakes | Wrong components are named in remake feedback. A mismatch costs reputation and patience. Waste costs stock and a small cash penalty |
| Customers | Arrivals approximately every 27–42 seconds, maximum four waiting; short menu reduces the queue cap |
| Patience | Standard customer 125 seconds; contact 160. Accessibility setting slows patience loss |
| Hygiene | Falls during work; cleaning restores it. Inspection requires at least 65 and a functioning fridge |
| Equipment | Power stops hot cooking. Soda and fridge faults require repair. A fridge fault blocks new patties until isolated and repaired |
| Inventory | Ten-unit replenishment batches; prices vary by ingredient. No invisible free ingredients |
| Upgrades | Wider/faster grill $45; quicker fryer $35; fridge insulation $40 |
| Cover | Name Alex Vale, start Monday, manager Mara Bell. Inconsistent written answers raise suspicion |
| Handoff | Listen and verify; complete the food order; collect papers; secure them away from the public counter |
| Evidence | Each item records source, kind, date, and confirmation status. A witness statement remains attributed |
| Writing | Minimum 15 words to file. Suggested lengths increase through the story. Feedback checks authored essential facts |
| Relationships | Correct service and helpful decisions build local trust; Nico’s trust changes the protection ending |
| Closure | A missed handoff gives an explicitly incomplete recovered file so the campaign can continue |
| Persistence | Local browser autosave and portable JSON saves; no server or account dependency |

## Random events

| Event | Player action | Linked simulation effect |
| --- | --- | --- |
| Lunch bell | Ask Mina to manage the queue | More arrivals; recovered patience and coworker trust |
| Soda failure | Repair the machine for $6 | Soda service restored |
| Swapped bags | Recover the correct bags | Avoid suspicion from misplaced papers |
| Missing potatoes | Write a clear shortage notice | Communication improves reputation |
| Early cleaner | Secure the working papers | Protect the operation from exposure |
| June’s missing wallet | Offer a $4 meal | Improve trust with a regular |
| Radio correction | Compare broadcast and printed notice | Prefer the current source; reduce suspicion |
| Strange caller | Require a current matching invoice | Avoid treating an old phrase as authorization |
| Fridge alarm | Isolate stock and repair for $8 | Discard affected units and restore cooking |
| Mina’s absence | Adopt a short menu | Fewer simultaneous orders and slower patience loss |
| Paper review | Check receipts and offer a $3 remake | Resolve a reputation problem |
| Forgotten pager | Record lost property | Respect an ordinary customer’s privacy |

The storm outage is a thirteenth, scripted event. Timers make prioritization part of service. Expired events apply recoverable penalties rather than stopping the campaign.

## Learning design

Listening asks the player to distinguish a replacement from the first thing said, remember a negative, request clarification, and hear specific times and places. Reading asks them to compare a current notice with old paperwork and notice the limits of a document. Writing asks for a functional summary, a consistent cover account, and a usable public notice.

The prototype supplies replay, captions, and a scratchpad. Players can make the listening harder by disabling captions. Slower patience and station jumps make the simulation playable without rapid movement or typing. All story text, menus, controls, and documentation are in English.

Report scoring is deliberately transparent and limited. It matches authored facts and some negated constructions. It is not a general grammar examiner, semantic evaluator, or certified assessment of English proficiency. The UI describes this limit. A later version should use broader paraphrase coverage and human-authored contradiction cases before considering any optional language-model grading.

## Ending conditions

Iris’s originals plus a strong final report support the redacted-press ending. Cole additionally needs manageable suspicion to act decisively. Control accepts the unredacted list, with a troubling aftermath. Nico’s protection route improves with the trust earned during the week. Shop reputation and cash determine whether Mara can reopen immediately.

## Scope after this prototype

The present build demonstrates a complete small campaign and service loop. The next production pass should prioritize visual playtesting, wider order and voice variation, unique event interactions, stronger source-comparison tasks, balanced stock and earnings over longer sessions, directional character animation, and a richer environment. Multiplayer, paid AI calls, online accounts, and a large open city are outside this version.
