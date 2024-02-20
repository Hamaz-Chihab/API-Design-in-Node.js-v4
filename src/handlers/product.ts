import { resolve } from "path";

import prisma from "../db";
//get all :
export const getAllProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });
  res.json({ data: user.products });
};

export const getOneProduct = async (req, res) => {
  // const id = res.params.id;
  const product = await prisma.product.findFirst({
    where: {
      //the combinition we need to find
      id: req.params.id,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: product });
};

export const createProduct = async (req, res, next) => {
  const product = await prisma.product
    .create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    })
    .catch((err) => next(err));
  res.json({ data: product });
};

export const updateProduct = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
    data: {
      name: req.body.name,
    },
  });
  res.json({ data: updated }); //return the result of opration
};

export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: deleted }, { message: "Product deleted succefully" });
};
