/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceDetail, Review } from './types';

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'sex-selection',
    title: 'Family Balancing & Sex Selection (PGT-A)',
    slug: 'sex-selection-family-balancing-lagos',
    shortDescription: 'Advanced Preimplantation Genetic Testing (PGT) for gender selection and preventing sex-linked genetic disorders under strict ethical conditions in Lagos.',
    metaDescription: 'Discover professional family balancing and sex selection services in Lagos. We use advanced PGT-A testing with a 99.9% accuracy rate to prevent genetic diseases.',
    keywords: ['sex selection lagos', 'family balancing nigeria', 'PGT-A nigeria', 'gender selection clinic lagos', 'prevent genetic disorders lagos', 'ivf center lagos'],
    successRate: '99.9% (Accuracy in chromosomal identification)',
    iconName: 'Dna',
    indications: [
      'Prevention of sex-linked genetic disorders (e.g., Hemophilia, Duchenne Muscular Dystrophy).',
      'Family balancing where a family already has children of one gender and desires the other.',
      'Comprehensive chromosomal screening to avoid miscarriages and implantation failure.'
    ],
    processSteps: [
      { title: 'Ovarian Stimulation', desc: 'The female partner undergoes gentle hormone therapy to stimulate multiple egg follicles.' },
      { title: 'Egg Retrieval & IVF / ICSI', desc: 'Mature eggs are retrieved and fertilized using highly controlled Intracytoplasmic Sperm Injection.' },
      { title: 'Embryo Culture & Biopsy', desc: 'Embryos are grown to Day 5 (blastocyst). A microscopic cell sample is carefully taken from the trophectoderm layer.' },
      { title: 'PGT-A Lab Analysis', desc: 'DNA is analyzed to screen all 23 pairs of chromosomes, revealing the sex and verifying genetic wellness.' },
      { title: 'Selected Embryo Transfer', desc: 'One or two healthy, approved embryos of the chosen gender are transferred into the uterine cavity.' }
    ],
    faqs: [
      {
        question: 'Is sex selection legal and safe in Nigeria?',
        answer: 'Yes, sex selection is completely legal and medically certified in Nigeria under proper clinical guidelines—frequently used for family balancing and medical prevention of sex-linked hereditary conditions.'
      },
      {
        question: 'How accurate is the gender determination via PGT-A?',
        answer: 'Preimplantation Genetic Testing has an accuracy rate of over 99.9% for gender determination as it analyzes the actual genetic structure of blastocyst cells.'
      },
      {
        question: 'Does the biopsy harm the embryo?',
        answer: 'No. The biopsy is performed by highly skilled clinical embryologists who take cells from the outer layer (which forms the placenta), leaving the inner cell mass (which forms the fetus) completely untouched.'
      }
    ],
    longDescription: 'At Lagos IVF Specialist Clinic, we offer Preimplantation Genetic Testing for Aneuploidies (PGT-A) which represents the absolute pinnacle of reproductive technology. This procedure allows parents to not only balance their family but also screen embryos for chromosomal abnormalities (such as Down Syndrome) before transfer. This significantly boosts clinical pregnancy rates, lowers miscarriage risks, and is an essential tool for parents carrying sex-linked genetic mutations.',
    images: [
      'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=800&h=533',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800&h=533'
    ]
  },
  {
    id: 'sperm-donation',
    title: 'Confidential Sperm Donation Program',
    slug: 'sperm-donation-fertility-lagos',
    shortDescription: 'Ethical and anonymous donor sperm bank services matching fully screened, healthy, and high-motility donors in Nigeria.',
    metaDescription: 'Trusted sperm donation clinic in Lagos. Rigorously vetted donor bank guaranteeing genetic diversity, physical matching, and complete medical privacy.',
    keywords: ['sperm bank lagos', 'sperm donation nigeria', 'donor insemination lagos', 'donor sperm ivf nigeria', 'male infertility clinic lagos', 'anonymous sperm donor lagos'],
    successRate: '55% - 65% (Clinical pregnancy rate per cycle, subject to age)',
    iconName: 'Sparkles',
    indications: [
      'Severe male factor infertility (e.g., non-obstructive Azoospermia).',
      'Single women pursuing autonomous motherhood in Lagos.',
      'Infertility caused by genetic diseases carried by the male partner.',
      'Repeated fertilization failures during conventional IVF cycles.'
    ],
    processSteps: [
      { title: 'Donor Screening', desc: 'Donors undergo extensive physical, genetic, psychological, and infectious disease screenings (including HIV, Hepatitis, and Sickle Cell).' },
      { title: 'Matching Protocol', desc: 'Intended parents select donor profiles based on key physical traits, academic background, skin tone, and blood compatibility.' },
      { title: 'Sperm Preparation', desc: 'Frozen sperm is acquired from our premium, secure bio-repository, defrosted, and washed in our advanced lab.' },
      { title: 'Insemination or IVF', desc: 'The sperm is utilized in either Intrauterine Insemination (IUI) or conventional IVF/ICSI cycles depending on clinical needs.' }
    ],
    faqs: [
      {
        question: 'How deeply are sperm donors screened?',
        answer: 'Our donor vetting process is exceptionally strict. Less than 5% of applicants are accepted. We screen for infectious diseases, genetic anomalies, hemoglobin genotype (no AS/SS carriers accepted for donors), standard semen parameters, and psychological state.'
      },
      {
        question: 'Is sperm donation kept strictly confidential in Lagos?',
        answer: 'Absolutely. We practice rigorous, ironclad anonymity. The identity of our donors is legally protected and never disclosed to recipients, nor does the donor have any legal claim over children born of their donation.'
      },
      {
        question: 'Can I choose specific traits for my donor?',
        answer: 'Yes. You will receive a selective profile sheet highlighting physical attributes (height, eye/skin/hair color), blood type, genotype, educational level, and profession.'
      }
    ],
    longDescription: 'Our medical group understands that male factor infertility can be a difficult challenge. Our sperm donation program helps couples and single premium patients realize their dream of a family. Registered donors at our Lagos facility are healthy, young men with exemplary sperm parameters. Every donation cycle benefits from meticulous cryopreservation, verifying peak sperm motility and viability upon thaw.',
    images: [
      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800&h=533',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800&h=533'
    ]
  },
  {
    id: 'surrogacy',
    title: 'Professional Gestational Surrogacy Treatment',
    slug: 'gestational-surrogacy-agency-lagos',
    shortDescription: 'Full-service ethical gestational surrogacy program with comprehensive medical, screening, and legal frameworks in Lagos.',
    metaDescription: 'Lagos premier gestational surrogacy group. Fully compliant medical, legal and clinical screening processes ensuring safety and peace of mind.',
    keywords: ['surrogacy treatment lagos', 'gestational surrogate nigeria', 'ethical surrogacy nigeria', 'surrogacy clinic lagos', 'womb rental lagos', 'surrogacy cost nigeria'],
    successRate: '70% - 80% (Clinical pregnancy rate with high-quality blastocysts)',
    iconName: 'Heart',
    indications: [
      'Uterine factor infertility (absence of uterus, Mullerian anomalies, or severe Asherman’s syndrome).',
      'Repeated IVF failure or recurrent pregnancy loss (RPL) despite high-quality embryos.',
      'Severe medical conditions rendering carrying a pregnancy dangerous to maternal life (e.g., severe cardiomyopathy).'
    ],
    processSteps: [
      { title: 'Surrogate Recruiting & Vetting', desc: 'Surrogates are carefully recruited, with requirements including having carried at least one healthy pregnancy, perfect general physical health, and optimal psychological vetting.' },
      { title: 'Legal Setup', desc: 'Before any medical treatment, a solid legal contract draft is created by specialized fertility lawyers in Lagos outlining parentage rights.' },
      { title: 'Embryo Generation', desc: 'The intended parents (or egg/sperm donors) undergo an IVF cycle in our lab to culture healthy day-5 blastocysts.' },
      { title: 'Uterine Preparation', desc: 'The gestational carrier’s endometrium is prepped using gentle hormonal support to cultivate a receptive uterine environment.' },
      { title: 'Embryo Transfer & Monitoring', desc: 'A blastocyst is transferred. The surrogate is nurtured by our clinical coordinator throughout gestation until birth.' }
    ],
    faqs: [
      {
        question: 'How are gestational surrogates chosen and checked?',
        answer: 'Our surrogates undergo a strict medical exam, pelvic ultrasounds, infectious disease scans, blood typings, and comprehensive psychological screening. Most importantly, we require that they have at least one living child and have experienced smooth, complication-free previous pregnancies.'
      },
      {
        question: 'Whose DNA will the baby have?',
        answer: 'In gestational surrogacy, the surrogate carries the embryo, but she has NO genetic link to the child. The baby is genetically related to the Intended Parents (or chosen egg/sperm donors).'
      },
      {
        question: 'What is the legal standing of surrogacy in Lagos, Nigeria?',
        answer: 'Surrogacy in Nigeria is conducted under rigorous fertility clinical standards with highly validated legal binding papers signed by both parties. All parental rights are legally assigned to the intended parents before birth, ensuring no legal ambiguities.'
      }
    ],
    longDescription: 'To navigate surrogacy, exceptional medical prowess must combine with compassionate legal and emotional care. Lagos IVF Specialist Clinic is proud to manage an integrated surrogacy clinical service that guides you through recruitment, detailed health scanning, legal advisory, hormonal syncing, and successful delivery. Our gestational carriers live in positive environments and receive premium prenatal care and support in Lagos.',
    images: [
      'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800&h=533',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800&h=533'
    ]
  },
  {
    id: 'egg-donation',
    title: 'Elite Egg Donor Program (Donor Oocye IVF)',
    slug: 'egg-donor-agency-lagos-nigeria',
    shortDescription: 'Compassionate donor egg IVF programs with a diverse gallery of young, fully medically screened egg donors in Lagos.',
    metaDescription: 'Overcome diminished ovarian reserve with Lagos top egg donor program. High-quality donor eggs, anonymous profiles, and outstanding success rates of over 75%.',
    keywords: ['egg donation lagos', 'egg donor clinic nigeria', 'donor eggs ivf lagos', 'egg sharing lagos', 'low ovarian reserve nigeria', 'fertility clinic lagos donor eggs'],
    successRate: '75% - 85% (Pregnancy rate per transfer due to optimal egg quality)',
    iconName: 'Activity',
    indications: [
      'Diminished Ovarian Reserve (DOR) or premature ovarian insufficiency (early menopause).',
      'Advanced maternal age (typically over 40) where egg quality may limit fertilization.',
      'A maternal history of genetic mutations that should not be transmitted.',
      'Repeated poor embryo quality in previous IVF cycles.'
    ],
    processSteps: [
      { title: 'Donor Profiling', desc: 'We curate a robust gallery of young, energetic female donors (aged 20-27) with high academic background, prime physical fitness, and clean family medical histories.' },
      { title: 'Cycle Synchronization', desc: 'We align the cycle of the donor with the recipient using gentle, precise hormonal medication (or freeze the eggs for an asynchronous cycle).' },
      { title: 'Ovarian Stimulation & Retrieval', desc: 'The donor is stimulated under strict monitoring, and her mature eggs are retrieved under light sedation.' },
      { title: 'Fertilization & Culture', desc: 'Retrieved donor eggs are fertilized with the male partner’s or donor sperm and cultured toblastocyst.' },
      { title: 'Recipient Transfer', desc: 'The high-grade embryo is transferred to the recipient’s hormone-prepared, receptive uterus.' }
    ],
    faqs: [
      {
        question: 'Are egg donors anonymous in Lagos?',
        answer: 'Yes, our program is strictly anonymous to shield the privacy of both your future family and the generous donor. You will view full de-identified dossiers covering physical traits, education, and hobbies.'
      },
      {
        question: 'What are the age limits for donor egg recipients?',
        answer: 'We successfully support healthy women up to their early 50s. If the patient is fit to carry a pregnancy, donor egg IVF is a highly reliable mode of fertility recovery.'
      },
      {
        question: 'How are egg donors screened?',
        answer: 'Donors are rigorously checked for HIV, Syphilis, Chlamydia, Hepatitis B/C, Sickle Cell trait, and G6PD. Furthermore, they receive deep pelvic scans to confirm excellent ovarian reserve (AMH > 2.5 ng/ml) and undergo testing for key genetic conditions.'
      }
    ],
    longDescription: 'Our Elite Egg Donor Program stands out in Sub-Saharan Africa. We work with highly committed, intelligent donors who are vetted physically and intellectually. Because egg quality is the single largest determinant of IVF success, using eggs from a young, vibrant donor bypasses age-related fertility challenges, offering immediate success rates often twice that of conventional IVF in older cohorts.',
    images: [
      'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=800&h=533',
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800&h=533'
    ]
  },
  {
    id: 'sperm-injection',
    title: 'ICSI - Intracytoplasmic Sperm Injection',
    slug: 'icsi-treatment-mens-fertility-lagos',
    shortDescription: 'World-class microsurgical fertilization (ICSI) directly overcoming low sperm counts, abnormal morphology, and poor motility.',
    metaDescription: 'Optimize fertilization rates at Lagos leading IVF facility with Intracytoplasmic Sperm Injection (ICSI). Advanced micromanipulation for severe male infertility.',
    keywords: ['ICSI treatment lagos', 'intracytoplasmic sperm injection nigeria', 'male infertility lagos', 'low sperm count solution nigeria', 'fertility microsurgery lagos', 'icsi cost lagos'],
    successRate: '75% - 85% (Successful fertilization rate of retrieved eggs)',
    iconName: 'Target',
    indications: [
      'Very low sperm count (Oligozoospermia) or poor sperm motility (Asthenozoospermia).',
      'High percentage of abnormal sperm shape (Teratozoospermia).',
      'Previous IVF cycles that resulted in zero or extremely low fertilization.',
      'Sperm retrieved surgically (e.g., via PESA or TESE) directly from the testes.'
    ],
    processSteps: [
      { title: 'Egg Preparation', desc: 'Retrieved mature eggs are carefully treated with professional enzymes to remove surrounding cumulus cells so that they can be assessed.' },
      { title: 'Microscopic Sperm Selection', desc: 'Our clinical embryologist scans the semen sample under a high-powered 400x magnification microscope to select the single healthiest, most active sperm.' },
      { title: 'Precision Microinjection', desc: 'Using a micropipette so delicate it is invisible to the human eye, the embryologist safely stabilizes the egg and injects the selected sperm directly into the egg’s cytoplasm.' },
      { title: 'Incubation & Monitoring', desc: 'The eggs are placed in a premium trigas incubator where fertilizations are closely monitored for normal blastocyst development.' }
    ],
    faqs: [
      {
        question: 'What is the main difference between IVF and ICSI?',
        answer: 'In standard IVF, tens of thousands of sperm are placed in a dish together with the egg to let them fertilize naturally. In ICSI, our embryologist selects the single best sperm and inserts it directly into the egg, bypassing any barriers.'
      },
      {
        question: 'Is ICSI safe for my future baby?',
        answer: 'Yes, ICSI is a universally accepted, highly secure medical protocol utilized since 1992. Over millions of babies have been safely delivered worldwide through ICSI with no evidence of developmental or health deficits.'
      },
      {
        question: 'When is ICSI absolutely recommended?',
        answer: 'ICSI is strongly advised for any male factor infertility (low counts/motility), if egg coats are unusually thick, or if you are using frozen sperm / surgically extracted sperm.'
      }
    ],
    longDescription: 'Intracytoplasmic Sperm Injection (ICSI) is a revolutionary micromanipulation technique that has transformed male factor infertility treatment. At Lagos IVF Specialist Clinic, we utilize premium Narishige Micromanipulators and Leica microscopes to perform high-precision micro-injections. ICSI ensures that even if only a handful of viable sperm are retrieved, successful fertilization and healthy embryos are still entirely achievable.',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800&h=533',
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800&h=533'
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Mrs. Chioma Okey-Nwachukwu',
    role: 'Mother of Twins via IVF',
    content: 'After 8 years of waiting and trial in multiple clinics, the warmth and absolute professionalism at Lagos IVF Clinic changed our lives. The team felt like family. Today I am a mother to beautiful twin boys. God bless your team!',
    rating: 5
  },
  {
    id: 'rev-2',
    name: 'Alhaji Musa Abdullahi',
    role: 'Father via ICSI Treatment',
    content: 'I was diagnosed with severe male factor infertility (low count). Dr. and the embryology lab explained ICSI to us step-by-step. The process was stress-free, cost-transparent, and we succeeded on our very first attempt! Strongly recommend.',
    rating: 5
  },
  {
    id: 'rev-3',
    name: 'Anonymous Lagos Professional',
    role: 'Egg Donation Recipient',
    content: 'Due to severe ovarian reserve depletion, I was advised to use the egg donor program. The level of confidentiality, psychological counselling, and matching was world-class. Words cannot express my joy.',
    rating: 5
  }
];

