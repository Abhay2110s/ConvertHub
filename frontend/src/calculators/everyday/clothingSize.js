export default function convertClothingSize(size, fromSystem, toSystem) {
  const conversions = {
    us: { eu: size + 28, uk: size - 2, jp: size + 16 },
    eu: { us: size - 28, uk: size - 30, jp: size - 12 },
    uk: { us: size + 2, eu: size + 30, jp: size - 14 },
    jp: { us: size - 16, eu: size + 12, uk: size + 14 }
  };

  return { size: conversions[fromSystem]?.[toSystem] || size };
}
