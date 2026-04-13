export interface Condition {
  slug: string;
  name: string;
  icon: string;
  description: string; // 134-167 words, self-contained, compliant
  symptoms: string[];
  progression: string; // What happens if untreated
}

export interface BodyArea {
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  headline: string; // H1 — message-matched to ad
  subheadline: string;
  heroDescription: string; // 130-160 word intro
  conditions: Condition[];
  surgeryRisks: string; // 134-167 word block about surgery risks for this joint
  steroidRisks: string; // Steroid injection risks specific to this joint
  comparisonNote: string; // Where surgery IS the better option for this joint
}

export const bodyAreas: BodyArea[] = [
  {
    slug: "knee-pain",
    name: "Knee Pain",
    shortName: "Knee",
    icon: "knee",
    headline: "Tired of Knee Pain Holding You Back?",
    subheadline:
      "Take our 2-minute joint health assessment to explore which non-surgical approaches may be suitable for your condition.",
    heroDescription:
      "Knee pain affects millions of people across the UK, with over 20 million adults living with a musculoskeletal condition according to Versus Arthritis (2025). Whether caused by osteoarthritis, a meniscus tear, or ligament damage, chronic knee pain can significantly limit your daily activities and quality of life. The average NHS waiting time for knee replacement surgery is 28-29 weeks, and many patients are seeking to understand the full range of options available to them. This educational resource explores non-surgical regenerative approaches including targeted injection therapy, advanced injection approaches, and evidence-based injection treatments. Our goal is to help you make informed decisions about your joint health by presenting the current evidence base alongside traditional treatment pathways. Every patient's situation is unique, and a thorough medical assessment is the essential first step.",
    conditions: [
      {
        slug: "osteoarthritis",
        name: "Knee Osteoarthritis",
        icon: "bone",
        description:
          "Knee osteoarthritis is a degenerative condition characterised by the gradual breakdown of cartilage that cushions the joint surfaces. According to NHS data, osteoarthritis affects approximately 1 in 5 adults over the age of 45 in the UK. Early symptoms typically include intermittent aching on the inner side of the knee and occasional swelling after activity. As the condition progresses, patients may experience persistent pain throughout the knee, morning stiffness lasting 30 minutes or more, a grinding or crunching sensation during movement, and visible swelling. Without intervention, cartilage continues to wear until bone-on-bone contact develops, leading to significant functional limitation, muscle atrophy around the joint, and altered gait patterns. Research published in Frontiers in Medicine (2024) compared injection therapies for knee osteoarthritis and found varying outcomes across cortisol, hyaluronic acid, and various non-surgical injection therapy approaches.",
        symptoms: [
          "Intermittent aching, especially on the inner knee",
          "Morning stiffness lasting 30+ minutes",
          "Grinding or crunching sensation during movement",
          "Swelling after activity",
          "Reduced range of motion",
          "Muscle weakness around the knee",
        ],
        progression:
          "Without management, cartilage loss accelerates. Bone spurs develop, pain becomes constant, and mobility significantly decreases. Compensatory gait changes may lead to secondary problems in the hip and lower back.",
      },
      {
        slug: "meniscus-tears",
        name: "Meniscus Tears",
        icon: "tear",
        description:
          "A meniscus tear involves damage to the C-shaped cartilage that acts as a shock absorber between the thighbone and shinbone. Meniscus tears are among the most common knee injuries, with degenerative tears frequently occurring in adults over 40 and traumatic tears common in younger, active individuals. Typical symptoms include pain when twisting or rotating the knee, swelling and stiffness, difficulty fully straightening the leg, and a locking or catching sensation during movement. Many patients describe a feeling of instability, as though the knee might give way. A 2024 systematic review published in PMC examined targeted injection therapy for degenerative meniscus tears and found variable MRI outcomes but significant improvements in pain scores. Conservative management including physiotherapy is often the first approach, with surgical intervention reserved for tears that cause persistent mechanical symptoms such as locking.",
        symptoms: [
          "Pain when twisting or rotating the knee",
          "Swelling and stiffness",
          "Difficulty fully straightening the leg",
          "Locking or catching sensation",
          "Feeling of knee instability",
        ],
        progression:
          "Untreated meniscus tears can lead to increased cartilage wear, accelerating the development of osteoarthritis. Mechanical symptoms like locking may worsen over time.",
      },
      {
        slug: "acl-tears",
        name: "ACL Tears",
        icon: "lightning",
        description:
          "An anterior cruciate ligament (ACL) tear is a significant knee injury that commonly occurs during sports involving sudden stops, direction changes, or pivoting movements. At the time of injury, many patients report hearing or feeling a distinct 'pop' in the knee, followed by rapid swelling, severe pain, and instability. The knee often feels as though it will give way during activities that require cutting or pivoting. ACL tears can range from partial to complete, and the choice of treatment depends on the patient's activity level, age, and the degree of instability. A 2025 randomised controlled trial published in PMC compared non-surgical treatment of ACL tears using advanced injection approaches against exercise therapy alone, with two-year follow-up data showing differing outcomes between groups. Reconstruction surgery remains common for active individuals, though non-surgical approaches are increasingly being studied.",
        symptoms: [
          "Sudden 'pop' sensation at time of injury",
          "Rapid swelling within hours",
          "Severe pain and inability to continue activity",
          "Knee instability during pivoting or cutting",
          "Loss of full range of motion",
        ],
        progression:
          "Without treatment, ACL-deficient knees may experience recurrent instability episodes, increasing the risk of meniscus tears and accelerated osteoarthritis development.",
      },
    ],
    surgeryRisks:
      "Knee replacement surgery involves a 7-8 inch incision, typically requires 3-5 days of hospital stay, and 1-3 months of walking with aids before full mobility returns. According to published clinical data, the overall complication rate ranges from 1.65% to 11.3%, with blood clots occurring in 0.6-3% of patients and infection in less than 2%. One of the most concerning statistics from PMC research indicates that 1 in 200 patients die within 90 days of knee replacement surgery. Stiffness (arthrofibrosis) is one of the most common complications, and long-term osteolysis from prosthetic debris can lead to bone loss. While 85% of implants last 20 years, approximately 10% of patients will eventually require complex revision surgery. Full recovery typically takes 3-12 months, during which many patients require opioid pain medication. It is important to note that approximately 5-20% of patients report persistent pain even after successful knee replacement.",
    steroidRisks:
      "A 2025 study presented at the Radiological Society of North America (RSNA) found that corticosteroid injections led to more knee joint damage over two years compared to control groups and hyaluronic acid groups. Corticosteroids provide short-term relief, typically lasting 6-8 weeks, but research indicates they may impair cartilage repair mechanisms and inhibit matrix synthesis. Chronic use has been associated with accelerated osteoarthritis progression, subchondral insufficiency fractures, and in some cases rapid joint destruction including bone loss. Methylprednisolone shows dose-dependent deleterious effects on cartilage, which is why clinicians typically limit injections to no more than once every 6 weeks.",
    comparisonNote:
      "Knee replacement surgery remains the appropriate option for patients with severe, end-stage osteoarthritis (Kellgren-Lawrence grade IV) who have exhausted conservative treatments. For advanced bone-on-bone degeneration with significant functional limitation, total knee replacement offers durable long-term outcomes.",
  },
  {
    slug: "hip-pain",
    name: "Hip Pain",
    shortName: "Hip",
    icon: "hip",
    headline: "Tired of Hip Pain Holding You Back?",
    subheadline:
      "Take our 2-minute joint health assessment to explore which non-surgical approaches may be suitable for your hip condition.",
    heroDescription:
      "Hip pain is one of the most common musculoskeletal complaints in the UK, significantly affecting mobility, sleep quality, and overall quality of life. The NHS waiting time for hip replacement surgery averages approximately 27 weeks, with some regions facing considerably longer delays. Many patients experience hip pain from conditions including osteoarthritis, labral tears, bursitis, and tendon injuries, each requiring a different approach to management. This educational resource examines the range of options available for hip pain, from traditional treatments to regenerative approaches that research is continuing to explore. Understanding the evidence behind each approach allows you to have more informed conversations with your healthcare providers. At Harley Street Wellness, our GMC-registered specialists provide thorough consultations to assess your individual situation and discuss which pathways may be most appropriate for your specific condition.",
    conditions: [
      {
        slug: "hip-arthritis",
        name: "Hip Arthritis & Osteoarthritis",
        icon: "bone",
        description:
          "Hip osteoarthritis involves the progressive deterioration of cartilage within the hip joint, leading to pain, stiffness, and reduced range of motion. It is one of the most prevalent forms of arthritis, with the hip being the second most commonly affected joint after the knee. Patients typically first notice groin pain and stiffness, particularly in the morning or after prolonged sitting. As the condition progresses, pain may worsen with activity and eventually become constant, making daily tasks such as walking, climbing stairs, bending, and putting on shoes increasingly difficult. Research published in The Lancet (2019) examined hip replacement longevity, finding that 80-85% of implants last 20 years. However, studies have also explored regenerative approaches, with evidence suggesting that targeted injection therapies may help slow or support early cartilage maintenance in some patients with mild to moderate hip arthritis. Individual assessment determines suitability.",
        symptoms: [
          "Groin pain that may radiate to the thigh",
          "Morning stiffness lasting 30+ minutes",
          "Reduced range of motion",
          "Difficulty walking, climbing stairs, or bending",
          "'Starting pain' upon standing after sitting",
          "Pain that worsens with activity",
        ],
        progression:
          "Cartilage loss accelerates without management. Compensatory gait changes can lead to secondary problems in knees, back, and the opposite hip. Progressive loss of mobility and independence often follows.",
      },
      {
        slug: "labrum-tears",
        name: "Hip Labrum Tears",
        icon: "tear",
        description:
          "A hip labral tear involves damage to the ring of cartilage (labrum) that follows the outside rim of the hip joint socket, helping to hold the head of the femur securely in place. Labral tears may result from structural abnormalities such as femoroacetabular impingement (FAI), repetitive movements common in sports, or degenerative changes associated with ageing. Patients typically experience deep groin pain, a clicking or catching sensation in the hip, pain during hip rotation or prolonged sitting, and a feeling of instability. Hip arthroscopy for labral repair has an overall success rate of approximately 85-90%, though research shows that labral debridement has a failure rate of 63.6% compared to 22.8% for labral repair or reconstruction. Recovery from arthroscopic hip surgery typically requires 3-6 months. Regenerative approaches are being studied as potential complementary options to support healing.",
        symptoms: [
          "Deep groin pain",
          "Clicking or catching sensation in the hip",
          "Pain with hip rotation or prolonged sitting",
          "Feeling of hip instability",
          "Sharp pain with certain movements",
        ],
        progression:
          "Untreated labral tears can lead to accelerated cartilage wear and early-onset osteoarthritis in the hip joint.",
      },
      {
        slug: "bursitis",
        name: "Hip Bursitis",
        icon: "flame",
        description:
          "Hip bursitis, also known as greater trochanteric pain syndrome (GTPS), involves inflammation of the fluid-filled sacs (bursae) that cushion the bones, tendons, and muscles near the hip joint. It causes pain on the outside of the hip that is often worse when lying on the affected side, climbing stairs, or after prolonged walking. The condition is particularly common in middle-aged and older adults, and in runners. A network meta-analysis published in PMC (2024) examined treatments for greater trochanteric pain syndrome and found that targeted injection therapy had the highest probability of being the most effective treatment at both 1-3 months and 6-12 months follow-up. The study also found that while steroid injections provided initial improvement, the benefit was maximal at 6 weeks and not sustained beyond 24 weeks, whereas targeted injection therapy showed sustained improvement at 2 years.",
        symptoms: [
          "Pain on the outside of the hip",
          "Tenderness over the greater trochanter",
          "Pain worse when lying on the affected side",
          "Pain climbing stairs or after prolonged walking",
          "Pain radiating down the outer thigh",
        ],
        progression:
          "Chronic bursitis may lead to ongoing pain, sleep disruption, and compensatory movement patterns that affect other joints.",
      },
    ],
    surgeryRisks:
      "Hip replacement surgery requires a recovery period of 2-4 weeks initially, with 3-6 months needed to return to low-impact activities and up to 1 year for full muscle recovery. Published data indicates serious complications occur in less than 1 in 100 procedures, blood clots develop in approximately 5% of patients in the legs and 1-2% in the lungs, and nerve injury occurs in 0.6-3.7% of cases. The overall mortality rate is 0.2-0.3%. Approximately 1 in 10 patients will require revision surgery, though 80-85% of hip implants last 20 years. Hip arthroscopy for labral repair carries its own risks, with temporary groin numbness affecting approximately 5% of patients and recovery requiring 3-6 months.",
    steroidRisks:
      "As with other joints, corticosteroid injections in the hip provide temporary relief but carry risks of cartilage damage with repeated use. Research indicates that steroid injection relief is typically short-term, lasting 6-12 weeks, and the benefit diminishes with repeat injections. For greater trochanteric pain syndrome specifically, targeted injection therapies have demonstrated sustained improvement at 2 years versus steroid improvement that was not maintained beyond 24 weeks.",
    comparisonNote:
      "Total hip replacement remains the definitive option for severe, end-stage hip arthritis with significant bone-on-bone degeneration. For patients with advanced disease who have exhausted conservative options, hip replacement offers excellent long-term pain relief and functional improvement.",
  },
  {
    slug: "shoulder-pain",
    name: "Shoulder Pain",
    shortName: "Shoulder",
    icon: "shoulder",
    headline: "Tired of Shoulder Pain Holding You Back?",
    subheadline:
      "Take our 2-minute joint health assessment to explore which non-surgical approaches may be suitable for your shoulder condition.",
    heroDescription:
      "Shoulder pain is one of the most common reasons patients seek orthopaedic consultation, with conditions ranging from rotator cuff tears to frozen shoulder affecting people of all ages. The shoulder is the most mobile joint in the body, which makes it particularly vulnerable to injury and degeneration. Many shoulder conditions can significantly impact daily activities including reaching, lifting, sleeping, and personal care. Traditional treatment pathways often begin with physiotherapy and pain management, progressing to steroid injections and potentially surgical intervention. However, published research is exploring how regenerative approaches may support healing in certain shoulder conditions. This educational resource presents the current evidence for both traditional and regenerative approaches, helping you understand your options before consulting with a specialist. Every shoulder condition has unique characteristics that require individual assessment.",
    conditions: [
      {
        slug: "rotator-cuff",
        name: "Rotator Cuff Tears",
        icon: "tear",
        description:
          "Rotator cuff tears involve damage to one or more of the four tendons that stabilise the shoulder joint and enable arm rotation. These tears may be partial or full-thickness, and can result from acute injury or gradual degeneration over time. Patients typically experience pain when reaching overhead or behind the back, weakness in the arm, difficulty lifting objects, and night pain that disrupts sleep. Published data on rotator cuff repair surgery shows an overall complication rate of approximately 10.5%, with retear rates ranging from 11% for small tears to as high as 94% for massive tears. A Mayo Clinic study (2024) examining real-world evidence found that advanced injection approaches used during rotator cuff repair were associated with a nearly threefold reduction in revision surgery rates. A separate 2020 RCT found that targeted injection treatment significantly improved function and pain at 3 months compared to exercise therapy alone.",
        symptoms: [
          "Pain when reaching overhead or behind the back",
          "Weakness in the arm",
          "Difficulty lifting objects",
          "Night pain, especially lying on affected side",
          "Crackling sensation with movement",
          "Progressive weakness over time",
        ],
        progression:
          "Partial tears may enlarge to full-thickness tears over time. Muscle atrophy develops from disuse, making eventual repair more challenging and outcomes less predictable.",
      },
      {
        slug: "frozen-shoulder",
        name: "Frozen Shoulder",
        icon: "snowflake",
        description:
          "Frozen shoulder (adhesive capsulitis) is a condition characterised by progressive stiffness and pain in the shoulder joint, affecting 2-5.3% of the population. The condition typically progresses through three stages: the freezing stage (increasing pain over 6-9 months), the frozen stage (stiffness with reduced range of motion lasting 4-12 months), and the thawing stage (gradual improvement over 6-24 months). The total duration can span 1-3 years. It is more common in patients with diabetes and after prolonged periods of immobilisation. A systematic review published in PMC (2023) examined targeted injection therapy for frozen shoulder and found that both targeted injections and steroid injections improved outcomes at 3 months, but targeted injection therapy demonstrated significantly better range of motion in passive forward flexion and improved SPADI scores compared to steroid injection, with no reported side effects beyond injection-site discomfort.",
        symptoms: [
          "Gradually increasing shoulder pain",
          "Progressive stiffness and loss of range of motion",
          "Difficulty with daily tasks (dressing, reaching)",
          "Pain that may wake you at night",
          "Stiffness worse in the morning",
        ],
        progression:
          "While frozen shoulder typically resolves on its own over 1-3 years, some patients retain permanent stiffness without intervention. The condition can significantly impact quality of life during its course.",
      },
      {
        slug: "impingement",
        name: "Shoulder Impingement",
        icon: "alert",
        description:
          "Shoulder impingement syndrome occurs when the tendons of the rotator cuff become compressed or irritated as they pass through the subacromial space — the narrow passage beneath the acromion bone at the top of the shoulder. This compression causes pain and inflammation, particularly when lifting the arm above shoulder height. The condition is common in people who perform repetitive overhead movements, including swimmers, painters, and construction workers. Initial treatment typically involves physiotherapy focused on rotator cuff strengthening and postural correction, along with anti-inflammatory medication. Steroid injections may provide short-term relief. If conservative management fails after 3-6 months, subacromial decompression surgery may be considered. Research has explored targeted injection therapy as a potential supportive approach, with its anti-inflammatory properties and natural healing mechanisms potentially helping to reduce tendon irritation. However, chronic impingement left untreated can lead to rotator cuff tears.",
        symptoms: [
          "Pain when lifting arm above shoulder height",
          "Pain reaching behind the back",
          "Weakness and difficulty with overhead activities",
          "Night pain when lying on the shoulder",
          "Aching pain at rest that worsens with activity",
        ],
        progression:
          "Chronic impingement can lead to tendon degeneration and eventually rotator cuff tears if the underlying compression is not addressed.",
      },
    ],
    surgeryRisks:
      "Rotator cuff repair surgery has an overall complication rate of approximately 10.5% for both arthroscopic and open procedures. Nerve injury occurs in 1-2% of cases, and retear rates vary dramatically by tear size — from 5-15% for small tears to 30-50% for large and massive tears. Recovery requires 6 weeks of initial healing, 3 months for strong tendon attachment, and 6-9 months for complete healing, with patients typically not feeling normal until 9 months post-surgery. A blinded randomised controlled trial for SLAP (labrum) repairs showed no clinical differences between surgical repair, biceps tenodesis, and sham surgery at 2 years — suggesting that for some shoulder conditions, supervised physiotherapy may achieve equivalent long-term outcomes.",
    steroidRisks:
      "Corticosteroid injections in the shoulder provide temporary pain relief, typically lasting weeks to months. However, repeated steroid injections near tendons carry a risk of tendon weakening, potentially increasing the risk of full-thickness tears. This is particularly concerning for patients with existing partial rotator cuff tears, where steroid-induced tendon degeneration could accelerate progression to a complete tear.",
    comparisonNote:
      "Surgical repair remains the recommended approach for acute, full-thickness rotator cuff tears in active patients, particularly when the tear results from trauma. Large tears with significant retraction are best addressed surgically before muscle atrophy becomes irreversible.",
  },
  {
    slug: "back-pain",
    name: "Back Pain",
    shortName: "Back",
    icon: "back",
    headline: "Tired of Back Pain Holding You Back?",
    subheadline:
      "Take our 2-minute assessment to explore which non-surgical approaches may be suitable for your back condition.",
    heroDescription:
      "Back pain is the leading cause of disability in the UK, affecting approximately 1 in 5 adults and costing the economy an estimated 10-12 billion pounds per year according to published research in the British Journal of Pain (2024). NHS primary care costs alone for back pain amount to 3.2 billion pounds annually. Whether caused by disc herniation, sciatica, or spinal degeneration, chronic back pain can profoundly impact every aspect of daily life. One of the most concerning aspects of back surgery is the prevalence of Failed Back Surgery Syndrome (FBSS), which affects 10-40% of patients according to StatPearls (NCBI). This educational resource explores the full spectrum of options from conservative management to regenerative approaches, presenting the current evidence to help you understand what may be suitable for your situation. A thorough assessment by a qualified specialist is essential before considering any treatment pathway.",
    conditions: [
      {
        slug: "disc-herniation",
        name: "Disc Herniation & Bulging Discs",
        icon: "tear",
        description:
          "A disc herniation occurs when the soft, gel-like centre of a spinal disc pushes through a tear in the tougher exterior, potentially compressing nearby nerves. This can cause sharp, burning pain in the lower back that radiates to the buttock and leg, along with numbness, tingling, or muscle weakness in the affected area. Symptoms are often worse with sitting, bending, or coughing. Microdiscectomy — the surgical removal of herniated disc material — has a failure rate of 19-25% according to published data, with re-herniation at the same level occurring in 5-15% of patients within 2 years. Recovery from microdiscectomy typically takes 6-12 weeks, while spinal fusion requires 3-6 months with up to 1 year for bone consolidation. Regenerative approaches including non-surgical injection therapies are being studied for their potential to support disc repair, with some published data showing improvements in pain and function scores.",
        symptoms: [
          "Sharp, burning pain in the lower back",
          "Pain radiating to buttock and leg",
          "Numbness or tingling in affected area",
          "Muscle weakness in the leg",
          "Symptoms worse with sitting or bending",
        ],
        progression:
          "Without management, disc height may reduce and nerve compression can worsen, leading to chronic pain, progressive weakness, and numbness.",
      },
      {
        slug: "sciatica",
        name: "Sciatica",
        icon: "lightning",
        description:
          "Sciatica refers to pain that radiates along the path of the sciatic nerve, which branches from the lower back through the hips and buttocks and down each leg. It typically occurs when a herniated disc, bone spur, or narrowing of the spine compresses part of the nerve. The pain can range from a mild ache to sharp, burning, or electric-shock-like sensations, and usually affects only one side of the body. Many cases of sciatica resolve with conservative management within 4-6 weeks, including physiotherapy and pain medication. However, chronic sciatica lasting more than 12 weeks may require more interventional approaches. Epidural steroid injections provide temporary relief of nerve inflammation but do not address the underlying cause. Research has explored fluoroscopy-guided targeted injections to deliver concentrated growth factors directly to the affected area, with some studies showing improvements in pain ratings and quality of life measures.",
        symptoms: [
          "Pain radiating from lower back through buttock and down leg",
          "Sharp, burning, or electric-shock-like pain",
          "Usually affects one side only",
          "Numbness, tingling, or weakness in affected leg",
          "Pain worse with prolonged sitting",
        ],
        progression:
          "Most acute sciatica resolves within weeks. Chronic sciatica can lead to persistent nerve irritation, progressive weakness, and significant impact on work and daily activities.",
      },
      {
        slug: "spinal-degeneration",
        name: "Spinal Degeneration",
        icon: "chain",
        description:
          "Degenerative disc disease is a chronic condition in which the intervertebral discs gradually lose hydration, height, and structural integrity over time. This leads to chronic, dull aching in the lower back that worsens with sitting, bending, or twisting, interspersed with episodes of severe pain. As discs deteriorate, they can lead to spinal stenosis — a narrowing of the spinal canal that compresses nerves. Lumbar spinal fusion, a common surgical intervention, has a failure rate of 30-46% according to published clinical data, with 36% of patients developing transition syndrome within 5 years — degeneration at adjacent spinal levels caused by the altered mechanics of fusion. Success rates diminish dramatically with repeat surgeries: approximately 50% for the first operation, 30% for the second, 15% for the third, and 5% for the fourth. Intradiscal targeted injection therapy is being studied for its potential to support disc structure and hydration.",
        symptoms: [
          "Chronic, dull aching in the lower back",
          "Pain worsens with sitting, bending, or twisting",
          "Intermittent episodes of severe pain",
          "Stiffness and reduced flexibility",
          "Pain that may radiate to legs if nerves compressed",
        ],
        progression:
          "Disc height continues to reduce, potentially leading to spinal stenosis, chronic nerve compression, and significant functional limitation.",
      },
    ],
    surgeryRisks:
      "Back surgery carries some of the highest failure rates in orthopaedic surgery. Failed Back Surgery Syndrome affects 10-40% of patients according to StatPearls (NCBI), with chronic pain after spinal surgery occurring in approximately 15% of cases. Lumbar spinal fusion has a failure rate of 30-46%, and 36% develop transition syndrome within 5 years. Microdiscectomy failure rate is 19-25%, with 5-15% re-herniation within 2 years. The infection risk ranges from 5-10%, and recovery from spinal fusion takes 3-6 months with up to 1 year for bone consolidation. Perhaps most concerning, success rates diminish dramatically with each subsequent surgery.",
    steroidRisks:
      "Epidural steroid injections for back pain provide temporary relief of nerve inflammation, typically lasting weeks to months. They do not address the underlying structural cause and their benefit diminishes with repeat injections. Long-term use carries risks of bone density reduction and potential hormonal effects. Multiple studies have questioned the long-term value of repeated epidural steroid injections for chronic back conditions.",
    comparisonNote:
      "Surgery remains essential for patients experiencing cauda equina syndrome (a rare but serious condition requiring emergency intervention) and for those with progressive neurological deficits including significant muscle weakness or loss of bowel/bladder control.",
  },
  {
    slug: "elbow-pain",
    name: "Elbow Pain",
    shortName: "Elbow",
    icon: "elbow",
    headline: "Tired of Elbow Pain Holding You Back?",
    subheadline:
      "Take our 2-minute assessment to explore which non-surgical approaches may be suitable for your elbow condition.",
    heroDescription:
      "Elbow pain can significantly impact your ability to work, exercise, and perform everyday tasks. Conditions such as tennis elbow, golfer's elbow, and elbow bursitis are among the most common causes of elbow discomfort, affecting people across all activity levels. Tennis elbow alone accounts for a substantial proportion of upper limb pain consultations in the UK. Traditional management typically includes rest, bracing, physiotherapy with eccentric exercises, and anti-inflammatory medication. When conservative measures fail, steroid injections may provide short-term relief, though recurrence rates are high. Interestingly, a blinded randomised controlled trial suggested that outcomes of tennis elbow surgery are very similar to outcomes after sham surgery, questioning the rationale for surgical intervention in some cases. This educational resource examines the current evidence for all approaches, including regenerative therapies that research is exploring for tendon conditions.",
    conditions: [
      {
        slug: "tennis-elbow",
        name: "Tennis & Golfer's Elbow",
        icon: "tennis",
        description:
          "Tennis elbow (lateral epicondylitis) and golfer's elbow (medial epicondylitis) are tendon overuse conditions causing pain on the outside or inside of the elbow respectively. Tennis elbow causes pain and burning on the outer elbow with weak grip strength, worsened by forearm activities such as turning a doorknob or shaking hands. Golfer's elbow causes inner elbow pain with stiffness and weakness in the hands. A randomised controlled trial by Pabst et al. published in the American Journal of Sports Medicine (2013) studied 230 patients with tennis elbow and found success rates of 83.9% in the injection therapy group versus 68.3% in the control group at 24 weeks, with pain improvement of 71.5% in the injection therapy group versus 56.1% in controls. However, the Cochrane review found moderate-certainty evidence that these injection therapies do not provide patient-important benefits compared with placebo, highlighting the complexity of the evidence base.",
        symptoms: [
          "Pain on the outside (tennis) or inside (golfer's) of the elbow",
          "Weak grip strength",
          "Pain worsened by forearm activity",
          "Stiffness in the elbow",
          "Pain when lifting or gripping objects",
        ],
        progression:
          "Chronic tendon degeneration may replace initial inflammation. Grip strength progressively weakens, and daily activities become increasingly difficult.",
      },
      {
        slug: "elbow-bursitis",
        name: "Elbow Bursitis & Arthritis",
        icon: "flame",
        description:
          "Elbow bursitis (olecranon bursitis) involves swelling of the fluid-filled sac at the tip of the elbow, causing pain with movement or pressure, and visible swelling. It can result from trauma, prolonged pressure on the elbow, infection, or inflammatory conditions. Elbow arthritis, while less common than in weight-bearing joints, causes pain, swelling, stiffness, and reduced range of motion, sometimes with locking or catching sensations. If the ulnar nerve is affected, numbness in the ring and little fingers may develop. Conservative treatment includes rest, ice, compression, NSAIDs, and physiotherapy. Steroid injections provide short-term relief but have high recurrence rates for elbow conditions. Surgery for tennis elbow includes ECRB release — with a percutaneous approach allowing return to work at 2 weeks versus 15 weeks for open surgery. Targeted injection therapy for elbow conditions supports growth factor delivery to promote tendon regeneration and reduce inflammation.",
        symptoms: [
          "Swelling at the tip of the elbow (bursitis)",
          "Pain with movement or pressure",
          "Stiffness and reduced range of motion (arthritis)",
          "Locking or catching sensation",
          "Numbness in ring and little fingers (if nerve affected)",
        ],
        progression:
          "Chronic bursitis can become recurrent. Elbow arthritis may progressively limit range of motion and cause ulnar nerve compression.",
      },
    ],
    surgeryRisks:
      "Surgery for tennis elbow has varying recovery times, with percutaneous approaches allowing return to work at 2 weeks compared to 15 weeks for open surgery. Success rates range from 80-97% for various procedures. However, a blinded randomised controlled trial suggested outcomes of tennis elbow surgery are very similar to outcomes after sham (placebo) surgery or no treatment, raising important questions about the value of surgical intervention. Risks include posterolateral instability, neuroma formation, and late return to work or sport.",
    steroidRisks:
      "Steroid injections for elbow conditions provide short-term relief but are associated with high recurrence rates. For tennis elbow specifically, steroid injections often provide initial improvement that reverses within months, with some studies showing worse long-term outcomes than no treatment at all due to disruption of the natural healing process.",
    comparisonNote:
      "Surgical intervention may be appropriate for patients who have failed 6-12 months of comprehensive conservative treatment and continue to experience significant functional limitation.",
  },
  {
    slug: "hand-wrist-foot-ankle",
    name: "Hand, Wrist, Foot & Ankle Pain",
    shortName: "Extremities",
    icon: "extremities",
    headline: "Tired of Hand, Wrist, Foot & Ankle Pain?",
    subheadline:
      "Take our 2-minute assessment to explore which non-surgical approaches may be suitable for your condition.",
    heroDescription:
      "Pain in the hands, wrists, feet, and ankles can profoundly affect your ability to perform daily tasks, from typing and gripping to walking and exercising. These smaller joints are susceptible to a range of conditions including osteoarthritis, trigger finger, plantar fasciitis, and tendon injuries. While these may seem like minor complaints, chronic pain in the extremities can significantly reduce quality of life and independence. Traditional management ranges from splinting and physiotherapy to steroid injections and surgical release procedures. Research is increasingly exploring how regenerative approaches including targeted injection therapy may support healing in soft tissue injuries of the hands, wrists, feet, and ankles. A 2022 randomised prospective study published in the MDPI Journal of Clinical Medicine found that targeted injection therapy demonstrated quicker recovery (10.2 months average) compared to surgery (37.2 months) for plantar fasciitis. Individual assessment is essential to determine the most appropriate pathway.",
    conditions: [
      {
        slug: "plantar-fasciitis",
        name: "Plantar Fasciitis",
        icon: "foot",
        description:
          "Plantar fasciitis is one of the most common causes of heel pain, caused by inflammation and degeneration of the plantar fascia — the thick band of tissue connecting the heel bone to the toes. Patients typically experience sharp heel pain with their first steps in the morning that usually improves with movement but returns after prolonged standing. It most commonly affects one foot and is prevalent among runners, people who are overweight, and those who wear shoes with inadequate support. A 2024 systematic review and meta-analysis published in PMC found that targeted injection therapy is more effective than corticosteroid injections, extracorporeal shockwave therapy, and placebo in reducing pain and improving function for plantar fasciitis. A separate 2022 study comparing targeted injection therapy to partial plantar fasciotomy surgery found the injection therapy group recovery averaged 10.2 months compared to 37.2 months for the surgical group, with lower complication rates in the injection therapy cohort.",
        symptoms: [
          "Sharp heel pain with first steps in the morning",
          "Pain after prolonged standing",
          "Pain when standing after sitting",
          "Usually affects one foot",
          "Pain improves with movement but returns after activity",
        ],
        progression:
          "Chronic plantar fasciitis can lead to altered gait patterns, which in turn may cause secondary knee, hip, and back problems.",
      },
      {
        slug: "trigger-finger",
        name: "Trigger Finger & Hand Conditions",
        icon: "hand",
        description:
          "Trigger finger (stenosing tenosynovitis) occurs when the tendon sheath in a finger becomes inflamed, causing the finger to catch or lock when bent. Patients experience a painful clicking or snapping sensation, stiffness especially in the morning, and sometimes a palpable bump at the base of the affected finger. In severe cases, the finger may become permanently locked. Initial treatment with steroid injection has approximately 90% success rate, with 66.3% of patients needing no further treatment. However, 30.5% require re-injection within 6 months and 3.2% proceed to surgery within 1 year. Hand and wrist osteoarthritis, particularly at the base of the thumb, causes pain, stiffness, reduced grip strength, and difficulty with fine motor tasks. Bony enlargements known as Heberden's and Bouchard's nodes may develop. Evidence-based injection treatments and regenerative approaches are being studied for their potential to support tendon healing and reduce inflammation in these conditions.",
        symptoms: [
          "Finger catching or locking when bent",
          "Painful clicking or snapping sensation",
          "Stiffness, especially in the morning",
          "Bump at the base of the affected finger",
          "Reduced grip strength (OA)",
        ],
        progression:
          "Trigger finger may progress from occasional catching to permanent locking. Hand OA can lead to joint deformity and severe functional limitation.",
      },
      {
        slug: "ankle-tendon",
        name: "Ankle Tendon & Ligament Injuries",
        icon: "foot",
        description:
          "Ankle tendon injuries, particularly Achilles tendinopathy, involve pain and stiffness along the Achilles tendon that is typically worst in the morning and worsens with activity. The tendon may become swollen and thickened. Ankle ligament tears from sprains can lead to chronic instability if not properly rehabilitated. Published research has explored targeted injection therapy for Achilles tendon conditions, with studies showing improvements in pain intensity and functional ability. One study found that implanting advanced injection approaches into Achilles tears in athletes improved range of motion and function more quickly than open suture repair. Level 4 evidence also showed no reruptures at 2.5 years after open Achilles repair augmented with non-surgical injection therapies. Ankle osteoarthritis, while less common than knee or hip OA, causes pain, stiffness, and reduced range of motion that can significantly affect walking and daily activities. Targeted injection therapy may support healing in soft-tissue ankle injuries.",
        symptoms: [
          "Pain and stiffness along the Achilles tendon",
          "Pain worst in the morning, worsens with activity",
          "Swelling and thickening of the tendon",
          "Ankle instability (ligament tears)",
          "Reduced ability to flex the foot",
        ],
        progression:
          "Achilles tendinopathy carries a risk of complete tendon rupture. Chronic ankle instability from untreated ligament injuries can lead to early-onset ankle arthritis.",
      },
    ],
    surgeryRisks:
      "Trigger finger release surgery has a high success rate of approximately 99%, with only 2.68% needing further treatment. However, for plantar fasciitis, surgical fasciotomy is reserved for cases failing 6-12 months of conservative care, and recovery takes significantly longer than non-surgical approaches. Achilles tendon surgery carries risks including wound healing complications, nerve damage, and re-rupture, with a prolonged rehabilitation period of 6-12 months.",
    steroidRisks:
      "Steroid injections for trigger finger have a 90% initial success rate but 30.5% recurrence within 6 months. For plantar fasciitis, steroid injections provide short-term relief but carry risks of plantar fascia rupture with repeated injections. For Achilles tendinopathy, steroid injections near the tendon are generally avoided due to the significant risk of tendon rupture.",
    comparisonNote:
      "Trigger finger release surgery has excellent outcomes and may be the most efficient option for patients with recurrent locking despite steroid injections. Acute complete Achilles tendon rupture typically requires surgical repair, particularly in active individuals.",
  },
];

export function getBodyAreaBySlug(slug: string): BodyArea | undefined {
  return bodyAreas.find((ba) => ba.slug === slug);
}

export function getAllBodyAreaSlugs(): string[] {
  return bodyAreas.map((ba) => ba.slug);
}
