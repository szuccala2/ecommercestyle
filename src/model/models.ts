export type ProductType = {
    UPC: string;
    name: string;
    price: {
        current: {
            value: number;
        }
        currency: string;
    };
    availability: {
        stock: number;
    };
    img: string;
    variants: Omit<ProductType, "variants">[];
}

export type stockFilter = "none" | "in" | "out";

export type stateModel = {
    searchFilter: string,
    selectedFilter: stockFilter,
    products: ProductType[]
};