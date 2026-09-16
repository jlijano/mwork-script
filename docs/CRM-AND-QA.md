# MWORK CRM, QA, and Coaching Framework

This document turns the call script into measurable operations.

The purpose is to ensure that a good call is not defined by whether the agent read every line. A good call should produce the right information, the right customer experience, and the right next action.

---

# 1. Recommended CRM Fields

## Customer / authority
- Customer name
- Best callback number
- Decision-maker: Yes / No / Shared / Unknown
- Additional decision-maker if applicable

## Vehicle
- Year
- Make
- Model
- Vehicle location
- Driveability: Driveable / Non-driveable / Questionable / Unknown
- Towed: Yes / No
- Current tow yard or repair facility

## Claim
- Claim filed: Yes / No / Unknown
- Insurance carrier
- Claim number
- Adjuster assigned: Yes / No / Unknown
- Adjuster name/contact if available
- Payment path: Own policy / Third-party / Self-pay / Undetermined
- Liability status if relevant and known

## Transportation
- Rental needed: Yes / No / Unknown
- Rental arranged: Yes / No / Pending
- Alternate vehicle available: Yes / No

## Repair decision
- Repair facility selected: Yes / No / Unsure
- Current selected facility
- Estimate already received: Yes / No
- Repairs authorized: Yes / No / Unknown
- Repairs started: Yes / No / Unknown

## Customer concern
Primary concern:
- Cost
- Repair quality
- Speed
- Insurance guidance
- Trust
- Transportation
- Convenience
- Switching shops
- Liability/claim uncertainty
- Other

## Call outcome
- Inspection scheduled
- Tow/pickup requested
- Rental coordination
- Documents requested
- Follow-up scheduled
- Customer declined
- Already committed elsewhere
- No answer / voicemail
- Wrong party
- Total-loss path
- Other

## Follow-up
- Next action owner
- Next action date/time
- Required documents
- Notes

---

# 2. Why Structured CRM Data Matters

Without structured fields, agents produce long notes that are difficult to search, report, or hand off.

The MWORK script naturally generates high-value data. Capturing it consistently allows the business to answer questions such as:

- How many leads have not selected a shop?
- How many vehicles are non-driveable?
- How many customers need rentals?
- Which objections occur most often?
- Which objection categories have the lowest conversion?
- How many calls result in inspection appointments?
- How many opportunities are already at another shop but repairs have not started?
- Which carriers or claim stages create the most delay?

That turns the script into operational intelligence.

---

# 3. Recommended Call QA Scorecard

A practical scorecard can use ten categories.

## A. Opening and identity — 10%
Agent:
- identified themselves and MWORK,
- connected the call to the customer's vehicle/accident,
- gave a clear reason for calling.

## B. Empathy and listening — 10%
Agent:
- acknowledged the customer's situation appropriately,
- listened without unnecessary interruption,
- responded to information already provided.

## C. Discovery — 15%
Agent established the relevant facts:
- vehicle location,
- claim status,
- insurance contact,
- repair-facility status,
- transportation/rental status.

## D. Qualification — 10%
Agent confirmed:
- decision-maker,
- payment/insurance path,
- existing repair commitment when relevant.

## E. Safety / driveability — 15%
Agent:
- correctly determined driveability status,
- used relevant safety questions when necessary,
- did not make mechanical diagnoses beyond their role.

## F. MWORK positioning — 10%
Agent clearly explained the relevant independent-facility and insurance-coordination message without overwhelming the customer.

## G. Needs-based value — 10%
Agent matched MWORK benefits to the customer's actual concern instead of feature dumping.

## H. Objection handling — 10%
Agent:
- acknowledged the objection,
- understood or clarified the underlying concern,
- answered appropriately,
- returned to a useful question or next action.

## I. Close — 5%
Agent attempted to secure a specific operational next step where appropriate.

## J. Documentation — 5%
CRM notes and fields accurately reflect the conversation and next action.

---

# 4. Critical-Fail Items

Some behaviors should override an otherwise strong QA score.

Recommended critical-fail categories:

- misleading identity or implying MWORK is the insurer when it is not,
- knowingly giving false insurance or legal information,
- making an unapproved guarantee about coverage, cost, parts, rental, liability, or timing,
- telling a customer to drive a vehicle after a serious safety concern has been identified,
- materially misrepresenting warranty or program eligibility,
- disrespecting a clear customer request to stop the conversation,
- inaccurate or fabricated CRM documentation.

These should be defined and approved by MWORK leadership/compliance.

---

# 5. QA Should Score Outcomes and Behaviors Separately

An agent can execute a high-quality call and still not convert the customer.

For example:

- the customer may already have authorized repairs elsewhere,
- the vehicle may be a total loss,
- the customer may simply decline,
- or the lead may not be the decision-maker.

Therefore, QA should distinguish:

## Quality score
Did the agent execute the process correctly?

from

## Business outcome
Did the call produce an appointment, tow, rental coordination, or other conversion?

If those are mixed together, managers may incorrectly coach agents to pressure customers simply to improve conversion.

---

# 6. Recommended Performance Metrics

## Contact metrics
- Dial-to-contact rate
- Contact-to-decision-maker rate
- Voicemail rate

## Discovery metrics
- % with claim status captured
- % with driveability captured
- % with repair-facility status captured
- % with rental status captured

