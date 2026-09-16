const callStages = [
  {
    id:'opening', title:'Initial Outreach', purpose:'Confirm the customer, identify the vehicle, explain why you are calling, and establish rapport.',
    script:`IS FN - LN THERE?  HELLO FN.  I'M FN \`\`REGARDING THE YR, MAKE, MODEL.  I'M CALLING B/C I CAN S/U A FACILITY FOR INSPECTION & RENTAL IF THAT HASN'T BEEN S/U FOR YOU BY THE (INS CO.)`,
    note:'Ask how they are doing & listen carefully for their immediate needs.',
    quick:['interruptions'],
    choices:[
      {label:'Customer engages normally', note:'Continue to empathy and conversation leadership.'},
      {label:'Customer asks who/why/how', action:'interruptions'},
      {label:'Customer is busy / unable to talk', note:'Arrange an appropriate callback rather than forcing the script.'}
    ]
  },
  {
    id:'care', title:'Establishing Control', purpose:'Respond to the customer naturally, acknowledge the accident, and briefly connect to any immediate need they mention.',
    script:`HOW ARE YOU?  (OH- I HOPE EVERYONE IS OK FROM THE ACCIDENT)`,
    extra:[
      `I'M (HAPPY OR SO SORRY) TO HEAR THAT...ONCE AGAIN MY NAME IS FN & I'M ACTUALLY CALLING IN PART BECAUSE I CAN HELP WITH THAT PLUS GET EVERYTHING MOVING BECAUSE WE HAVE AVAILABILITY`,
      `I'M (HAPPY OR SO SORRY) TO HEAR THAT...ONCE AGAIN MY NAME IS FN & I'M ACTUALLY CALLING BECAUSE WE HAVE AVAILABILITY AND I CAN HELP GET EVERYTHING MOVING.`
    ],
    quick:['interruptions','benefits']
  },
  {
    id:'authority', title:'Decision Maker', purpose:'Confirm you are speaking with the person handling the repairs, insurance coordination, and repair-facility decision.',
    script:`ARE YOU THE PERSON THAT I SHOULD BE DISCUSSING THE REPAIRS AND HANDLING OF THE CLAIM.  ARE YOU THE ONE WORKING WITH THE INSURANCE COMPANY?  ARE YOU THE ONE DECIDING ON WHERE IT WILL BE REPAIRED?`,
    choices:[
      {label:'Yes — decision maker', note:'Continue to mandatory disclosures.'},
      {label:'No — another person decides', note:'Identify the correct decision maker before continuing the sales conversation.'},
      {label:'Shared decision', note:'Continue carefully and identify who else must be involved.'}
    ]
  },
  {
    id:'mandatory', title:'Mandatory Disclosures', purpose:'Required script language. Read these disclosures as written before moving forward.',
    mandatory:true,
    script:`ONCE AGAIN, I''M FN AND CALLING FROM MWORK.  DO YOU KNOW THAT YOU CAN HAVE THE REPAIRS WHERE EVER YOU CHOOSE?  YOU'RE INSURANCE COMPANY MAY HAVE ALREADY DISCUSSED IT WITH YOU.  HAVE YOU CHOSEN A REPAIR FACILITY/BODYSHOP, YET?\n\nMWORK IS AN INDEPENDENT REPAIR FACILITY WORKING DIRECTLY WITH ALL INSURANCE COMPANIES FOR ESTIMATES AND PAYMENTS SO THAT YOU'LL HAVE NO MONEY OUT OF POCKET FOR LABOR AND PARTS, IF YOU'RE GOING THROUGH AN INSURANCE CLAIM, FOR REPAIRS.  THAT MEANS THAT WE ONLY CHARGE THE INSURANCE CONTRACTED RATES, IN OUR AREA, EVEN THOUGH WE'RE FREE TO SET OUR OWN PRICING.`,
    quick:['objections'],
    choices:[
      {label:'No shop chosen', note:'Continue to determine who is paying and then identify the most relevant MWORK value.'},
      {label:'Insurance recommended a shop', action:'objections', filter:'insurance shop'},
      {label:'Already chose / dropped at a shop', action:'objections', filter:'already'},
      {label:'Customer asks about MWORK', action:'benefits'}
    ]
  },
  {
    id:'payer', title:'Determine Who Is Paying', purpose:'Identify whether this is self-pay, the customer’s own policy, or another party’s policy.',
    script:`IS THIS FOR OUT OF POCKET OR THROUGH AN INSURANCE COMPANY\n\nARE YOU TAKING THIS THROUGH YOUR OWN INSURANCE COMPANY NAME OR ASK NAME OF INSURANCE\n\nARE YOU GOING THROUGH SOMEONE ELSES POLICY?`,
    choices:[
      {label:'Own insurance', note:'Capture carrier and claim status.'},
      {label:'Other driver’s insurance', note:'Capture carrier and liability/claim status.'},
      {label:'Out of pocket', note:'Use only applicable non-insured benefits and payment options.'},
      {label:'Not sure yet', note:'Continue discovery; do not assume coverage or liability.'}
    ]
  },
  {
    id:'credibility', title:'MWORK Offers / Build Trust', purpose:'Use the MWORK OFFERS phrasing and select only the credibility points that answer the customer’s actual concern.',
    script:`WHEN SPEAKING ABOUT THE SHOP USE PHRASE "MWORK OFFERS".  YOU CAN MOVE TO WE INSTEAD OF MWORK LATER IN THE CONVERSATION`,
    quick:['benefits','objections'],
    choices:[
      {label:'Trust / reputation concern', action:'benefits', filter:'trust'},
      {label:'Repair quality concern', action:'benefits', filter:'quality'},
      {label:'Transportation concern', action:'benefits', filter:'rental'},
      {label:'Cost / deductible concern', action:'benefits', filter:'cost'}
    ]
  },
  {
    id:'driveability', title:'Determine Driveability', purpose:'Determine whether the vehicle can safely continue on the driveable path or should move to the non-driveable process.',
    script:`IS YOUR VEHICLE DRIVEABLE AND SAFE TO BE ON THE ROAD\n\nLET'S MAKE SURE IT'S DRIVEABLE BY INSURANCE STANDARDS, OK\n\nI JUST NEED TO ASK A FEW QUESTIONS TO SEE WHERE YOU ARE WITH EVERYTHING AND GET THINGS MOVING`,
    extra:[
      'ANY AIRBAGS DEPLOYED', 'ANY BROKEN MIRRORS WINDOWS OR GLASS', 'WHAT ABOUT HEAD AND/OR TAIL LIGHTS  - ARE THEY FUNCTIONING OR IS THERE A PHYSICALLY BROKEN LENSE', 'IS ANYTHING LEAKING FROM THE VEHICLE', 'ARE THE WHEELS AND TIRES SAFE', 'ANY LIGHTS ON THE DASH THAT WERE NOT THERE BEFORE', 'IS THE EXHAUST BENT OR HANGING DOWN', 'IS THE VEHICLE PULLING ONE WAY OR THE OTHER WHEN YOU DRIVE IT', 'WHAT ABOUT THE TRUNK OR LIFT GATE?', 'DOES THE HOOD OPEN & CLOSE PROPERLY', 'DO ALL OF THE DOORS OPEN AND CLOSE PROPERLY'
    ],
    choices:[
      {label:'Non-driveable / unsafe', next:'non-drive'},
      {label:'Driveable / safe', next:'driveable'},
      {label:'Unclear', note:'Complete the applicable safety questions before routing the call.'}
    ]
  },
  {
    id:'non-drive', title:'Explain Process — Non Drive', purpose:'Explain the non-driveable process and determine transportation needs.',
    script:`GOOD NEWS!  WE CAN USUALLY HAVE YOUR VEHICLE PICKED UP WITHIN 1–2 HOURS. THE INSURANCE COMPANY WILL TYPICALLY COMPLETE THE INSPECTION WITHIN 1–2 BUSINESS DAYS, AFTER WHICH WE CAN ORDER PARTS AND PROCEED WITH REPAIRS. IF THE INSURANCE COMPANY DEEMS YOUR VEHICLE A TOTAL LOSS (TTL), THEY WILL NOTIFY YOU, ARRANGE TO PICK IT UP FROM US, TRANSPORT IT TO A SALVAGE YARD, AND PROVIDE YOU WITH THE REPLACEMENT VALUE.\n\nDO YOU HAVE ANYTHING ELSE TO DRIVE WHILE THE REPAIRS ARE BEING COMPLETED?`,
    quick:['benefits','objections'],
    choices:[
      {label:'Needs rental / transportation', action:'benefits', filter:'rental'},
      {label:'Concerned about total loss', action:'benefits', filter:'total loss'},
      {label:'Ready to move forward', next:'closing'}
    ]
  },
  {
    id:'driveable', title:'Explain Process — Driveable', purpose:'Continue the estimate path and determine whether alternate transportation or rental support is needed.',
    script:`DO YOU HAVE ANYTHING ELSE TO DRIVE WHILE THE REPAIRS ARE BEING COMPLETED?`,
    quick:['benefits','objections'],
    choices:[
      {label:'Needs rental', action:'benefits', filter:'rental'},
      {label:'Has other transportation', next:'discovery'},
      {label:'Raises concern / objection', action:'objections'}
    ]
  },
  {
    id:'discovery', title:'Opening / Directional Questions', purpose:'Fill in the current state of the claim, vehicle, rental, documentation, and customer experience.',
    script:`WHERE IS YOUR VEHICLE, RIGHT NOW?\nHAVE YOU FILED A CLAIM\nHAS ANYONE REACHED OUT FROM INSURANCE TO GET E'THING MOVING\nHAS ANYONE S/U A RENTAL OR DO YOU HAVE SOMETHING ELSE TO DRIVE\nHAVE YOU BEEN GETTING ALOT OF PHONE CALLS ABOUT THIS\nWERE THERE ANY CARSEATS IN THE VEHICLE AT THE TIME OF THE COLLISION\nDO YOU HAVE A COPY OF THE CRASH REPORT OR DO YOU NEED ONE -\nHAVE YOU BEEN IN AN ACCIDENT BEFORE`,
    quick:['interruptions','benefits','objections']
  },
  {
    id:'closing', title:'Closing / Next Action', purpose:'End with one clear operational outcome: inspection, tow, rental coordination, document exchange, or scheduled follow-up.',
    script:`CLOSING QUESTIONS`,
    quick:['objections','benefits'],
    choices:[
      {label:'Schedule inspection', note:'Confirm the agreed inspection next step.'},
      {label:'Arrange tow / pickup', note:'Confirm vehicle location and operational handoff.'},
      {label:'Rental coordination', note:'Confirm what will happen next and who owns it.'},
      {label:'Scheduled callback', note:'Set a specific follow-up time.'},
      {label:'Customer declines', note:'Respect the decision and document the disposition.'}
    ]
  }
];

