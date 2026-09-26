---
title: Adversarial ML for IoT Intrusion Detection
short: Adversarial ML for IDS
exhibit: B
org: Final Year Project · FAST-NUCES
year: '2026 — 2027'
order: 2
problem: >-
  Layered adversarial-example detectors for IoT intrusion detection report near-perfect results — but they are trained and tested on the same attacks, evaluated only against defence-blind attackers, and validated on enterprise traffic rather than IoT. Nobody knows whether they hold up when it counts.
role: >-
  Co-researcher on my final-year project: literature review and gap analysis, threat model, and the AAD+ evaluation bench and flow explorer used to put the defence under pressure.
stack: [Python, Random Forest, MLP · CNN · LSTM, PGD · BIM · FGSM · DeepFool, CIC-IoMT-2024, CSE-CIC-IDS2018]
findings:
  - Identified five recurring evaluation gaps across the literature, from coupled train/test attack sets to unreported deployment cost.
  - Re-implementing AAD (rule validator → RF discriminator → MLP/CNN/LSTM ensemble) as a testable pipeline.
  - Evaluating it against unseen attack families and an adaptive, defence-aware attacker, under realizability constraints and on IoMT traffic.
  - Measured results will be published here when the evaluation is complete.
diagram: aad
cover: ../../assets/work/aad-flow-explorer.webp
coverAlt: The AAD+ Flow Explorer. Controls choose the traffic type, what the attacker knows and the EIDS fusion rule, above a pipeline of boxes from attacker host through wire and sensor into three defence layers — rule validator, adversarial discriminator and EIDS ensemble — ending at a protected hospital ward segment.
coverCaption: AAD+ Flow Explorer — send one flow at a time through the defence and see which layer stops it, and why.
status: Research in progress
---

## The question

Machine-learning intrusion detection systems can be fooled by **adversarial examples**: tiny, deliberate changes to traffic features that make malicious flows look benign. The **Adversarial Attack Detector (AAD)** of Verma et al. (2025) defends against this with three layers in series:

1. A **rule-based validator** that rejects impossible feature combinations.
2. A **random-forest discriminator** trained to spot adversarial samples.
3. An **enhanced IDS ensemble (EIDS)** of MLP, CNN and LSTM models, OR-fused.

The reported numbers are striking: 100% discriminator accuracy, with EIDS restoring detection from about 37% to about 100% under BIM and PGD. My project asks whether those numbers survive a harder test.

## The gaps

Reviewing the field turned up five recurring problems:

- **Coupled evaluation.** The defence is trained on the same four attacks it is scored against.
- **No adaptive attacker.** The threat model says white-box, but every experiment uses an attacker that doesn't know the defence exists. Carlini & Wagner and Athalye et al. showed that detection defences routinely collapse under adaptive attacks.
- **Unrealizable perturbations.** Perturbing extracted features freely can produce "attacks" that no real packet sequence could generate. Hasan et al. estimate up to 80.3% of published adversarial examples fail protocol and semantic constraints.
- **Wrong traffic.** Defences motivated by constrained IoT deployments are validated on enterprise datasets.
- **Unreported cost.** Latency, memory and throughput go unmeasured, even though detection-based defences can add 120–150% overhead.

## The approach

Evaluate AAD under the conditions it claims to handle:

- Attacks it has never seen.
- An adaptive attacker who knows the defence.
- Perturbations constrained to stay realizable.
- Realistic medical-IoT (IoMT) traffic.

## The flow explorer

To make the pipeline legible, I built the **AAD+ Flow Explorer**. It sends one flow at a time through the same probability model the evaluation bench uses. For each flow you choose:

- the attack (PGD and others);
- what the attacker knows (nothing, or the defence itself);
- the scenario (holds, degrades or breaks);
- the EIDS fusion rule.

You then watch where the flow is stopped. Every verdict comes with the reason behind it, so the aggregate numbers on the bench can be traced back to individual decisions.

*Measured results are pending and will be added when the evaluation is complete. I won't publish numbers before they are real.*
