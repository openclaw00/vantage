import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("📚 Seeding revision notes...");

  // Update courseGroups on existing subjects
  const courseGroupMap: Record<string, string> = {
    "0610": "Sciences", "0620": "Sciences", "0625": "Sciences", "0653": "Sciences",
    "0580": "Mathematics", "0606": "Mathematics",
    "0500": "English", "0475": "English",
    "0470": "Humanities", "0460": "Humanities", "0455": "Humanities",
    "0450": "Business", "0452": "Business",
    "0478": "Technology", "0417": "Technology",
    "0520": "Languages", "0530": "Languages",
    "9709": "Mathematics",
  };
  for (const [code, group] of Object.entries(courseGroupMap)) {
    await prisma.subject.updateMany({ where: { code }, data: { courseGroup: group } });
  }

  const bio = await prisma.subject.upsert({
    where: { code: "0610" }, update: { courseGroup: "Sciences" },
    create: { name: "Biology", code: "0610", examBoard: "CAMBRIDGE", level: "IGCSE", color: "#16A34A", courseGroup: "Sciences" },
  });
  const chem = await prisma.subject.upsert({
    where: { code: "0620" }, update: { courseGroup: "Sciences" },
    create: { name: "Chemistry", code: "0620", examBoard: "CAMBRIDGE", level: "IGCSE", color: "#2563EB", courseGroup: "Sciences" },
  });
  const phys = await prisma.subject.upsert({
    where: { code: "0625" }, update: { courseGroup: "Sciences" },
    create: { name: "Physics", code: "0625", examBoard: "CAMBRIDGE", level: "IGCSE", color: "#7C3AED", courseGroup: "Sciences" },
  });
  const math = await prisma.subject.upsert({
    where: { code: "0580" }, update: { courseGroup: "Mathematics" },
    create: { name: "Mathematics", code: "0580", examBoard: "CAMBRIDGE", level: "IGCSE", color: "#DC2626", courseGroup: "Mathematics" },
  });
  const cs = await prisma.subject.upsert({
    where: { code: "0478" }, update: { courseGroup: "Technology" },
    create: { name: "Computer Science", code: "0478", examBoard: "CAMBRIDGE", level: "IGCSE", color: "#0D9488", courseGroup: "Technology" },
  });
  const econ = await prisma.subject.upsert({
    where: { code: "0455" }, update: { courseGroup: "Humanities" },
    create: { name: "Economics", code: "0455", examBoard: "CAMBRIDGE", level: "IGCSE", color: "#B45309", courseGroup: "Humanities" },
  });

  // ── BIOLOGY ────────────────────────────────────────────────────────────────
    await prisma.revisionNote.deleteMany({ where: { subjectId: bio.id } });
    const bioNotes = [
      {
        order: 1,
        title: "1. Cell Structure & Organisation",
        content: `## Cell Theory
All living organisms are made of cells. The cell is the basic structural and functional unit of life.

## Animal vs Plant Cells

**Animal Cell** contains:
- Cell membrane — controls what enters/leaves the cell
- Nucleus — contains DNA; controls cell activities
- Cytoplasm — site of most metabolic reactions
- Mitochondria — site of aerobic respiration; produces ATP
- Ribosomes — site of protein synthesis

**Plant Cell** contains all of the above, PLUS:
- Cell wall (cellulose) — provides rigidity and support
- Chloroplasts — contain chlorophyll; site of photosynthesis
- Large permanent vacuole — filled with cell sap; maintains turgor pressure

## Specialised Cells
- **Red blood cells** — biconcave disc; no nucleus; packed with haemoglobin; large surface area for O₂ absorption
- **Sperm cell** — long tail (flagellum) for movement; many mitochondria; acrosome contains enzymes to penetrate egg
- **Root hair cell** — large surface area; thin wall for rapid water absorption
- **Palisade mesophyll cell** — many chloroplasts near top surface for maximum light absorption
- **Guard cells** — control stomatal opening; contain chloroplasts; change shape when turgid/flaccid

## Organisation Levels
Cell → Tissue → Organ → Organ System → Organism

## Osmosis, Diffusion & Active Transport
- **Diffusion** — net movement of particles from high to low concentration (down a concentration gradient); passive (no energy needed)
- **Osmosis** — diffusion of water molecules through a partially permeable membrane from dilute to concentrated solution
- **Active transport** — movement of substances against a concentration gradient; requires ATP energy and carrier proteins

> **Exam tip:** Osmosis is specifically about *water* through a *partially permeable membrane*. Do not say "osmosis moves particles" — only water molecules move by osmosis.`,
      },
      {
        order: 2,
        title: "2. Biological Molecules & Enzymes",
        content: `## Carbohydrates
- **Glucose** (C₆H₁₂O₆) — monosaccharide; main respiratory substrate
- **Starch** — polysaccharide; storage in plants; tested with iodine (blue-black)
- **Glycogen** — storage in animals (liver and muscle)
- **Cellulose** — structural in plant cell walls

## Proteins
- Made of amino acids linked by peptide bonds
- **Structure** determined by sequence of amino acids
- Functions: enzymes, antibodies, haemoglobin, structural (keratin, collagen)

## Lipids
- Made of glycerol + 3 fatty acids
- Functions: energy store, thermal insulation, cell membranes

## Enzymes
**Definition:** Biological catalysts made of protein that speed up metabolic reactions without being used up.

**Key concepts:**
- Each enzyme has an **active site** with a specific shape
- Only the **complementary substrate** fits — *lock and key* model
- **Enzyme-substrate complex** forms temporarily

**Factors affecting enzyme activity:**
- **Temperature** — increases rate up to optimum (~37°C in humans); above optimum the enzyme **denatures** (active site changes shape permanently)
- **pH** — each enzyme has an optimum pH; extremes cause denaturation
- **Substrate concentration** — higher concentration → faster rate, until all active sites occupied
- **Enzyme concentration** — more enzyme → faster rate (if substrate not limiting)

**Enzyme experiments:**
- Amylase breaks starch → maltose (test with iodine every 30 s; blue-black → colourless)
- Catalase breaks H₂O₂ → water + oxygen (measure O₂ bubble production)

> **Exam tip:** "Denatured" does NOT mean killed — enzymes are not alive. Say the active site has changed shape so the substrate no longer fits.`,
      },
      {
        order: 3,
        title: "3. Nutrition & Digestion",
        content: `## Photosynthesis
**Word equation:** Carbon dioxide + Water → Glucose + Oxygen

**Symbol equation:** 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (using light energy + chlorophyll)

**Factors limiting photosynthesis:**
- Light intensity
- CO₂ concentration
- Temperature

**Uses of glucose in plants:** Respiration, cellulose (cell walls), starch (storage), proteins (with nitrates), fats/oils

## Human Digestive System
| Part | Function |
|------|----------|
| Mouth | Mechanical digestion; salivary amylase digests starch |
| Oesophagus | Peristalsis moves food to stomach |
| Stomach | HCl kills bacteria; pepsin digests proteins |
| Small intestine | Bile (from liver) emulsifies fats; pancreatic enzymes complete digestion; villi absorb nutrients |
| Large intestine | Water reabsorption; formation of faeces |
| Rectum/Anus | Storage and egestion of faeces |

**Enzymes:**
- Amylase (salivary & pancreatic) → starch to maltose
- Protease (pepsin, trypsin) → proteins to amino acids
- Lipase (pancreatic) → fats to fatty acids + glycerol

**Villi adaptations** (small intestine absorption):
- Finger-like projections → large surface area
- Thin epithelium → short diffusion distance
- Rich blood supply → maintain concentration gradient
- Lacteals absorb fatty acids and glycerol

## Dietary Components
- **Carbohydrates** — energy (starch, glucose)
- **Proteins** — growth and repair
- **Fats** — energy store, insulation, cell membranes
- **Vitamins** — C (scurvy prevention), D (calcium absorption)
- **Minerals** — Ca²⁺ (bones/teeth), Fe²⁺ (haemoglobin)
- **Fibre** — prevents constipation
- **Water** — solvent for reactions, transport medium`,
      },
      {
        order: 4,
        title: "4. Respiration & Gas Exchange",
        content: `## Aerobic Respiration
**Word equation:** Glucose + Oxygen → Carbon dioxide + Water (+ energy/ATP)

**Symbol equation:** C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O

- Occurs in mitochondria
- Releases maximum ATP (~38 per glucose)
- Used for: movement, active transport, growth, maintaining body temperature

## Anaerobic Respiration

**In animals/humans:**
Glucose → Lactic acid (+ small amount of ATP)
- Occurs during intense exercise when O₂ is insufficient
- Causes muscle fatigue
- Oxygen debt: extra O₂ needed after exercise to oxidise lactic acid

**In yeast (fermentation):**
Glucose → Ethanol + Carbon dioxide (+ small amount of ATP)
- Used in brewing and bread-making

> **Key difference:** Aerobic produces ~19× more ATP than anaerobic.

## Human Gas Exchange
**Pathway:** Nose/mouth → Trachea → Bronchi → Bronchioles → Alveoli

**Alveoli adaptations:**
- Millions → enormous surface area (~70 m²)
- One cell thick → short diffusion path
- Moist lining — gases dissolve before diffusing
- Surrounded by capillaries — maintain concentration gradient

**Breathing mechanism:**
- **Inhalation:** Diaphragm contracts (flattens), intercostal muscles contract, ribs move up/out → thorax volume increases → pressure decreases → air enters
- **Exhalation:** Reverse of above; diaphragm relaxes, dome shape restored

**Composition of inhaled vs exhaled air:**
| Gas | Inhaled | Exhaled |
|-----|---------|---------|
| O₂ | 21% | 16% |
| CO₂ | 0.04% | 4% |
| N₂ | 78% | 78% |
| Water vapour | variable | saturated |`,
      },
      {
        order: 5,
        title: "5. Transport in Plants & Animals",
        content: `## Blood & Circulatory System

**Blood components:**
- **Red blood cells** — carry O₂ as oxyhaemoglobin; no nucleus; biconcave
- **White blood cells** — immune defence; phagocytes engulf pathogens; lymphocytes produce antibodies
- **Platelets** — blood clotting
- **Plasma** — liquid; carries glucose, CO₂, urea, hormones, antibodies

**Double circulation:**
- Pulmonary circuit: heart → lungs → heart (deoxygenated to oxygenated)
- Systemic circuit: heart → body → heart

**Heart structure:**
- 4 chambers: right/left atria (receive blood), right/left ventricles (pump blood)
- Right side: deoxygenated blood to lungs via pulmonary artery
- Left side: oxygenated blood to body via aorta
- Left ventricle has thicker wall — pumps blood further

**Blood vessels:**
| Vessel | Function | Wall | Lumen |
|--------|----------|------|-------|
| Artery | Away from heart | Thick, elastic | Narrow |
| Vein | Towards heart | Thin | Wide, valves |
| Capillary | Exchange | One cell thick | Very narrow |

## Transport in Plants

**Xylem** — transports water and minerals from roots to leaves (upward only)
- Dead cells; hollow tubes; lignified walls
- Water moves by transpiration stream

**Phloem** — transports sugars (sucrose) from leaves to all parts (up and down)
- Living cells; sieve tubes + companion cells
- Process called translocation

**Transpiration:** Evaporation of water from leaves through stomata
- Increased by: high temperature, low humidity, wind, high light intensity
- Guard cells open stomata in light (turgid) and close in dark (flaccid)`,
      },
      {
        order: 6,
        title: "6. Genetics & Inheritance",
        content: `## Key Definitions
- **Gene** — a section of DNA that codes for a specific protein/characteristic
- **Allele** — different versions of the same gene
- **Dominant** — allele expressed even if only one copy present (capital letter, e.g. T)
- **Recessive** — allele only expressed if two copies present (lowercase, e.g. t)
- **Homozygous** — both alleles the same (TT or tt)
- **Heterozygous** — alleles different (Tt)
- **Genotype** — genetic make-up (e.g. Tt)
- **Phenotype** — observable characteristics (e.g. tall)

## Monohybrid Crosses
Use a Punnett square. Example: Tall (T) dominant over short (t)

Cross Tt × Tt:

        T     t
    T  TT    Tt
    t  Tt    tt

Ratio: 3 tall : 1 short (3:1)

## Sex Determination
- Human cells have 46 chromosomes (23 pairs)
- Sex chromosomes: **XX = female**, **XY = male**
- 50% probability of each sex in any pregnancy

## DNA Structure
- Double helix of two polynucleotide strands
- Made of nucleotides: phosphate + deoxyribose sugar + base
- Base pairs: A-T, C-G (complementary base pairing)
- DNA carries the genetic code for making proteins

## Mitosis vs Meiosis
| | Mitosis | Meiosis |
|--|---------|---------|
| Purpose | Growth, repair | Gamete production |
| Daughter cells | 2, identical | 4, genetically different |
| Chromosome number | Maintained (diploid) | Halved (haploid) |
| Occurs in | Body cells | Gonads (testes/ovaries) |

## Mutation
- Change in DNA base sequence
- Can be caused by mutagens: UV light, X-rays, certain chemicals
- Most are harmful or neutral; rarely beneficial
- Basis of evolution (natural selection acts on mutations)`,
      },
      {
        order: 7,
        title: "7. Ecology & Environment",
        content: `## Key Terms
- **Ecosystem** — all organisms in an area + their non-living environment
- **Habitat** — place where an organism lives
- **Population** — all individuals of one species in an area
- **Community** — all populations of all species in an area
- **Niche** — role of an organism in its ecosystem (what it eats, what eats it, when active)

## Food Chains & Webs
- Producer → Primary consumer → Secondary consumer → Tertiary consumer
- Energy **lost** at each trophic level (heat from respiration, uneaten parts, waste)
- Only ~10% of energy passes to the next level
- Pyramids of biomass always pyramid-shaped (unlike pyramids of numbers)

## Nutrient Cycles

**Carbon cycle:**
- CO₂ removed from atmosphere by: photosynthesis
- CO₂ added to atmosphere by: respiration, combustion, decomposition

**Nitrogen cycle:**
- Nitrogen fixation (N₂ → NH₃): nitrogen-fixing bacteria in soil/root nodules
- Nitrification: nitrifying bacteria convert NH₃ → nitrites → nitrates
- Denitrification: denitrifying bacteria convert nitrates → N₂
- Plants absorb nitrates through roots; used to make proteins

## Human Impacts
- **Deforestation:** reduces CO₂ absorption, causes soil erosion, destroys habitats
- **Global warming:** increased CO₂ → enhanced greenhouse effect → rising temperatures
- **Eutrophication:** excess fertilisers → algal bloom → less light → aquatic plants die → bacterial decomposition uses O₂ → fish die
- **Pesticides:** can accumulate in food chains (bioaccumulation)
- **Conservation:** sustainable fishing (net size/quotas), reforestation, captive breeding, seed banks`,
      },
    ];
    await prisma.revisionNote.createMany({ data: bioNotes.map((n) => ({ ...n, subjectId: bio.id })) });
    console.log("✓ Biology notes");

  // ── CHEMISTRY ────────────────────────────────────────────────────────────
    await prisma.revisionNote.deleteMany({ where: { subjectId: chem.id } });
    const chemNotes = [
      {
        order: 1,
        title: "1. Atomic Structure & the Periodic Table",
        content: `## Atomic Structure
An atom consists of a nucleus (protons + neutrons) surrounded by electrons in shells.

| Particle | Relative Mass | Relative Charge | Location |
|----------|--------------|-----------------|----------|
| Proton | 1 | +1 | Nucleus |
| Neutron | 1 | 0 | Nucleus |
| Electron | 1/1840 | -1 | Shells |

**Key definitions:**
- **Atomic number (Z)** — number of protons (= number of electrons in neutral atom)
- **Mass number (A)** — number of protons + neutrons
- **Isotopes** — atoms of the same element with the same number of protons but different number of neutrons (e.g. ¹²C and ¹⁴C)

## Electronic Configuration
Electrons fill shells in order: Shell 1 (max 2), Shell 2 (max 8), Shell 3 (max 8 for IGCSE)

Examples:
- Na (Z=11): 2, 8, 1
- Cl (Z=17): 2, 8, 7
- Ca (Z=20): 2, 8, 8, 2

## The Periodic Table
- Elements arranged by **increasing atomic number**
- **Period** = horizontal row (same number of electron shells)
- **Group** = vertical column (same number of outer electrons = similar chemical properties)
- **Group I (Alkali metals):** 1 outer electron; very reactive; react vigorously with water
- **Group VII (Halogens):** 7 outer electrons; reactive non-metals; form -1 ions
- **Group 0 (Noble gases):** full outer shell; unreactive; used in lighting/balloons

## Ions
- **Cation** (positive): metal atoms lose electrons (e.g. Na → Na⁺ + e⁻)
- **Anion** (negative): non-metal atoms gain electrons (e.g. Cl + e⁻ → Cl⁻)
- Group I → +1 ion; Group II → +2 ion; Group VI → -2 ion; Group VII → -1 ion`,
      },
      {
        order: 2,
        title: "2. Chemical Bonding",
        content: `## Ionic Bonding
Transfer of electrons from metal to non-metal.
- Forms giant ionic lattice
- Properties: high melting/boiling point; conducts electricity when molten or dissolved (ions free to move); soluble in water; brittle

**Example:** NaCl — Na donates 1 electron to Cl; Na⁺ and Cl⁻ attract electrostatically

## Covalent Bonding
Sharing of electrons between non-metals.
- **Simple molecular:** small molecules (H₂O, CO₂, CH₄, HCl); low melting point; do NOT conduct electricity; may be gas/liquid at room temperature
- **Giant covalent:** diamond, graphite, silicon dioxide; very high melting point; hard (except graphite)

**Diamond:** each C bonded to 4 others in tetrahedral structure; very hard; no free electrons → doesn't conduct

**Graphite:** each C bonded to 3 others in layers; layers slide → lubricant; delocalised electrons → conducts electricity

## Metallic Bonding
Positive metal ions in a "sea" of delocalised electrons.
- Properties: good conductors of heat and electricity; malleable and ductile; high melting point; lustrous

## Summary Table
| Property | Ionic | Simple Covalent | Metallic |
|----------|-------|----------------|---------|
| Melting point | High | Low | High |
| Conducts (solid) | No | No | Yes |
| Conducts (liquid) | Yes | No | Yes |
| Solubility | Often soluble | Variable | Insoluble |`,
      },
      {
        order: 3,
        title: "3. Chemical Reactions & Equations",
        content: `## Balancing Equations
Atoms must be conserved — same number of each atom on both sides.

**Method:**
1. Write word equation
2. Write formulae
3. Balance by adjusting coefficients only (NOT subscripts)

**Example:** Magnesium + oxygen → magnesium oxide
- Unbalanced: Mg + O₂ → MgO
- Balanced: **2**Mg + O₂ → **2**MgO

## Types of Reactions
- **Combination (synthesis):** A + B → AB
- **Decomposition:** AB → A + B (e.g. thermal decomposition of CaCO₃)
- **Displacement:** more reactive element displaces less reactive from compound
- **Redox:** simultaneous oxidation (loss of electrons) and reduction (gain of electrons)
  - **OIL RIG** — Oxidation Is Loss, Reduction Is Gain (of electrons)

## Reactivity Series (high to low)
K > Na > Ca > Mg > Al > Zn > Fe > Ni > Sn > Pb > H > Cu > Ag > Au

- Metals above H react with dilute acids to form salt + hydrogen
- More reactive metal displaces less reactive from solution
- Thermite reaction: Al + Fe₂O₃ → Al₂O₃ + Fe (Al more reactive than Fe)

## Rates of Reaction
Factors that **increase** rate:
- **Increased temperature** — particles have more kinetic energy; more frequent and energetic collisions
- **Increased concentration** — more particles per unit volume; more frequent collisions
- **Increased surface area** — more particles exposed; more collisions possible
- **Adding a catalyst** — provides alternative pathway with lower activation energy

**Collision theory:** Reactions occur when particles collide with sufficient energy (≥ activation energy) and correct orientation.`,
      },
      {
        order: 4,
        title: "4. Acids, Bases & Salts",
        content: `## Definitions
- **Acid** — substance that produces H⁺ ions in solution; pH < 7
- **Base** — substance that neutralises an acid; metal oxide or metal hydroxide
- **Alkali** — soluble base; produces OH⁻ ions in solution; pH > 7
- **Neutral** — pH 7

## Common Acids & Alkalis
- Hydrochloric acid: HCl → H⁺ + Cl⁻
- Sulphuric acid: H₂SO₄ → 2H⁺ + SO₄²⁻
- Nitric acid: HNO₃ → H⁺ + NO₃⁻
- Sodium hydroxide: NaOH → Na⁺ + OH⁻

## Neutralisation
Acid + Base → Salt + Water
H⁺ + OH⁻ → H₂O (ionic equation)

## Making Salts
| Salt | From acid |
|------|-----------|
| Chloride | Hydrochloric acid |
| Sulphate | Sulphuric acid |
| Nitrate | Nitric acid |

**Insoluble salt:** mix two soluble solutions (precipitation)
**Soluble salt from soluble base:** titration
**Soluble salt from insoluble base/carbonate/metal:** add excess solid, filter, evaporate

## Reactions of Acids
- Acid + metal → salt + hydrogen (Mg + 2HCl → MgCl₂ + H₂↑)
- Acid + base → salt + water
- Acid + carbonate → salt + water + CO₂ (test CO₂ with limewater → turns milky)

## pH & Indicators
- Universal indicator: gradual colour change across full pH range
- Litmus: red in acid, blue in alkali
- Phenolphthalein: colourless in acid, pink in alkali
- Methyl orange: red in acid, yellow in alkali`,
      },
      {
        order: 5,
        title: "5. Organic Chemistry",
        content: `## Hydrocarbons
Compounds containing only carbon and hydrogen.

**Alkanes** (saturated — single bonds only): CₙH₂ₙ₊₂
- Methane CH₄, Ethane C₂H₆, Propane C₃H₈, Butane C₄H₁₀
- Unreactive; combustion is main reaction

**Alkenes** (unsaturated — contain C=C double bond): CₙH₂ₙ
- Ethene C₂H₄, Propene C₃H₆
- More reactive than alkanes; undergo addition reactions
- **Test for alkene:** decolourise bromine water (orange → colourless)

## Combustion
- **Complete:** hydrocarbon + excess O₂ → CO₂ + H₂O (clean blue flame)
- **Incomplete:** limited O₂ → CO (toxic) + C (soot) + H₂O (yellow/orange flame)

## Crude Oil & Fractional Distillation
Crude oil is a mixture of hydrocarbons separated by fractional distillation (based on boiling points).

| Fraction | Carbon chain | Use |
|----------|-------------|-----|
| Refinery gas | C₁–C₄ | Fuel (gas) |
| Petrol | C₅–C₁₀ | Car fuel |
| Kerosene | C₁₀–C₁₆ | Jet fuel |
| Diesel | C₁₅–C₂₅ | Lorries |
| Fuel oil | C₂₀–C₇₀ | Ships, power stations |
| Bitumen | C₇₀+ | Road surfaces |

**Trend:** shorter chain → lower boiling point, more flammable, less viscous, more volatile

## Addition Polymerisation
Many alkene monomers join to form a polymer.
nCH₂=CH₂ → (−CH₂−CH₂−)ₙ (polyethene)

## Alcohols & Carboxylic Acids
- **Ethanol** C₂H₅OH — produced by fermentation; fuel; solvent
- **Ethanoic acid** CH₃COOH — in vinegar; weak acid
- Alcohol + acid → ester + water (e.g. perfumes, food flavourings)`,
      },
    ];
    await prisma.revisionNote.createMany({ data: chemNotes.map((n) => ({ ...n, subjectId: chem.id })) });
    console.log("✓ Chemistry notes");

  // ── PHYSICS ───────────────────────────────────────────────────────────────
    await prisma.revisionNote.deleteMany({ where: { subjectId: phys.id } });
    const physNotes = [
      {
        order: 1,
        title: "1. Motion, Forces & Energy",
        content: `## Speed, Velocity & Acceleration
- **Speed** (scalar) = distance / time (m/s)
- **Velocity** (vector) = displacement / time (direction matters)
- **Acceleration** = change in velocity / time = (v − u) / t (m/s²)

**SUVAT equations (uniform acceleration):**
- v = u + at
- s = ut + ½at²
- v² = u² + 2as

## Distance-Time & Velocity-Time Graphs
- **Distance-time:** gradient = speed; horizontal = stationary; curve = changing speed
- **Velocity-time:** gradient = acceleration; area under graph = distance travelled; horizontal = constant velocity

## Forces
**Newton's Laws:**
1. Object stays at rest or constant velocity unless acted on by a resultant force
2. F = ma (resultant force = mass × acceleration; units: N = kg·m/s²)
3. Every action has an equal and opposite reaction

**Types of forces:** gravity (weight = mg), friction, normal reaction, tension, drag

**Terminal velocity:** when drag = weight; resultant force = 0; constant velocity (e.g. skydiver)

## Momentum
- **Momentum** p = mv (kg·m/s); vector quantity
- **Law of conservation of momentum:** total momentum before = total momentum after (closed system)
- **Impulse** = Ft = change in momentum (Ns)

## Energy
- **Kinetic energy:** KE = ½mv²
- **Gravitational PE:** GPE = mgh
- **Efficiency:** = useful energy output / total energy input × 100%

**Energy stores:** kinetic, gravitational PE, elastic PE, thermal, chemical, nuclear, electromagnetic`,
      },
      {
        order: 2,
        title: "2. Thermal Physics",
        content: `## Temperature & Heat
- **Temperature** — measure of average kinetic energy of particles (°C or K)
- **Heat** — thermal energy transferred from hot to cold (J)
- Absolute zero = −273°C = 0 K (particles have minimum kinetic energy)
- K = °C + 273

## Specific Heat Capacity
**Q = mcΔT**
- Q = energy transferred (J)
- m = mass (kg)
- c = specific heat capacity (J/kg·°C)
- ΔT = temperature change (°C)

Water: c = 4200 J/kg·°C (high SHC — useful as coolant)

## Specific Latent Heat
**Q = mL**
- L = specific latent heat (J/kg)
- No temperature change during change of state — energy breaks/forms intermolecular bonds
- Latent heat of fusion (melting/freezing)
- Latent heat of vaporisation (boiling/condensing)

## Thermal Expansion
- Solids, liquids, gases all expand when heated
- Gases expand most; solids expand least
- Applications: thermostats (bimetallic strip), gaps in bridges/rails

## Heat Transfer
**Conduction:** particle vibration passes energy through solids; metals best conductors (free electrons)

**Convection:** hot fluid rises (less dense), cool fluid sinks; forms convection currents; only in fluids

**Radiation:** electromagnetic waves (infrared); no medium needed; dark/matt surfaces absorb and emit best; shiny/light surfaces reflect best

**Vacuum flask (Thermos):** silvered walls reduce radiation; vacuum eliminates conduction and convection`,
      },
      {
        order: 3,
        title: "3. Waves — Light & Sound",
        content: `## Wave Properties
- **Transverse waves:** oscillation perpendicular to direction of travel (light, water waves)
- **Longitudinal waves:** oscillation parallel to direction of travel (sound, ultrasound)
- **Wave equation:** v = fλ (speed = frequency × wavelength)
- **Frequency** f (Hz) = 1/T (T = period in seconds)

## Electromagnetic Spectrum (low to high frequency)
Radio → Microwave → Infrared → Visible → Ultraviolet → X-ray → Gamma ray

- All travel at 3 × 10⁸ m/s in a vacuum
- All are transverse waves

**Uses and dangers:**
| Type | Use | Hazard |
|------|-----|--------|
| Radio | Broadcasting | — |
| Microwave | Cooking, satellite | Internal heating |
| Infrared | Remote controls, thermal imaging | Burns |
| UV | Sterilisation | Skin cancer |
| X-ray | Medical imaging | Cell damage |
| Gamma | Cancer treatment, sterilising | Ionising radiation |

## Light
- **Reflection:** angle of incidence = angle of reflection (measured from normal)
- **Refraction:** bending of light when it crosses a boundary; light slows down and bends towards normal when entering denser medium
- **Snell's law:** n = sin i / sin r (n = refractive index)
- **Total internal reflection:** occurs when angle > critical angle; used in optical fibres
- **Critical angle:** sin c = 1/n

## Sound
- Longitudinal wave; requires a medium (cannot travel through vacuum)
- Speed in air ≈ 340 m/s (faster in solids and liquids)
- **Pitch** — frequency; higher frequency = higher pitch
- **Loudness** — amplitude; greater amplitude = louder
- Human hearing range: 20 Hz – 20,000 Hz
- **Ultrasound** (>20,000 Hz): used in medical scans, sonar, cleaning`,
      },
      {
        order: 4,
        title: "4. Electricity & Magnetism",
        content: `## Electric Circuits

**Current (I):** flow of charge; I = Q/t; units: Ampere (A)
**Voltage/p.d. (V):** energy per unit charge; units: Volt (V)
**Resistance (R):** opposition to current; R = V/I; units: Ohm (Ω)
**Ohm's Law:** V = IR (for ohmic conductors at constant temperature)

**Power:** P = IV = I²R = V²/R; units: Watt (W)
**Energy:** E = Pt = IVt; units: Joule (J)

**Series circuits:**
- Same current through all components
- Voltages add up: V_total = V₁ + V₂ + ...
- Resistances add: R_total = R₁ + R₂ + ...

**Parallel circuits:**
- Same voltage across all branches
- Currents add up: I_total = I₁ + I₂ + ...
- 1/R_total = 1/R₁ + 1/R₂ + ... (total resistance less than smallest)

## Components
- **Diode** — allows current in one direction only
- **LDR** (light-dependent resistor) — resistance decreases in bright light
- **Thermistor** — resistance decreases as temperature increases

## Magnetism
- Magnetic field lines run from N to S outside magnet
- **Electromagnet:** current-carrying coil of wire; strength increased by more turns, higher current, iron core
- **Motor effect:** F = BIL (force on current-carrying conductor in magnetic field)
- **Fleming's Left Hand Rule:** thumb = Force, index = Field, middle = Current
- **Electromagnetic induction:** moving conductor in magnetic field generates EMF (generator)
- **Transformer:** V_p/V_s = N_p/N_s; step-up (more secondary turns) or step-down (fewer secondary turns)`,
      },
      {
        order: 5,
        title: "5. Nuclear Physics",
        content: `## Radioactivity
**Types of radiation:**

| Type | Symbol | Charge | Mass | Penetration | Stopped by |
|------|--------|--------|------|-------------|------------|
| Alpha | α | +2 | 4 | Very low | Paper/skin |
| Beta | β | -1 | 1/1840 | Medium | Thin aluminium |
| Gamma | γ | 0 | 0 | High | Thick lead/concrete |

**Ionising power:** α > β > γ (inverse of penetration)

## Nuclear Equations
- **Alpha decay:** ₉₂²³⁸U → ₉₀²³⁴Th + ₂⁴He (mass number −4, atomic number −2)
- **Beta decay:** ₆¹⁴C → ₇¹⁴N + ₋₁⁰e (mass number unchanged, atomic number +1)
- **Gamma:** no change in mass number or atomic number; just energy released

## Half-life
**Definition:** time for half the radioactive nuclei in a sample to decay (time for activity to halve)

- After 1 half-life: N/2 remain
- After 2 half-lives: N/4 remain
- After 3 half-lives: N/8 remain

**Example:** If T₁/₂ = 5 years and N₀ = 800, after 15 years: 800 → 400 → 200 → 100 nuclei

## Uses of Radioactivity
- **Medical:** gamma rays to sterilise equipment; radiotherapy (γ to kill cancer); tracers (β or γ)
- **Industrial:** thickness gauges (β); detecting cracks
- **Carbon dating:** ¹⁴C has T₁/₂ = 5730 years; used to date organic materials
- **Nuclear power:** fission of ²³⁵U releases huge energy; chain reaction controlled in reactor

## Safety Precautions
- Keep distance from source
- Minimise exposure time
- Use shielding (lead)
- Never point at people; handle with tongs`,
      },
    ];
    await prisma.revisionNote.createMany({ data: physNotes.map((n) => ({ ...n, subjectId: phys.id })) });
    console.log("✓ Physics notes");

  // ── MATHEMATICS ───────────────────────────────────────────────────────────
    await prisma.revisionNote.deleteMany({ where: { subjectId: math.id } });
    const mathNotes = [
      {
        order: 1,
        title: "1. Number",
        content: `## Number Types
- **Natural numbers:** 1, 2, 3, ... (positive integers)
- **Integers:** ..., −2, −1, 0, 1, 2, ...
- **Rational numbers:** can be expressed as p/q (includes decimals that terminate or recur)
- **Irrational numbers:** cannot be expressed as fraction (π, √2, √3)
- **Real numbers:** all rational and irrational numbers

## Factors, Multiples & Primes
- **Factor:** divides exactly into a number
- **Multiple:** result of multiplying a number by an integer
- **Prime:** has exactly two factors (1 and itself); 2, 3, 5, 7, 11, 13, ...
- **HCF:** highest common factor — use prime factorisation
- **LCM:** lowest common multiple — use prime factorisation

**Prime factorisation:** 360 = 2³ × 3² × 5

## Indices (Powers)
- aᵐ × aⁿ = aᵐ⁺ⁿ
- aᵐ ÷ aⁿ = aᵐ⁻ⁿ
- (aᵐ)ⁿ = aᵐⁿ
- a⁰ = 1
- a⁻ⁿ = 1/aⁿ
- a^(1/n) = ⁿ√a
- a^(m/n) = (ⁿ√a)ᵐ

## Standard Form
A × 10ⁿ where 1 ≤ A < 10

- 3,400,000 = 3.4 × 10⁶
- 0.000056 = 5.6 × 10⁻⁵

## Percentages
- % increase = (increase / original) × 100
- Multiplier for n% increase: × (1 + n/100)
- Multiplier for n% decrease: × (1 − n/100)
- Reverse percentage: if value after 20% increase is 120, original = 120/1.2 = 100

## Ratio & Proportion
- Direct proportion: y = kx (graph is straight line through origin)
- Inverse proportion: y = k/x (graph is hyperbola)
- If y ∝ x², then y = kx²`,
      },
      {
        order: 2,
        title: "2. Algebra",
        content: `## Expanding & Factorising
- **Expanding:** a(b + c) = ab + ac
- **(a + b)(c + d)** = ac + ad + bc + bd (FOIL)
- **(a + b)²** = a² + 2ab + b²
- **(a − b)²** = a² − 2ab + b²
- **(a + b)(a − b)** = a² − b² (difference of two squares)

**Factorising quadratics:** x² + 5x + 6 = (x + 2)(x + 3)
- Find two numbers that multiply to constant and add to middle coefficient

## Solving Equations
**Linear:** isolate variable by doing same operation to both sides

**Quadratic:** ax² + bx + c = 0
- Factorisation
- Completing the square: (x + b/2a)² = b²/4a² − c/a
- **Quadratic formula:** x = (−b ± √(b² − 4ac)) / 2a
  - Discriminant b² − 4ac > 0: two real roots; = 0: one root; < 0: no real roots

**Simultaneous equations:**
- Elimination: multiply equations to match one variable, then add/subtract
- Substitution: rearrange one equation and substitute

## Sequences
- **Arithmetic (linear):** common difference d; nth term = a + (n−1)d
- **Geometric:** common ratio r; nth term = arⁿ⁻¹
- **Quadratic:** nth term has n² term; second difference is constant

## Functions
- f(x) notation: f(3) means substitute x = 3
- **Inverse function f⁻¹(x):** swap x and y, rearrange for y
- **Composite fg(x):** apply g first, then f to the result

## Inequalities
- Solve like equations, BUT flip the sign when multiplying/dividing by a negative
- Represent on number line: open circle for strict (</>), closed for ≤/≥
- **Linear programming:** find feasible region from simultaneous inequalities`,
      },
      {
        order: 3,
        title: "3. Geometry & Trigonometry",
        content: `## Angle Facts
- Angles on a straight line = 180°
- Angles around a point = 360°
- Vertically opposite angles are equal
- **Parallel lines:** alternate angles equal (Z-angles); co-interior angles sum to 180° (C-angles); corresponding angles equal (F-angles)

## Polygons
- Sum of interior angles of n-sided polygon = (n − 2) × 180°
- Regular polygon: each interior angle = (n − 2) × 180° / n
- Each exterior angle of regular polygon = 360° / n

## Circle Theorems
1. Angle at centre = 2 × angle at circumference (same arc)
2. Angle in semicircle = 90°
3. Angles in same segment are equal
4. Opposite angles of cyclic quadrilateral add to 180°
5. Tangent ⊥ radius at point of contact
6. Two tangents from external point are equal length
7. Alternate segment theorem: angle between tangent and chord = angle in alternate segment

## Trigonometry (Right-angled Triangles)
**SOH CAH TOA:**
- sin θ = opposite / hypotenuse
- cos θ = adjacent / hypotenuse
- tan θ = opposite / adjacent

**Non-right-angled triangles:**
- **Sine rule:** a/sin A = b/sin B = c/sin C
- **Cosine rule:** a² = b² + c² − 2bc cos A
- **Area:** ½ab sin C

## Pythagoras
a² + b² = c² (c = hypotenuse)

## Vectors
- Column vector notation: **a** = (x y) (column)
- Addition: **a** + **b** = (a₁+b₁, a₂+b₂)
- Scalar multiplication: k**a** = (ka₁, ka₂)
- Magnitude: |**a**| = √(x² + y²)
- Parallel vectors are scalar multiples of each other`,
      },
      {
        order: 4,
        title: "4. Statistics & Probability",
        content: `## Averages & Spread
- **Mean** = sum of values / number of values
- **Median** = middle value when ordered (or mean of two middle values)
- **Mode** = most frequent value
- **Range** = largest − smallest
- **Interquartile range (IQR)** = UQ − LQ (middle 50% of data)

**From frequency table:** mean = Σfx / Σf

**Estimated mean from grouped data:** use midpoints of class intervals

## Representing Data
- **Histogram:** area of bar ∝ frequency; frequency density = frequency / class width
- **Cumulative frequency curve:** read off median (50th percentile), LQ (25th), UQ (75th)
- **Box-and-whisker plot:** shows min, LQ, median, UQ, max
- **Scatter diagram:** shows correlation; line of best fit passes through mean point

## Probability
- P(event) = number of favourable outcomes / total outcomes
- 0 ≤ P(A) ≤ 1
- P(A') = 1 − P(A)  [complementary event]
- **Mutually exclusive:** P(A or B) = P(A) + P(B)
- **Independent events:** P(A and B) = P(A) × P(B)
- **Tree diagrams:** multiply along branches, add between branches

**Conditional probability:**
P(A|B) = P(A and B) / P(B)

> **Exam tip:** Always check whether events are independent or dependent (without replacement changes probabilities on second pick).`,
      },
    ];
    await prisma.revisionNote.createMany({ data: mathNotes.map((n) => ({ ...n, subjectId: math.id })) });
    console.log("✓ Mathematics notes");

  // ── COMPUTER SCIENCE ──────────────────────────────────────────────────────
    await prisma.revisionNote.deleteMany({ where: { subjectId: cs.id } });
    const csNotes = [
      {
        order: 1,
        title: "1. Number Systems & Binary",
        content: `## Number Bases
- **Denary (base 10):** digits 0–9 (everyday numbers)
- **Binary (base 2):** digits 0 and 1 (used by computers)
- **Hexadecimal (base 16):** digits 0–9 and A–F (A=10 ... F=15)

## Conversions

**Denary → Binary:** repeatedly divide by 2, read remainders bottom to top
- 45 ÷ 2 = 22 r1, 22 ÷ 2 = 11 r0, 11 ÷ 2 = 5 r1, 5 ÷ 2 = 2 r1, 2 ÷ 2 = 1 r0, 1 ÷ 2 = 0 r1
- 45 = **101101**₂

**Binary → Denary:** sum of (digit × positional value)
- 101101 = 32+0+8+4+0+1 = **45**

**Hex → Binary:** each hex digit = 4 bits
- A3₁₆ = 1010 0011₂

**Binary addition:**
- 0+0=0, 0+1=1, 1+0=1, 1+1=10 (0 carry 1), 1+1+1=11 (1 carry 1)

## Data Representation
**Text:** each character has ASCII code (7-bit, 128 characters) or Unicode (more languages)

**Images:** stored as pixels; each pixel has a colour value
- Colour depth = bits per pixel; more bits = more colours
- Resolution = pixels per unit area; higher = sharper

**Sound:** sampled at regular intervals
- Sample rate (Hz) = samples per second
- Bit depth = bits per sample
- Higher sample rate AND bit depth = better quality but larger file

**File size:**
- Image = width × height × colour depth (bits)
- Sound = sample rate × bit depth × duration (seconds)`,
      },
      {
        order: 2,
        title: "2. Algorithms & Problem Solving",
        content: `## What is an Algorithm?
A step-by-step set of instructions to solve a problem. Must be:
- **Correct** — produces right answer
- **Unambiguous** — each step has one interpretation
- **Finite** — terminates in a finite number of steps

## Pseudocode Constructs
**Sequence:** steps executed in order
**Selection:** IF condition THEN ... ELSE ... ENDIF
**Iteration:**
- FOR loop: FOR i ← 1 TO 10 ... NEXT i (count-controlled)
- WHILE loop: WHILE condition DO ... ENDWHILE (condition-controlled)

## Flowchart Symbols
- Oval: Start/End
- Rectangle: Process
- Diamond: Decision (Yes/No)
- Parallelogram: Input/Output

## Searching Algorithms

**Linear search:**
- Check each element in turn
- Works on unsorted lists
- O(n) time complexity

**Binary search:**
- List MUST be sorted
- Check midpoint; if target < mid, search left half; if > mid, search right half
- Repeat until found or list exhausted
- O(log n) — much faster for large sorted lists

## Sorting Algorithms

**Bubble sort:**
- Compare adjacent pairs; swap if out of order; repeat until no swaps
- Simple but slow: O(n²)

**Merge sort:**
- Divide list in half recursively until single elements
- Merge pairs back in sorted order
- Faster: O(n log n)

**Insertion sort:**
- Take each element and insert into correct position in sorted portion
- Efficient for nearly-sorted data`,
      },
      {
        order: 3,
        title: "3. Computer Systems & Networks",
        content: `## CPU (Central Processing Unit)
**Components:**
- **ALU** (Arithmetic Logic Unit) — performs calculations and logical operations
- **Control Unit** — fetches and decodes instructions; controls data flow
- **Registers** — small, fast storage within CPU (accumulator, program counter, memory address register)
- **Cache** — very fast memory between CPU and RAM; stores frequently used data

**Fetch-Decode-Execute cycle:**
1. Fetch instruction from memory address in program counter
2. Decode the instruction
3. Execute the instruction
4. Increment program counter

**CPU performance factors:** clock speed (GHz), number of cores, cache size

## Memory
- **RAM** (Random Access Memory): volatile (lost on power off); stores running programs and data
- **ROM** (Read Only Memory): non-volatile; stores BIOS/boot instructions
- **Secondary storage:** non-volatile; stores data long-term
  - HDD: magnetic; cheap; slower; large capacity
  - SSD: flash memory; faster; more expensive; no moving parts
  - Optical: CD/DVD/Blu-ray; portable

## Networks
**Types:**
- **LAN** (Local Area Network): single site; connected by cables/Wi-Fi
- **WAN** (Wide Area Network): multiple sites; connected via internet/leased lines

**Network hardware:**
- Router: connects networks; directs data packets
- Switch: connects devices on LAN; sends data only to intended recipient
- WAP (Wireless Access Point): provides wireless LAN access

**Protocols:** rules for communication
- **HTTP/HTTPS:** web browsing (S = encrypted with SSL/TLS)
- **TCP/IP:** data transmission; breaks data into packets
- **FTP:** file transfer
- **SMTP/IMAP:** email

## Cybersecurity
**Threats:**
- Malware: viruses, worms, Trojans, ransomware, spyware
- Phishing: fake emails/websites to steal credentials
- Brute force: trying all password combinations
- DDoS: overwhelming server with requests

**Protection:**
- Firewall (hardware/software): monitors/blocks suspicious traffic
- Antivirus: detects and removes malware
- Strong passwords + 2FA
- Encryption: scrambles data so only authorised parties can read it`,
      },
    ];
    await prisma.revisionNote.createMany({ data: csNotes.map((n) => ({ ...n, subjectId: cs.id })) });
    console.log("✓ Computer Science notes");

  // ── ECONOMICS ─────────────────────────────────────────────────────────────
    await prisma.revisionNote.deleteMany({ where: { subjectId: econ.id } });
    const econNotes = [
      {
        order: 1,
        title: "1. The Basic Economic Problem",
        content: `## Scarcity & Choice
- **Scarcity:** unlimited wants but limited resources → the fundamental economic problem
- **Factors of production:**
  - **Land** — all natural resources
  - **Labour** — human effort (physical and mental)
  - **Capital** — man-made resources used in production (machinery, tools)
  - **Enterprise** — organises the other factors; takes risk

- **Opportunity cost:** the next best alternative foregone when a choice is made
  - e.g. Government spends $10bn on healthcare → opportunity cost = what else that money could have funded

## Economic Systems
- **Free market economy:** resources allocated by price mechanism; private ownership
- **Command/planned economy:** government allocates all resources; state ownership
- **Mixed economy:** combination of both (most countries today)

## Production Possibility Curve (PPC)
- Shows maximum combinations of two goods an economy can produce
- Points **on** the curve: productively efficient
- Points **inside**: inefficient (resources unemployed)
- Points **outside**: currently unattainable
- **Shift outward** = economic growth (more resources, better technology)
- **Movement along** curve = opportunity cost (more of one → less of other)`,
      },
      {
        order: 2,
        title: "2. Demand, Supply & Markets",
        content: `## Demand
**Definition:** the quantity of a good consumers are willing and able to buy at each price, ceteris paribus.

**Law of demand:** as price increases, quantity demanded decreases (inverse relationship) → downward-sloping curve

**Shifts in demand (PIRATES):**
- **P**rice of related goods (substitutes/complements)
- **I**ncome (normal goods: demand rises with income; inferior goods: falls)
- **R**elated goods prices
- **A**dvertising/tastes
- **T**axes/subsidies
- **E**xpectations
- **S**ize of population

## Supply
**Definition:** the quantity producers are willing and able to sell at each price, ceteris paribus.

**Law of supply:** as price increases, quantity supplied increases → upward-sloping curve

**Shifts in supply:**
- Costs of production (wages, raw materials)
- Technology improvements
- Government taxes (shift left) / subsidies (shift right)
- Number of producers
- Weather (agricultural goods)

## Market Equilibrium
- **Equilibrium:** quantity demanded = quantity supplied; market clears
- **Excess demand (shortage):** price below equilibrium → price rises
- **Excess supply (surplus):** price above equilibrium → price falls

## Price Elasticity of Demand (PED)
**PED = % change in Qd / % change in Price**

- |PED| > 1: **elastic** (luxury, many substitutes, large % of income)
- |PED| < 1: **inelastic** (necessities, few substitutes, small % of income, habit-forming)
- |PED| = 0: perfectly inelastic; |PED| = ∞: perfectly elastic

**Revenue implications:**
- Elastic demand: price increase → revenue falls
- Inelastic demand: price increase → revenue rises`,
      },
      {
        order: 3,
        title: "3. Macroeconomics",
        content: `## Key Macroeconomic Objectives
1. **Low unemployment** — target ~4–5%
2. **Low and stable inflation** — target ~2%
3. **Economic growth** — rising real GDP
4. **Balance of payments equilibrium**
5. **Equitable distribution of income**

## Inflation
**Definition:** sustained rise in the general price level

**Causes:**
- **Demand-pull:** excess demand → producers raise prices (economy "overheating")
- **Cost-push:** rising production costs (wages, oil) → firms pass on as higher prices

**Measures:** CPI (Consumer Price Index) — tracks price of representative basket of goods

**Effects:** reduces purchasing power; affects savers (lose), borrowers (gain); creates uncertainty; affects international competitiveness

## Unemployment
**Types:**
- **Cyclical (demand-deficient):** caused by recession
- **Structural:** mismatch of skills/location with available jobs
- **Frictional:** between jobs; short-term
- **Seasonal:** particular times of year (tourism, agriculture)

## GDP & Economic Growth
- **GDP** = total value of goods/services produced in a country in a year
- **Real GDP** = GDP adjusted for inflation
- **Economic growth** = increase in real GDP over time
- Measured by: expenditure method (C + I + G + (X−M))

## Fiscal & Monetary Policy
**Fiscal policy (government):**
- Expansionary: increase spending, cut taxes → boost demand
- Contractionary: cut spending, raise taxes → reduce demand

**Monetary policy (central bank):**
- Raise interest rates → borrowing expensive → less spending → reduce inflation
- Lower interest rates → borrowing cheap → more spending → boost growth`,
      },
    ];
    await prisma.revisionNote.createMany({ data: econNotes.map((n) => ({ ...n, subjectId: econ.id })) });
    console.log("✓ Economics notes");

  // ── ADDITIONAL SUBJECTS ────────────────────────────────────────────────────
  // Geography, History, Business Studies (create subjects if missing)
  const geo = await prisma.subject.upsert({
    where: { code: "0460" },
    update: { courseGroup: "Humanities" },
    create: { name: "Geography", code: "0460", examBoard: "CAMBRIDGE", level: "IGCSE", color: "#0D9488", courseGroup: "Humanities" },
  });
  await prisma.revisionNote.deleteMany({ where: { subjectId: geo.id } });
  await prisma.revisionNote.createMany({
    data: [
      {
        subjectId: geo.id, order: 1,
        title: "1. Population & Settlement",
        content: `## Population Distribution & Density
- **Population density** = population / area (people per km²)
- **Sparse population:** deserts, mountains, dense forests, polar regions — harsh climate, poor soil, inaccessible
- **Dense population:** river valleys, coastal plains, fertile land, mild climate, good transport

## Population Growth
- **Natural increase** = birth rate − death rate (per 1000)
- **Demographic Transition Model (DTM):** Stage 1 (high BR/DR) → Stage 2 (falling DR) → Stage 3 (falling BR) → Stage 4 (low BR/DR) → Stage 5 (BR<DR)
- HICs: low growth (Stage 4/5); LICs: high growth (Stage 2/3)

## Migration
- **Push factors:** conflict, poverty, drought, unemployment
- **Pull factors:** employment, higher wages, better services, safety
- **Consequences:** brain drain for source country; pressure on services in destination country; remittances sent home

## Settlement
- **Nucleated:** clustered around central point (church, crossroads) — defence, water supply
- **Dispersed:** spread across landscape — farming, different land ownership
- **Linear:** along road, river, or valley

## Urbanisation
- **Urbanisation:** increasing proportion of population living in urban areas
- Faster in LICs due to rural-urban migration
- **Problems:** overcrowding, traffic, pollution, lack of sanitation
- **Squatter settlements (shanty towns):** self-built housing with no legal rights; lack clean water/sanitation`,
      },
      {
        subjectId: geo.id, order: 2,
        title: "2. Natural Environments",
        content: `## Plate Tectonics
- Earth's crust divided into tectonic plates that move due to convection currents in mantle
- **Constructive boundary:** plates move apart → magma rises → new crust forms (mid-ocean ridges); earthquakes and volcanoes
- **Destructive boundary:** oceanic plate subducts under continental → melts → volcanoes; earthquakes
- **Conservative boundary:** plates slide past each other → earthquakes only (no volcanoes); e.g. San Andreas Fault

## Earthquakes & Volcanoes
- **Epicentre:** point on surface directly above focus
- **Richter scale:** logarithmic scale of earthquake magnitude
- Effects: building collapse, tsunamis, fires, disease
- **Management:** earthquake-proof buildings, early warning systems, evacuation plans

## Rivers
- **Erosion processes:** hydraulic action, abrasion, attrition, solution
- **Upper course:** V-shaped valley, waterfalls, interlocking spurs; fast current, vertical erosion
- **Middle course:** meanders, flood plains develop; lateral erosion
- **Lower course:** ox-bow lakes, deltas, estuaries; deposition
- **Flooding causes:** heavy rainfall, deforestation, urbanisation, snowmelt

## Coasts
- **Erosion:** wave-cut platform, cliffs, caves → arches → stacks → stumps
- **Deposition:** beaches, spits, bars, tombolos
- **Longshore drift:** sediment moved along coast by waves striking at angle

## Weather & Climate
- **Weather:** short-term atmospheric conditions
- **Climate:** average weather over 30+ years
- **Tropical rainforest climate:** high temperature (~27°C), very high rainfall (>2000mm), no dry season
- **Hot desert climate:** very hot days, cold nights, <250mm rainfall, very high evaporation`,
      },
    ],
  });
  console.log("✓ Geography notes");

  const hist = await prisma.subject.upsert({
    where: { code: "0470" },
    update: { courseGroup: "Humanities" },
    create: { name: "History", code: "0470", examBoard: "CAMBRIDGE", level: "IGCSE", color: "#B45309", courseGroup: "Humanities" },
  });
  await prisma.revisionNote.deleteMany({ where: { subjectId: hist.id } });
  await prisma.revisionNote.createMany({
    data: [
      {
        subjectId: hist.id, order: 1,
        title: "1. Causes of World War I (1914)",
        content: `## MAIN Causes
**M — Militarism:** European powers built up large armies and navies (Anglo-German naval race). Military planning made war more likely (Schlieffen Plan).

**A — Alliance System:** Triple Alliance (Germany, Austria-Hungary, Italy) vs Triple Entente (France, Russia, Britain). Meant a local conflict could escalate to world war.

**I — Imperialism:** Competition for colonies in Africa and Asia created tensions (Morocco Crises 1905, 1911).

**N — Nationalism:** Serbian nationalism threatened Austria-Hungary's multi-ethnic empire. Pan-Slavism encouraged by Russia.

## Assassination of Archduke Franz Ferdinand
- June 28, 1914: Archduke (heir to Austria-Hungary) assassinated in Sarajevo by Gavrilo Princip (Black Hand group — Serbian nationalist)
- Austria-Hungary blamed Serbia and issued harsh ultimatum
- Serbia's partial acceptance not enough → Austria-Hungary declared war (July 28)
- Alliance system triggered: Russia mobilised for Serbia → Germany declared war on Russia → Germany declared war on France → Germany invaded Belgium → Britain declared war on Germany

## Western Front
- Schlieffen Plan (rapid defeat of France) failed — France not quickly defeated
- Trench warfare developed: stalemate 1914–1918
- Key battles: Verdun (1916), Somme (1916 — 60,000 British casualties day 1)
- New weapons: poison gas, tanks, machine guns, aircraft`,
      },
      {
        subjectId: hist.id, order: 2,
        title: "2. The Cold War (1945–1991)",
        content: `## Origins
- Tensions between USA (capitalism/democracy) and USSR (communism) pre-dated 1945
- Post-WWII: USSR occupied Eastern Europe; USA feared spread of communism
- **Iran Crisis (1946):** USSR slow to withdraw troops — first Cold War tension
- **Truman Doctrine (1947):** USA would support free peoples resisting communism
- **Marshall Plan (1947):** $13bn US aid to rebuild Western Europe — USSR saw as economic imperialism

## Key Events

**Berlin Blockade (1948–49):**
- USSR blocked Western access to West Berlin
- USA/UK airlifted supplies for 11 months
- USSR backed down; Berlin divided confirmed

**Korean War (1950–53):**
- North Korea (communist) invaded South Korea
- USA (with UN) intervened; China entered for North Korea
- Armistice 1953 — Korea still divided at 38th parallel

**Cuban Missile Crisis (1962):**
- USSR placed nuclear missiles in Cuba (90 miles from USA)
- 13-day standoff between Kennedy and Khrushchev
- Resolution: USSR removed missiles; USA promised not to invade Cuba + secretly removed missiles from Turkey
- Closest point to nuclear war; led to hotline between leaders

**Vietnam War (1955–75):**
- USA supported South Vietnam against communist North
- Despite massive military commitment, USA withdrew 1973
- North Vietnam unified country 1975 — communist victory

## End of Cold War
- Gorbachev's reforms: **Glasnost** (openness) and **Perestroika** (restructuring)
- Berlin Wall fell November 9, 1989
- USSR dissolved December 1991`,
      },
    ],
  });
  console.log("✓ History notes");

  const biz = await prisma.subject.upsert({
    where: { code: "0450" },
    update: { courseGroup: "Business" },
    create: { name: "Business Studies", code: "0450", examBoard: "CAMBRIDGE", level: "IGCSE", color: "#7C3AED", courseGroup: "Business" },
  });
  await prisma.revisionNote.deleteMany({ where: { subjectId: biz.id } });
  await prisma.revisionNote.createMany({
    data: [
      {
        subjectId: biz.id, order: 1,
        title: "1. Business Activity & Organisation",
        content: `## Purpose of Business Activity
- Produce goods and services to satisfy needs and wants
- Create employment; contribute to economic growth
- **Added value** = selling price − cost of inputs (materials, components)
  - Increased by: branding, quality, unique features, better service

## Types of Business Organisation

**Sole trader:**
- Owned and run by one person
- Advantages: easy to set up, all profits kept, full control
- Disadvantages: unlimited liability, limited capital, no continuity

**Partnership:**
- 2–20 partners (typically)
- Advantages: shared responsibility, more capital
- Disadvantages: unlimited liability (usually), disagreements, profits shared

**Private Limited Company (Ltd):**
- Limited liability; shares sold privately (not on stock exchange)
- More capital than sole trader/partnership
- Disadvantages: more complex to set up, accounts must be published

**Public Limited Company (plc):**
- Shares sold on stock exchange to public
- Very large capital potential
- Disadvantages: risk of hostile takeover, expensive to float

## Business Objectives
- Survival (new or struggling business)
- Profit maximisation
- Growth (market share, revenue)
- Social responsibility / ethical objectives
- **Objectives change** with size and stage of business

## Stakeholders
People/groups with interest in the business:
- Internal: shareholders, employees, managers
- External: customers, suppliers, government, local community, banks
- Stakeholders often have **conflicting objectives** (e.g. shareholders want profit; employees want higher wages)`,
      },
      {
        subjectId: biz.id, order: 2,
        title: "2. Marketing",
        content: `## Market Research
- **Primary research:** collected first-hand (surveys, interviews, observation, focus groups)
  - Advantages: specific to your needs, up-to-date
  - Disadvantages: expensive, time-consuming
- **Secondary research:** already existing data (internet, reports, government statistics)
  - Advantages: cheap, quick
  - Disadvantages: may be outdated, not specific to your business

**Quantitative:** numerical data — can be statistically analysed
**Qualitative:** opinions and attitudes — harder to analyse

## The Marketing Mix (4Ps)

**Product:**
- USP (Unique Selling Point) — what makes it different
- Product life cycle: Introduction → Growth → Maturity → Decline
- Extension strategies: new markets, product modifications, new uses

**Price:**
- **Cost-plus:** add % profit to costs
- **Competitive pricing:** match competitors
- **Penetration pricing:** low initial price to gain market share
- **Price skimming:** high initial price for innovative product
- **Psychological pricing:** £9.99 instead of £10

**Place:**
- Distribution channels: Producer → Retailer → Consumer; or direct (online)
- Intensive (everywhere), selective (some outlets), exclusive (luxury, limited)

**Promotion:**
- **ATL** (Above The Line): mass media — TV, radio, newspaper
- **BTL** (Below The Line): targeted — social media, direct mail, sponsorship
- Sales promotions: discounts, BOGOF, free samples`,
      },
    ],
  });
  console.log("✓ Business Studies notes");

  // English Language
  const eng = await prisma.subject.upsert({
    where: { code: "0500" },
    update: { courseGroup: "English" },
    create: { name: "English Language", code: "0500", examBoard: "CAMBRIDGE", level: "IGCSE", color: "#DC2626", courseGroup: "English" },
  });
  await prisma.revisionNote.deleteMany({ where: { subjectId: eng.id } });
  await prisma.revisionNote.createMany({
    data: [
      {
        subjectId: eng.id, order: 1,
        title: "1. Reading Skills & Comprehension",
        content: `## Types of Questions

**Locate and select:** find specific information; skim and scan the text
**Inference:** read between the lines; use evidence to draw conclusions
**Effect of language:** explain WHY a language choice creates a particular effect

## Analysing Language
Always follow **P-E-E** or **P-E-A:**
- **Point** — make a clear statement
- **Evidence** — quote directly from the text
- **Effect/Analysis** — explain the effect on the reader

**Language techniques to identify:**
- **Simile:** comparison using "like" or "as" → creates vivid image
- **Metaphor:** direct comparison; describes something AS something else → more powerful than simile
- **Personification:** giving human qualities to non-human things → creates empathy or fear
- **Alliteration:** repetition of initial consonant sounds → creates rhythm, emphasis
- **Repetition:** emphasises a point; creates impact
- **Rhetorical question:** engages reader; makes them think
- **Short sentences:** create tension, urgency, shock
- **Long sentences:** create flow, detail, description
- **Rule of three (tricolon):** three items/adjectives → builds up, satisfying rhythm

## Tone & Atmosphere
- **Formal/informal** register — formal: no contractions, complex sentences; informal: conversational
- **Tone:** the writer's attitude (e.g. sarcastic, melancholic, enthusiastic, authoritative)

## Reading Non-fiction
- **Purpose:** inform, argue, persuade, entertain, advise, explain
- **Audience:** consider age, background, education level
- **Form:** letter, article, speech, report, leaflet — each has conventions`,
      },
      {
        subjectId: eng.id, order: 2,
        title: "2. Writing Skills",
        content: `## Types of Writing

**Descriptive writing:**
- Appeal to all five senses
- Vary sentence structure (short for impact, long for flow)
- Use figurative language (metaphor, simile, personification)
- Create a clear atmosphere/mood
- Show, don't tell: "His hands trembled" not "He was nervous"

**Narrative writing:**
- Clear structure: exposition, rising action, climax, falling action, resolution
- Interesting characters — show personality through speech, action, thought
- Consider narrative perspective: 1st person (I/we) — personal, intimate; 3rd person — wider view

**Argumentative/persuasive writing (AFOREST):**
- **A**necdote — personal story
- **F**act — statistics, evidence
- **O**pinion — "It is clear that..."
- **R**hetorical question — "Surely everyone deserves...?"
- **E**xpert opinion — "According to research..."
- **S**tatistic — numerical evidence
- **T**ripling / Rule of three

## Technical Accuracy
- **Paragraphing:** each paragraph = one main idea; use PEEL structure
- **Connectives:** moreover, furthermore, however, consequently, in contrast
- **Sentence variety:** mix simple, compound (and/but/or) and complex (because/although/while)
- **Punctuation:** commas (clauses, lists); semicolons (related ideas); colons (introduce); dashes (add information or parenthesis)
- **Apostrophes:** possession (cat's collar) and contraction (don't = do not)`,
      },
    ],
  });
  console.log("✓ English Language notes");

  console.log("\n✅ All revision notes seeded!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
