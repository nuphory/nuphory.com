type Product = {
        sync_product: SyncProduct;
        sync_variants: SyncVariant[];
};

type SyncProduct = {
        id: number;
        external_id: string;
        name: string;
        variants: number;
        synced: number;
        thumbnail_url: string;
        is_ignored: boolean;
};

type SyncVariant = {
        id: number;
        external_id: string;
        sync_product_id: number;
        name: string;
        synced: boolean;
        variant_id: number;
        retail_price: string;
        currency: string;
        is_ignored: boolean;
        sku?: string;
        product: CatalogProduct;
        files: SyncVariantFile[];
        options?: SyncVariantOption[];
        main_category_id?: number;
        warehouse_product_variant_id?: number;
};

type Item = SyncVariant & {
        quantity: number;
        sync_variant_id?: number;
        external_variant_id?: string;
        product_template_id?: number;
        external_product_id?: string;
        price?: string;

        discontinued?: boolean;
        out_of_stock?: boolean;
};

type SyncVariantFile = {
        id: number;
        type: string;
        mime_type: string;
        thumbnail_url: string;
        preview_url: string;
        filename?: string;
        hash?: string;
        dpi?: number;
        visible?: boolean;
        is_temporary?: boolean;
        size?: number;
        width?: number;
        height?: number;
        status?: string;
        created?: string;
        url?: string;
};

type SyncVariantOption = {
        id: number;
        value: string | string[] | [] | boolean;
};

type CatalogProduct = {
        variant_id: number;
        product_id: number;
        image: string;
        name: string;
};

export type {
        Product,
        SyncProduct,
        SyncVariant,
        Item,
        SyncVariantFile,
        SyncVariantOption,
        CatalogProduct
};
