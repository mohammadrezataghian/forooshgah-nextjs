import { Metadata } from "next";
import ProductDetails from "../../_components/ProductDetails";
import axios from "axios";

export async function generateMetadata({ params, }: { params: Promise<{ id: string; name: string }> }): Promise<Metadata> {

  const { id, name } = await params;

  if (!params) {
    return {
      title: `محصول یافت نشد | فروشگاه اینترنتی تعاونی مصرف کارکنان بانک ملی` ,
      description: "مشخصات محصول یافت نشد.",
    };
  }

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/GetKalaDetails`,
      { IdStoreStock: id },
      { headers: { "Content-Type": "application/json" } }
    );

    const data = res?.data?.Data?.details;

    if (!data) {
      return {
        title: `محصول یافت نشد | فروشگاه اینترنتی تعاونی مصرف کارکنان بانک ملی` ,
        description: "مشخصات محصول یافت نشد.",
      };
    }

    return {
      metadataBase: new URL("https://imbmi.ir"),
      title: `${data.NameKala} | فروشگاه اینترنتی تعاونی مصرف کارکنان بانک ملی`,
      description: data.ShortDescription || `${data.NameKala} را با بهترین قیمت از فروشگاه اینترنتی تعاونی مصرف کارکنان بانک ملی خرید کنید`,
      openGraph: {
        title: `${data.NameKala} | فروشگاه اینترنتی تعاونی مصرف کارکنان بانک ملی`,
        description: data.ShortDescription || `مشخصات، قیمت و تصاویر ${data.NameKala}.`,
        images: data.FldNameImageKalaList
        ? data.FldNameImageKalaList.split(",").map((img: string) => ({ url: `/assets/public/kala/${id}/${img.trim()}` }))
        : [{ url: "/default-og-image.jpg" }],
        type: "website",
        locale: "fa_IR",
        siteName: "فروشگاه اینترنتی تعاونی مصرف کارکنان بانک ملی",
      },
      alternates: {
        canonical: `https://imbmi.ir/productDetails/${id}/${name}`,
      },
    };
  } catch (err) {
    console.error("Failed to fetch product details:", err);
    return {
      title: "خطا در بارگذاری محصول | فروشگاه اینترنتی تعاونی مصرف کارکنان بانک ملی",
      description: "مشکلی در بارگذاری اطلاعات محصول پیش آمد.",
    };
  }
}

// The page component itself (client-side rendering)
export default function ProductPage() {
  return <ProductDetails />;
}
