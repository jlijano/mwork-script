const callStages = [
  {
    id:'opening', title:'Initial Outreach', purpose:'Confirm the customer, identify the vehicle, explain why you are calling, and establish rapport.',
    script:`IS FN - LN THERE?  HELLO FN.  I'M FN \`\`REGARDING THE YR, MAKE, MODEL.  I'M CALLING B/C I CAN S/U A FACILITY FOR INSPECTION & RENTAL IF THAT HASN'T BEEN S/U FOR YOU BY THE (INS CO.)`,
    note:'Ask how they are doing & listen carefully for their immediate needs.',
    quick:['interruptions'],
    choices:[
      {label:'Customer engages normally', note:'Continue to empathy and conversation leadership.'},
      {label:'Customer asks who / why / how', action:'interruptions'},
      {label:'Customer is busy / unable to talk', action:'interruptions', filter:'cannot talk'}
    ]
  },
  {
    id:'care', title:'Establishing Control', purpose:'Respond naturally, acknowledge the accident, and briefly connect to any immediate need they mention.',
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
      {label:'No — another person decides', note:'Identify the correct decision maker before continuing.'},
      {label:'Shared decision', note:'Continue carefully and identify who else must be involved.'}
    ]
  },
  {
    id:'mandatory', title:'Mandatory Disclosures', purpose:'Required source-script language. Read these disclosures as written before moving forward.',
    mandatory:true,
    script:`ONCE AGAIN, I''M FN AND CALLING FROM MWORK.  DO YOU KNOW THAT YOU CAN HAVE THE REPAIRS WHERE EVER YOU CHOOSE?  YOU'RE INSURANCE COMPANY MAY HAVE ALREADY DISCUSSED IT WITH YOU.  HAVE YOU CHOSEN A REPAIR FACILITY/BODYSHOP, YET?\n\nMWORK IS AN INDEPENDENT REPAIR FACILITY WORKING DIRECTLY WITH ALL INSURANCE COMPANIES FOR ESTIMATES AND PAYMENTS SO THAT YOU'LL HAVE NO MONEY OUT OF POCKET FOR LABOR AND PARTS, IF YOU'RE GOING THROUGH AN INSURANCE CLAIM, FOR REPAIRS.  THAT MEANS THAT WE ONLY CHARGE THE INSURANCE CONTRACTED RATES, IN OUR AREA, EVEN THOUGH WE'RE FREE TO SET OUR OWN PRICING.`,
    quick:['objections'],
    choices:[
      {label:'No shop chosen', note:'Continue to determine who is paying.'},
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
      {label:'Other driver’s insurance', note:'Capture carrier and liability / claim status.'},
      {label:'Out of pocket', note:'Use applicable non-insured benefits only.'},
      {label:'Not sure yet', note:'Continue discovery; do not assume coverage or liability.'}
    ]
  },
  {
    id:'credibility', title:'MWORK Offers / Build Trust', purpose:'Use “MWORK OFFERS” phrasing and choose only benefits relevant to the customer’s actual concern.',
    script:`WHEN SPEAKING ABOUT THE SHOP USE PHRASE "MWORK OFFERS".  YOU CAN MOVE TO WE INSTEAD OF MWORK LATER IN THE CONVERSATION`,
    quick:['benefits','objections']
  },
  {
    id:'driveability', title:'Determine Driveability', purpose:'Determine whether the vehicle can safely continue on the driveable path or should move to the non-driveable process.',
    script:`IS YOUR VEHICLE DRIVEABLE AND SAFE TO BE ON THE ROAD\n\nLET'S MAKE SURE IT'S DRIVEABLE BY INSURANCE STANDARDS, OK\n\nI JUST NEED TO ASK A FEW QUESTIONS TO SEE WHERE YOU ARE WITH EVERYTHING AND GET THINGS MOVING`,
    extra:[
      'ANY AIRBAGS DEPLOYED','ANY BROKEN MIRRORS WINDOWS OR GLASS','WHAT ABOUT HEAD AND/OR TAIL LIGHTS  - ARE THEY FUNCTIONING OR IS THERE A PHYSICALLY BROKEN LENSE','IS ANYTHING LEAKING FROM THE VEHICLE','ARE THE WHEELS AND TIRES SAFE','ANY LIGHTS ON THE DASH THAT WERE NOT THERE BEFORE','IS THE EXHAUST BENT OR HANGING DOWN','IS THE VEHICLE PULLING ONE WAY OR THE OTHER WHEN YOU DRIVE IT','WHAT ABOUT THE TRUNK OR LIFT GATE?','DOES THE HOOD OPEN & CLOSE PROPERLY','DO ALL OF THE DOORS OPEN AND CLOSE PROPERLY'
    ],
    choices:[
      {label:'Non-driveable / unsafe', next:'non-drive'},
      {label:'Driveable / safe', next:'driveable'},
      {label:'Unclear', note:'Complete applicable safety questions before routing the call.'}
    ]
  },
  {
    id:'non-drive', title:'Explain Process — Non Drive', purpose:'Explain the non-driveable process and determine transportation needs.',
    script:`GOOD NEWS!  WE CAN USUALLY HAVE YOUR VEHICLE PICKED UP WITHIN 1–2 HOURS. THE INSURANCE COMPANY WILL TYPICALLY COMPLETE THE INSPECTION WITHIN 1–2 BUSINESS DAYS, AFTER WHICH WE CAN ORDER PARTS AND PROCEED WITH REPAIRS. IF THE INSURANCE COMPANY DEEMS YOUR VEHICLE A TOTAL LOSS (TTL), THEY WILL NOTIFY YOU, ARRANGE TO PICK IT UP FROM US, TRANSPORT IT TO A SALVAGE YARD, AND PROVIDE YOU WITH THE REPLACEMENT VALUE.\n\nDO YOU HAVE ANYTHING ELSE TO DRIVE WHILE THE REPAIRS ARE BEING COMPLETED?`,
    quick:['benefits','objections']
  },
  {
    id:'driveable', title:'Explain Process — Driveable', purpose:'Continue the estimate path and determine whether alternate transportation or rental support is needed.',
    script:`DO YOU HAVE ANYTHING ELSE TO DRIVE WHILE THE REPAIRS ARE BEING COMPLETED?`,
    quick:['benefits','objections']
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
      {label:'Rental coordination', note:'Confirm what happens next and who owns it.'},
      {label:'Scheduled callback', note:'Set a specific follow-up time.'},
      {label:'Customer declines', note:'Respect the decision and document the disposition.'}
    ]
  }
];