const interruptions = [
  {q:'WHO TOLD YOU TO CALL ME', response:`WE'RE CALLING FROM MWORK BECAUSE WE HAVE AVAILABILITY FOR YOUR YR MAKE MODEL`, stages:['opening','care','discovery']},
  {q:'ARE YOU WITH MY INS CO / DID THE INS CO TELL YOU TO CALL ME', response:`WE WORK INDEPENDENTLY WITH ALL INSURANCE COMPANIES FOR ESTIMATES AND PAYMENTS.  THIS IS HOW WE'VE CHOSEN TO MARKET.  WE CALL AFTER AN ACCIDENT TO LET YOU KNOW THAT WE HAVE AVAILABILITY AND WORK WITH ALL INSURANCE COMPANIES.`, stages:['opening','care','discovery']},
  {q:`I'M JUST GOING TO TALK TO INSURANCE 1ST`, response:`THIS IS HOW WE'VE CHOSEN TO MARKET.  WE CALL AFTER AN ACCIDENT TO LET YOU KNOW THAT WE HAVE AVAILABILITY AND WORK WITH ALL INSURANCE COMPANIES.`, stages:['opening','care','discovery']},
  {q:'HOW DID YOU GET MY INFO AND/OR PHONE NUMBER', response:`FROM THE CRASH REPORT - PUBLIC RECORD.  I CAN SEND A COPY IF YOU DON'T HAVE IT YET?  DO YOU HAVE IT?`, stages:['opening','care','discovery']},
  {q:'WHO ARE YOU', response:`ONCE AGAIN LET ME PROPERLY INTRODUCE MYSELF.  MY NAME IS FN.  I'M WITH MWORK AUTOBODY AND WE HAVE AVAILABILITY, THAT'S WHY i'M REACHING OUT TO YOU`, stages:['opening','care','discovery']},
  {q:'WHY ARE YOU CALLING', response:`BECAUSE I CAN SET UP A FACILITY FOR INSPECTION AND A RENTAL IF NOT YET SET UP BY INSURANCE`, stages:['opening','care','discovery']},
  {q:'I AM AT WORK / I CANNOT TALK RIGHT NOW', response:`No source-script response is provided for this exact interruption. Recommended system behavior: acknowledge, avoid forcing the call, and schedule a callback.`, assumed:true, stages:['opening']},
  {q:'IS THIS A SALES CALL?', response:`No exact source-script response is provided. Suggested scenario response should identify MWORK, explain the accident-related reason for the call, and return to whether inspection/rental has already been arranged.`, assumed:true, stages:['opening','care']},
  {q:'PLEASE STOP CALLING ME', response:`No exact source-script response is provided. The agent should stop the sales flow and follow the organization’s approved opt-out / do-not-call procedure.`, assumed:true, stages:['opening','care','discovery']}
];

