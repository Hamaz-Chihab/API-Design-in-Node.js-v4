import { resolve } from "path";
import prisma from "../db";
//get all :
export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findFirst({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: update });
};

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates, products) => {
    return [...allUpdates, ...products.updates];
  }, []); //setup la form de response updates
  res.json({ data: updates });
};

export const createUpdate = async (req, res) => {
  const { productId, ...rest } = req.body;
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) {
    return res.json({ message: "product not exist to be updated" });
  }
  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: { id: product.id } },
    },
  });
  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  }); //products is an array of updates
  console.log("this is the poducts array :", products);
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []); //setup la form de response updates
  console.log("this is the updates array :", updates);
  const match = updates.find((update) => update.id === req.params.id);
  console.log("the match updates with the id :", match);
  if (!match) {
    return res.json({ message: "match == false not match updates" });
  }
  const updateUpdateobj = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: {
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
    },
  });
  res.json({ data: updateUpdateobj });
};

export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []); //setup la form de response updates
  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    return res.json({ message: "match == false " });
  }
  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: deleted });
};
