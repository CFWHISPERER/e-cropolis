# E-Cropolis — Hardware Inventory

**Document version:** 0.1  
**Last reviewed:** 2026-10-10  
**Project:** [E-Cropolis](https://github.com/CFWHISPERER/e-cropolis), part of [Project Lichen](https://projectlichen.github.io/)  
**Status:** Initial inventory, reconstructed from prior discussions; specifications and operational states require verification.
*Keeping our bootstrapping approach alive.*

## Purpose

This document records the physical devices available or proposed for E-Cropolis and its **Data DeCentre / Distributed Data Matrix (DDM)** research. It supports reproducible experiments in Data Distance, computational friction, edge computing, distributed coordination, repair, reuse, and resource consumption.

**Evidence rule:** *Available*, *operational*, *network-connected*, and *validated as an experimental node* are different claims. Record each separately. Unknown details remain **unverified** until measured or inspected.

## Inventory at a glance

| ID | Equipment | Known information | Potential role | Current verification |
|---|---|---|---|---|
| HW-01 | Windows 11 gaming PC | Windows 11; WSL2 used for development | Primary workstation, reference compute node, MicropolisCore development | Host in use; full hardware specification pending |
| HW-02 | Older Alienware laptop | Ubuntu installed | Independent Linux compute node | Device available; current OS, network and hardware status pending |
| HW-03 | Dell workstation | Previously diagnosed storage problem; hard drive not detected in BIOS | Additional compute node after repair | **Not operational as an experimental node** |
| HW-04 | Android phone A | Android device; model/configuration to verify | Edge compute, sensing, connectivity tests | Available; role untested |
| HW-05 | Android phone B | Android device; model/configuration to verify | Edge compute, sensing, connectivity tests | Available; role untested |
| HW-06 | Android phone C (optional) | Availability/configuration to verify | Additional edge node | Not yet confirmed for experiment |
| HW-07 | Synology DS224 NAS | Accessible on local network; mapped from Windows; FreeFileSync used | Shared datasets, logs, archives, backup source | Network access previously demonstrated; current configuration pending |

> WSL distributions and containers are **software environments hosted on HW-01**, not additional physical machines. Document them in [`ENVIRONMENT.md`](ENVIRONMENT.md).

## Device record template

For each device, capture only details needed to reproduce or interpret experiments:

| Field | Value |
|---|---|
| Inventory ID | `HW-XX` |
| Device type / model | To verify |
| CPU / architecture | To verify |
| RAM | To verify |
| Storage type and capacity | To verify |
| Operating system / version | To verify; also cross-reference `ENVIRONMENT.md` |
| Network interfaces | Ethernet / Wi-Fi / USB tethering, as applicable |
| Connection type for experiment | To record per experiment |
| Power measurement method | Wall meter / battery estimate / unavailable |
| Experimental role | To define |
| Operational status | Available / operational / network-connected / validated |
| Evidence | Command output, photograph, log or dated observation |
| Last verified | YYYY-MM-DD |
| Limitations / repairs | To document |

Do **not** publish serial numbers, MAC addresses, IMEIs, private or public IP addresses, account identifiers, authentication tokens, or storage credentials.

## Known hardware notes

### HW-01 — Windows 11 gaming PC

- Primary workstation used to prepare the E-Cropolis development environment.
- WSL2 Ubuntu development and separate container experiments were previously demonstrated.
- Exact CPU, GPU, RAM, disk and network-interface specifications have not yet been entered in this inventory.
- WSL and containers share this physical host; tests between them do not establish physical network distribution.

### HW-02 — Alienware Ubuntu laptop

- Older Alienware laptop with Ubuntu installed.
- Proposed first independent physical compute node.
- Before testing, confirm bootability, OS version, available RAM, Ethernet/Wi-Fi and power source.

### HW-03 — Dell workstation

- Historical troubleshooting indicated a hard-drive problem: drive absent from BIOS and diagnostic findings consistent with failed storage.
- Repair or replacement storage must be evaluated before this becomes a usable node.
- Do not mark it operational solely because it is physically available.

### HW-04 to HW-06 — Android devices

- Two or three Android phones may participate.
- Record each model, Android version, memory, connectivity and battery health once checked.
- Candidate experiments: intermittent connectivity, local inference, sensor capture and transfer of summarized rather than raw data.
- Avoid assuming that all devices provide the same sensors or background processing capabilities.

### HW-07 — Synology DS224 NAS

- Previously rediscovered on the internet-connected local network after an earlier direct-connect configuration.
- Access from Windows and drive mapping were demonstrated; FreeFileSync comparison/synchronization was configured.
- Potential role: shared experiment datasets, output archives, logs and backups.
- Confirm disk health, redundancy, available capacity, share permissions and independent backup arrangements before storing irreplaceable evidence.
- **Network-connected does not imply directly exposed to the public internet.** Verify remote-access settings separately; avoid exposing NAS administration unnecessarily.
- A NAS is not, by itself, an independent backup.

## Proposed baseline experiments

### EXP-HW-001 — Physical-node inventory

**Question:** What hardware and connectivity capabilities are actually available?

**Procedure:** Inspect HW-01, HW-02 and HW-07; record dated, non-sensitive system information and connection methods. Assess HW-03 separately as a repair task.

**Success:** A repeatable inventory with verified CPU, memory, operating system, network interface and status for each tested device.

**Status:** Proposed; not executed under this protocol.

### EXP-DD-001 — Local versus remote processing

**Question:** What changes when a fixed task runs where data originate versus on another physical machine?

**Comparison:**
1. Process data locally on one machine.
2. Transfer raw data to a second physical machine and process there.
3. Process locally and transfer only defined summaries.

**Record:** Dataset size and checksum; software and versions; network topology; elapsed time; bytes sent and received; CPU/RAM use; output equivalence; and power use **only if measured with a suitable method**.

**Success:** Repeatable results and clear accounting of both processing and transfer costs.

**Status:** Proposed; not executed.

### EXP-DD-002 — NAS as shared storage

**Question:** When does using the NAS reduce duplication or simplify coordination, and when does it increase transfer overhead?

**Status:** Proposed; not executed.

### EXP-DD-003 — Android edge processing

**Question:** Can an Android device derive a useful summary locally while sending less data than a raw-data upload, without unacceptable loss of information?

**Status:** Proposed; not executed.

## Measurement and interpretation rules

- Separate **measured** values from estimates and assumptions.
- Preserve input datasets, checksums, commands, configuration and output evidence where practical.
- Compare like-for-like tasks and note differences in hardware capability.
- Record failed and inconclusive runs, not only successful ones.
- Distinguish logical isolation (containers) from physical distribution (separate devices).
- Treat reduced network traffic, lower latency, reduced energy use and better decision quality as **separate outcomes**; one does not guarantee another.
- Do not infer total environmental benefit from one resource metric without considering added hardware, maintenance and embodied impacts.

## Documentation relationships

- [`ENVIRONMENT.md`](ENVIRONMENT.md): operating systems, toolchains, WSL, containers and software dependencies.
- [`JOURNAL.md`](JOURNAL.md): chronological work, troubleshooting and observations.
- [`../STATUS.md`](../STATUS.md): concise public-facing project state.
- [`../ROADMAP.md`](../ROADMAP.md): planned milestones and success criteria.
- Future experiment records: protocols, raw results and conclusions with provenance.

## Next actions

- [ ] Confirm the Alienware laptop's current configuration and network connectivity.
- [ ] Inventory the Windows host's CPU, RAM, GPU and network interfaces.
- [ ] Check Synology DS224 storage health, capacity and backup strategy.
- [ ] Record Android device models and supported capabilities.
- [ ] Assess replacement storage for the Dell workstation.
- [ ] Define a reproducible two-physical-node Data Distance baseline.

---

*E-Cropolis principle: Use existing capabilities intelligently; measure before concluding; preserve the evidence.*
