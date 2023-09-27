/* eslint-disable @next/next/no-img-element */
import { ProductInCart } from "../../+definitions/cart.definition";
import { Product } from "../../+definitions/product.definition";

interface LcProductProps {
  product: Product | ProductInCart;
  children?: React.ReactNode;
}

export function LcProduct({ product, children }: LcProductProps) {
  return (
    <div
      className={`flex md:flex-col flex-row justify-between h-[160px] w-[80vw] md:h-[400px] md:w-[224px] rounded overflow-hidden`}
      style={{
        boxShadow: "0rem 0rem .25rem 0rem",
      }}
    >
      <div className="w-full h-full flex flex-row md:flex-col justify-between relative">
        <div className="flex-grow flex md:flex-col flex-row">
          <div
            className={`bg-white h-[160px] w-[160px] md:h-[224px] md:w-[224px]`}
          >
            <div
              className={`bg-white h-[160px] w-[160px] md:h-[224px] md:w-[224px]`}
            >
              <img
                className="w-full h-full"
                src={product.image}
                alt={product.title}
                style={{
                  objectFit: "cover",
                  objectPosition: "top left",
                }}
              />
            </div>
          </div>
          <div className="p-4 w-full h-full">
            <div className="">
              <p className="line-clamp-2">{product.title}</p>
              <p className="font-bold mb-2 text-lime-500">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-xs">
                Rating: {product.rating.rate} ({product.rating.count} reviews)
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 md:relative justify-self-end flex align-content-center">
          {children}
        </div>
      </div>
    </div>
  );
}