const objections = [
  {q:'MY INSURANCE TOLD ME TO GO TO THEIR SHOP', means:'THEY TRUST THE INSURER / DEFAULTING TO AUTHORITY', response:`THAT’S VERY COMMON — THEY USUALLY RECOMMEND SHOPS THEY HAVE AGREEMENTS WITH. JUST SO YOU KNOW, YOU’RE NOT REQUIRED TO GO THERE.\n\nYOU HAVE THE LEGAL RIGHT TO CHOOSE WHERE YOUR VEHICLE IS REPAIRED.`, tags:['insurance shop','choice']},
  {q:`THEY SAID IT’LL BE FASTER IF I USE THEIR SHOP`, means:'THEY VALUE SPEED / CONVENIENCE', response:`WHAT THEY MEAN IS THAT SHOP WORKS UNDER THEIR SYSTEM — NOT NECESSARILY THAT THE REPAIR ITSELF IS FASTER OR BETTER.\n\nFASTER DOESN’T ALWAYS MEAN CORRECT, ESPECIALLY WITH STRUCTURAL OR SAFETY REPAIRS.`, tags:['speed','insurance shop']},
  {q:`THEY SAID THEY CAN’T GUARANTEE REPAIRS IF I DON’T USE THEIR SHOP`, means:'FEAR-BASED COMPLIANCE (CLASSIC STEERING)', response:`THEY CAN’T DENY YOUR CLAIM OR COVERAGE BASED ON WHERE YOU REPAIR — THAT’S A COMMON MISUNDERSTANDING.\n\nTHE SHOP DOING THE WORK IS RESPONSIBLE FOR THE REPAIR QUALITY — NOT THE INSURANCE COMPANY.`, tags:['insurance shop','coverage']},
  {q:'I ALREADY HAVE AN ESTIMATE FROM THEIR SHOP', means:'THEY THINK THE DECISION IS ALREADY MADE', response:`THAT’S JUST ONE ESTIMATE — IT’S NOT BINDING, AND IT DOESN’T MEAN REPAIRS HAVE TO HAPPEN THERE.\n\nYOU CAN STILL MOVE THE VEHICLE AND HAVE IT REPAIRED ANYWHERE YOU CHOOSE.`, tags:['already','estimate']},
  {q:'I JUST WANT TO GO THROUGH INSURANCE AND KEEP IT SIMPLE', means:'AVOIDING COMPLEXITY', response:`ABSOLUTELY — AND WE STILL WORK DIRECTLY WITH YOUR INSURANCE THE SAME WAY.\n\nIF IT’S JUST AS EASY EITHER WAY, WOULD YOU RATHER CONTROL THE OUTCOME?`, tags:['insurance','simplicity']},
  {q:`I DON’T WANT TO PAY ANYTHING OUT OF POCKET`, means:'COST FEAR', response:`UNDERSTOOD — YOUR POLICY DETERMINES WHAT’S COVERED, REGARDLESS OF THE SHOP.\n\nWE COORDINATE DIRECTLY WITH YOUR INSURANCE TO KEEP EVERYTHING WITHIN THE CLAIM JUST LIKE ANY OTHER FACILITY.`, tags:['cost','coverage']},
  {q:`I’LL JUST WAIT AND SEE WHAT INSURANCE SAYS`, means:'DELAY / UNCERTAINTY', response:`THAT’S USUALLY WHEN DECISIONS GET MADE FOR YOU — ESPECIALLY WITH TOWING, STORAGE, OR INSPECTIONS.\n\nTHE EARLIER YOU CHOOSE YOUR SHOP, THE MORE CONTROL YOU KEEP OVER THE PROCESS.`, tags:['delay','insurance']},
  {q:`I’VE ALREADY DROPPED THE CAR OFF AT THEIR SHOP`, means:'FEELS COMMITTED / STUCK', response:`THAT HAPPENS A LOT — BUT YOU CAN STILL MOVE YOUR VEHICLE AT ANY TIME.\n\nIT’S YOUR VEHICLE — NOT THEIRS, NOT THE INSURANCE COMPANY’S.`, tags:['already','switching']},
  {q:`I’VE NEVER HEARD OF YOUR SHOP`, means:'TRUST BARRIER', response:`THAT’S FAIR — WE’RE AN INDEPENDENT FACILITY, NOT TIED TO ONE INSURANCE COMPANY.\n\nWE WORK WITH ALL INSURANCE COMPANIES EQUALLY — OUR FOCUS IS THE REPAIR, NOT THEIR PRICING AGREEMENTS.`, tags:['trust']},
  {q:'I JUST WANT TO DO WHATEVER INSURANCE RECOMMENDS', means:'PASSIVE / AVOIDS DECISION-MAKING', response:`A LOT OF PEOPLE FEEL THAT WAY AT FIRST — UNTIL THEY UNDERSTAND THEY’RE ALLOWED TO CHOOSE.\n\nINSURANCE RECOMMENDATIONS ARE BASED ON THEIR AGREEMENTS — NOT NECESSARILY YOUR BEST OUTCOME.`, tags:['insurance shop','choice']},
  {q:'IS THIS GOING TO DELAY MY RENTAL CAR?', means:'LOGISTICS CONCERN', response:`NO — RENTAL COVERAGE IS PART OF YOUR CLAIM, NOT TIED TO A SPECIFIC SHOP.\n\nWE HELP COORDINATE RENTAL JUST LIKE ANY INSURANCE-RECOMMENDED FACILITY.`, tags:['rental']},
  {q:`I DON’T WANT TO DEAL WITH SWITCHING SHOPS`, means:'FRICTION AVOIDANCE', response:`WE HANDLE THAT FOR YOU — INCLUDING COORDINATION AND TRANSPORT IF NEEDED.\n\nIT’S USUALLY A SIMPLE PROCESS ONCE IT’S STARTED.`, tags:['switching']},
  {q:`I’LL THINK ABOUT IT`, means:'SOFT NO / NEEDS DIRECTION', response:`OF COURSE — MOST PEOPLE JUST WANT TO MAKE SURE THEY’RE MAKING THE RIGHT CHOICE.\n\nTHE MAIN THING IS KNOWING YOU DO HAVE A CHOICE BEFORE ANYTHING MOVES FORWARD.`, tags:['soft no']},
  {q:'MY INSURANCE SAID THEY WON’T PAY FOR ANYTHING OR I MIGHT HAVE MONEY OUT OF POCKET IF I GO WITH YOUR SHOP', means:'FEAR OF UNEXPECTED COST / PRESSURE TO STAY IN-NETWORK', response:`I UNDERSTAND WHY THAT WOULD CONCERN YOU — WHAT THEY’RE REFERRING TO IS THEIR PRICING GUIDELINES, NOT YOUR RIGHT TO CHOOSE A REPAIR FACILITY.\n\nYOUR POLICY COVERAGE DOESN’T CHANGE BASED ON THE SHOP YOU CHOOSE — THE CLAIM IS STILL THE CLAIM.`, tags:['cost','coverage','insurance shop']},
  {q:'HOW LONG WILL MY REPAIR TAKE?', means:'TIMELINE / TRANSPORTATION CONCERN', response:'This exact objection is not answered in the source objection table. Suggested system behavior: do not invent a completion date; explain the known process and use approved timing guidance only when applicable.', assumed:true, tags:['speed']},
  {q:'CAN YOU MATCH THE INSURANCE ESTIMATE?', means:'PRICE / CLAIM CONCERN', response:'This exact objection is not in the source objection table. Route the agent back to the approved MWORK pricing / insurer-coordination language rather than improvising a guarantee.', assumed:true, tags:['cost','estimate']},
  {q:'DO I HAVE TO MOVE MY CAR TODAY?', means:'PRESSURE / LOGISTICS CONCERN', response:'This exact objection is not in the source. Suggested system behavior: identify vehicle location, safety, storage/towing circumstances, and customer preference before presenting the next action.', assumed:true, tags:['switching','delay']}
];

