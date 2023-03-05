import Link from "next/link";
import React from "react";
import mongoose from "mongoose";
import Product from "../models/Product";

const Hoodies = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length == 0 && (
              <p>
                {" "}
                Sorry all the hoodies are currently out of stock. New stock
                comming soon - stay tuned
              </p>
            )}
            {Object.keys(products).map((item) => {
              return (
                <Link
                  key={products[item]._id}
                  href={`/product/${products[item].slug}`}
                >
                  {/* lg:w-1/4 md:w-1/2  */}
                  <div className="p-4 w-full cursor-pointer shadow-lg m-5">
                    <a className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="m-auto h-[30vh] md:h-[36vh] block"
                        src="https://m.media-amazon.com/images/I/91RjuCBoA6L._AC_UL480_FMwebp_QL65_.jpg"
                      />
                    </a>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {products[item].category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[item].title}
                      </h2>
                      <p className="mt-1">₹{products[item].price}</p>
                      <div className="mt-1">
                        {products[item].size.includes("S") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            S
                          </span>
                        )}
                        {products[item].size.includes("M") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            M
                          </span>
                        )}
                        {products[item].size.includes("L") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            L
                          </span>
                        )}
                        {products[item].size.includes("XL") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            XL
                          </span>
                        )}
                        {products[item].size.includes("XXL") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            XLL
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        {products[item].color.includes("red") && (
                          <button className="border-2 border-gray-300 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("blue") && (
                          <button className="border-2 border-gray-300 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("black") && (
                          <button className="border-2 border-gray-300 bg-black-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("green") && (
                          <button className="border-2 border-gray-300 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("yellow") && (
                          <button className="border-2 border-gray-300 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("purple") && (
                          <button className="border-2 border-gray-300 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "hoodies" });
  let hoods = {};
  for (let item of products) {
    if (item.title in hoods) {
      if (
        !hoods[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        hoods[item.title].color.push(item.color);
      }
      if (
        !hoods[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        hoods[item.title].size.push(item.size);
      }
    } else {
      // Key--------------------value
      hoods[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        hoods[item.title].color = [item.color];
        hoods[item.title].size = [item.size];
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(hoods)) },
  };
}

export default Hoodies;