## Conversion metrics
- Contact-to-inspection rate
- Contact-to-tow/pickup rate
- Contact-to-qualified-follow-up rate
- Qualified lead-to-repair conversion, where measurable

## Objection metrics
- Objection frequency by type
- Conversion after objection
- Most common first objection
- Most common unresolved objection

## Quality metrics
- Average QA score
- Critical-fail rate
- Documentation-completeness rate
- Compliance-error rate

## Operational metrics
- Time from lead to first contact
- Time from contact to inspection
- Time from non-driveable identification to towing/pickup action
- Follow-up completion rate

---

# 7. Coaching Diagnosis Matrix

## Agent has low contact-to-conversation rate
Review:
- opener length,
- caller identity clarity,
- early trust objections,
- tone and pace.

## Agent gets conversations but few appointments
Review:
- discovery quality,
- benefit matching,
- close specificity,
- whether they are over-explaining.

## Agent talks too much
Review:
- feature dumping,
- failure to ask bridge questions,
- lack of summarization.

## Agent gets many “I’ll think about it” responses
Review:
- whether the true concern was discovered,
- whether the agent asked one final diagnostic question,
- whether value was relevant.

## Agent struggles with insurer-related objections
Review:
- independent-shop positioning,
- approved insurance language,
- confidence distinguishing recommendation from process.

## Agent misses unsafe vehicles
Review:
- driveability decision tree,
- safety-question usage,
- escalation rules.

## Agent creates compliance risk
Review:
- use of absolute promises,
- legal/coverage statements,
- OEM/parts language,
- deductible/rental/program eligibility language.

---

# 8. Recommended Call Review Format

Managers should avoid vague coaching such as:

> “Be more confident.”

Instead use:

### What happened
The customer said they wanted to wait for insurance.

### What the agent did
The agent immediately repeated the MWORK pitch.

### What was missed
The agent never asked whether an adjuster or inspection had already been assigned.

### Better move
Clarify the actual insurance status first.

### Practice question
“What would you ask next if the customer says, ‘I’m waiting for insurance’?”

This creates teachable, repeatable improvement.

---

# 9. Suggested QA Calibration Rules

To keep scoring consistent across managers:

- Use recorded examples for each score level.
- Define exactly what counts as a critical fail.
- Score whether information was obtained, not whether exact wording was used, except for legally required language.
- Do not penalize an agent for skipping a question when the customer already gave the answer.
- Do penalize asking repetitive questions that demonstrate poor listening when persistent.
- Allow natural language variations that preserve approved meaning.
- Review disputed calls in regular calibration sessions.

---

# 10. Suggested Disposition Taxonomy

Keep dispositions mutually understandable and operationally useful.

## Contact outcomes
- No answer
- Voicemail left
- Wrong number
- Wrong party
- Callback requested

## Qualified customer outcomes
- Needs inspection
- Needs tow/pickup
- Needs rental support
- Needs insurance follow-up
- Needs documents
- Already chose MWORK
- Considering MWORK
- Chose another shop
- Repairs already started elsewhere
- Total loss / likely total-loss workflow
- Self-pay opportunity
- Declined

Avoid creating dozens of overlapping dispositions that agents interpret differently.

---

# 11. Recommended Required Fields Before Closing a Record

For a qualified conversation, require as many of these as operationally appropriate:

- decision-maker status,
- vehicle location,
- driveability,
- claim status,
- payor path,
- shop-selection status,
- rental status,
- next action,
- next-action owner,
- follow-up date/time when applicable.

The CRM should support the call flow rather than forcing agents to write the same information repeatedly in free-text notes.

---

# 12. Example QA Interpretation

## High-quality call
The agent quickly identified the customer, showed empathy, learned that the vehicle was non-driveable at a tow yard, confirmed a claim was filed but no inspection was scheduled, established that the customer had not selected a shop, explained MWORK briefly, answered a trust concern with one relevant credential, and moved toward pickup/inspection coordination.

Even if the customer ultimately asks for a callback, this is a strong process call.

## Low-quality call
The agent opens with a long company pitch, ignores the customer's statement that the car is already at another facility, lists eight MWORK benefits, gives an absolute insurance promise, never checks whether repairs started, and ends with “call us if you change your mind.”

The problem is not merely the lack of conversion. The call lacks diagnosis, relevance, control, and a defined next action.

---

# 13. Management Dashboard Concept

A future reporting dashboard could group metrics into:

## Funnel
Leads → contacts → decision-makers → qualified opportunities → inspections/tows → repairs

## Customer state
Driveable / non-driveable / total-loss / already at shop / rental needed

## Objections
Cost / insurer / trust / convenience / switching / timing

## Quality
QA score / compliance / documentation / safety-screen completion

## Follow-up
Callbacks due / overdue / completed / outcome

This would allow managers to distinguish lead-quality problems from agent-skill problems and process bottlenecks.

---

# Final QA Principle

The script becomes valuable at scale only when the organization can answer:

- Did the agent understand the customer's situation?
- Did the agent keep the customer safe?
- Did the agent accurately explain MWORK?
- Did the agent solve the customer's actual concern?
- Did the agent secure or clearly document the next action?

That is the standard the CRM and QA process should reinforce.