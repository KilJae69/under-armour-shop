import AddProduct from "@/components/AddProduct";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";

type SinglePageProps = {
  params: {
    slug: string;
  };
};

export default async function SinglePage({ params }: SinglePageProps) {
  const { slug } = params;

  const wixClient = await wixClientServer();
  const res = await wixClient.products.queryProducts().eq("slug", slug).find();

  if (!res.items || res.items.length === 0) return notFound();
  // TODO ADD NOT FOUND PAGE
  const product = res.items[0];

  return (
    <div className="relative flex flex-col gap-16 px-4 md:px-8 lg:flex-row lg:px-16 xl:px-32 2xl:px-64">
      {/* Image*/}
      <div className="top-20 h-max w-full lg:sticky lg:w-1/2">
        <ProductImages images={product.media?.items || []} />
      </div>
      {/* TEXTS */}
      <div className="flex w-full flex-col gap-6 lg:w-1/2">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        {product.price?.price === product.price?.discountedPrice ? (
          <h2 className="text-2xl font-medium">${product.price?.price}</h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ${product.price?.price}
            </h3>
            <h2 className="text-2xl font-medium">
              ${product.price?.discountedPrice}
            </h2>
          </div>
        )}
        <div className="h-[2px] bg-gray-100" />
        {product.variants && product.productOptions ? (
          <CustomizeProducts
            productId={product._id!}
            variants={product.variants}
            productOptions={product.productOptions}
          />
        ) : (
          <AddProduct
          productId={product._id!}
          variantId="00000000-0000-0000-0000-000000000000"
          stockNumber={product.stock?.quantity || 0}
          />
        )}
        <div className="h-[2px] bg-gray-100" />
        {product.additionalInfoSections?.map((section) => (
          <div className="text-sm" key={section.title}>
            <h4 className="mb-4 font-medium">{section.title}</h4>
            <p>{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
