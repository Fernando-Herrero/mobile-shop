export const getImageScaleClass = (brand: string, name: string): string => {
    const brandLower = brand.toLowerCase();
    const modelLower = name.toLowerCase();

    if (brandLower === "xiaomi") return "reduce-image-max";
    if (brandLower === "realme") return "reduce-image-medium";
    if (brandLower === "oppo") return "reduce-image-small";
    if (modelLower.includes("galaxy a35 5g")) return "augment-image";
    return "";
};
