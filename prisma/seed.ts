import { Difficulty, ExamBoard, Level, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Demo user
  const hashedPassword = await bcrypt.hash("password123", 10);
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@vantage.study" },
    update: {},
    create: {
      email: "demo@vantage.study",
      name: "Demo Student",
      password: hashedPassword,
      tier: "FREE",
    },
  });
  console.log("✓ Demo user:", demoUser.email);

  // ─── Subjects ─────────────────────────────────────────────────────────────

  const biology = await prisma.subject.upsert({
    where: { code: "0610" },
    update: {},
    create: {
      name: "Biology",
      code: "0610",
      examBoard: ExamBoard.CAMBRIDGE,
      level: Level.IGCSE,
      color: "#16A34A",
    },
  });

  const mathematics = await prisma.subject.upsert({
    where: { code: "9709" },
    update: {},
    create: {
      name: "Mathematics",
      code: "9709",
      examBoard: ExamBoard.CAMBRIDGE,
      level: Level.A_LEVEL,
      color: "#2563EB",
    },
  });

  console.log("✓ Subjects created");

  // ─── Topics ───────────────────────────────────────────────────────────────

  const [cellBiology, genetics, ecology, photosynthesis, respiration] =
    await Promise.all([
      prisma.topic.create({ data: { name: "Cell Biology", subjectId: biology.id } }),
      prisma.topic.create({ data: { name: "Genetics & Inheritance", subjectId: biology.id } }),
      prisma.topic.create({ data: { name: "Ecology & Environment", subjectId: biology.id } }),
      prisma.topic.create({ data: { name: "Photosynthesis", subjectId: biology.id } }),
      prisma.topic.create({ data: { name: "Respiration", subjectId: biology.id } }),
    ]);

  const [differentiation, integration, statistics, mechanics, logarithms] =
    await Promise.all([
      prisma.topic.create({ data: { name: "Differentiation", subjectId: mathematics.id } }),
      prisma.topic.create({ data: { name: "Integration", subjectId: mathematics.id } }),
      prisma.topic.create({ data: { name: "Statistics & Probability", subjectId: mathematics.id } }),
      prisma.topic.create({ data: { name: "Mechanics", subjectId: mathematics.id } }),
      prisma.topic.create({ data: { name: "Logarithms & Exponentials", subjectId: mathematics.id } }),
    ]);

  console.log("✓ Topics created");

  // ─── Questions ────────────────────────────────────────────────────────────

  const bioQuestions = [
    {
      year: 2023,
      paper: "Paper 2",
      questionNumber: "1(a)",
      marks: 3,
      difficulty: "EASY",
      subjectId: biology.id,
      topicId: cellBiology.id,
      content: `State THREE differences between a plant cell and an animal cell.`,
      markScheme: `Award 1 mark each for any three of the following differences (must state both sides):
• Plant cell has a cell wall / animal cell does not have a cell wall
• Plant cell has a large permanent vacuole / animal cell has small temporary vacuoles or no vacuole
• Plant cell may have chloroplasts / animal cell does not have chloroplasts
• Plant cell has a regular shape / animal cell has an irregular shape
• Plant cell stores starch / animal cell stores glycogen
(Accept converse statements. Do not accept 'nucleus' as a difference.)`,
      examinerTip: "Many students forget to state both sides of the comparison. Always say 'plant cell has X, animal cell does not' rather than just 'plant cells have X'.",
    },
    {
      year: 2023,
      paper: "Paper 2",
      questionNumber: "1(b)",
      marks: 4,
      difficulty: "MEDIUM",
      subjectId: biology.id,
      topicId: cellBiology.id,
      content: `A student used a light microscope to observe onion cells. The eyepiece lens has a magnification of ×10 and the objective lens has a magnification of ×40.\n\n(i) Calculate the total magnification of the microscope. [1]\n\n(ii) The student measured the length of one cell as 0.4 mm on the slide image. Calculate the actual length of the cell in micrometres (μm). Show your working. [3]`,
      markScheme: `(i) Total magnification = 10 × 40 = ×400 [1 mark]

(ii) Actual size = image size ÷ magnification
= 0.4 mm ÷ 400
= 0.001 mm [1 mark]
= 0.001 × 1000 μm
= 1 μm [1 mark]
(Award 1 mark for correct formula, 1 mark for correct division, 1 mark for correct unit conversion. ECF applies.)`,
      examinerTip: "Always show the formula first, then substitute values. The most common error is forgetting to convert mm to μm (× 1000).",
    },
    {
      year: 2022,
      paper: "Paper 4",
      questionNumber: "3(a)",
      marks: 5,
      difficulty: "MEDIUM",
      subjectId: biology.id,
      topicId: photosynthesis.id,
      content: `Describe the light-dependent reactions of photosynthesis, including where they occur and what is produced.`,
      markScheme: `Award marks for the following points (max 5):
• Light-dependent reactions occur in/on the thylakoid membranes (grana) of the chloroplast [1]
• Light energy is absorbed by chlorophyll [1]
• Water is split (photolysis) into oxygen, protons (H⁺) and electrons [1]
• Oxygen is released as a by-product / waste product [1]
• ATP is synthesised (by photophosphorylation) [1]
• Reduced NADP (NADPH) is produced [1]
• Electrons are passed along the electron transport chain [1]
(Accept any 5 correct points)`,
      examinerTip: "The location (thylakoid membrane) is often forgotten. Never write 'light-dependent reactions occur in chloroplasts' without specifying the thylakoid membranes — this will not gain the mark.",
    },
    {
      year: 2022,
      paper: "Paper 4",
      questionNumber: "3(b)",
      marks: 6,
      difficulty: "HARD",
      subjectId: biology.id,
      topicId: photosynthesis.id,
      content: `An experiment was carried out to investigate the effect of light intensity on the rate of photosynthesis in pondweed. The number of oxygen bubbles produced per minute was counted at different distances from a light source.\n\nExplain why increasing light intensity increases the rate of photosynthesis, and predict what would happen to the rate at very high light intensities. Justify your prediction.`,
      markScheme: `For effect of increasing light intensity (max 3):
• Light intensity increases → more light energy available [1]
• More ATP / reduced NADP produced in light-dependent reactions [1]
• More products available for the Calvin cycle / light-independent reactions [1]
• More G3P converted to glucose / more CO₂ fixed [1]

For prediction at very high light intensities (max 3):
• Rate would plateau / stop increasing [1]
• Because another factor becomes limiting [1]
• E.g. CO₂ concentration or temperature or amount of RuBisCO / enzyme [1]
(Do not award if student states rate decreases without justification)`,
      examinerTip: "This is a classic limiting factors question. Always identify the new limiting factor — a vague answer like 'something else limits it' will not score marks.",
    },
    {
      year: 2021,
      paper: "Paper 2",
      questionNumber: "5(a)",
      marks: 4,
      difficulty: "MEDIUM",
      subjectId: biology.id,
      topicId: genetics.id,
      content: `In humans, the allele for brown eyes (B) is dominant over the allele for blue eyes (b). A woman with brown eyes whose father had blue eyes marries a man with blue eyes.\n\nUsing a genetic diagram, determine the probability that their first child will have blue eyes.`,
      markScheme: `Mother's genotype: Bb (because her father must have been bb, so she inherited one b allele) [1]
Father's genotype: bb [1]

Genetic cross:
Parents:  Bb  ×  bb
Gametes:  B, b   b, b
Offspring: Bb, Bb, bb, bb [1]

Probability of blue eyes (bb) = 2/4 = 1/2 = 50% [1]
(Award 1 mark for correct parental genotypes, 1 for gametes, 1 for offspring, 1 for correct probability. ECF applies from first error.)`,
      examinerTip: "Always work out parental genotypes before drawing the Punnett square. State the reasoning ('because her father was bb') to gain method marks even if the final answer is wrong.",
    },
    {
      year: 2021,
      paper: "Paper 4",
      questionNumber: "7",
      marks: 8,
      difficulty: "HARD",
      subjectId: biology.id,
      topicId: genetics.id,
      content: `Cystic fibrosis is an autosomal recessive condition caused by a mutation in the CFTR gene.\n\n(a) Explain what is meant by the term 'autosomal recessive'. [2]\n\n(b) Describe how a gene mutation can lead to a non-functional protein. [3]\n\n(c) Suggest why two carriers of cystic fibrosis do not show symptoms of the disease. [3]`,
      markScheme: `(a) Autosomal: located on an autosome (not a sex chromosome) [1]
Recessive: only expressed when two copies of the allele are present / homozygous recessive [1]

(b) A change in the DNA base sequence [1]
→ changed mRNA codon sequence [1]
→ different amino acid incorporated into the protein [1]
→ altered tertiary structure / protein cannot fold correctly [1]
→ non-functional active site (if enzyme) or cannot perform its function [1]
(Max 3 from these points)

(c) Carriers are heterozygous (one functional allele, one non-functional allele) [1]
The functional allele produces enough functional CFTR protein [1]
Enough protein is made to perform normal function / threshold of protein not required [1]`,
      examinerTip: "For part (b), you must give a chain of causation — from DNA change to protein change. Students often jump straight from 'mutation' to 'non-functional protein' without explaining the molecular steps.",
    },
    {
      year: 2023,
      paper: "Paper 4",
      questionNumber: "2",
      marks: 5,
      difficulty: "MEDIUM",
      subjectId: biology.id,
      topicId: respiration.id,
      content: `Compare aerobic respiration with anaerobic respiration in mammals. [5]`,
      markScheme: `Award marks for correct comparisons (must compare both types):
• Aerobic requires oxygen / anaerobic does not require oxygen [1]
• Aerobic produces CO₂ and water / anaerobic in mammals produces lactate (not ethanol) [1]
• Aerobic produces 36–38 ATP per glucose / anaerobic produces 2 ATP per glucose [1]
• Aerobic is more efficient at releasing energy [1]
• Both start with glycolysis in the cytoplasm [1]
• Aerobic continues in mitochondria (Krebs cycle + oxidative phosphorylation) / anaerobic stays in cytoplasm [1]
(Any 5 correct comparative points. Penalise if student writes about yeast/plants producing ethanol instead of mammals.)`,
      examinerTip: "The mark scheme specifically asks about mammals. If you write about ethanol production (which is for yeast), you will lose marks. Mammals produce lactic acid (lactate) in anaerobic respiration.",
    },
    {
      year: 2022,
      paper: "Paper 2",
      questionNumber: "6(a)",
      marks: 3,
      difficulty: "EASY",
      subjectId: biology.id,
      topicId: ecology.id,
      content: `Fig. 6.1 shows a food web in a freshwater lake.\n\nPhytoplankton → Water fleas → Small fish → Large fish\nPhytoplankton → Snails → Small fish\n\nUsing the food web, name:\n(i) a producer [1]\n(ii) a primary consumer [1]\n(iii) a secondary consumer that is also a tertiary consumer [1]`,
      markScheme: `(i) Phytoplankton [1]
(ii) Water fleas OR Snails [1]
(iii) Large fish [1]
(Large fish eats small fish which eats water fleas [secondary consumer] AND small fish which eats phytoplankton [tertiary via snail path])`,
      examinerTip: "For part (iii), read carefully — it must be an organism that occupies both trophic levels simultaneously, which only large fish does in this web.",
    },
    {
      year: 2020,
      paper: "Paper 4",
      questionNumber: "9",
      marks: 6,
      difficulty: "HARD",
      subjectId: biology.id,
      topicId: ecology.id,
      content: `Describe the nitrogen cycle, including the roles of named bacteria at each stage. [6]`,
      markScheme: `Award marks for:
• Nitrogen fixation: Rhizobium (in root nodules) / Azotobacter convert N₂ → NH₃/ammonium [1]
• Nitrification stage 1: Nitrosomonas convert ammonium → nitrite [1]
• Nitrification stage 2: Nitrobacter convert nitrite → nitrate [1]
• Plants absorb nitrate ions via roots / for protein synthesis [1]
• Decomposition: decomposers / saprobionts break down dead organisms → ammonium compounds [1]
• Denitrification: Pseudomonas / denitrifying bacteria convert nitrate → N₂ (gas) [1]
(Named bacteria required for each stage to gain mark)`,
      examinerTip: "You must name the specific bacteria for each step. 'Bacteria convert nitrite to nitrate' without naming Nitrobacter will not score the mark.",
    },
    {
      year: 2019,
      paper: "Paper 2",
      questionNumber: "4",
      marks: 4,
      difficulty: "MEDIUM",
      subjectId: biology.id,
      topicId: cellBiology.id,
      content: `Describe how the structure of a red blood cell is adapted to its function of carrying oxygen. [4]`,
      markScheme: `Award 1 mark each for:
• Biconcave disc shape increases surface area to volume ratio / increases surface area for oxygen diffusion [1]
• No nucleus → more space for haemoglobin [1]
• Contains haemoglobin which combines with oxygen to form oxyhaemoglobin [1]
• Small and flexible → can squeeze through narrow capillaries [1]
• Large number produced to increase oxygen-carrying capacity [1]
(Any 4 correct structure-function links)`,
      examinerTip: "Always link the structural feature to WHY it helps. 'Biconcave disc' alone won't get the mark — you need to say what advantage this shape gives.",
    },
    {
      year: 2023,
      paper: "Paper 2",
      questionNumber: "8",
      marks: 5,
      difficulty: "HARD",
      subjectId: biology.id,
      topicId: genetics.id,
      content: `Sickle cell anaemia is caused by a single base substitution mutation in the gene coding for haemoglobin. Carriers of sickle cell anaemia (heterozygotes) have some resistance to malaria.\n\n(a) Explain how a single base substitution can lead to a non-functional haemoglobin protein. [3]\n\n(b) Using your knowledge of natural selection, explain why the sickle cell allele is maintained at a high frequency in malaria-endemic regions. [2]`,
      markScheme: `(a) Single base change in DNA → altered codon in mRNA [1]
Different amino acid incorporated at position 6 of beta-globin chain [1]
Altered primary structure → different tertiary structure / haemoglobin molecules form fibres and sickle RBCs [1]

(b) In malaria regions, heterozygotes have a selective advantage [1]
They survive and reproduce more than non-carriers / more offspring pass on sickle cell allele [1]
(Accept: balanced polymorphism — homozygous normal die from malaria, homozygous sickle die from anaemia, heterozygotes survive best)`,
      examinerTip: "Part (b) is about natural selection — use the correct terminology: 'selective advantage', 'survival', 'reproduce', 'pass on allele'. Simply saying 'resistance means they don't die' won't score.",
    },
    {
      year: 2022,
      paper: "Paper 4",
      questionNumber: "1",
      marks: 5,
      difficulty: "MEDIUM",
      subjectId: biology.id,
      topicId: respiration.id,
      content: `An athlete undergoes high-intensity exercise for 90 seconds.\n\n(a) Explain why the athlete's muscles switch from aerobic to anaerobic respiration during high-intensity exercise. [2]\n\n(b) After exercise, the athlete's breathing rate remains elevated for several minutes. Explain why. [3]`,
      markScheme: `(a) Demand for ATP exceeds rate of aerobic respiration [1]
Oxygen delivery to muscles is insufficient / muscles become oxygen-deprived [1]

(b) An oxygen debt / excess post-exercise oxygen consumption (EPOC) has built up [1]
Lactate accumulated in muscles must be oxidised (reconverted to glucose/glycogen or oxidised to CO₂ and water) [1]
This requires extra oxygen → elevated breathing rate to supply this oxygen [1]`,
      examinerTip: "The term 'oxygen debt' is acceptable but 'EPOC' shows greater understanding. Make sure you explain what the extra oxygen is used FOR — students often state 'to repay oxygen debt' without explaining the biochemistry.",
    },
  ];

  const mathsQuestions = [
    {
      year: 2023,
      paper: "Paper 1 (Pure)",
      questionNumber: "3",
      marks: 5,
      difficulty: "MEDIUM",
      subjectId: mathematics.id,
      topicId: differentiation.id,
      content: `A curve has equation y = 3x⁴ − 8x³ + 6x.\n\n(a) Find dy/dx. [2]\n\n(b) Find the x-coordinates of the stationary points of the curve. [3]`,
      markScheme: `(a) dy/dx = 12x³ − 24x² + 6 [2]
(Award 1 mark for at least two correct terms; award 2 for all three correct)

(b) Set dy/dx = 0:
12x³ − 24x² + 6 = 0
2x³ − 4x² + 1 = 0   [dividing by 6; condone not simplifying] [1]
Using numerical methods or factorising:
x = 0.298..., x = 1.78... (other root x ≈ −0.077) OR
Award full marks for any correct method yielding correct values [2]
(Accept any equivalent correct roots; 3 s.f. sufficient)`,
      examinerTip: "Don't forget to set dy/dx = 0. Common error: finding d²y/dx² instead of stationary points. Show the equation you're solving.",
    },
    {
      year: 2023,
      paper: "Paper 1 (Pure)",
      questionNumber: "7(a)",
      marks: 4,
      difficulty: "MEDIUM",
      subjectId: mathematics.id,
      topicId: differentiation.id,
      content: `A function is defined by f(x) = (2x + 1)⁵ for x ∈ ℝ.\n\n(i) Find f'(x). [2]\n\n(ii) Hence find the equation of the tangent to the curve y = f(x) at the point where x = 0. [2]`,
      markScheme: `(i) f'(x) = 5(2x+1)⁴ × 2 = 10(2x+1)⁴ [2]
(Award B1 for 5(2x+1)⁴; M1 for multiplying by inner derivative 2)

(ii) At x = 0: f(0) = 1⁵ = 1, so point is (0, 1) [1]
f'(0) = 10(1)⁴ = 10, so gradient = 10 [1]
Tangent: y − 1 = 10(x − 0) → y = 10x + 1`,
      examinerTip: "Chain rule: always multiply by the derivative of the inner function. For the tangent, you need both the gradient AND a point — find both before writing the equation.",
    },
    {
      year: 2022,
      paper: "Paper 3",
      questionNumber: "5",
      marks: 7,
      difficulty: "HARD",
      subjectId: mathematics.id,
      topicId: integration.id,
      content: `(a) Find ∫(3x² − 5/x² + 2√x) dx. [4]\n\n(b) Evaluate ∫₁³ (2x + 1)/(√x) dx, giving your answer as an exact value. [3]`,
      markScheme: `(a) ∫(3x² − 5x⁻² + 2x^(1/2)) dx
= x³ + 5x⁻¹ + (4/3)x^(3/2) + c [4]
(Award 1 mark each for: x³ correct; 5/x correct (+5x⁻¹); (4/3)x^(3/2) correct; +c present)

(b) Rewrite: ∫₁³ (2x + 1)x^(−1/2) dx = ∫₁³ (2x^(1/2) + x^(−1/2)) dx [1]
= [(4/3)x^(3/2) + 2x^(1/2)]₁³ [1]
= [(4/3)(3√3) + 2√3] − [(4/3)(1) + 2(1)]
= 4√3 + 2√3 − 4/3 − 2 = 6√3 − 10/3 [1]`,
      examinerTip: "For part (b), you must simplify the integrand first by dividing through by √x (converting to x^(1/2)). Don't try to integrate a fraction — split it.",
    },
    {
      year: 2021,
      paper: "Paper 1 (Pure)",
      questionNumber: "9",
      marks: 8,
      difficulty: "HARD",
      subjectId: mathematics.id,
      topicId: integration.id,
      content: `The curve C has equation y = x³ − 6x² + 9x.\n\n(a) Find the coordinates of the stationary points and determine their nature. [5]\n\n(b) Find the area of the region bounded by C and the x-axis. [3]`,
      markScheme: `(a) dy/dx = 3x² − 12x + 9 = 3(x−1)(x−3) [1]
Setting = 0: x = 1 or x = 3 [1]
At x=1: y = 1 − 6 + 9 = 4, point (1, 4) [1]
At x=3: y = 27 − 54 + 27 = 0, point (3, 0) [1]
d²y/dx² = 6x − 12
At x=1: d²y/dx² = −6 < 0 → local maximum [½]
At x=3: d²y/dx² = 6 > 0 → local minimum [½]

(b) Curve crosses x-axis at x = 0 and x = 3 (from factoring y = x(x−3)²) [1]
Area = ∫₀³ (x³ − 6x² + 9x) dx = [x⁴/4 − 2x³ + 9x²/2]₀³ [1]
= 81/4 − 54 + 81/2 = 81/4 − 54 + 162/4 = 243/4 − 54 = 6.75 [1]`,
      examinerTip: "For the area, check if the curve dips below the x-axis. Here y = x(x-3)² ≥ 0 for 0 ≤ x ≤ 3, so no need to split the integral. Always sketch first!",
    },
    {
      year: 2023,
      paper: "Paper 2 (Statistics)",
      questionNumber: "2",
      marks: 6,
      difficulty: "MEDIUM",
      subjectId: mathematics.id,
      topicId: statistics.id,
      content: `The random variable X ~ B(20, 0.3).\n\n(a) Find P(X = 5). [2]\n\n(b) Find P(X ≤ 7). [2]\n\n(c) Find the mean and variance of X. [2]`,
      markScheme: `(a) P(X=5) = C(20,5) × (0.3)⁵ × (0.7)¹⁵ [1]
= 15504 × 0.00243 × 0.004748...
= 0.1789 (4 s.f.) [1]

(b) P(X ≤ 7) = 0.7723 (from binomial tables or calculator) [2]
(Award M1 for correct method, A1 for correct answer. Accept 0.772)

(c) Mean = np = 20 × 0.3 = 6 [1]
Variance = np(1−p) = 20 × 0.3 × 0.7 = 4.2 [1]`,
      examinerTip: "For part (a), use the formula. For (b), use cumulative binomial distribution tables or a calculator — don't try to sum individual probabilities. The mean and variance formulae are in the formula booklet.",
    },
    {
      year: 2022,
      paper: "Paper 2 (Statistics)",
      questionNumber: "4",
      marks: 6,
      difficulty: "HARD",
      subjectId: mathematics.id,
      topicId: statistics.id,
      content: `The heights of students in a school are normally distributed with mean 165 cm and standard deviation 8 cm.\n\n(a) Find the probability that a randomly chosen student has height greater than 175 cm. [3]\n\n(b) Find the value of h such that 10% of students have height less than h cm. [3]`,
      markScheme: `(a) P(X > 175) = P(Z > (175−165)/8) = P(Z > 1.25) [1]
= 1 − Φ(1.25) = 1 − 0.8944 [1]
= 0.1056 (4 s.f.) [1]

(b) P(X < h) = 0.10
P(Z < z) = 0.10 → z = −1.282 (from tables) [1]
h = 165 + (−1.282)(8) [1]
= 165 − 10.256 = 154.7 cm (4 s.f.) [1]`,
      examinerTip: "For part (b), 10% is in the lower tail, so the z-value is negative. Use z = −1.282 (not +1.282). Always sketch the normal distribution and shade the required area before calculating.",
    },
    {
      year: 2021,
      paper: "Paper 4 (Mechanics)",
      questionNumber: "3",
      marks: 7,
      difficulty: "MEDIUM",
      subjectId: mathematics.id,
      topicId: mechanics.id,
      content: `A particle moves in a straight line. At time t seconds (t ≥ 0), its velocity v m/s is given by:\nv = 2t² − 12t + 16\n\n(a) Find the initial velocity of the particle. [1]\n\n(b) Find the times when the particle is momentarily at rest. [3]\n\n(c) Find the acceleration of the particle when t = 3. [2]\n\n(d) Find the distance travelled by the particle between t = 0 and t = 4. [4] (Total: 10 marks — answer parts a–d)`,
      markScheme: `(a) t = 0: v = 16 m/s [1]

(b) 2t² − 12t + 16 = 0 → t² − 6t + 8 = 0 → (t−2)(t−4) = 0 [2]
t = 2 s and t = 4 s [1]

(c) a = dv/dt = 4t − 12
At t = 3: a = 12 − 12 = 0 m/s² [2]

(d) Particle changes direction at t = 2 and t = 4 — must split integral [1]
Position: s = ∫(2t²−12t+16)dt = (2t³/3) − 6t² + 16t
At t=0: s=0; At t=2: s=16/3−24+32=40/3; At t=4: s=128/3−96+64=32/3 [1]
Distance 0→2: 40/3 m [1]
Distance 2→4: |32/3 − 40/3| = 8/3 m
Total = 40/3 + 8/3 = 48/3 = 16 m [1]`,
      examinerTip: "KEY TRAP: Distance ≠ displacement. Because the particle changes direction, you cannot just compute s(4) − s(0). Split the integral at t = 2 and add the magnitudes.",
    },
    {
      year: 2023,
      paper: "Paper 1 (Pure)",
      questionNumber: "5",
      marks: 5,
      difficulty: "MEDIUM",
      subjectId: mathematics.id,
      topicId: logarithms.id,
      content: `(a) Solve the equation log₃(2x − 1) = 2. [2]\n\n(b) Solve the equation 2^(3x−1) = 5, giving your answer correct to 3 significant figures. [3]`,
      markScheme: `(a) 2x − 1 = 3² = 9 [1]
2x = 10 → x = 5 [1]

(b) (3x − 1)ln2 = ln5 [1]
3x − 1 = ln5/ln2 = 2.3219... [1]
3x = 3.3219... → x = 1.1073... = 1.11 (3 s.f.) [1]`,
      examinerTip: "For part (b), take logarithms of both sides. Use ln throughout OR log throughout — do not mix. The change of base formula (log₂5 = ln5/ln2) is derived automatically when you take log of both sides.",
    },
    {
      year: 2022,
      paper: "Paper 1 (Pure)",
      questionNumber: "11",
      marks: 6,
      difficulty: "HARD",
      subjectId: mathematics.id,
      topicId: logarithms.id,
      content: `The number of bacteria N in a culture at time t hours is modelled by N = 500e^(0.4t).\n\n(a) Find the initial number of bacteria. [1]\n\n(b) Find the time at which the number of bacteria first exceeds 10 000. Give your answer in hours and minutes, correct to the nearest minute. [4]\n\n(c) Find the rate of growth when t = 5. [2]`,
      markScheme: `(a) t = 0: N = 500e⁰ = 500 [1]

(b) 500e^(0.4t) > 10000
e^(0.4t) > 20 [1]
0.4t > ln20 [1]
t > ln20/0.4 = 2.9957.../0.4 = 7.489... hours [1]
= 7 hours 29 minutes (nearest minute) [1]

(c) dN/dt = 500 × 0.4 × e^(0.4t) = 200e^(0.4t)
At t=5: dN/dt = 200e² = 200 × 7.389... = 1477.8... ≈ 1480 bacteria/hour [2]`,
      examinerTip: "For part (b), convert decimal hours to minutes: 0.489 × 60 = 29.4 minutes ≈ 29 minutes. Don't round the hours first — carry full precision through the calculation.",
    },
    {
      year: 2021,
      paper: "Paper 1 (Pure)",
      questionNumber: "6",
      marks: 5,
      difficulty: "EASY",
      subjectId: mathematics.id,
      topicId: differentiation.id,
      content: `A curve has the equation y = (x² + 3)/(2x − 1) for x ≠ 1/2.\n\nUsing the quotient rule, find dy/dx and simplify your answer.`,
      markScheme: `Let u = x² + 3, v = 2x − 1
du/dx = 2x, dv/dx = 2 [1]

dy/dx = (v·(du/dx) − u·(dv/dx)) / v² [1 for correct formula]
= ((2x−1)(2x) − (x²+3)(2)) / (2x−1)² [1]
= (4x² − 2x − 2x² − 6) / (2x−1)² [1]
= (2x² − 2x − 6) / (2x−1)² [1]
= 2(x² − x − 3) / (2x−1)²`,
      examinerTip: "State u, v, du/dx, dv/dx explicitly before applying the formula. This earns method marks even if you make an arithmetic error. Never forget to divide by v² (not v).",
    },
    {
      year: 2020,
      paper: "Paper 4 (Mechanics)",
      questionNumber: "2",
      marks: 5,
      difficulty: "MEDIUM",
      subjectId: mathematics.id,
      topicId: mechanics.id,
      content: `A box of mass 8 kg is on a rough horizontal surface. A horizontal force of 30 N is applied to the box. The box moves with constant velocity.\n\n(a) Find the coefficient of friction between the box and the surface. [3]\n\n(b) The horizontal force is now increased to 50 N. Find the acceleration of the box. [2]`,
      markScheme: `(a) Constant velocity → acceleration = 0 → resultant force = 0 [1]
Normal reaction R = 8g = 78.4 N (use g = 9.8 m/s²) [1]
Friction = Applied force = 30 N
μ = F/R = 30/78.4 = 0.383 (3 s.f.) [1]
(Accept g = 10, giving μ = 30/80 = 0.375)

(b) Net force = 50 − friction = 50 − μ × 8g = 50 − 30 = 20 N [1]
a = F/m = 20/8 = 2.5 m/s² [1]`,
      examinerTip: "For part (a), constant velocity is the key — it means equilibrium (resultant = 0). The friction force equals the applied force. Use your friction value from (a) in (b) — this is error carried forward (ECF).",
    },
    {
      year: 2023,
      paper: "Paper 2 (Statistics)",
      questionNumber: "6",
      marks: 7,
      difficulty: "HARD",
      subjectId: mathematics.id,
      topicId: statistics.id,
      content: `A company claims that 40% of customers are satisfied with their service. A random sample of 15 customers is taken.\n\n(a) State the distribution of the number of satisfied customers, X, including its parameters. [1]\n\n(b) Find P(X < 5). [2]\n\n(c) A customer service manager claims the true proportion is greater than 40%. He surveys 15 customers and finds 10 are satisfied. Carry out a one-tailed hypothesis test at the 5% significance level to test his claim. [4]`,
      markScheme: `(a) X ~ B(15, 0.4) [1]

(b) P(X < 5) = P(X ≤ 4) = 0.2173 (from tables) [2]
(Award M1 for correct interpretation of "less than"; A1 for correct value)

(c) H₀: p = 0.4; H₁: p > 0.4 (one-tailed) [1]
Under H₀: X ~ B(15, 0.4)
P(X ≥ 10) = 1 − P(X ≤ 9) = 1 − 0.9662 = 0.0338 [1]
0.0338 < 0.05 (significance level) [1]
Reject H₀. There is sufficient evidence at the 5% level to support the manager's claim that the true proportion is greater than 40%. [1]`,
      examinerTip: "Always state H₀ and H₁ clearly with the parameter p (not X). For a one-tailed test, calculate P(X ≥ observed), not P(X = observed). Write a conclusion in context — 'reject H₀' alone is not sufficient.",
    },
  ];

  for (const q of [...bioQuestions, ...mathsQuestions]) {
    await prisma.question.create({
      data: {
        ...q,
        difficulty: Difficulty[q.difficulty as keyof typeof Difficulty],
      },
    });
  }

  console.log(`✓ Created ${bioQuestions.length + mathsQuestions.length} questions`);

  // ─── Sample Flashcards ─────────────────────────────────────────────────────

  const flashcards = [
    { front: "What is the equation for photosynthesis?", back: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂\n(in the presence of light and chlorophyll)", subjectId: biology.id, topicId: photosynthesis.id },
    { front: "Where do the light-dependent reactions occur?", back: "On the thylakoid membranes (grana) of the chloroplast", subjectId: biology.id, topicId: photosynthesis.id },
    { front: "What is the role of NADP in photosynthesis?", back: "NADP is reduced (to NADPH) in the light-dependent reactions. It carries hydrogen to the Calvin cycle for reduction of GP to G3P.", subjectId: biology.id, topicId: photosynthesis.id },
    { front: "State the Hardy-Weinberg principle", back: "In a large, randomly mating population with no selection, mutation, migration or genetic drift, allele frequencies remain constant from generation to generation.\n\np² + 2pq + q² = 1, where p + q = 1", subjectId: biology.id, topicId: genetics.id },
    { front: "What is the difference between aerobic and anaerobic ATP yield?", back: "Aerobic: ~36–38 ATP per glucose molecule\nAnaerobic (glycolysis only): 2 ATP per glucose molecule", subjectId: biology.id, topicId: respiration.id },
    { front: "State the quotient rule for differentiation", back: "If y = u/v, then dy/dx = (v·du/dx − u·dv/dx) / v²", subjectId: mathematics.id, topicId: differentiation.id },
    { front: "What is the chain rule?", back: "If y = f(g(x)), then dy/dx = f'(g(x)) · g'(x)\n\nOr: dy/dx = dy/du · du/dx", subjectId: mathematics.id, topicId: differentiation.id },
    { front: "State the integral of xⁿ (n ≠ −1)", back: "∫xⁿ dx = xⁿ⁺¹/(n+1) + c\n\nRaise power by 1, divide by new power, add constant c", subjectId: mathematics.id, topicId: integration.id },
    { front: "State the formula for variance of a binomial distribution", back: "Var(X) = np(1−p)\n\nWhere n = number of trials, p = probability of success", subjectId: mathematics.id, topicId: statistics.id },
    { front: "How do you solve logₐ(x) = b?", back: "Convert to exponential form: x = aᵇ\n\nExample: log₂(x) = 3 → x = 2³ = 8", subjectId: mathematics.id, topicId: logarithms.id },
  ];

  for (const f of flashcards) {
    await prisma.flashcard.create({ data: f });
  }

  console.log(`✓ Created ${flashcards.length} flashcards`);
  console.log("\n✅ Seed complete!");
  console.log("   Demo login: demo@vantage.study / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
