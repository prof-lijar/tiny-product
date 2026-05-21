# TriageAI — Product Specification

## Features

1. **Symptom Input**
   - Interactive body map (front/back human silhouette) — click a body region to filter symptoms
   - Search/autocomplete from a curated symptom database
   - Support for multiple simultaneous symptoms
   - Duration selector (how long each symptom has been present)
   - Severity slider (mild / moderate / severe)

2. **Urgency Triage Assessment**
   - Color-coded urgency levels:
     - RED: Emergency — Call 911 or go to ER immediately
     - ORANGE: Urgent — See a doctor within 24 hours
     - YELLOW: Routine — Schedule an appointment this week
     - GREEN: Self-care — Manage at home with suggested remedies
   - Clear reasoning for the triage decision
   - Warning signs to watch for ("return if you experience...")

3. **Possible Conditions**
   - Ranked list of conditions matching the symptom combination
   - Plain-language description of each condition
   - Likelihood indicator (high / moderate / low match)
   - Link to trusted health information sources

4. **Action Guide & Next Steps**
   - Specific recommendations based on urgency level
   - Home care tips for self-care level conditions
   - When to escalate (red flag symptoms)
   - What to tell the doctor (symptom summary printable/shareable)

5. **Health Profile (Optional)**
   - Age and biological sex (affects symptom interpretation)
   - Pre-existing conditions checklist
   - Current medications list
   - Allergies
   - Profile stored locally in browser (no server-side storage for privacy)

6. **Symptom History**
   - Log of past symptom checks with dates and outcomes
   - Pattern detection ("you've reported headaches 4 times this month")
   - Stored in browser localStorage
   - Export as JSON for sharing with a doctor

7. **Nearby Care Finder**
   - Map showing nearby hospitals, urgent care clinics, and pharmacies
   - Filtered by urgency level (ER for emergencies, clinics for routine)
   - Uses browser geolocation API
   - Links to directions

## Requirements
- Design an accessible, non-intimidating UI with clear visual hierarchy
- Build the symptom database as a structured JSON dataset (no external DB required)
- Implement triage logic as a rule-based scoring system (weighted symptom matching)
- Store health profile and history in browser localStorage for privacy
- Responsive design — works on mobile, tablet, and desktop
- Include a prominent medical disclaimer on every assessment page
- Ensure WCAG 2.1 AA accessibility compliance

## Acceptance Criteria
- Users can select symptoms and receive a triage assessment in under 10 seconds
- Triage results include urgency level, possible conditions, and next steps
- Health profile personalizes results (e.g., chest pain in 60-year-old vs 20-year-old)
- Symptom history persists across browser sessions
- The app works without creating an account
- All pages include the medical disclaimer
- The app is fully responsive and accessible