export const FAQS_GENERAL = [
  {
    question: 'Where is your Lagos clinic located, and what are the working hours?',
    answer: 'We are situated in a serene, professional medical zone on Victoria Island, Lagos. We are open Monday to Friday from 8:00 AM to 5:00 PM, and Saturdays from 9:00 AM to 2:00 PM.'
  },
  {
    question: 'What is the average cost of an IVF cycle?',
    answer: 'We believe in complete financial transparency. An average IVF cycle cost varies based on medications and extra tech (like PGT-A or ICSI), but our consultation is highly accessible, and we provide detailed budget sheets with zero hidden charges during your first visit.'
  },
  {
    question: 'How do we begin our fertility journey with you?',
    answer: 'You can easily start by booking an appointment through our online calendar or calling our secure line. Your first visit includes a fertility ultrasound, comprehensive semen analysis (if applicable), and a personalized discussion with our Lead Consultant.'
  }
];

export const CLINIC_STATS = [
  { label: 'Clinical Success Rate', value: '72%', sub: 'Ages under 38 years' },
  { label: 'Healthy Deliveries', value: '1,200+', sub: 'In Lagos & across West Africa' },
  { label: 'Specialist Experience', value: '35+ Yrs', sub: 'Combined expert medical team' },
  { label: 'Patient Satisfaction', value: '98%', sub: 'Based on patient feedback' }
];
