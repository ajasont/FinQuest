import React, { useState, useEffect } from "react";
import {
  Wallet, TrendingUp, Sprout, Umbrella, Receipt, Coins, Lock, Check,
  Trophy, Star, ChevronLeft, Zap, Sparkles, RotateCcw, BadgeCheck,
  Scissors, Shield, Heart, Flame
} from "lucide-react";

/* ============================ STYLE ============================ */
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Nunito:wght@400;700;800;900&display=swap');
.fq-root{font-family:'Nunito',sans-serif;background:
  radial-gradient(900px 500px at 85% -10%, rgba(94,200,255,.14), transparent 60%),
  radial-gradient(800px 520px at -10% 25%, rgba(255,197,61,.12), transparent 55%),
  radial-gradient(700px 600px at 50% 110%, rgba(79,227,163,.10), transparent 55%),
  #1F1B3A;color:#F4EFFF;min-height:100vh;}
.fq-disp{font-family:'Lilita One',cursive;letter-spacing:.02em;}
.fq-card{background:#2C2750;border:1px solid #463F7A;border-radius:20px;box-shadow:0 6px 0 #14112B;}
.fq-sub{color:#B7AEE6;}
.fq-btn{font-family:'Lilita One',cursive;letter-spacing:.03em;border-radius:16px;
  box-shadow:0 5px 0 var(--edge,#C98A00);transition:transform .08s ease,box-shadow .08s ease,filter .12s;
  -webkit-tap-highlight-color:transparent;user-select:none;}
.fq-btn:active{transform:translateY(4px);box-shadow:0 1px 0 var(--edge,#C98A00);}
.fq-btn:focus-visible{outline:3px solid #5EC8FF;outline-offset:2px;}
.fq-gold{--edge:#C98A00;background:linear-gradient(180deg,#FFD66B,#FFC53D);color:#3A2A00;}
.fq-ghost{--edge:#14112B;background:#3A3468;color:#F4EFFF;border:1px solid #4B4486;}
.fq-opt{background:#332D5E;border:2px solid #4B4486;border-radius:16px;transition:border-color .12s, background .12s, transform .08s;}
.fq-opt:active{transform:scale(.985);}
.fq-opt.right{border-color:#4FE3A3;background:rgba(79,227,163,.12);}
.fq-opt.wrong{border-color:#FF8A7A;background:rgba(255,138,122,.12);}
.fq-node{position:relative;}
.fq-node-current{animation:fqring 1.7s ease-out infinite;}
@keyframes fqring{0%{box-shadow:0 0 0 0 rgba(255,197,61,.55)}70%{box-shadow:0 0 0 16px rgba(255,197,61,0)}100%{box-shadow:0 0 0 0 rgba(255,197,61,0)}}
.fq-pop{animation:fqpop .28s cubic-bezier(.34,1.56,.64,1) both;}
@keyframes fqpop{from{transform:scale(.7);opacity:0}to{transform:scale(1);opacity:1}}
.fq-toast{animation:fqfloat 1.15s ease-out forwards;}
@keyframes fqfloat{0%{opacity:0;transform:translateY(8px)}15%{opacity:1;transform:translateY(0)}75%{opacity:1}100%{opacity:0;transform:translateY(-40px)}}
.fq-dash{border-left:3px dashed #4B4486;}
.fq-checkrow{transition:opacity .15s, background .15s;}
.fq-shake{animation:fqshake .45s ease;}
@keyframes fqshake{0%,100%{transform:translateX(0) rotate(0)}25%{transform:translateX(-7px) rotate(-5deg)}75%{transform:translateX(7px) rotate(5deg)}}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}
`;

/* ============================ DATA ============================ */
const LEVEL_XP = 220;
const TITLES = [
  "Penny Rookie", "Saver-in-Training", "Budget Boss", "Debt Slayer",
  "Credit Climber", "Compound Captain", "Risk Wrangler", "Tax Tactician",
  "Money Master", "Financial Legend",
];

const ratingFor = (c) =>
  c >= 800 ? { label: "Excellent", color: "#FFC53D" } :
  c >= 740 ? { label: "Very Good", color: "#4FE3A3" } :
  c >= 670 ? { label: "Good", color: "#5EC8FF" } :
  c >= 580 ? { label: "Fair", color: "#FFB45E" } :
             { label: "Building", color: "#FF8A7A" };

const ZONES = [
  /* ---------------- 1. BUDGET ---------------- */
  {
    id: "budget", name: "Budget Basics", icon: Wallet, color: "#FFC53D",
    tagline: "Master where every dollar goes.", badge: "Budget Boss",
    terms: [
      { t: "Budget", d: "A plan for your money: what comes in, what goes out, and what you keep. It's not a punishment — it's permission to spend without guilt." },
      { t: "50/30/20 Rule", d: "A simple split for take-home pay: about 50% on needs, 30% on wants, 20% to savings and paying off debt." },
      { t: "Emergency Fund", d: "Cash set aside for life's surprises — a car repair, a vet bill. Start with $1,000, then grow it to 3–6 months of expenses." },
      { t: "Pay Yourself First", d: "Move money to savings the moment you get paid — before you can spend it. Automatic transfers make it effortless." },
      { t: "Needs vs. Wants", d: "Needs keep life running (rent, groceries, utilities). Wants make life fun (takeout, games). Both belong in a budget — in the right amounts." },
      { t: "Cash Flow", d: "Income minus expenses. Positive cash flow builds wealth; negative cash flow sinks it. Job one of any budget: keep it positive." },
      { t: "Fixed vs. Variable Expenses", d: "Fixed costs stay the same each month (rent, insurance). Variable costs change (groceries, gas). Trim variables first; renegotiate fixed." },
      { t: "Sinking Fund", d: "Saving a little each month toward a known future cost — holidays, car tires, a trip — so it never wrecks your budget when it arrives." },
      { t: "Lifestyle Creep", d: "When every raise instantly becomes more spending. Beat it by saving a slice of every pay bump before you upgrade anything." },
      { t: "Net Worth", d: "Everything you own minus everything you owe. The real scoreboard of your money game — track it, not just your income." },
    ],
    quiz: [
      { q: "In the 50/30/20 rule, the 20% goes to...", opts: ["Wants, like streaming", "Savings & paying off debt", "Rent", "Lottery tickets"], a: 1, why: "20% goes to future-you: savings and extra debt payments. Needs get ~50%, wants ~30%." },
      { q: "A solid first emergency-fund goal is...", opts: ["$1,000 starter fund", "$100,000 right away", "Whatever's left over", "You don't need one"], a: 0, why: "A $1,000 starter fund covers most small emergencies — then build toward 3–6 months of expenses." },
      { q: "\"Pay yourself first\" means...", opts: ["Buy a treat every payday", "Pay your bills last", "Save automatically before spending", "Only pay in cash"], a: 2, why: "Savings goes out first, automatically. What's left is safe to spend." },
      { q: "Which one is a NEED?", opts: ["Concert tickets", "New sneakers (yours are fine)", "Extra streaming service", "Groceries"], a: 3, why: "Needs keep life running. Wants are great too — they just live in the 30%." },
      { q: "Your net worth is...", opts: ["What you own minus what you owe", "Your salary", "Your credit score", "The cash in your wallet"], a: 0, why: "Assets minus debts. It can grow even when income doesn't — by saving more and owing less." },
      { q: "A sinking fund is for...", opts: ["Emergencies only", "Saving ahead for known future costs", "Buying stocks", "Paying taxes late"], a: 1, why: "You know the holidays are coming — saving monthly makes December a plan, not a panic." },
      { q: "Lifestyle creep is...", opts: ["Rent going up", "Inflation", "Spending rising every time income rises", "A horror movie"], a: 2, why: "If every raise becomes new spending, you never get ahead. Save a slice of each bump first." },
      { q: "When money's tight, trim FIRST from...", opts: ["Rent", "Variable wants like takeout", "Insurance", "Groceries entirely"], a: 1, why: "Variable wants are the easiest, fastest lever. Needs and protection stay; extras pause." },
      { q: "The best way to actually stick to a budget?", opts: ["Willpower alone", "Never check your account", "Memorize every receipt", "Automate savings and review monthly"], a: 3, why: "Automation removes willpower from the equation; a monthly review keeps the plan honest." },
      { q: "Eventually, your emergency fund should cover...", opts: ["One coffee", "3–6 months of expenses", "10 years of rent", "Only your wants"], a: 1, why: "3–6 months of expenses turns a job loss or injury from a catastrophe into an inconvenience." },
    ],
    scenario: {
      prompt: "Payday! You take home $2,000 this month. What's your move?",
      choices: [
        { label: "Run the 50/30/20 split — $400 auto-saved first", tone: "best", fx: { xp: 40, coins: 400 }, result: "Clean split: needs covered, fun budgeted, $400 banked before you could miss it. Your future self high-fives you." },
        { label: "Spend freely, save whatever's left", tone: "bad", fx: { xp: 10, coins: 25 }, result: "\"Whatever's left\" turned out to be $25. It usually does. Saving first beats saving last." },
        { label: "Save every penny — zero fun allowed", tone: "ok", fx: { xp: 20, coins: 320 }, result: "You banked a lot... then burned out and splurged in week three. Sustainable beats extreme." },
      ],
    },
    missions: [
      { id: "b1", text: "Track every expense for one full week" },
      { id: "b2", text: "Sort last month's spending into needs, wants, and savings" },
      { id: "b3", text: "Set up an automatic transfer to savings on payday" },
    ],
  },
  /* ---------------- 2. DEBT PAYOFF ---------------- */
  {
    id: "debt", name: "Debt Payoff", icon: Scissors, color: "#FFA94D",
    tagline: "Cut what you owe down to zero.", badge: "Debt Slayer",
    terms: [
      { t: "Principal", d: "The original amount you borrowed. Interest grows on this — every extra dollar aimed at principal shrinks all your future interest." },
      { t: "Interest", d: "The price of borrowing money, charged as a percentage. It works against you on debt and for you on savings. Pick your side." },
      { t: "Minimum Payment", d: "The smallest amount due to stay current. Paying only the minimum keeps you in debt for years — it's mostly interest." },
      { t: "Debt Snowball", d: "Pay off the smallest balance first while paying minimums on the rest. Quick wins build unstoppable momentum." },
      { t: "Debt Avalanche", d: "Attack the highest interest rate first. Mathematically the cheapest way out — the snowball's logical sibling." },
      { t: "Good Debt vs. Bad Debt", d: "Debt that can grow your future (a reasonable education or modest mortgage) vs. high-rate debt for things that lose value fast." },
      { t: "Revolving Debt", d: "Debt with no fixed end date, like credit cards. The balance \"revolves\" month to month — and the interest compounds against you." },
      { t: "Debt-to-Income Ratio (DTI)", d: "Your monthly debt payments divided by your monthly income. Lenders like under 36%; lower means more breathing room." },
      { t: "Consolidation", d: "Combining several debts into one loan, ideally at a lower rate. One payment, less interest — but only works if spending habits change too." },
      { t: "Predatory Lending", d: "Loans built to trap you: payday loans, title loans, 400% APRs. If it sounds instant and easy, read the rate twice." },
    ],
    quiz: [
      { q: "Paying only the minimum on a credit card...", opts: ["Pays it off fastest", "Keeps you in debt for years", "Boosts your score hugely", "Is free"], a: 1, why: "Minimums are designed to stretch debt out. Most of the payment is interest, not balance." },
      { q: "The debt snowball method pays off...", opts: ["The highest rate first", "The newest debt first", "The smallest balance first for momentum", "Whatever feels right that day"], a: 2, why: "Small wins early keep you motivated — and motivation is what finishes the race." },
      { q: "The debt avalanche saves the most money because...", opts: ["It kills the highest interest rate first", "It skips payments", "Banks waive fees for it", "It's faster to type"], a: 0, why: "Highest rate = fastest-growing debt. Ending it first means the least total interest paid." },
      { q: "Which is most likely \"good debt\"?", opts: ["A payday loan", "Financing designer shoes", "A 29% APR television", "A reasonable student loan or modest mortgage"], a: 3, why: "Good debt can raise your future earning power or build equity. Bad debt just costs." },
      { q: "A payday loan with a 400% APR is...", opts: ["A smart shortcut", "A debt trap to avoid", "Free money", "Totally normal"], a: 1, why: "Borrow $300 and the fees can snowball past the loan itself. Emergency funds exist to dodge these." },
      { q: "Your DTI compares...", opts: ["Debt to your age", "Income to your rent", "Monthly debt payments to monthly income", "Cards to cash"], a: 2, why: "Under 36% is the classic comfort zone — it's a key number lenders check for big loans." },
      { q: "Extra payments do the most damage aimed at...", opts: ["The principal", "Future interest", "The minimum", "Your wants budget"], a: 0, why: "Shrink the principal and every future month's interest shrinks with it. That's the cheat code." },
      { q: "Debt consolidation actually helps when...", opts: ["You want more credit cards", "The new rate is lower and spending changes", "The new rate is higher", "You hide it from yourself"], a: 1, why: "A lower rate plus changed habits = progress. Same habits = same debt, new wrapper." },
      { q: "Carrying revolving credit card debt means...", opts: ["The bank pays you", "Rewards always outweigh it", "Nothing happens", "Interest compounds against you monthly"], a: 3, why: "No rewards program beats 20%+ APR. Pay in full and the points become actually free." },
      { q: "First move when debt feels overwhelming?", opts: ["List every debt with its balance and rate", "Ignore the mail", "Take a payday loan", "Stop paying everything"], a: 0, why: "You can't fight what you can't see. One honest list turns panic into a plan." },
    ],
    scenario: {
      prompt: "You owe: Card A — $500 at 24%. Card B — $2,000 at 18%. Car loan — $5,000 at 6%. You found an extra $200/month. Your attack plan?",
      choices: [
        { label: "Avalanche: minimums everywhere, extra $200 at the 24% card", tone: "best", fx: { xp: 40, coins: 250, credit: 25 }, result: "The highest rate dies first — least total interest paid, and falling balances lift your credit score too." },
        { label: "Snowball: crush the $500 card first for a fast win", tone: "ok", fx: { xp: 30, coins: 180, credit: 15 }, result: "A hair more interest than the avalanche, but that fast win keeps you in the fight. Both demolish minimum-only paying." },
        { label: "Pay minimums, put the $200 on lottery tickets", tone: "bad", fx: { xp: 5, coins: -200 }, result: "The house edge ate it. Paying off 24% debt is a guaranteed 24% return — no ticket beats that." },
      ],
    },
    missions: [
      { id: "d1", text: "List every debt you owe — balance, rate, and minimum payment" },
      { id: "d2", text: "Pick snowball or avalanche and aim all extra money at one target debt" },
      { id: "d3", text: "Call one lender and ask for a lower rate — worst case, they say no" },
    ],
  },
  /* ---------------- 3. CREDIT ---------------- */
  {
    id: "credit", name: "Credit Score Climb", icon: TrendingUp, color: "#5EC8FF",
    tagline: "Make borrowing cheap and doors open.", badge: "Credit Climber",
    terms: [
      { t: "Credit Score", d: "A 300–850 number lenders use to judge how reliably you repay. Higher scores unlock cheaper loans, better cards, even easier apartment approvals." },
      { t: "Payment History", d: "Paying on time, every time. It's the single biggest piece of your score — about 35%. One missed payment can sting for years." },
      { t: "Credit Utilization", d: "How much of your card limits you're using. Keep it under 30% — under 10% is even better. It's roughly 30% of your score." },
      { t: "APR", d: "Annual Percentage Rate — what borrowing actually costs per year. Carry a card balance at 24% APR and your purchases quietly get way more expensive." },
      { t: "Hard Inquiry", d: "When a lender pulls your credit for an application. One barely matters; a bunch at once makes you look desperate for credit." },
      { t: "Credit Report", d: "Your full borrowing history, kept by three bureaus: Equifax, Experian, and TransUnion. Free to check — and smart to scan for errors." },
      { t: "Length of Credit History", d: "How long your accounts have been open — about 15% of your score. That's why you keep your oldest card alive with small purchases." },
      { t: "Credit Mix", d: "Handling different types of credit — a card plus a loan — shows range. A small slice of your score, around 10%." },
      { t: "Secured Card", d: "A starter credit card backed by your own refundable deposit. Training wheels for building credit from absolute scratch." },
      { t: "Authorized User", d: "Being added to someone's well-managed card can let their good history boost your file. Choose your person wisely — it cuts both ways." },
    ],
    quiz: [
      { q: "The single biggest factor in your credit score is...", opts: ["Your salary", "On-time payment history", "Your age", "How many cards you own"], a: 1, why: "Payment history is ~35% of a FICO score. Income isn't part of the score at all." },
      { q: "Your card limit is $1,000. To help your score, keep the balance under...", opts: ["$900", "Exactly $1,000", "$300", "$500 minimum"], a: 2, why: "Under 30% utilization ($300 here) helps your score. Under 10% is even stronger." },
      { q: "\"Carrying a balance builds credit\" is...", opts: ["True — banks reward it", "False — pay in full; carrying a balance just costs interest", "True, but only over $500", "True on weekends"], a: 1, why: "Using the card and paying in full builds the same history — without paying a dime of interest." },
      { q: "Checking your own credit report...", opts: ["Drops your score 50 points", "Is only legal once a decade", "Costs $99", "Doesn't hurt your score at all"], a: 3, why: "Checking yourself is a soft inquiry — zero impact. It's free at AnnualCreditReport.com." },
      { q: "The three credit bureaus are...", opts: ["Equifax, Experian, TransUnion", "Visa, Mastercard, Amex", "FBI, IRS, DMV", "Stocks, Bonds, Funds"], a: 0, why: "Each bureau keeps its own report on you — worth checking all three for errors." },
      { q: "Closing your oldest credit card can...", opts: ["Always help your score", "Erase your debt", "Hurt your score by shortening your history", "Raise your limits"], a: 2, why: "Age of accounts matters (~15%). Keep the old card alive with a tiny recurring charge." },
      { q: "A secured card is...", opts: ["A card kept in a safe", "A starter card backed by your own deposit", "Illegal", "Only for millionaires"], a: 1, why: "Your deposit becomes your limit. Use it lightly, pay in full, and graduate to a regular card." },
      { q: "Length of credit history makes up about...", opts: ["90% of your score", "0%", "50%", "15% of your score"], a: 3, why: "Not the biggest factor, but it rewards patience — old, well-kept accounts age like fine wine." },
      { q: "Missing a payment by 30+ days...", opts: ["Can dent your score for years", "Does nothing", "Helps your credit mix", "Is erased every month"], a: 0, why: "Late marks can linger up to seven years. Autopay for at least the minimum is cheap insurance." },
      { q: "Becoming an authorized user on a well-managed card...", opts: ["Steals their money", "Always hurts you", "Can add positive history to your file", "Requires taking a loan"], a: 2, why: "Their good habits can reflect on your report. Their bad habits can too — pick wisely." },
    ],
    scenario: {
      prompt: "Your first credit card arrives — $1,000 limit. What's the plan?",
      choices: [
        { label: "Use it for gas & groceries, pay in full monthly", tone: "best", fx: { xp: 40, credit: 40 }, result: "Small use + on-time, in-full payments = the exact recipe lenders love. Your score starts climbing." },
        { label: "Max it out — it's basically free money", tone: "bad", fx: { xp: 5, credit: -45, coins: -120 }, result: "100% utilization tanked your score, and 24% APR turned $1,000 into a slow leak. Ouch." },
        { label: "Lock it in a drawer forever", tone: "ok", fx: { xp: 15, credit: 5 }, result: "Safe — but no activity means no payment history. Tiny use, paid in full, builds faster." },
      ],
    },
    missions: [
      { id: "c1", text: "Pull your free report at AnnualCreditReport.com" },
      { id: "c2", text: "Put every bill on autopay — at least the minimum" },
      { id: "c3", text: "Get every card balance under 30% of its limit" },
    ],
  },
  /* ---------------- 4. GROW ---------------- */
  {
    id: "grow", name: "Grow Your Money", icon: Sprout, color: "#4FE3A3",
    tagline: "Make your money earn money.", badge: "Growth Guru",
    terms: [
      { t: "Compound Interest", d: "Earning interest on your interest. It snowballs: the earlier you start, the harder your money works while you sleep." },
      { t: "Rule of 72", d: "Quick math: divide 72 by your yearly return to estimate years to double. At 8%, money doubles roughly every 9 years." },
      { t: "High-Yield Savings (HYSA)", d: "A savings account paying many times the interest of a regular one — with the same federal insurance at FDIC-insured banks. Perfect emergency-fund home." },
      { t: "Index Fund", d: "One investment that buys tiny slices of hundreds of companies at once. Instant diversification, famously low fees." },
      { t: "Dollar-Cost Averaging", d: "Investing the same amount on a schedule, rain or shine, instead of guessing the perfect moment. Boring on purpose — and it works." },
      { t: "Stock", d: "A tiny ownership slice of a company. Its value rises and falls with the business — and with the market's mood swings." },
      { t: "Bond", d: "A loan you give to a company or government that pays you interest. Steadier than stocks, with usually smaller returns." },
      { t: "Diversification", d: "Don't put all your eggs in one basket. Spreading money across many investments means no single flop can sink you." },
      { t: "Risk vs. Return", d: "Higher potential reward always rides with higher potential loss. Take smart risks you can afford — for long enough to recover." },
      { t: "Inflation", d: "Prices rising over time, shrinking what each dollar buys. Investing is how your money outruns it instead of getting eaten by it." },
    ],
    quiz: [
      { q: "Compound interest means...", opts: ["Earning interest on your interest", "A bank fee", "Interest that never changes", "Only banks earn it"], a: 0, why: "Your interest starts earning its own interest. Time turns that into a snowball." },
      { q: "Rule of 72: at an 8% return, money doubles in about...", opts: ["72 years", "2 years", "9 years", "50 years"], a: 2, why: "72 ÷ 8 = 9 years to double. At 6%, it'd take ~12." },
      { q: "An index fund is...", opts: ["A single hot stock", "A bundle of many companies in one investment", "A type of crypto", "A savings account"], a: 1, why: "One purchase, hundreds of companies. If a few stumble, the rest carry the team." },
      { q: "\"Time in the market beats...\"", opts: ["Saving money", "Index funds", "Compound interest", "Timing the market"], a: 3, why: "Even pros can't reliably guess tops and bottoms. Staying invested wins over jumping in and out." },
      { q: "A stock is...", opts: ["A small ownership share of a company", "A loan to a company", "A guaranteed win", "A savings account"], a: 0, why: "You own a slice of the business — its wins and its rough quarters." },
      { q: "A bond is basically...", opts: ["Company ownership", "A bank fee", "A loan you give that pays you interest", "A type of stock"], a: 2, why: "You're the lender. Steadier than stocks, which is why portfolios often hold both." },
      { q: "Diversification protects you by...", opts: ["Guaranteeing profits", "Spreading money so one flop can't sink you", "Avoiding all risk", "Doubling your returns"], a: 1, why: "Some investments zig while others zag. Spreading out smooths the ride." },
      { q: "Inflation means...", opts: ["Prices falling", "Free money", "Banks closing", "Your dollars buy less over time"], a: 3, why: "At 3% inflation, cash under a mattress loses about a quarter of its power in a decade." },
      { q: "Higher potential returns usually come with...", opts: ["Higher risk", "No risk", "Free insurance", "Always lower taxes"], a: 0, why: "Risk and reward are a package deal. Anyone promising big returns with zero risk is selling something." },
      { q: "Money you'll need within a year belongs in...", opts: ["Meme stocks", "Savings, not stocks", "Crypto", "A friend's startup"], a: 1, why: "Markets can dip exactly when you need the cash. Short-term money stays safe and boring." },
    ],
    scenario: {
      prompt: "You've got $1,200 saved beyond your emergency fund. Where does it go?",
      choices: [
        { label: "A broad index fund, set to auto-invest monthly", tone: "best", fx: { xp: 40, coins: 300 }, result: "Diversified, automatic, long-term. The boring choice that quietly builds wealth." },
        { label: "All-in on one trending meme stock", tone: "bad", fx: { xp: 10, coins: -200 }, result: "It \"mooned\"... then cratered 70% by Friday. Diversification exists for exactly this reason." },
        { label: "Leave it in checking at 0.01%", tone: "ok", fx: { xp: 15, coins: 0 }, result: "Safe, but inflation quietly ate about $40 of its buying power this year. Idle money shrinks." },
      ],
    },
    missions: [
      { id: "g1", text: "Open a high-yield savings account for your emergency fund" },
      { id: "g2", text: "Start an automatic monthly investment — any amount counts" },
      { id: "g3", text: "Grow your emergency fund toward 3–6 months of expenses" },
    ],
  },
  /* ---------------- 5. INSURANCE ---------------- */
  {
    id: "insure", name: "Insurance Armor", icon: Shield, color: "#FF9DE0",
    tagline: "Shield your money from life's plot twists.", badge: "Risk Wrangler",
    terms: [
      { t: "Insurance", d: "You pay a small, known cost so a company covers big, surprise costs. You're trading scary risk for a predictable price." },
      { t: "Premium", d: "What you pay — monthly or yearly — to keep coverage active. Shop it around: identical protection can vary wildly in price." },
      { t: "Deductible", d: "What you pay out of pocket before insurance kicks in. Higher deductible = lower premium, and vice versa. Pick the trade you can afford." },
      { t: "Copay & Coinsurance", d: "Your share of each health bill: a flat fee per visit (copay) or a percentage of the cost (coinsurance) after the deductible." },
      { t: "Out-of-Pocket Maximum", d: "The most you'll pay for covered health care in a year. After you hit it, insurance covers 100%. It's your worst-case ceiling." },
      { t: "Term Life Insurance", d: "Affordable coverage for a set period that pays your loved ones if you die. Matters most once someone depends on your income." },
      { t: "Renters / Home Insurance", d: "Protects your stuff and covers you if someone's hurt at your place. Renters insurance often costs less per month than two pizzas." },
      { t: "Auto Liability", d: "Covers damage you cause to others — required almost everywhere. Skimping here can put everything you own on the line." },
      { t: "Disability Insurance", d: "Replaces part of your income if illness or injury stops you from working. Your paycheck is your biggest asset — insure it." },
      { t: "Self-Insuring", d: "Skipping small coverage — like gadget warranties — and covering little losses from your emergency fund. Insure disasters, not inconveniences." },
    ],
    quiz: [
      { q: "Insurance works by...", opts: ["Doubling your money", "Paying a small known cost to cover big surprise costs", "Avoiding all bills forever", "Pure luck"], a: 1, why: "You trade a predictable premium for protection from a catastrophe. That's the whole deal." },
      { q: "A premium is...", opts: ["Your payout", "A fancy add-on", "What you pay to keep coverage active", "The same as a deductible"], a: 2, why: "It's the subscription fee for your safety net — and it's always worth comparison shopping." },
      { q: "A deductible is...", opts: ["What you pay before insurance kicks in", "Your monthly bill", "A tax", "A refund"], a: 0, why: "You cover the first slice; insurance covers the disaster on top of it." },
      { q: "Choosing a higher deductible usually means...", opts: ["A higher premium", "No coverage", "Free claims", "A lower premium"], a: 3, why: "You accept more small risk, so the company charges you less. Your emergency fund makes this trade safe." },
      { q: "An out-of-pocket maximum is...", opts: ["The least you can pay", "The most you'll pay for covered care in a year", "A doctor's salary", "A late fee"], a: 1, why: "It caps your worst-case year. Past that line, covered care is 100% on the insurer." },
      { q: "Renters insurance mainly protects...", opts: ["The landlord's building", "Your car", "Your belongings and liability", "Your credit score"], a: 2, why: "The landlord insures the building — your stuff and your liability are on you, cheaply." },
      { q: "Term life insurance matters most when...", opts: ["Someone depends on your income", "You have no dependents", "You want to invest", "Never"], a: 0, why: "It replaces your income for the people counting on it. No dependents? It can usually wait." },
      { q: "Your most valuable asset to insure is often...", opts: ["Your sneakers", "Your phone", "Your TV", "Your ability to earn income"], a: 3, why: "Decades of future paychecks dwarf any gadget. That's what disability insurance protects." },
      { q: "An extended warranty on a cheap gadget is usually...", opts: ["Worth skipping — self-insure small stuff", "Always essential", "Free", "Legally required"], a: 0, why: "Small losses your emergency fund can absorb don't need coverage. Save premiums for true disasters." },
      { q: "Driving without liability insurance...", opts: ["Saves money safely", "Is fine on weekends", "Risks everything you own — and it's illegal most places", "Builds credit"], a: 2, why: "One accident could cost more than a house. Liability coverage is the floor, not a luxury." },
    ],
    scenario: {
      prompt: "Open enrollment! Plan A: $150/month premium, $500 deductible. Plan B: $50/month, $3,000 deductible, HSA-eligible. You're healthy with a solid emergency fund. You...",
      choices: [
        { label: "Pick Plan B and stash the $100/month savings in an HSA", tone: "best", fx: { xp: 40, coins: 300 }, result: "Lower premiums, a triple-tax-free HSA, and your emergency fund stands guard over the deductible. Strategic armor." },
        { label: "Pick Plan A for peace of mind", tone: "ok", fx: { xp: 25, coins: 100 }, result: "Totally reasonable if surprise bills would wreck your sleep — you paid extra for certainty. Just know the trade you made." },
        { label: "Skip insurance — you never get sick", tone: "bad", fx: { xp: 5, coins: -400 }, result: "One ER visit later: a $9,000 bill. Insurance isn't for the days you're fine — it's for the day you're not." },
      ],
    },
    missions: [
      { id: "i1", text: "Check the big four where they apply: health, auto, renters/home, disability" },
      { id: "i2", text: "Find your health plan's deductible and out-of-pocket maximum" },
      { id: "i3", text: "Get one quote to comparison-shop a policy you already pay for" },
    ],
  },
  /* ---------------- 6. RETIREMENT ---------------- */
  {
    id: "retire", name: "Retirement Ready", icon: Umbrella, color: "#B79CFF",
    tagline: "Free money now, freedom later.", badge: "Retirement Rockstar",
    terms: [
      { t: "401(k)", d: "A retirement account through your job. Money flows in straight from your paycheck — often before taxes — so saving happens on autopilot." },
      { t: "Employer Match", d: "Free money: your job matches what you contribute, up to a limit. Skipping the match is turning down part of your pay." },
      { t: "IRA", d: "An Individual Retirement Account you open yourself — no job required. Great if you're self-employed or want more than a 401(k)." },
      { t: "Roth vs. Traditional", d: "Roth: pay tax now, withdraw tax-free in retirement. Traditional: tax break now, pay tax later. Both beat not saving." },
      { t: "Vesting", d: "How long you must stay at a job before employer-matched money is 100% yours. Your own contributions are always yours." },
      { t: "Target-Date Fund", d: "One fund that automatically shifts from aggressive to safer as your retirement year approaches. Set it, fund it, live your life." },
      { t: "Contribution Limits", d: "The IRS caps how much you can add to retirement accounts each year — 401(k) caps run much higher than IRAs, and limits rise over time." },
      { t: "Early Withdrawal Penalty", d: "Pull retirement money out early and you usually owe a 10% penalty plus taxes. These accounts reward patience on purpose." },
      { t: "Social Security", d: "A government benefit you earn by working and paying in. A foundation for retirement income — not the whole house." },
      { t: "The 4% Guideline", d: "A rough rule: withdraw about 4% of your nest egg per year and it can last decades. Handy for sizing your \"freedom number.\"" },
    ],
    quiz: [
      { q: "Your employer matches 100% up to 4% of pay. You should contribute at least...", opts: ["0% — retirement is far away", "4% — never leave free money", "1%, to test it", "Whatever a coworker does"], a: 1, why: "A full match is an instant 100% return. No investment on Earth beats that." },
      { q: "A Roth IRA is taxed...", opts: ["Now — so withdrawals later are tax-free", "Later, when you retire", "Twice", "Never, ever"], a: 0, why: "Roth = pay tax on the way in, then qualified withdrawals (and all that growth) come out tax-free." },
      { q: "The best time to start saving for retirement is...", opts: ["Age 50", "After buying a boat", "As soon as you earn income", "Only once you're rich"], a: 2, why: "Early dollars compound the longest. Starting small at 25 can beat starting big at 40." },
      { q: "Vesting means...", opts: ["Picking your investments", "A type of fee", "Retiring early", "When matched money becomes fully yours"], a: 3, why: "Leave before you're vested and you may forfeit some match. Your own money is always 100% yours." },
      { q: "A target-date fund...", opts: ["Automatically gets safer as retirement nears", "Guarantees returns", "Picks lottery numbers", "Never changes"], a: 0, why: "It handles the rebalancing for you — a one-fund autopilot for retirement investing." },
      { q: "Withdrawing from a 401(k) at age 30 usually triggers...", opts: ["A bonus", "Nothing", "A 10% penalty plus taxes", "Free money"], a: 2, why: "Early withdrawals get hit twice — penalty and taxes. Emergency funds exist so this money can stay planted." },
      { q: "Social Security is best treated as...", opts: ["Your entire retirement plan", "A foundation, not the whole plan", "A myth", "A savings account"], a: 1, why: "It replaces only part of a typical paycheck. Your own savings build the rest of the house." },
      { q: "The 4% guideline helps you estimate...", opts: ["Your tax bracket", "Your credit score", "Your salary", "How much you can withdraw yearly in retirement"], a: 3, why: "It's a planning compass: yearly spending ÷ 4% ≈ the nest egg you're aiming for." },
      { q: "IRS contribution limits...", opts: ["Cap how much you can add each year", "Cap your salary", "Don't exist", "Only apply after 65"], a: 0, why: "Each account type has a yearly ceiling — and maxing the match always comes first." },
      { q: "Using the 4% guideline, a $1,000,000 nest egg supports about...", opts: ["$4,000 a year", "$40,000 a year", "$400,000 a year", "$100 a year"], a: 1, why: "4% of $1M = $40,000/year. Flip it around to find your own freedom number." },
    ],
    scenario: {
      prompt: "New job! It matches 401(k) contributions up to 4% of your salary. You...",
      choices: [
        { label: "Contribute at least 4% from day one", tone: "best", fx: { xp: 40, coins: 350 }, result: "Boom — every dollar you put in gets instantly doubled up to the match. Compounding starts today." },
        { label: "Skip it — retirement is forever away", tone: "bad", fx: { xp: 5, coins: 0 }, result: "You just declined roughly $1,400 a year of free money. Forever-away arrives surprisingly fast." },
        { label: "Wait until you \"earn more\"", tone: "ok", fx: { xp: 15, coins: 80 }, result: "Every year you wait, compound interest loses its best years. Even 1–2% now beats 0%." },
      ],
    },
    missions: [
      { id: "r1", text: "Enroll in your workplace retirement plan — or open an IRA" },
      { id: "r2", text: "Contribute enough to capture 100% of any employer match" },
      { id: "r3", text: "Pick a low-fee index or target-date fund inside it" },
    ],
  },
  /* ---------------- 7. TAXES ---------------- */
  {
    id: "tax", name: "Tax Smarts", icon: Receipt, color: "#FF8A7A",
    tagline: "Keep more of what you earn — legally.", badge: "Tax Tactician",
    terms: [
      { t: "Tax Deduction", d: "Lowers the income you're taxed on. A $1,000 deduction in a 22% bracket saves about $220." },
      { t: "Tax Credit", d: "Cuts your tax bill dollar-for-dollar. A $1,000 credit saves a full $1,000 — credits beat deductions." },
      { t: "Standard Deduction", d: "A no-receipts-needed deduction everyone gets. Most people take it instead of itemizing — it's big and it's automatic." },
      { t: "Tax Brackets", d: "Only the dollars above each threshold get taxed at the higher rate. A raise never lowers your take-home pay — that's a myth." },
      { t: "Tax-Advantaged Accounts", d: "401(k)s, IRAs, and HSAs come with special tax perks. An HSA is the triple play: tax-free in, tax-free growth, tax-free out for medical costs." },
      { t: "W-4 & Withholding", d: "The W-4 tells your job how much tax to hold from each paycheck. Tune it so you don't badly over- or under-pay all year." },
      { t: "Tax Refund", d: "Not free money — it's your own overpaid taxes coming back without interest. A huge refund means your W-4 wants a tweak." },
      { t: "Capital Gains", d: "Profit from selling investments. Hold for over a year and it's usually taxed at lower long-term rates — patience literally pays." },
      { t: "FICA", d: "The paycheck line funding Social Security and Medicare — 7.65% for employees. Self-employed folks pay both halves." },
      { t: "Free Filing", d: "Most simple returns can be filed at no cost through IRS Free File or free VITA volunteer help. Don't pay for simple." },
    ],
    quiz: [
      { q: "Which saves you more money?", opts: ["A $1,000 tax credit", "A $1,000 tax deduction", "They're identical", "Neither does anything"], a: 0, why: "A credit cuts your bill by the full $1,000. A deduction only saves your tax rate's slice of it." },
      { q: "Moving into a higher tax bracket means...", opts: ["ALL your income is taxed higher", "You lose money on a raise", "Only income above the line is taxed higher", "You must itemize now"], a: 2, why: "Brackets are marginal — only the dollars above each threshold pay the higher rate. Always take the raise." },
      { q: "Traditional 401(k) contributions...", opts: ["Raise your taxable income", "Lower your taxable income now", "Are taxed twice", "Don't affect taxes"], a: 1, why: "Pre-tax contributions shrink this year's taxable income — a built-in reward for saving." },
      { q: "An HSA (with a high-deductible health plan) is special because...", opts: ["It's a crypto wallet", "It taxes you twice", "It's only for retirees", "Tax-free in, tax-free growth, tax-free out for medical"], a: 3, why: "The HSA is the only account with all three tax breaks — a hidden gem if your plan qualifies." },
      { q: "A big tax refund really means...", opts: ["The IRS likes you", "You overpaid all year, interest-free", "Free bonus money", "You won taxes"], a: 1, why: "That was your money the whole time — adjusting your W-4 puts it in your paychecks instead." },
      { q: "The W-4 form controls...", opts: ["How much tax your paycheck withholds", "Your salary", "Your 401(k) picks", "Your credit limit"], a: 0, why: "It's the dial between owing a pile in April and lending the IRS money for free." },
      { q: "Long-term capital gains (held over a year) are usually taxed...", opts: ["Higher than short-term", "Twice", "At lower rates than short-term", "Never"], a: 2, why: "The tax code rewards patient investors — another point for buy-and-hold." },
      { q: "FICA on your paystub funds...", opts: ["The lottery", "Social Security and Medicare", "Your 401(k)", "Roads only"], a: 1, why: "That 7.65% builds your future Social Security and Medicare benefits." },
      { q: "Simple tax returns can often be filed...", opts: ["Only by lawyers", "For $400 minimum", "Never", "Free via IRS Free File or VITA"], a: 3, why: "Free File and VITA volunteers handle straightforward returns at zero cost. Know before you pay." },
      { q: "Contributing to a Traditional IRA can...", opts: ["Lower this year's taxable income", "Raise your bracket on all income", "Do nothing", "Eliminate FICA"], a: 0, why: "Like a Traditional 401(k), it can shrink today's tax bill while building tomorrow's freedom." },
    ],
    scenario: {
      prompt: "Tax season! You put $3,000 in a Traditional 401(k) this year and qualify for a $500 Saver's Credit. Your reaction?",
      choices: [
        { label: "Nice — lower taxable income AND $500 off my bill", tone: "best", fx: { xp: 40, coins: 500 }, result: "Exactly right: the $3,000 shrank your taxable income, and the credit slashed your bill dollar-for-dollar." },
        { label: "Panic and ignore the forms", tone: "bad", fx: { xp: 5, coins: -150 }, result: "The IRS doesn't ghost. Late fees stack — and free help (IRS Free File, VITA) was right there." },
        { label: "Pay $400 for a simple return", tone: "ok", fx: { xp: 15, coins: 100 }, result: "It got done — but simple returns often file 100% free. Know what you're paying for." },
      ],
    },
    missions: [
      { id: "t1", text: "Look up your federal tax bracket for this year" },
      { id: "t2", text: "Check if you qualify for the Saver's Credit or EITC" },
      { id: "t3", text: "Have a high-deductible health plan? Price out an HSA" },
    ],
  },
];

const CAPSTONE = {
  id: "capstone",
  text: "Write down your freedom number — the monthly income that makes work optional — and one move toward it this year",
};

const DEFAULT_SAVE = { xp: 0, coins: 0, credit: 580, zonesDone: [], vault: {}, vaultXP: {}, bossBeaten: false };
const KEY = "finquest_save_v1";
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/* Boss: 2 random questions per zone (14 total), options reshuffled every battle */
const BOSS_HP = 12;
const BOSS_HEARTS = 3;
const BOSS_REWARD = { xp: 200, coins: 500, credit: 25 };
const buildBossDeck = () =>
  shuffle(ZONES.flatMap((z) =>
    shuffle(z.quiz).slice(0, 2).map((q) => {
      const opts = shuffle(q.opts.map((text, idx) => ({ text, correct: idx === q.a })));
      return {
        q: q.q, why: q.why,
        opts: opts.map((o) => o.text),
        a: opts.findIndex((o) => o.correct),
        zone: z.name, color: z.color,
      };
    })
  ));
/* ============================ SMALL PARTS ============================ */
const fxChips = (fx = {}) => {
  const out = [];
  if (fx.xp) out.push({ text: "+" + fx.xp + " XP", color: "#FFC53D" });
  if (fx.coins) out.push({ text: (fx.coins > 0 ? "+$" : "-$") + Math.abs(fx.coins), color: fx.coins > 0 ? "#4FE3A3" : "#FF8A7A" });
  if (fx.credit) out.push({ text: (fx.credit > 0 ? "+" : "") + fx.credit + " Credit", color: fx.credit > 0 ? "#5EC8FF" : "#FF8A7A" });
  return out;
};

function Scoreboard({ save }) {
  const level = Math.min(TITLES.length, Math.floor(save.xp / LEVEL_XP) + 1);
  const into = save.xp - (level - 1) * LEVEL_XP;
  const pct = level >= TITLES.length ? 100 : Math.min(100, Math.round((into / LEVEL_XP) * 100));
  const rate = ratingFor(save.credit);
  return (
    <div className="fq-card px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="fq-disp text-base leading-tight" style={{ color: "#FFC53D" }}>
            LV {level} · {TITLES[level - 1]}
          </div>
          <div className="mt-1 h-2 w-32 rounded-full" style={{ background: "#1B1736" }}>
            <div className="h-2 rounded-full" style={{ width: pct + "%", background: "linear-gradient(90deg,#FFC53D,#FFE08A)" }} />
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 rounded-full px-2 py-1" style={{ background: "#1B1736" }}>
            <Coins size={15} style={{ color: "#FFC53D" }} />
            <span className="text-sm font-extrabold">{save.coins.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 rounded-full px-2 py-1" style={{ background: "#1B1736" }}>
            <Zap size={15} style={{ color: rate.color }} />
            <span className="text-sm font-extrabold" style={{ color: rate.color }}>{save.credit}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================ HOME / QUEST MAP ============================ */
function Home({ save, openZone, openVault, openBoss }) {
  const currentIdx = ZONES.findIndex((z) => !save.zonesDone.includes(z.id));
  const allDone = save.zonesDone.length === ZONES.length;
  return (
    <div>
      <div className="text-center mt-5 mb-1">
        <div className="fq-disp text-5xl" style={{ color: "#FFC53D", textShadow: "0 4px 0 #14112B" }}>FINQUEST</div>
        <p className="fq-sub font-bold mt-1">Play your way to financial freedom.</p>
      </div>

      {save.zonesDone.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {ZONES.filter((z) => save.zonesDone.includes(z.id)).map((z) => (
            <span key={z.id} className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold"
              style={{ background: "#2C2750", border: "1px solid " + z.color, color: z.color }}>
              <BadgeCheck size={13} /> {z.badge}
            </span>
          ))}
          {save.bossBeaten && (
            <span className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold"
              style={{ background: "#3A2A00", border: "1px solid #FFC53D", color: "#FFC53D" }}>
              🐉 Dragon Slayer
            </span>
          )}
        </div>
      )}

      <div className="relative mt-6 pb-2">
        <div className="absolute fq-dash" style={{ left: "31px", top: "32px", bottom: "32px" }} />
        {ZONES.map((z, i) => {
          const done = save.zonesDone.includes(z.id);
          const current = i === currentIdx;
          const locked = !done && !current;
          const Icon = z.icon;
          return (
            <button key={z.id} disabled={locked} onClick={() => openZone(z.id)}
              className="relative w-full flex items-center gap-4 py-3 text-left"
              style={{ opacity: locked ? 0.45 : 1 }}>
              <div className={"fq-node shrink-0 w-16 h-16 rounded-full flex items-center justify-center " + (current ? "fq-node-current" : "")}
                style={{
                  background: done ? "linear-gradient(180deg,#FFD66B,#FFC53D)" : current ? z.color : "#3A3468",
                  border: "3px solid " + (done || current ? "#FFF6D8" : "#4B4486"),
                  boxShadow: "0 5px 0 #14112B",
                }}>
                {done ? <Check size={28} color="#3A2A00" strokeWidth={3.5} />
                  : locked ? <Lock size={22} color="#8B83C2" />
                  : <Icon size={26} color="#221E3F" strokeWidth={2.5} />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="fq-disp text-xl leading-tight" style={{ color: done ? "#FFC53D" : "#F4EFFF" }}>
                  {z.name}
                </div>
                <div className="fq-sub text-sm font-bold truncate">{done ? "Badge earned · tap to review" : z.tagline}</div>
              </div>
              {!locked && <Star size={18} style={{ color: z.color }} className="shrink-0" />}
            </button>
          );
        })}

        <button disabled={!allDone} onClick={openBoss}
          className="relative w-full flex items-center gap-4 py-3 text-left"
          style={{ opacity: allDone ? 1 : 0.45 }}>
          <div className={"fq-node shrink-0 w-16 h-16 rounded-full flex items-center justify-center " + (allDone && !save.bossBeaten ? "fq-node-current" : "")}
            style={{
              background: save.bossBeaten ? "linear-gradient(180deg,#FFD66B,#FFC53D)" : allDone ? "#FF6B81" : "#3A3468",
              border: "3px solid " + (allDone ? "#FFF6D8" : "#4B4486"),
              boxShadow: "0 5px 0 #14112B",
            }}>
            {save.bossBeaten ? <Check size={28} color="#3A2A00" strokeWidth={3.5} />
              : allDone ? <Flame size={26} color="#221E3F" strokeWidth={2.5} />
              : <Lock size={22} color="#8B83C2" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="fq-disp text-xl leading-tight" style={{ color: save.bossBeaten ? "#FFC53D" : "#F4EFFF" }}>
              BOSS: The Debt Dragon
            </div>
            <div className="fq-sub text-sm font-bold truncate">
              {save.bossBeaten ? "Slain · tap for a rematch" : allDone ? "It guards the Vault. 14 rounds. 3 hearts." : "Beat all " + ZONES.length + " zones to face it"}
            </div>
          </div>
          {allDone && !save.bossBeaten && <Flame size={18} style={{ color: "#FF6B81" }} className="shrink-0" />}
        </button>

        <button disabled={!save.bossBeaten} onClick={openVault}
          className="relative w-full flex items-center gap-4 py-3 text-left"
          style={{ opacity: save.bossBeaten ? 1 : 0.45 }}>
          <div className={"fq-node shrink-0 w-16 h-16 rounded-full flex items-center justify-center " + (save.bossBeaten ? "fq-node-current" : "")}
            style={{
              background: save.bossBeaten ? "linear-gradient(180deg,#FFE08A,#FFC53D)" : "#3A3468",
              border: "3px solid " + (save.bossBeaten ? "#FFF6D8" : "#4B4486"),
              boxShadow: "0 5px 0 #14112B",
            }}>
            {save.bossBeaten ? <Trophy size={26} color="#3A2A00" strokeWidth={2.5} /> : <Lock size={22} color="#8B83C2" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="fq-disp text-xl leading-tight" style={{ color: "#FFC53D" }}>The Freedom Vault</div>
            <div className="fq-sub text-sm font-bold">
              {save.bossBeaten ? "Your real-life checklist awaits!" : allDone ? "Defeat the Debt Dragon to enter" : "Complete the zones, then slay the boss"}
            </div>
          </div>
          {save.bossBeaten && <Sparkles size={18} style={{ color: "#FFC53D" }} className="shrink-0" />}
        </button>
      </div>
    </div>
  );
}

/* ============================ ZONE ============================ */
function ZoneView({ zone, completed, grant, completeZone, vaultReady, goHome, openBoss }) {
  const [phase, setPhase] = useState(completed ? "recap" : "learn");
  const [li, setLi] = useState(0);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [choice, setChoice] = useState(null);
  const Icon = zone.icon;

  const Pips = () => (
    <div className="flex items-center justify-center gap-2 mb-4">
      {["learn", "quiz", "choose"].map((p, i) => {
        const order = { learn: 0, quiz: 1, choose: 2, done: 3, recap: 3 };
        const active = order[phase] === i, past = order[phase] > i;
        return (
          <div key={p} className="flex items-center gap-2">
            <div className="rounded-full px-3 py-1 text-xs font-extrabold"
              style={{
                background: active ? zone.color : past ? "#3A3468" : "#262145",
                color: active ? "#221E3F" : past ? zone.color : "#6F66A8",
                border: "1px solid " + (active || past ? zone.color : "#3A3468"),
              }}>
              {p === "learn" ? "LEARN" : p === "quiz" ? "QUIZ" : "CHOOSE"}
            </div>
            {i < 2 && <div className="w-3 h-px" style={{ background: "#4B4486" }} />}
          </div>
        );
      })}
    </div>
  );

  /* ----- recap (zone already beaten) ----- */
  if (phase === "recap") {
    return (
      <div className="fq-pop">
        <div className="text-center mb-4">
          <div className="fq-disp text-3xl" style={{ color: zone.color }}>{zone.name}</div>
          <span className="inline-flex items-center gap-1 mt-1 rounded-full px-3 py-1 text-xs font-extrabold"
            style={{ background: "#2C2750", border: "1px solid #FFC53D", color: "#FFC53D" }}>
            <BadgeCheck size={13} /> {zone.badge} earned
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {zone.terms.map((t) => (
            <div key={t.t} className="fq-card p-4">
              <div className="fq-disp text-lg" style={{ color: zone.color }}>{t.t}</div>
              <p className="text-sm font-semibold mt-1" style={{ color: "#DCD6F7" }}>{t.d}</p>
            </div>
          ))}
        </div>
        <p className="fq-sub text-center text-sm font-bold mt-4">
          This zone's missions live in your Freedom Vault.
        </p>
        <button onClick={goHome} className="fq-btn fq-ghost w-full py-3 mt-3 text-lg">Back to map</button>
      </div>
    );
  }

  /* ----- learn ----- */
  if (phase === "learn") {
    const card = zone.terms[li];
    return (
      <div>
        <Pips />
        <div key={li} className="fq-card p-5 fq-pop">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold tracking-widest" style={{ color: zone.color }}>
              TERM {li + 1} / {zone.terms.length}
            </span>
            <Icon size={20} style={{ color: zone.color }} />
          </div>
          <div className="fq-disp text-3xl mt-2" style={{ color: zone.color }}>{card.t}</div>
          <p className="mt-2 font-semibold leading-relaxed" style={{ color: "#E9E4FB" }}>{card.d}</p>
        </div>
        <button
          className="fq-btn fq-gold w-full py-3 mt-4 text-lg"
          onClick={() => {
            grant({ xp: 5 });
            if (li + 1 < zone.terms.length) setLi(li + 1);
            else setPhase("quiz");
          }}>
          {li + 1 < zone.terms.length ? "Got it — next term" : "Start the quiz"}
        </button>
      </div>
    );
  }

  /* ----- quiz ----- */
  if (phase === "quiz") {
    const q = zone.quiz[qi];
    const answered = picked !== null;
    return (
      <div>
        <Pips />
        <div key={qi} className="fq-card p-5 fq-pop">
          <span className="text-xs font-extrabold tracking-widest" style={{ color: zone.color }}>
            QUESTION {qi + 1} / {zone.quiz.length}
          </span>
          <div className="fq-disp text-xl mt-2 leading-snug">{q.q}</div>
          <div className="flex flex-col gap-2 mt-4">
            {q.opts.map((opt, i) => {
              let cls = "fq-opt";
              if (answered && i === q.a) cls += " right";
              else if (answered && i === picked) cls += " wrong";
              return (
                <button key={i} disabled={answered} className={cls + " px-4 py-3 text-left font-bold"}
                  onClick={() => {
                    setPicked(i);
                    if (i === q.a) { setScore(score + 1); grant({ xp: 15 }); }
                  }}>
                  {opt}
                </button>
              );
            })}
          </div>
          {answered && (
            <div className="mt-3 rounded-2xl p-3 fq-pop"
              style={{ background: picked === q.a ? "rgba(79,227,163,.12)" : "rgba(255,138,122,.12)", border: "1px solid " + (picked === q.a ? "#4FE3A3" : "#FF8A7A") }}>
              <div className="fq-disp text-sm" style={{ color: picked === q.a ? "#4FE3A3" : "#FF8A7A" }}>
                {picked === q.a ? "CORRECT! +15 XP" : "NOT QUITE"}
              </div>
              <p className="text-sm font-semibold mt-1" style={{ color: "#E9E4FB" }}>{q.why}</p>
            </div>
          )}
        </div>
        {answered && (
          <button className="fq-btn fq-gold w-full py-3 mt-4 text-lg"
            onClick={() => {
              setPicked(null);
              if (qi + 1 < zone.quiz.length) setQi(qi + 1);
              else setPhase("choose");
            }}>
            {qi + 1 < zone.quiz.length ? "Next question" : "Final challenge"}
          </button>
        )}
      </div>
    );
  }

  /* ----- choose (life sim) ----- */
  if (phase === "choose") {
    const sc = zone.scenario;
    const made = choice !== null;
    const ch = made ? sc.choices[choice] : null;
    const toneColor = ch ? (ch.tone === "best" ? "#4FE3A3" : ch.tone === "ok" ? "#FFC53D" : "#FF8A7A") : null;
    return (
      <div>
        <Pips />
        <div className="fq-card p-5 fq-pop">
          <span className="text-xs font-extrabold tracking-widest" style={{ color: zone.color }}>LIFE DECISION</span>
          <div className="fq-disp text-xl mt-2 leading-snug">{sc.prompt}</div>
          {!made && (
            <div className="flex flex-col gap-2 mt-4">
              {sc.choices.map((c, i) => (
                <button key={i} className="fq-opt px-4 py-3 text-left font-bold"
                  onClick={() => { setChoice(i); grant(c.fx); }}>
                  {c.label}
                </button>
              ))}
            </div>
          )}
          {made && (
            <div className="mt-4 rounded-2xl p-4 fq-pop" style={{ background: "rgba(255,255,255,.04)", border: "2px solid " + toneColor }}>
              <div className="fq-disp text-sm" style={{ color: toneColor }}>
                {ch.tone === "best" ? "BIG BRAIN MOVE" : ch.tone === "ok" ? "NOT BAD..." : "OOF — LESSON LEARNED"}
              </div>
              <p className="text-sm font-semibold mt-1" style={{ color: "#E9E4FB" }}>{ch.result}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {fxChips(ch.fx).map((c) => (
                  <span key={c.text} className="rounded-full px-2 py-1 text-xs font-extrabold"
                    style={{ background: "#1B1736", color: c.color, border: "1px solid " + c.color }}>{c.text}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        {made && (
          <button className="fq-btn fq-gold w-full py-3 mt-4 text-lg"
            onClick={() => { completeZone(zone.id); setPhase("done"); }}>
            Claim your badge
          </button>
        )}
      </div>
    );
  }

  /* ----- done ----- */
  return (
    <div className="text-center fq-pop">
      <div className="mx-auto mt-4 w-24 h-24 rounded-full flex items-center justify-center"
        style={{ background: "linear-gradient(180deg,#FFD66B,#FFC53D)", border: "4px solid #FFF6D8", boxShadow: "0 6px 0 #14112B" }}>
        <Icon size={42} color="#3A2A00" strokeWidth={2.5} />
      </div>
      <div className="fq-disp text-3xl mt-3" style={{ color: "#FFC53D" }}>{zone.badge}!</div>
      <p className="fq-sub font-bold mt-1">Zone complete · {score}/{zone.quiz.length} quiz answers right</p>
      <div className="flex justify-center gap-2 mt-3">
        {fxChips({ xp: 50, credit: 15 }).map((c) => (
          <span key={c.text} className="rounded-full px-3 py-1 text-xs font-extrabold"
            style={{ background: "#2C2750", color: c.color, border: "1px solid " + c.color }}>{c.text} bonus</span>
        ))}
      </div>
      <div className="fq-card p-4 mt-5 text-left">
        <div className="fq-disp text-base" style={{ color: zone.color }}>🔓 Real-life missions unlocked</div>
        {zone.missions.map((m) => (
          <div key={m.id} className="flex items-start gap-2 mt-2">
            <Check size={16} className="mt-1 shrink-0" style={{ color: zone.color }} />
            <span className="text-sm font-semibold" style={{ color: "#E9E4FB" }}>{m.text}</span>
          </div>
        ))}
        <p className="fq-sub text-xs font-bold mt-3">Added to your Freedom Vault checklist.</p>
      </div>
      {vaultReady ? (
        <button onClick={openBoss} className="fq-btn fq-gold w-full py-3 mt-4 text-lg">Challenge the Debt Dragon</button>
      ) : (
        <button onClick={goHome} className="fq-btn fq-gold w-full py-3 mt-4 text-lg">Back to the map</button>
      )}
    </div>
  );
}

/* ============================ BOSS ============================ */
function BossView({ bossBeaten, onWin, openVault, goHome }) {
  const [deck, setDeck] = useState(buildBossDeck);
  const [phase, setPhase] = useState(bossBeaten ? "slain" : "intro");
  const [qi, setQi] = useState(0);
  const [hp, setHp] = useState(BOSS_HP);
  const [hearts, setHearts] = useState(BOSS_HEARTS);
  const [picked, setPicked] = useState(null);
  const [hit, setHit] = useState(false);

  const restart = () => {
    setDeck(buildBossDeck());
    setQi(0); setHp(BOSS_HP); setHearts(BOSS_HEARTS); setPicked(null);
    setPhase("fight");
  };

  if (phase === "intro" || phase === "slain") {
    const slain = phase === "slain";
    return (
      <div className="text-center fq-pop">
        <div className="text-7xl mt-6" style={{ filter: slain ? "grayscale(1)" : "none" }}>🐉</div>
        <div className="fq-disp text-3xl mt-2" style={{ color: "#FF6B81" }}>THE DEBT DRAGON</div>
        <p className="fq-sub font-bold text-sm mt-1">{slain ? "Already slain — but it respawns for rematches." : "Guardian of the Freedom Vault"}</p>
        <div className="fq-card p-4 mt-4 text-left">
          <p className="text-sm font-semibold" style={{ color: "#E9E4FB" }}>
            A beast grown fat on minimum payments and impulse buys blocks the Vault.
            It hurls <b>14 questions</b> drawn from all 7 zones — answers shuffled, different every battle.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <Zap size={16} style={{ color: "#FFC53D" }} />
            <span className="text-sm font-bold">Land {BOSS_HP} correct hits to win</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Heart size={16} style={{ color: "#FF6B81", fill: "#FF6B81" }} />
            <span className="text-sm font-bold">{BOSS_HEARTS} wrong answers and you're toast</span>
          </div>
        </div>
        <button onClick={restart} className="fq-btn fq-gold w-full py-3 mt-4 text-lg">{slain ? "Rematch for glory" : "Begin the battle"}</button>
        <button onClick={slain ? openVault : goHome} className="fq-btn fq-ghost w-full py-3 mt-3 text-lg">{slain ? "Open the Freedom Vault" : "Retreat to the map"}</button>
      </div>
    );
  }

  if (phase === "won") {
    return (
      <div className="text-center fq-pop">
        <div className="text-7xl mt-6">🏆</div>
        <div className="fq-disp text-3xl mt-2" style={{ color: "#FFC53D" }}>DRAGON SLAIN!</div>
        <p className="fq-sub font-bold mt-1">You aced the gauntlet. The Vault is yours.</p>
        <div className="flex justify-center gap-2 mt-3">
          {fxChips(BOSS_REWARD).map((c) => (
            <span key={c.text} className="rounded-full px-3 py-1 text-xs font-extrabold"
              style={{ background: "#2C2750", color: c.color, border: "1px solid " + c.color }}>{c.text}</span>
          ))}
        </div>
        <button onClick={openVault} className="fq-btn fq-gold w-full py-3 mt-5 text-lg">Open the Freedom Vault</button>
        <button onClick={goHome} className="fq-btn fq-ghost w-full py-3 mt-3 text-lg">Back to the map</button>
      </div>
    );
  }

  if (phase === "lost") {
    return (
      <div className="text-center fq-pop">
        <div className="text-7xl mt-6">💀</div>
        <div className="fq-disp text-3xl mt-2" style={{ color: "#FF8A7A" }}>THE DRAGON PREVAILS</div>
        <p className="fq-sub font-bold mt-1 px-4">It got you at round {qi + 1}. New questions await — review the zones and strike again.</p>
        <button onClick={restart} className="fq-btn fq-gold w-full py-3 mt-5 text-lg">Rematch</button>
        <button onClick={goHome} className="fq-btn fq-ghost w-full py-3 mt-3 text-lg">Back to the map</button>
      </div>
    );
  }

  const q = deck[qi];
  const answered = picked !== null;
  return (
    <div>
      <div className="fq-card p-4">
        <div className="flex items-center gap-3">
          <div className={"text-4xl " + (hit ? "fq-shake" : "")}>🐉</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="fq-disp text-xs" style={{ color: "#FF6B81" }}>DEBT DRAGON</span>
              <span className="text-xs font-extrabold fq-sub">{hp} / {BOSS_HP} HP</span>
            </div>
            <div className="mt-1 h-3 rounded-full" style={{ background: "#1B1736" }}>
              <div className="h-3 rounded-full" style={{ width: (hp / BOSS_HP) * 100 + "%", background: "linear-gradient(90deg,#FF6B81,#FF9DB0)", transition: "width .3s" }} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs font-extrabold tracking-widest fq-sub">ROUND {qi + 1} / {deck.length}</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <Heart key={i} size={18} style={{ color: i < hearts ? "#FF6B81" : "#4B4486", fill: i < hearts ? "#FF6B81" : "none" }} />
            ))}
          </div>
        </div>
      </div>

      <div key={qi} className="fq-card p-5 mt-3 fq-pop">
        <span className="rounded-full px-2 py-1 text-xs font-extrabold" style={{ background: "#1B1736", color: q.color, border: "1px solid " + q.color }}>{q.zone}</span>
        <div className="fq-disp text-xl mt-3 leading-snug">{q.q}</div>
        <div className="flex flex-col gap-2 mt-4">
          {q.opts.map((opt, i) => {
            let cls = "fq-opt";
            if (answered && i === q.a) cls += " right";
            else if (answered && i === picked) cls += " wrong";
            return (
              <button key={i} disabled={answered} className={cls + " px-4 py-3 text-left font-bold"}
                onClick={() => {
                  setPicked(i);
                  if (i === q.a) { setHp(hp - 1); setHit(true); setTimeout(() => setHit(false), 450); }
                  else setHearts(hearts - 1);
                }}>
                {opt}
              </button>
            );
          })}
        </div>
        {answered && (
          <div className="mt-3 rounded-2xl p-3 fq-pop"
            style={{ background: picked === q.a ? "rgba(79,227,163,.12)" : "rgba(255,138,122,.12)", border: "1px solid " + (picked === q.a ? "#4FE3A3" : "#FF8A7A") }}>
            <div className="fq-disp text-sm" style={{ color: picked === q.a ? "#4FE3A3" : "#FF8A7A" }}>
              {picked === q.a ? "DIRECT HIT! −1 HP" : "THE DRAGON BITES! −1 ❤️"}
            </div>
            <p className="text-sm font-semibold mt-1" style={{ color: "#E9E4FB" }}>{q.why}</p>
          </div>
        )}
      </div>

      {answered && (
        <button className="fq-btn fq-gold w-full py-3 mt-4 text-lg"
          onClick={() => {
            setPicked(null);
            if (hp === 0) { onWin(); setPhase("won"); }
            else if (hearts === 0) setPhase("lost");
            else setQi(qi + 1);
          }}>
          {hp === 0 ? "Finish it!" : hearts === 0 ? "Face your fate" : "Next round"}
        </button>
      )}
    </div>
  );
}

/* ============================ VAULT ============================ */
function VaultView({ save, toggleVault }) {
  const total = ZONES.length * 3 + 1;
  const checked = Object.values(save.vault).filter(Boolean).length;
  const pct = Math.round((checked / total) * 100);
  const Row = ({ id, text, gold }) => {
    const on = !!save.vault[id];
    return (
      <button onClick={() => toggleVault(id)}
        className="fq-checkrow w-full flex items-start gap-3 rounded-2xl px-3 py-3 text-left"
        style={{ background: on ? "rgba(79,227,163,.08)" : "rgba(255,255,255,.03)" }}>
        <span className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center"
          style={{
            background: on ? "#4FE3A3" : "transparent",
            border: "2px solid " + (on ? "#4FE3A3" : gold ? "#FFC53D" : "#5B53A0"),
          }}>
          {on && <Check size={16} color="#0F2A1E" strokeWidth={3.5} />}
        </span>
        <span className="text-sm font-bold leading-snug" style={{ color: on ? "#9C94CF" : "#F4EFFF" }}>{text}</span>
      </button>
    );
  };
  return (
    <div className="fq-pop">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(180deg,#FFE08A,#FFC53D)", border: "3px solid #FFF6D8", boxShadow: "0 5px 0 #14112B" }}>
          <Trophy size={28} color="#3A2A00" />
        </div>
        <div className="fq-disp text-3xl mt-2" style={{ color: "#FFC53D" }}>The Freedom Vault</div>
        <p className="fq-sub font-bold text-sm mt-1 px-4">
          You unlocked the blueprint. Check these off in real life — each one is +10 XP and a step toward freedom.
        </p>
      </div>
      <div className="fq-card p-4 mt-4">
        <div className="flex items-center justify-between">
          <span className="fq-disp text-sm" style={{ color: "#4FE3A3" }}>REAL-LIFE PROGRESS</span>
          <span className="font-extrabold text-sm">{checked}/{total} · {pct}%</span>
        </div>
        <div className="mt-2 h-3 rounded-full" style={{ background: "#1B1736" }}>
          <div className="h-3 rounded-full" style={{ width: pct + "%", background: "linear-gradient(90deg,#4FE3A3,#9BF0CB)", transition: "width .3s" }} />
        </div>
      </div>
      {pct === 100 && (
        <div className="fq-card p-4 mt-3 text-center fq-pop" style={{ border: "2px solid #FFC53D" }}>
          <div className="fq-disp text-xl" style={{ color: "#FFC53D" }}>🏆 BLUEPRINT COMPLETE</div>
          <p className="text-sm font-bold mt-1" style={{ color: "#E9E4FB" }}>
            You didn't just beat the game — you upgraded your real life. Keep stacking.
          </p>
        </div>
      )}
      {ZONES.map((z) => {
        const Icon = z.icon;
        return (
          <div key={z.id} className="fq-card p-4 mt-3">
            <div className="flex items-center gap-2 mb-2">
              <Icon size={18} style={{ color: z.color }} />
              <span className="fq-disp text-base" style={{ color: z.color }}>{z.name}</span>
            </div>
            <div className="flex flex-col gap-2">
              {z.missions.map((m) => <Row key={m.id} id={m.id} text={m.text} />)}
            </div>
          </div>
        );
      })}
      <div className="fq-card p-4 mt-3" style={{ border: "2px solid #FFC53D" }}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={18} style={{ color: "#FFC53D" }} />
          <span className="fq-disp text-base" style={{ color: "#FFC53D" }}>Boss Mission</span>
        </div>
        <Row id={CAPSTONE.id} text={CAPSTONE.text} gold />
      </div>
    </div>
  );
}

/* ============================ APP ============================ */
export default function FinQuest() {
  const [save, setSave] = useState(DEFAULT_SAVE);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState("home");
  const [zoneId, setZoneId] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [resetArmed, setResetArmed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(KEY, false);
        if (r && r.value) setSave({ ...DEFAULT_SAVE, ...JSON.parse(r.value) });
      } catch (e) { /* no save yet — fresh game */ }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => {
      window.storage.set(KEY, JSON.stringify(save), false).catch(() => {});
    }, 400);
    return () => clearTimeout(t);
  }, [save, loaded]);

  const pushToasts = (fx) => {
    const items = fxChips(fx).map((c, i) => ({ ...c, id: Date.now() + "-" + i + "-" + Math.random() }));
    if (!items.length) return;
    setToasts((ts) => [...ts, ...items]);
    setTimeout(() => setToasts((ts) => ts.filter((t) => !items.find((x) => x.id === t.id))), 1200);
  };

  const grant = (fx) => {
    setSave((s) => ({
      ...s,
      xp: s.xp + (fx.xp || 0),
      coins: Math.max(0, s.coins + (fx.coins || 0)),
      credit: clamp(s.credit + (fx.credit || 0), 300, 850),
    }));
    pushToasts(fx);
  };

  const completeZone = (id) => {
    setSave((s) => s.zonesDone.includes(id) ? s : { ...s, zonesDone: [...s.zonesDone, id] });
    grant({ xp: 50, credit: 15 });
  };

  const toggleVault = (id) => {
    const turningOn = !save.vault[id];
    if (turningOn && !save.vaultXP[id]) {
      grant({ xp: 10 });
      setSave((s) => ({ ...s, vault: { ...s.vault, [id]: true }, vaultXP: { ...s.vaultXP, [id]: true } }));
    } else {
      setSave((s) => ({ ...s, vault: { ...s.vault, [id]: !s.vault[id] } }));
    }
  };

  const beatBoss = () => {
    if (save.bossBeaten) return;
    setSave((s) => ({ ...s, bossBeaten: true }));
    grant(BOSS_REWARD);
  };

  const doReset = () => {
    if (!resetArmed) {
      setResetArmed(true);
      setTimeout(() => setResetArmed(false), 2500);
      return;
    }
    setSave(DEFAULT_SAVE);
    setView("home");
    setZoneId(null);
    setResetArmed(false);
    window.storage.set(KEY, JSON.stringify(DEFAULT_SAVE), false).catch(() => {});
  };

  const zone = ZONES.find((z) => z.id === zoneId);
  const vaultReady = save.zonesDone.length === ZONES.length;

  return (
    <div className="fq-root">
      <style>{STYLE}</style>
      <div className="mx-auto max-w-md px-4 pb-10 relative">

        <div className="fixed left-1/2 top-3 z-50 flex flex-col items-center gap-1 pointer-events-none" style={{ transform: "translateX(-50%)" }}>
          {toasts.map((t) => (
            <div key={t.id} className="fq-toast fq-disp rounded-full px-4 py-1 text-sm"
              style={{ background: "#14112B", color: t.color, border: "1px solid " + t.color }}>
              {t.text}
            </div>
          ))}
        </div>

        <div className="pt-4 sticky top-0 z-40 pb-2" style={{ background: "linear-gradient(180deg,#1F1B3A 75%,transparent)" }}>
          {view !== "home" && (
            <button onClick={() => setView("home")}
              className="flex items-center gap-1 fq-sub font-extrabold text-sm mb-2">
              <ChevronLeft size={18} /> Quest map
            </button>
          )}
          <Scoreboard save={save} />
        </div>

        {!loaded ? (
          <p className="fq-sub text-center font-bold mt-10">Loading your save...</p>
        ) : view === "home" ? (
          <Home save={save} openZone={(id) => { setZoneId(id); setView("zone"); }} openVault={() => setView("vault")} openBoss={() => setView("boss")} />
        ) : view === "boss" ? (
          <div className="mt-4">
            <BossView bossBeaten={save.bossBeaten} onWin={beatBoss}
              openVault={() => setView("vault")} goHome={() => setView("home")} />
          </div>
        ) : view === "zone" && zone ? (
          <div className="mt-4">
            {!save.zonesDone.includes(zone.id) && (
              <div className="text-center mb-3">
                <div className="fq-disp text-2xl" style={{ color: zone.color }}>{zone.name}</div>
              </div>
            )}
            <ZoneView key={zone.id} zone={zone} completed={save.zonesDone.includes(zone.id)}
              grant={grant} completeZone={completeZone} vaultReady={vaultReady}
              goHome={() => setView("home")} openBoss={() => setView("boss")} />
          </div>
        ) : (
          <div className="mt-4"><VaultView save={save} toggleVault={toggleVault} /></div>
        )}

        <div className="mt-10 text-center">
          <button onClick={doReset} className="inline-flex items-center gap-1 fq-sub text-xs font-extrabold rounded-full px-3 py-1"
            style={{ border: "1px solid #4B4486", color: resetArmed ? "#FF8A7A" : "#8B83C2" }}>
            <RotateCcw size={12} /> {resetArmed ? "Tap again to confirm reset" : "Reset progress"}
          </button>
          <p className="fq-sub text-xs font-semibold mt-3 px-4">
            FinQuest teaches general money concepts for fun — it isn't personalized financial or tax advice.
          </p>
        </div>
      </div>
    </div>
  );
}
