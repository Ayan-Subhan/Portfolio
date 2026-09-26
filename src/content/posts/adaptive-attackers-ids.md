---
title: Your adversarial defence is only as good as the attacker you tested it against
kicker: Explainer · Adversarial ML
summary: Layered detectors for IoT intrusion detection report near-perfect accuracy. Here is why that number means less than it seems, and what an honest evaluation looks like.
date: 2026-09-20
draft: true
tags: [adversarial-ml, ids, iot]
---

<!-- DRAFT: seeded from my FYP proposal. Review, edit and set `draft: false` to publish. -->

Machine-learning intrusion detection has a well-known weakness. An attacker can nudge a malicious flow's features by tiny amounts, producing an **adversarial example**, until the model calls it benign. So the field built defences, and some of them report remarkable numbers.

Take the **Adversarial Attack Detector (AAD)**. It stacks three layers: a rule-based validator, a random-forest discriminator trained to recognise adversarial samples, and an OR-fused ensemble of MLP, CNN and LSTM models. It reports 100% discriminator accuracy. Under BIM and PGD attacks, detection is restored from roughly 37% to roughly 100%.

Those numbers are real. The question is what they measure.

## Problem 1: the exam had the answers in it

AAD's discriminator and ensemble are trained on the same four attack methods they are evaluated against. A detector that has memorised what FGSM, PGD, BIM and DeepFool perturbations look like will, unsurprisingly, recognise FGSM, PGD, BIM and DeepFool perturbations. That is in-distribution recall. It isn't robustness.

## Problem 2: the attacker never read the manual

The stated threat model is white-box. In every experiment, though, the attacker optimises against the classifier alone and never against the detector sitting in front of it. That matters, because history is not kind to detection-based defences:

- Carlini & Wagner (2017) bypassed **all ten** detection methods they examined once the attack accounted for the detector.
- Athalye et al. (2018) broke **seven of nine** ICLR defences with attacks designed for each one.
- Tramèr et al. (2020) showed that even defences claiming adaptive evaluation fall when the attack is properly tuned.

If you don't test against an attacker who knows your defence, you haven't tested the defence.

## Problem 3: attacks that couldn't exist

An IDS works on *features extracted from packets*, not on packets themselves, and those features are interdependent. Change one without the others and you've produced a feature vector that no real traffic could generate. Hasan et al. (2026) estimate that up to **80.3%** of published adversarial examples fail protocol, semantic or infrastructure constraints. Evasion rates measured in feature space overstate what happens on the wire.

## Problem 4: wrong network

Defences motivated by constrained IoT deployments are routinely validated on enterprise datasets, such as a subset of CSE-CIC-IDS2018 in AAD's case. Medical IoT traffic looks different, and the defence has never seen it.

## What an honest evaluation looks like

1. **Hold out attack families.** Evaluate on attacks the defence was never trained on.
2. **Be adaptive.** Give the attacker knowledge of every layer and optimise against the whole pipeline.
3. **Constrain perturbations.** Keep them realizable, so "attacks" correspond to traffic that could actually be sent.
4. **Use domain traffic.** For IoMT, evaluate on IoMT data.
5. **Report the cost.** Measure latency, memory and throughput. Detection defences can add 120–150% overhead, which matters on an edge gateway.

This is the evaluation my final-year project runs on AAD. When the numbers are in, they'll be published here, whichever way they fall.
