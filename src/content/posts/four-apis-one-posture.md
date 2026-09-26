---
title: Four vendor APIs, one posture view
kicker: Build notes · GRC engineering
summary: What it took to turn SIEM, vulnerability, EDR and PAM data into a compliance dashboard people actually open. Mostly normalisation, snapshots and thresholds.
date: 2026-09-10
draft: true
tags: [grc, dashboards, python]
---

<!-- DRAFT: outline to expand. Keep all JWPL specifics (names, counts, hosts) out of the published version. -->

## The problem with four consoles

Each console tells the truth about its own slice of the estate. None of them can tell you whether an asset is covered by *all* of your controls.

## Lesson 1: the schema is the product

- One asset, four names: reconciling hostnames, IPs and tags across vendors.
- Normalising into assets, vulnerabilities, compliance checks and remediation records.

## Lesson 2: store snapshots, not state

- Why point-in-time rows beat "current status" columns.
- Trend lines are what turn a dashboard into a management tool.

## Lesson 3: a KPI without a threshold is just a chart

- Encoding "overdue", "coverage gap" and "drift" as rules, so problems surface without someone going looking.

## Lesson 4: API clients are mostly error handling

- Token refresh, pagination and rate limits, and making scheduled pulls idempotent.
