---
title: Edge-Enabled Identity & Access Management for IoT
short: 'EIAM: Edge IAM for IoT'
exhibit: C
org: Network Security project · FAST-NUCES
year: '' # TODO: add the year
order: 3
problem: >-
  Cloud-centric IAM makes every IoT access decision cross the internet: credentials travel over the WAN, a round-trip can take hundreds of milliseconds, and cached identity data at the edge silently goes stale.
role: >-
  One of three engineers. We implemented the Q1-2025 EIAM-IoT framework end to end: a local authentication and authorization engine at the edge, an authenticated-encryption channel from device to edge, and MQTT context sync with the cloud.
stack: [Python, FastAPI, SQLite, MQTT · Mosquitto, X25519, HKDF-SHA256, ChaCha20-Poly1305, React]
findings:
  - Device-to-edge traffic protected with ephemeral X25519, HKDF (PSK as salt) and ChaCha20-Poly1305, so only ciphertext is on the wire, verified in Wireshark.
  - ABAC decisions made locally at the edge, with each attribute scored on freshness and trust (TVR = VR × F ≥ ToC).
  - Every ALLOW or DENY persisted with per-attribute metrics, giving a full audit trail.
  - Edge–cloud context sync over MQTT request/response, pulling only attributes newer than the edge's copy.
diagram: eiam
cover: ../../assets/work/eiam-admin-console.webp
coverAlt: EIAM admin console showing a live request moving from IoT device through edge crypto, LAA engine and cloud IAM, with a per-attribute table of VR, freshness, TVR and threshold values and the final decision.
coverCaption: EIAM admin console: one request traced from device to decision, with the per-attribute trust calculation.
gallery:
  - src: ../../assets/work/eiam-edge-decision.webp
    alt: Terminal output of the edge node. It completes a handshake with device VID-HM-001, decrypts a WRITE request for patient_icu_record containing vitals, and returns an LAA decision of DENY.
    caption: The edge node decrypts a vitals WRITE from VID-HM-001 and denies it on policy.
  - src: ../../assets/work/eiam-wireshark.webp
    alt: Wireshark capture of device-to-edge TCP traffic, with the payload shown only as encrypted bytes.
    caption: On the wire, only ciphertext. The payload is protected with ChaCha20-Poly1305 AEAD.
  - src: ../../assets/work/eiam-edge-policy-table.webp
    alt: Edge database browser showing the object_required_attrs table, with freshness and confidence thresholds per resource, operation and attribute.
    caption: Per-resource policy at the edge. Each required attribute has its own freshness (ToF) and confidence (ToC) threshold.
  - src: ../../assets/work/eiam-er-diagram.webp
    alt: Entity-relationship diagram of the edge database, covering resource policies, device groups, devices, attributes, object groups, requirements, keys, seen requests and access decisions.
    caption: Edge database schema, from policies and object groups down to the decision audit log.
---

## Why the edge

IoT devices are constrained, long-lived and often insecure by default. When every authorization decision has to go to the cloud, credentials and telemetry cross the public internet just to be checked. For an ICU monitor or a door lock, that round-trip is also a window of failure.

EIAM moves identity and access decisions onto an **edge node** next to the devices. The cloud stays the authoritative registry.

## Three tiers

We built three cooperating tiers:

- **Cloud IAM.** A FastAPI service backed by `cloud_iam.db`. It is the authoritative registry of devices, their pre-shared keys and their long-term attributes (trust score, location, firmware status).
- **Edge node.** Terminates encrypted device traffic and runs the **Local Authentication & Authorization (LAA) engine** over a local policy and attribute store, `edge_laa.db`.
- **IoT devices.** Build requests from a device ID, a resource ID, an operation and a payload, then encrypt them to the edge.

A React admin console sits over both tiers. It handles device onboarding, PSK provisioning, triggering context sync and browsing both databases.

## The channel

Each session, the edge and the device exchange **ephemeral X25519** public keys. The shared secret goes through **HKDF-SHA256**, salted with the device's PSK, to derive a 256-bit session key. The request is then sealed with **ChaCha20-Poly1305** under a fresh nonce.

If the AEAD tag fails, the packet is dropped before any policy logic runs. The session key never crosses the wire.

## The decision

The LAA engine is attribute-based access control, with two extra questions asked of every attribute: *how fresh is this, and how much do I trust it?*

- The **freshness factor** is F = 1 while the attribute is younger than its threshold (ToF). After that it decays: F = e<sup>−β(Δt − ToF)</sup>.
- The attribute's **trust value** is TVR = VR × F, where VR is the reliability score of its value.
- An attribute passes if TVR ≥ ToC, its confidence threshold.
- A policy aggregator enforces least privilege: every *required* attribute must pass, and optional ones can only add confidence.

Every decision is written to an audit log, along with the per-attribute metrics that produced it.

## Keeping the edge current

Context sync runs over **MQTT** as a request/response exchange with correlation IDs. The edge tells the cloud which devices it has seen and how recent its copy of each attribute is. The cloud returns only the attributes that are newer. Decisions stay local and fast, while attributes stay cloud-authoritative.