const benefits = [
  {name:'Single Lifetime Warranty', body:'SINGLE LIFETIME WARRANTY FOR ALL REPAIRS AND PAINT. SINGLE LIFETIME -THE WARRANTY DOES NOT TRANSFER IF OWNERSHIP CHANGES', tags:['trust','quality']},
  {name:'Full Service Repair Facility', body:'FULL SERVICE REPAIR FACILITY & WE DO MOST REPAIRS INHOUSE. BODYWORK, MECHANICAL, SUSPENSION, PAINT AND FRAME.', tags:['quality','speed']},
  {name:'Gold Class / I-CAR Platinum', body:'GOLD CLASS & I CAR PLATINUM CERTIFIED', tags:['trust','quality']},
  {name:'ASA Certified', body:'ASA CERTIFIED', tags:['trust','quality']},
  {name:'Ohio Locations / Experience', body:'SEVERAL LOCATIONS ALL OVER OHIO AND OVER 10 YEARS IN BUSINESS', tags:['trust']},
  {name:'Manufacturer Warranty on Parts', body:'PARTS COVERED UNDER MANUFACTURER WARRANTY', tags:['quality']},
  {name:'Deductible Assistance', body:'DIMINISHING DEDUCTIBLE UP TO $500 BASED ON THE DAMAGE TO YOUR VEHICLE FOR MWORK CLIENTS', tags:['cost']},
  {name:'Onsite Rental', body:'ONSITE RENTAL CARS AVAILABLE AT SELECT LOCATIONS', tags:['rental']},
  {name:'Total Loss Support', body:'HELP NEGOTIATING A TOTAL LOSS', tags:['total loss']},
  {name:'Buyback Program', body:`BECAUSE WE'RE INDEPENDENT WE CAN HAVE A BUYBACK PROGRAM FOR OUR COMMUNITY`, tags:['total loss']},
  {name:'Manufacturer Certified', body:'FORD  SUBARU  HONDA  ACURA GMC GM CADILLIC  CHEVROLET  BUICK', tags:['trust','quality']},
  {name:'Tesla Capability', body:'WE SPECIALIZE IN TESLA AND HAVE ALL OF THE PROPER EQUIPMENT REQUIRED TO WORK ON THEM', tags:['quality','trust']},
  {name:'Insurance-Friendly Process', body:'Hassle-free claims processing with all major providers. Works directly with insurance - helps handle insurance claims, estimates, and paperwork, which makes the repair process easier and less stressful for customers.', tags:['insurance','simplicity']},
  {name:'24/7 Towing Service', body:'Accidents and breakdowns can happen anytime, and we’re here to help around the clock.', tags:['transport','non-drive']}
];

