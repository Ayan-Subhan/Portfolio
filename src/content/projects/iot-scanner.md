---
title: IoT Vulnerability Scanner
short: IoT Vulnerability Scanner
exhibit: D
org: Personal project
year: '' # TODO: add the year
order: 4
problem: >-
  Home and small-office networks fill up with IoT devices nobody inventories: cameras, plugs and hubs running default credentials and exposed services. General-purpose scanners report ports, not IoT risk.
role: >-
  Sole developer across the full stack: the Python scanning pipeline, the WebSocket streaming layer and the dashboard.
stack: [Python, WebSockets, HTML · CSS · JavaScript, Network discovery, Service fingerprinting]
findings:
  - Four-stage pipeline covering host discovery, port scanning, device fingerprinting and weak-credential checks.
  - Scan progress, status and findings streamed live to the UI over WebSockets.
  - Visualises the network topology, the distribution of vulnerabilities and a security report for each device.
diagram: scanner
---

## The idea

A scanner shaped around IoT. Instead of a list of open ports, it answers the questions that matter on a network full of devices: *what is this device, what is it exposing, and is it still using the password it shipped with?*

## The pipeline

The Python backend runs four modules in sequence, working in the same way as Nmap:

1. **Discovery.** Finds live hosts on the local segment.
2. **Port scanning.** Enumerates exposed services on each host.
3. **Fingerprinting.** Identifies the device type and vendor from how its services respond.
4. **Weak credentials.** Tests exposed login services for default and weak passwords.

Each stage streams progress and findings to the browser over a **WebSocket**, so the dashboard fills in live rather than waiting for a scan to finish.

## The dashboard

A dark-themed HTML/CSS/JS front end shows three things: a topology view of the network, the distribution of vulnerabilities across devices, and a detailed security report for each device.

*Only scan networks you own or are authorised to test.*
