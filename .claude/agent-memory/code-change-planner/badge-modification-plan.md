---
name: badge_modification_plan
description: Plan de modificación del badge de descuento usando extra_charges en lugar de mothers_day_discount
type: project
---

Badge Modification Plan - Using extra_charges instead of mothers_day_discount

**Current State:**
- FeaturedTrips.jsx uses `trip.mothers_day_discount` for the ribbon badge (line 97-105)
- This field doesn't exist in the data model
- Fallback logic: shows for first 3 tours if campaign is active

**Data Structure Found:**
ExtraCharges array in Trip entity with types:
- `discount_percent` - discount by percentage (e.g., 15%)
- `discount_fixed` - discount by fixed amount
- `percent` - additional charge by percentage
- `fixed` - additional charge by fixed amount

**Recommended Implementation:**

1. **Calculate max discount:** Find the highest discount_percent in extra_charges
2. **Show format:** `−${amount}%` or with emoji `🌸 −${amount}% Mamá`
3. **Fallback logic:** Keep existing fallback for first 3 tours showing no percentage

**Files to modify:**
- Only FeaturedTrips.jsx (NO changes to TripCard or ExtraCharges)

**Code change (lines 95-105):**

Replace:
```jsx
{MOTHERS_DAY_ACTIVE && (trip.mothers_day_discount || index < 3) && (
  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10 flex flex-col gap-1.5 pointer-events-none w-full items-center">
    <span className="bg-rose-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md shadow-rose-200">
      🌸 {trip.mothers_day_discount
        ? `−${trip.mothers_day_discount}% ${isSpanish ? 'Mamá' : 'Mom'}`
        : (isSpanish ? 'Especial Mamá' : "Mom's Special")}
    </span>
  </div>
)}
```

With:
```jsx
{MOTHERS_DAY_ACTIVE && (getMaxDiscount(trip.extra_charges) || index < 3) && (
  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10 flex flex-col gap-1.5 pointer-events-none w-full items-center">
    <span className="bg-rose-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md shadow-rose-200">
      {getMaxDiscount(trip.extra_charges)
        ? `🌸 −${getMaxDiscount(trip.extra_charges)}% ${isSpanish ? 'Mamá' : 'Mom'}`
        : (isSpanish ? 'Especial Mamá' : "Mom's Special")}
    </span>
  </div>
)}
```

**Add helper function (inside FeaturedTrips.jsx component):**
```jsx
// Helper to get max discount percentage from extra_charges
const getMaxDiscount = (charges) => {
  if (!charges || charges.length === 0) return null;
  return charges
    .filter(c => c.type === 'discount_percent')
    .reduce((max, c) => (c.amount > max ? c.amount : max), null);
};
```

**Risks/Considerations:**
- Tours without discount_percent won't show percentage badge (will use fallback "Especial Mamá")
- Multiple discounts will show the highest one
- Consistent with TripCard badge logic already in place

**User Approval Required:**
- [ ] Confirm showing max discount_percent only
- [ ] Confirm format: `−${amount}% Mamá`
- [ ] Confirm keeping fallback for first 3 tours