let currentStage = 0;
let maxUnlocked = 0;

const $ = (id)=>document.getElementById(id);
const layout = document.querySelector('.layout');

function substitute(text){
  const a=$('agentName').value.trim()||'FN';
  const cf=$('customerFirst').value.trim()||'FN';
  const cl=$('customerLast').value.trim()||'LN';
  const v=$('vehicle').value.trim()||'YR, MAKE, MODEL';
  const ins=$('insurance').value.trim()||'INS CO.';
  return text.replaceAll('FN - LN',`${cf} - ${cl}`).replaceAll('HELLO FN',`HELLO ${cf}`).replaceAll("I'M FN",`I'M ${a}`).replaceAll('YR, MAKE, MODEL',v).replaceAll('(INS CO.)',`(${ins})`).replaceAll('INS CO.',ins);
}

function renderNav(){
  $('stageNav').innerHTML=callStages.map((s,i)=>`<button class="stage-link ${i===currentStage?'active':''} ${i>maxUnlocked?'locked':''}" data-i="${i}">${i+1}. ${s.title}</button>`).join('');
  document.querySelectorAll('.stage-link').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(i<=maxUnlocked){currentStage=i;renderStage();}});
}

function renderStage(){
  const s=callStages[currentStage];
  $('stageNumber').textContent=`STEP ${currentStage+1} OF ${callStages.length}`;
  $('stageTitle').textContent=s.title;
  $('stagePurpose').textContent=s.purpose;
  $('scriptCard').className=`script-card ${s.mandatory?'mandatory-card':''}`;
  $('scriptCard').innerHTML=`${s.mandatory?'<div class="mandatory-badge">MANDATORY — READ AS WRITTEN</div>':''}<div class="script-label">AGENT SCRIPT</div><div class="script-text">${escapeHtml(substitute(s.script))}</div>${s.note?`<div class="context-card" style="margin-top:16px"><p>${escapeHtml(s.note)}</p></div>`:''}${s.extra?`<div class="context-card" style="margin-top:16px"><h4>Continue / applicable questions</h4>${s.extra.map(x=>`<p style="margin-top:8px">${escapeHtml(substitute(x))}</p>`).join('')}</div>`:''}`;
  renderChoices(s);
  $('contextArea').innerHTML=s.quick?`<div class="tag-row">${s.quick.map(q=>`<button class="choice-button" data-tool="${q}">${q[0].toUpperCase()+q.slice(1)}</button>`).join('')}</div>`:'';
  document.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>openDrawer(b.dataset.tool));
  $('previousStage').disabled=currentStage===0;
  $('nextStage').textContent=currentStage===callStages.length-1?'Finish':'Next';
  maxUnlocked=Math.max(maxUnlocked,currentStage);
  const pct=Math.round((currentStage/(callStages.length-1))*100);
  $('progressText').textContent=`${pct}%`;
  $('progressBar').style.width=`${pct}%`;
  $('callStatusText').textContent=s.title;
  document.querySelector('.status-dot').style.background='#22c55e';
  renderNav();
}