const voicemailScript = `THIS MESSAGE IS FOR FN, LN.  MY NAME IS FN.  I'M REACHING OUT REGARDING THE YR, MAKE, MODEL BECAUSE I CAN S/U A FACILITY FOR INSPECTION AND A RENTAL (VEHICLE) IF NOT YET S/U THROUGH (*INS CO.)  MY PH# IS -------, ONCE AGAIN THAT'S ----------  PLEASE RETURN THIS CALL AS AS SOON AS YOUR READY TO GET E'THING MOVING.  I'M HERE TO HELP.`;

const interruptions = [
  {q:'WHO TOLD YOU TO CALL ME', response:`WE'RE CALLING FROM MWORK BECAUSE WE HAVE AVAILABILITY FOR YOUR YR MAKE MODEL`, stages:['opening','care','discovery']},
  {q:'ARE YOU WITH MY INS CO / DID THE INS CO TELL YOU TO CALL ME', response:`WE WORK INDEPENDENTLY WITH ALL INSURANCE COMPANIES FOR ESTIMATES AND PAYMENTS.  THIS IS HOW WE'VE CHOSEN TO MARKET.  WE CALL AFTER AN ACCIDENT TO LET YOU KNOW THAT WE HAVE AVAILABILITY AND WORK WITH ALL INSURANCE COMPANIES.`, stages:['opening','care','discovery']},
  {q:`I'M JUST GOING TO TALK TO INSURANCE 1ST`, response:`THIS IS HOW WE'VE CHOSEN TO MARKET.  WE CALL AFTER AN ACCIDENT TO LET YOU KNOW THAT WE HAVE AVAILABILITY AND WORK WITH ALL INSURANCE COMPANIES.`, stages:['opening','care','discovery']},
  {q:'HOW DID YOU GET MY INFO AND/OR PHONE NUMBER', response:`FROM THE CRASH REPORT - PUBLIC RECORD.  I CAN SEND A COPY IF YOU DON'T HAVE IT YET?  DO YOU HAVE IT?`, stages:['opening','care','discovery']},
  {q:'WHO ARE YOU', response:`ONCE AGAIN LET ME PROPERLY INTRODUCE MYSELF.  MY NAME IS FN.  I'M WITH MWORK AUTOBODY AND WE HAVE AVAILABILITY, THAT'S WHY i'M REACHING OUT TO YOU`, stages:['opening','care','discovery']},
  {q:'WHY ARE YOU CALLING', response:`BECAUSE I CAN SET UP A FACILITY FOR INSPECTION AND A RENTAL IF NOT YET SET UP BY INSURANCE`, stages:['opening','care','discovery']},
  {q:'I AM AT WORK / I CANNOT TALK RIGHT NOW', response:`I UNDERSTAND. I DON'T WANT TO HOLD YOU UP. WHAT WOULD BE A BETTER TIME FOR ME TO GIVE YOU A QUICK CALL BACK ABOUT YOUR VEHICLE AND THE NEXT STEPS AFTER THE ACCIDENT?`, assumed:true, stages:['opening']},
  {q:'IS THIS A SALES CALL?', response:`I'M CALLING FROM MWORK AUTOBODY REGARDING YOUR VEHICLE AFTER THE ACCIDENT. WE HAVE AVAILABILITY AND CAN HELP WITH THE INSPECTION AND RENTAL PROCESS IF THAT HASN'T ALREADY BEEN SET UP. HAS INSURANCE ALREADY ARRANGED THOSE FOR YOU?`, assumed:true, stages:['opening','care']},
  {q:'PLEASE STOP CALLING ME', response:`UNDERSTOOD. I'LL END THE CALL HERE. THANK YOU FOR YOUR TIME.`, assumed:true, stages:['opening','care','discovery']},
  {q:'I ALREADY HAVE A BODY SHOP', response:`UNDERSTOOD. HAS THE VEHICLE ALREADY BEEN DROPPED OFF THERE, OR HAVE YOU ONLY SELECTED THE SHOP SO FAR?`, assumed:true, stages:['opening','care','discovery']},
  {q:'I AM NOT THE OWNER / WRONG PERSON', response:`THANK YOU FOR LETTING ME KNOW. ARE YOU ABLE TO TELL ME WHO IS HANDLING THE REPAIRS OR WHO I SHOULD SPEAK WITH REGARDING THE VEHICLE?`, assumed:true, stages:['opening','authority']}
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
  {q:'HOW LONG WILL MY REPAIR TAKE?', means:'TIMELINE / TRANSPORTATION CONCERN', response:`THAT'S A FAIR QUESTION. THE EXACT REPAIR TIME DEPENDS ON THE DAMAGE, INSPECTION, PARTS, AND WHAT WE FIND ONCE THE VEHICLE IS FULLY ASSESSED. WHAT I CAN DO IS HELP GET THE INSPECTION PROCESS MOVING SO WE CAN GIVE YOU A MORE ACCURATE TIMELINE.`, assumed:true, tags:['speed']},
  {q:'CAN YOU MATCH THE INSURANCE ESTIMATE?', means:'PRICE / CLAIM CONCERN', response:`WE WORK DIRECTLY WITH INSURANCE COMPANIES FOR ESTIMATES AND PAYMENTS. ONCE WE REVIEW THE VEHICLE AND THE INSURANCE ESTIMATE, WE CAN ADDRESS ANY DIFFERENCES THROUGH THE NORMAL CLAIM AND SUPPLEMENT PROCESS.`, assumed:true, tags:['cost','estimate']},
  {q:'DO I HAVE TO MOVE MY CAR TODAY?', means:'PRESSURE / LOGISTICS CONCERN', response:`NOT NECESSARILY. FIRST, LET'S CONFIRM WHERE THE VEHICLE IS AND WHETHER IT'S SAFE TO DRIVE. THEN WE CAN WALK THROUGH THE MOST PRACTICAL NEXT STEP FOR THE INSPECTION OR TRANSPORT.`, assumed:true, tags:['switching','delay']},
  {q:'I NEED TO SPEAK WITH MY SPOUSE / FAMILY FIRST', means:'SHARED DECISION', response:`ABSOLUTELY. I WANT EVERYONE INVOLVED IN THE DECISION TO BE COMFORTABLE. WHAT INFORMATION WOULD BE MOST HELPFUL FOR YOU TO REVIEW WITH THEM, AND WHEN WOULD BE A GOOD TIME FOR ME TO FOLLOW UP?`, assumed:true, tags:['delay','decision']}
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

let currentStage=0;
let maxUnlocked=0;
let currentDrawerType=null;
let currentDrawerFilter='';
const $=id=>document.getElementById(id);
const layout=document.querySelector('.layout');

function getCallType(){return document.querySelector('input[name="callType"]:checked')?.value||'outbound';}
function session(){return {agent:$('agentName').value.trim()||'FN',first:$('customerFirst').value.trim()||'FN',last:$('customerLast').value.trim()||'LN',phone:$('customerPhone').value.trim()||'',vehicle:$('vehicle').value.trim()||'YR, MAKE, MODEL',insurance:$('insurance').value.trim()||'INS CO.'};}
function substitute(text){const s=session();return String(text).replaceAll('FN - LN',`${s.first} - ${s.last}`).replaceAll('FN, LN',`${s.first}, ${s.last}`).replaceAll('HELLO FN',`HELLO ${s.first}`).replaceAll("I'M FN",`I'M ${s.agent}`).replaceAll('MY NAME IS FN',`MY NAME IS ${s.agent}`).replaceAll('YR, MAKE, MODEL',s.vehicle).replaceAll('YR MAKE MODEL',s.vehicle).replaceAll('(INS CO.)',`(${s.insurance})`).replaceAll('(*INS CO.)',`(${s.insurance})`).replaceAll('INS CO.',s.insurance);}
function escapeHtml(str){return String(str).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

function renderSummary(){const s=session();$('sessionSummary').innerHTML=[s.first+' '+s.last,s.phone,s.vehicle,s.insurance].filter(Boolean).map(x=>`<span class="summary-pill">${escapeHtml(x)}</span>`).join('');}
function renderNav(){const isVM=getCallType()==='voicemail';$('stageNav').innerHTML=isVM?'<button class="stage-link active">Voicemail</button>':callStages.map((s,i)=>`<button class="stage-link ${i===currentStage?'active':''} ${i>maxUnlocked?'locked':''}" data-i="${i}">${i+1}. ${s.title}</button>`).join('');document.querySelectorAll('.stage-link[data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(i<=maxUnlocked){currentStage=i;renderStage();}});}

function renderVoicemail(){
  renderSummary();
  $('stageNumber').textContent='VOICEMAIL';
  $('stageTitle').textContent='Voicemail Script';
  $('stagePurpose').textContent='Read the voicemail script as written, using the customer and vehicle details entered during setup.';
  $('scriptCard').className='script-card voicemail-card';
  $('scriptCard').innerHTML=`<div class="script-label">VOICEMAIL SCRIPT</div><div class="script-text">${escapeHtml(substitute(voicemailScript))}</div><div class="context-card" style="margin-top:16px"><p>Practice until natural. Repeat the phone number more slowly the second time. End warmly and confidently.</p></div>`;
  $('choiceArea').innerHTML='';$('contextArea').innerHTML='';
  $('previousStage').classList.add('hidden');$('nextStage').textContent='Finish';
  $('progressText').textContent='100%';$('progressBar').style.width='100%';$('callStatusText').textContent='Voicemail';document.querySelector('.status-dot').style.background='#2563eb';renderNav();
}

function renderStage(){
  if(getCallType()==='voicemail'){renderVoicemail();return;}
  $('previousStage').classList.remove('hidden');
  const s=callStages[currentStage];renderSummary();
  $('stageNumber').textContent=`STEP ${currentStage+1} OF ${callStages.length}`;$('stageTitle').textContent=s.title;$('stagePurpose').textContent=s.purpose;
  $('scriptCard').className=`script-card ${s.mandatory?'mandatory-card':''}`;
  $('scriptCard').innerHTML=`${s.mandatory?'<div class="mandatory-badge">MANDATORY — READ AS WRITTEN</div>':''}<div class="script-label">AGENT SCRIPT</div><div class="script-text">${escapeHtml(substitute(s.script))}</div>${s.note?`<div class="context-card" style="margin-top:16px"><p>${escapeHtml(s.note)}</p></div>`:''}${s.extra?`<div class="context-card" style="margin-top:16px"><h4>Continue / applicable questions</h4>${s.extra.map(x=>`<p style="margin-top:8px">${escapeHtml(substitute(x))}</p>`).join('')}</div>`:''}`;
  renderChoices(s);
  $('contextArea').innerHTML=s.quick?`<div class="tag-row">${s.quick.map(q=>`<button class="choice-button" data-tool="${q}">${q[0].toUpperCase()+q.slice(1)}</button>`).join('')}</div>`:'';
  document.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>openDrawer(b.dataset.tool));
  $('previousStage').disabled=currentStage===0;$('nextStage').textContent=currentStage===callStages.length-1?'Finish':'Next';
  maxUnlocked=Math.max(maxUnlocked,currentStage);const pct=Math.round((currentStage/(callStages.length-1))*100);$('progressText').textContent=`${pct}%`;$('progressBar').style.width=`${pct}%`;$('callStatusText').textContent=s.title;document.querySelector('.status-dot').style.background='#22c55e';renderNav();
}

function renderChoices(s){if(!s.choices){$('choiceArea').innerHTML='';return;}$('choiceArea').innerHTML=`<div class="script-label">CUSTOMER RESPONSE / ROUTE</div><div class="choice-grid">${s.choices.map((c,i)=>`<button class="choice-button" data-choice="${i}">${c.label}</button>`).join('')}</div>`;document.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{const c=s.choices[+b.dataset.choice];if(c.action)openDrawer(c.action,c.filter);if(c.note)$('contextArea').innerHTML=`<div class="context-card"><h4>Agent guidance</h4><p>${escapeHtml(c.note)}</p></div>`;if(c.next){const n=callStages.findIndex(x=>x.id===c.next);if(n>=0){maxUnlocked=Math.max(maxUnlocked,n);currentStage=n;renderStage();}}});}

function getDrawerItems(type,filter=''){let items=type==='interruptions'?interruptions:type==='objections'?objections:benefits;if(filter)items=items.filter(x=>JSON.stringify(x).toLowerCase().includes(filter.toLowerCase()));return items;}
function renderDrawerList(){const term=$('drawerSearch').value.trim().toLowerCase();let items=getDrawerItems(currentDrawerType,currentDrawerFilter);if(term)items=items.filter(x=>`${x.q||''} ${x.name||''} ${x.means||''} ${x.response||''} ${x.body||''} ${(x.tags||[]).join(' ')}`.toLowerCase().includes(term));$('drawerCount').textContent=`${items.length} result${items.length===1?'':'s'}`;$('drawerContent').innerHTML=items.length?items.map((x,i)=>`<div class="drawer-item"><button data-expand="${i}"><h3>${escapeHtml(x.q||x.name)}</h3>${x.means?`<p>${escapeHtml(x.means)}</p>`:''}${x.assumed?'<div class="tag-row"><span class="tag assumed">ASSUMED SCENARIO</span></div>':''}</button><div class="response-box hidden" id="resp-${i}"><div class="response-label">${currentDrawerType==='benefits'?'BENEFIT / TALKING POINT':'AGENT SCRIPT'}</div>${escapeHtml(substitute(x.response||x.body))}</div>${x.tags?`<div class="tag-row">${x.tags.map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>`:''}</div>`).join(''):'<div class="empty-state">No matching scenario. Try another keyword.</div>';document.querySelectorAll('[data-expand]').forEach(b=>b.onclick=()=>document.querySelector(`#resp-${b.dataset.expand}`).classList.toggle('hidden'));}
function openDrawer(type,filter=''){const map={interruptions:['EARLY INTERRUPTIONS','Search what the customer said'],objections:['OBJECTIONS','Search what the customer said'],benefits:['MWORK BENEFITS','Search by customer need']};currentDrawerType=type;currentDrawerFilter=filter||'';$('drawerKicker').textContent=map[type][0];$('drawerTitle').textContent=map[type][1];$('drawerSearch').value=filter||'';layout.classList.add('drawer-open');$('drawer').setAttribute('aria-hidden','false');renderDrawerList();setTimeout(()=>$('drawerSearch').focus(),50);}

$('startCall').onclick=()=>{$('startPanel').classList.add('hidden');$('callPanel').classList.remove('hidden');currentStage=0;maxUnlocked=0;renderStage();};
$('fillSample').onclick=()=>{$('agentName').value='Alex';$('customerFirst').value='Michael';$('customerLast').value='Brown';$('customerPhone').value='614-555-0134';$('vehicle').value='2024 Honda Accord';$('insurance').value='Progressive';};
$('restartCall').onclick=()=>location.reload();
$('previousStage').onclick=()=>{if(getCallType()==='outbound'&&currentStage>0){currentStage--;renderStage();}};
$('nextStage').onclick=()=>{if(getCallType()==='voicemail'){location.reload();return;}if(currentStage<callStages.length-1){maxUnlocked=Math.max(maxUnlocked,currentStage+1);currentStage++;renderStage();}else location.reload();};
$('showInterruptions').onclick=()=>openDrawer('interruptions');$('showObjections').onclick=()=>openDrawer('objections');$('showBenefits').onclick=()=>openDrawer('benefits');
$('closeDrawer').onclick=()=>{layout.classList.remove('drawer-open');$('drawer').setAttribute('aria-hidden','true');};
$('drawerSearch').addEventListener('input',renderDrawerList);
