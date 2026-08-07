export default function convertShoeSize(size, fromSystem, toSystem) {
  const conversions = {
    us: { eu: size + 33, uk: size - 1, jp: size + 18 },
    eu: { us: size - 33, uk: size - 34, jp: size - 15 },
    uk: { us: size + 1, eu: size + 34, jp: size - 14 },
    jp: { us: size - 18, eu: size + 15, uk: size + 14 }
  };

  return { size: conversions[fromSystem]?.[toSystem] || size };
}