function renderChoices(s){
  if(!s.choices){$('choiceArea').innerHTML='';return;}
  $('choiceArea').innerHTML=`<div class="script-label">CUSTOMER RESPONSE / ROUTE</div><div class="choice-grid">${s.choices.map((c,i)=>`<button class="choice-button" data-choice="${i}">${c.label}</button>`).join('')}</div>`;
  document.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{
    const c=s.choices[+b.dataset.choice];
    if(c.action) openDrawer(c.action,c.filter);
    if(c.note) $('contextArea').innerHTML=`<div class="context-card"><h4>Agent guidance</h4><p>${escapeHtml(c.note)}</p></div>`;
    if(c.next){const n=callStages.findIndex(x=>x.id===c.next);if(n>=0){maxUnlocked=Math.max(maxUnlocked,n);currentStage=n;renderStage();}}
  });
}

function openDrawer(type,filter=''){
  const map={interruptions:['EARLY INTERRUPTION','Quick response'],objections:['OBJECTIONS','Select what the customer said'],benefits:['MWORK BENEFITS','Choose only what fits the customer need']};
  $('drawerKicker').textContent=map[type][0];$('drawerTitle').textContent=map[type][1];
  let items=type==='interruptions'?interruptions:type==='objections'?objections:benefits;
  if(filter) items=items.filter(x=>(x.tags||[]).some(t=>t.includes(filter))||JSON.stringify(x).toLowerCase().includes(filter.toLowerCase()));
  $('drawerContent').innerHTML=items.map((x,i)=>`<div class="drawer-item"><button data-expand="${i}"><h3>${escapeHtml(x.q||x.name)}</h3>${x.means?`<p>${escapeHtml(x.means)}</p>`:''}${x.assumed?'<div class="tag-row"><span class="tag">ASSUMED SCENARIO</span></div>':''}</button><div class="response-box hidden" id="resp-${i}">${escapeHtml(substitute(x.response||x.body))}</div>${x.tags?`<div class="tag-row">${x.tags.map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>`:''}</div>`).join('') || '<p>No matching items.</p>';
  layout.classList.add('drawer-open');$('drawer').setAttribute('aria-hidden','false');
  document.querySelectorAll('[data-expand]').forEach(b=>b.onclick=()=>{document.querySelector(`#resp-${b.dataset.expand}`).classList.toggle('hidden');});
}

function escapeHtml(str){return String(str).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

$('startCall').onclick=()=>{$('startPanel').classList.add('hidden');$('callPanel').classList.remove('hidden');currentStage=0;maxUnlocked=0;renderStage();};
$('restartCall').onclick=()=>location.reload();
$('previousStage').onclick=()=>{if(currentStage>0){currentStage--;renderStage();}};
$('nextStage').onclick=()=>{if(currentStage<callStages.length-1){maxUnlocked=Math.max(maxUnlocked,currentStage+1);currentStage++;renderStage();}else{$('callStatusText').textContent='Call flow completed';document.querySelector('.status-dot').style.background='#f59e0b';}};
$('showInterruptions').onclick=()=>openDrawer('interruptions');
$('showObjections').onclick=()=>openDrawer('objections');
$('showBenefits').onclick=()=>openDrawer('benefits');
$('closeDrawer').onclick=()=>{layout.classList.remove('drawer-open');$('drawer').setAttribute('aria-hidden','true');};
renderNav();